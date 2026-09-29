// N-body gravity simulation for the hero section.
//
// Physics runs on a flat orbital plane (units: px and s, G = 1): every body
// pulls on every other one, integrated with velocity Verlet. The plane is
// drawn tilted (y squashed) so the system reads as a 3D orrery; bodies are
// depth-sorted so planets pass behind and in front of the star.

const SOFTENING2 = 4; // Plummer softening (px²) avoids infinite forces
const STEP = 1 / 180; // fixed integration step (s)
const MAX_FRAME = 1 / 20; // never simulate more than this per frame
const MAX_BODIES = 280;
// Asteroid belt between the ringed giant and the ice planet, starting at
// 1.5x the giant orbit so its resonances do not scatter it right away.
const BELT = { inner: 262, outer: 298, count: 150, mobileCount: 80 };
const TRAIL_EVERY = 1 / 30; // trail sample period (s)
const BASE_OUTER = 345; // outermost planet orbit at scale 1

const TRAIL_LENGTH = { asteroid: 70, comet: 150 };

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TAU = Math.PI * 2;

const RANK = { star: 4, planet: 3, moon: 2, comet: 1, asteroid: 1, belt: 0 };

const rockShape = () => ({
  angle: rand(0, TAU),
  spin: rand(-3, 3),
  shape: Array.from({ length: 8 }, () => rand(0.7, 1.15)),
});

const PLANETS = [
  { dist: 70, mass: 60, r: 3.5, color: "#b89478", style: "rocky" },
  { dist: 115, mass: 260, r: 5, color: "#4f8fd1", style: "ocean" },
  { dist: 175, mass: 500, r: 6, color: "#d9a066", style: "gas", ring: true, moon: true },
  { dist: 345, mass: 60, r: 6, color: "#8fd3c8", style: "ice" },
];

export function createGravitySim(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext("2d");
  let W = 0;
  let H = 0;
  let dpr = 1;
  let s = 1; // orbit scale
  let size = 1; // body size scale
  let tilt = 0.42; // how much the orbital plane is squashed
  let origin = { x: 0, y: 0 };
  let bodies = [];
  let flashes = [];
  let debris = [];
  let guides = true;
  let acc = 0;
  let trailClock = 0;
  let nextId = 1;

  // The camera follows the star: heavy asteroids that crash into it push the
  // whole system, and this keeps it centered in the section.
  const cam = { x: 0, y: 0 };
  const toScreen = (x, y) => [origin.x + x - cam.x, origin.y + (y - cam.y) * tilt];
  const outer = () => BASE_OUTER * s;

  const layout = () => {
    const mobile = W < 768;
    tilt = mobile ? 0.62 : 0.42;
    origin = { x: W * 0.5, y: H * (mobile ? 0.57 : 0.58) };
    // biggest system that fits between the lifted greeting and the bottom
    const up = origin.y - 150;
    const down = H - origin.y - 40;
    s = Math.min((W * (mobile ? 0.48 : 0.44)) / BASE_OUTER, Math.min(up, down) / (BASE_OUTER * tilt));
    s = Math.max(0.35, s);
    size = clamp(s, 0.5, 1.5);
  };

  const makeBody = (kind, x, y, vx, vy, m, r, extra = {}) => ({
    id: nextId++, kind, x, y, vx, vy, ax: 0, ay: 0, m, r, trail: [], ...extra,
  });

  // Speed of a circular orbit of radius r around mass M (with softening).
  const circular = (M, r) => Math.sqrt((M * r * r) / Math.pow(r * r + SOFTENING2, 1.5));

  const orbiting = (host, kind, dist, m, r, phase, extra) => {
    const v = circular(host.m, dist);
    return makeBody(
      kind,
      host.x + Math.cos(phase) * dist,
      host.y + Math.sin(phase) * dist,
      host.vx - Math.sin(phase) * v,
      host.vy + Math.cos(phase) * v,
      m,
      r,
      extra
    );
  };

  // Masses grow with s³ so orbital periods stay the same at every size.
  const seed = () => {
    bodies = [];
    cam.x = 0;
    cam.y = 0;
    flashes = [];
    debris = [];
    const m3 = s * s * s;
    const star = makeBody("star", 0, 0, 0, 0, 180000 * m3, 16 * size);
    bodies.push(star);
    for (const p of PLANETS) {
      const planet = orbiting(star, "planet", p.dist * s, p.mass * m3, p.r * size, rand(0, TAU), {
        color: p.color, style: p.style, ring: p.ring, seed: Math.random() * 1000,
      });
      bodies.push(planet);
      if (p.moon) {
        // tight orbit (~⅓ of the Hill radius) so the star cannot steal it
        bodies.push(orbiting(planet, "moon", 6 * s, 1 * m3, 1 * size, rand(0, TAU), {
          color: "#cfd6e6", style: "rocky", seed: Math.random() * 1000, host: planet.id,
        }));
      }
    }
    // Belt rocks are full n-body participants too: light, but they pull on
    // (and are pulled by) everything else.
    const n = W < 768 ? BELT.mobileCount : BELT.count;
    for (let i = 0; i < n; i++) {
      const dist = rand(BELT.inner, BELT.outer) * s;
      const rock = orbiting(star, "belt", dist, 0.4 * m3, rand(0.8, 1.7) * size, rand(0, TAU), rockShape());
      // a touch of eccentricity so the belt is not a perfect ring
      const e = rand(0.99, 1.01);
      rock.vx *= e;
      rock.vy *= e;
      bodies.push(rock);
    }
    // cancel the net momentum so the system stays centered
    let px = 0;
    let py = 0;
    for (const b of bodies) {
      px += b.m * b.vx;
      py += b.m * b.vy;
    }
    star.vx -= px / star.m;
    star.vy -= py / star.m;
    computeAcc();
  };

  function computeAcc() {
    for (const b of bodies) {
      b.ax = 0;
      b.ay = 0;
    }
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d2 = dx * dx + dy * dy + SOFTENING2;
        const inv = 1 / (d2 * Math.sqrt(d2));
        a.ax += dx * inv * b.m;
        a.ay += dy * inv * b.m;
        b.ax -= dx * inv * a.m;
        b.ay -= dy * inv * a.m;
      }
    }
  }

  // Velocity Verlet: second order and stable for orbits.
  const step = (dt) => {
    for (const b of bodies) {
      b.vx += b.ax * dt * 0.5;
      b.vy += b.ay * dt * 0.5;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }
    computeAcc();
    for (const b of bodies) {
      b.vx += b.ax * dt * 0.5;
      b.vy += b.ay * dt * 0.5;
      if (b.spin) b.angle += b.spin * dt;
    }
  };

  const impact = (x, y, vx, vy, color, strength) => {
    flashes.push({ x, y, color, size: strength, t: 0 });
    const n = Math.round(clamp(strength / 2, 8, 22));
    for (let i = 0; i < n; i++) {
      const a = rand(0, TAU);
      const v = rand(0.3, 1) * strength * 4;
      debris.push({ x, y, vx: vx * 0.3 + Math.cos(a) * v, vy: vy * 0.3 + Math.sin(a) * v, life: rand(0.7, 1.4), t: 0, color });
    }
  };

  // Bodies that touch merge, keeping mass and momentum.
  const collide = () => {
    let changed = false;
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      if (!a) continue;
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        if (!b) continue;
        // belt rocks attract each other but, as in a real belt, never collide
        if (a.kind === "belt" && b.kind === "belt") continue;
        // the moon passes in front of / behind its planet in the tilted view
        if (a.host === b.id || b.host === a.id) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const reach = a.r + b.r;
        if (dx * dx + dy * dy > reach * reach) continue;
        // stars and planets always absorb what hits them; otherwise the heavier wins
        const ra = RANK[a.kind];
        const rb = RANK[b.kind];
        const [big, small] = ra > rb || (ra === rb && a.m >= b.m) ? [a, b] : [b, a];
        const m = big.m + small.m;
        big.vx = (big.vx * big.m + small.vx * small.m) / m;
        big.vy = (big.vy * big.m + small.vy * small.m) / m;
        big.x = (big.x * big.m + small.x * small.m) / m;
        big.y = (big.y * big.m + small.y * small.m) / m;
        big.m = m;
        if (big.kind === "asteroid" || big.kind === "comet") big.r = Math.cbrt(big.r ** 3 + small.r ** 3);
        const hot = big.kind === "star";
        impact(small.x, small.y, big.vx, big.vy, small.kind === "comet" ? "#bfe6ff" : hot ? "#ffd08a" : "#ff9d5c",
          Math.max(10, small.r * 7) * (hot ? 1.5 : 1));
        bodies[bodies.indexOf(small)] = null;
        changed = true;
        if (small === a) break;
      }
    }
    // forget what flew far away
    const limit = outer() * 3.2;
    const star = findStar() || { x: 0, y: 0 };
    bodies = bodies.filter((b) => b && (b.kind === "star" || Math.hypot(b.x - star.x, b.y - star.y) < limit));
    if (changed) computeAcc();
  };

  const sampleTrails = () => {
    for (const b of bodies) {
      const max = TRAIL_LENGTH[b.kind];
      if (!max) continue;
      b.trail.push(b.x, b.y);
      if (b.trail.length > max * 2) b.trail.splice(0, 2);
    }
  };

  const update = (dt) => {
    acc += Math.min(dt, MAX_FRAME);
    while (acc >= STEP) {
      step(STEP);
      acc -= STEP;
      trailClock += STEP;
      if (trailClock >= TRAIL_EVERY) {
        trailClock = 0;
        sampleTrails();
      }
    }
    collide();
    for (const f of flashes) f.t += dt;
    flashes = flashes.filter((f) => f.t < 1.1);
    for (const d of debris) {
      d.t += dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.vx *= 0.985;
      d.vy *= 0.985;
    }
    debris = debris.filter((d) => d.t < d.life);
    const star = findStar();
    if (star) {
      const k = 1 - Math.exp(-Math.min(dt, MAX_FRAME) * 1.5);
      cam.x += (star.x - cam.x) * k;
      cam.y += (star.y - cam.y) * k;
    }
  };

  // ---------- planet textures (rendered once per planet) ----------
  const makeSprite = (b) => {
    const R = Math.ceil(b.r * dpr * 2);
    const c = document.createElement("canvas");
    c.width = R * 2;
    c.height = R * 2;
    const g = c.getContext("2d");
    g.beginPath();
    g.arc(R, R, R, 0, TAU);
    g.clip();
    g.fillStyle = b.color;
    g.fillRect(0, 0, R * 2, R * 2);
    let seed = Math.floor(b.seed || 1);
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    if (b.style === "gas") {
      // soft latitude bands with a little wobble
      for (let y = 0; y < R * 2; y += 1) {
        const v = Math.sin((y / R) * 5.5 + b.seed) * 0.5 + Math.sin((y / R) * 1.7 + b.seed * 2) * 0.5;
        g.fillStyle = v > 0 ? `rgba(255, 240, 215, ${v * 0.28})` : `rgba(90, 45, 20, ${-v * 0.32})`;
        g.fillRect(0, y, R * 2, 1);
      }
      g.fillStyle = "rgba(170, 70, 40, 0.55)"; // storm
      g.beginPath();
      g.ellipse(R * 1.3, R * 1.3, R * 0.22, R * 0.12, 0, 0, TAU);
      g.fill();
    } else if (b.style === "ocean") {
      for (let i = 0; i < 7; i++) {
        g.fillStyle = `rgba(95, 150, 90, ${0.55 + rnd() * 0.3})`; // continents
        g.beginPath();
        g.ellipse(rnd() * R * 2, rnd() * R * 2, R * (0.2 + rnd() * 0.35), R * (0.12 + rnd() * 0.25), rnd() * 3, 0, TAU);
        g.fill();
      }
      for (let i = 0; i < 9; i++) {
        g.fillStyle = "rgba(255, 255, 255, 0.35)"; // clouds
        g.beginPath();
        g.ellipse(rnd() * R * 2, rnd() * R * 2, R * (0.3 + rnd() * 0.4), R * 0.06, 0, 0, TAU);
        g.fill();
      }
    } else {
      // rocky / icy: mottled surface with craters
      for (let i = 0; i < 26; i++) {
        const light = rnd() > 0.5;
        g.fillStyle = light ? `rgba(255, 255, 255, ${rnd() * 0.18})` : `rgba(0, 0, 0, ${rnd() * 0.22})`;
        g.beginPath();
        g.arc(rnd() * R * 2, rnd() * R * 2, R * (0.06 + rnd() * 0.28), 0, TAU);
        g.fill();
      }
      if (b.style === "ice") {
        g.fillStyle = "rgba(255, 255, 255, 0.45)"; // polar caps
        g.fillRect(0, 0, R * 2, R * 0.28);
        g.fillRect(0, R * 1.78, R * 2, R * 0.3);
      }
    }
    b.sprite = c;
    b.spriteR = b.r;
    b.spriteDpr = dpr;
  };

  // ---------- drawing ----------
  const findStar = () => bodies.find((b) => b.kind === "star");
  const depth = (y) => clamp(1 + ((y - cam.y) / outer()) * 0.14, 0.82, 1.2);

  const drawGuides = (star) => {
    const [cx, cy] = toScreen(star.x, star.y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(150, 180, 255, 0.1)";
    for (const b of bodies) {
      if (b.kind !== "planet") continue;
      const d = Math.hypot(b.x - star.x, b.y - star.y);
      ctx.beginPath();
      ctx.ellipse(cx, cy, d, d * tilt, 0, 0, TAU);
      ctx.stroke();
    }
  };

  const drawTrails = () => {
    ctx.lineCap = "round";
    for (const b of bodies) {
      const t = b.trail;
      if (t.length < 4) continue;
      const n = t.length / 2;
      const comet = b.kind === "comet";
      ctx.strokeStyle = comet ? "#d6ecff" : "#ffae6b";
      ctx.lineWidth = comet ? 1.8 : 1.3;
      const seg = 8;
      for (let k = 0; k < seg; k++) {
        const from = Math.floor((n * k) / seg);
        const to = Math.min(n - 1, Math.floor((n * (k + 1)) / seg));
        ctx.globalAlpha = 0.75 * ((k + 1) / seg) ** 1.8;
        ctx.beginPath();
        let [x, y] = toScreen(t[from * 2], t[from * 2 + 1]);
        ctx.moveTo(x, y);
        for (let i = from + 1; i <= to; i++) {
          [x, y] = toScreen(t[i * 2], t[i * 2 + 1]);
          ctx.lineTo(x, y);
        }
        if (k === seg - 1) {
          [x, y] = toScreen(b.x, b.y);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  };

  const drawStar = (b, now) => {
    const [x, y] = toScreen(b.x, b.y);
    const r = b.r;
    const flicker = 1 + Math.sin(now * 1.7) * 0.03 + Math.sin(now * 4.3) * 0.015;
    ctx.globalCompositeOperation = "lighter";
    // wide halo
    let g = ctx.createRadialGradient(x, y, 0, x, y, r * 14 * flicker);
    g.addColorStop(0, "rgba(255, 190, 110, 0.35)");
    g.addColorStop(0.12, "rgba(255, 150, 70, 0.16)");
    g.addColorStop(0.4, "rgba(255, 110, 50, 0.04)");
    g.addColorStop(1, "rgba(255, 90, 40, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 14 * flicker, 0, TAU);
    ctx.fill();
    // corona
    g = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.6);
    g.addColorStop(0, "rgba(255, 235, 190, 0.7)");
    g.addColorStop(1, "rgba(255, 170, 90, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.6, 0, TAU);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // photosphere with limb darkening
    g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x, y, r);
    g.addColorStop(0, "#fffdf6");
    g.addColorStop(0.55, "#ffe6b3");
    g.addColorStop(0.9, "#ffb45e");
    g.addColorStop(1, "#f08a3c");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  };

  // Lens flare drawn on top of everything.
  const drawFlare = (b, now) => {
    const [x, y] = toScreen(b.x, b.y);
    const r = b.r;
    const k = 1 + Math.sin(now * 0.9) * 0.05;
    ctx.globalCompositeOperation = "lighter";
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, 0.035);
    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 26 * k);
    g.addColorStop(0, "rgba(200, 225, 255, 0.55)");
    g.addColorStop(0.3, "rgba(150, 190, 255, 0.12)");
    g.addColorStop(1, "rgba(120, 160, 255, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, r * 26 * k, 0, TAU);
    ctx.fill();
    ctx.restore();
    // four soft diffraction spikes
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const len = r * 7 * k;
      g = ctx.createLinearGradient(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len);
      g.addColorStop(0, "rgba(255, 230, 190, 0.35)");
      g.addColorStop(1, "rgba(255, 230, 190, 0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const drawRing = (x, y, r, front) => {
    const rx = r * 2.25;
    const ry = rx * tilt * 0.9;
    const bands = [
      [1.0, "rgba(230, 200, 160, 0.30)", 2.2],
      [0.88, "rgba(245, 220, 185, 0.55)", 2.6],
      [0.74, "rgba(210, 180, 140, 0.35)", 1.6],
    ];
    for (const [k, color, w] of bands) {
      ctx.strokeStyle = color;
      ctx.lineWidth = w * size * 0.6;
      ctx.beginPath();
      ctx.ellipse(x, y, rx * k, ry * k, -0.12, front ? 0 : Math.PI, front ? Math.PI : TAU);
      ctx.stroke();
    }
  };

  // Textured sphere lit from the star, with a terminator and a thin atmosphere.
  const drawPlanet = (b, star) => {
    const [x, y] = toScreen(b.x, b.y);
    const r = Math.max(1.5, b.r * depth(b.y));
    if (!b.sprite || b.spriteR !== b.r || b.spriteDpr !== dpr) makeSprite(b);
    let lx = 0;
    let ly = -1;
    if (star) {
      const [sx, sy] = toScreen(star.x, star.y);
      const d = Math.hypot(sx - x, sy - y) || 1;
      lx = (sx - x) / d;
      ly = (sy - y) / d;
    }
    if (b.ring) drawRing(x, y, r, false);
    ctx.drawImage(b.sprite, x - r, y - r, r * 2, r * 2);
    // night side
    const g = ctx.createRadialGradient(x + lx * r * 0.55, y + ly * r * 0.55, r * 0.15, x + lx * r * 0.3, y + ly * r * 0.3, r * 1.45);
    g.addColorStop(0, "rgba(255, 245, 225, 0.18)");
    g.addColorStop(0.45, "rgba(3, 4, 10, 0.05)");
    g.addColorStop(0.72, "rgba(3, 4, 10, 0.78)");
    g.addColorStop(1, "rgba(3, 4, 10, 0.96)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
    // atmosphere on the lit limb
    if (b.kind === "planet") {
      const la = Math.atan2(ly, lx);
      ctx.globalCompositeOperation = "lighter";
      const a = ctx.createRadialGradient(x, y, r * 0.85, x, y, r * 1.35);
      a.addColorStop(0, "rgba(0, 0, 0, 0)");
      a.addColorStop(0.35, hexToRgba(b.color, 0.35));
      a.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = a;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.35, la - 1.3, la + 1.3);
      ctx.arc(x, y, r * 0.85, la + 1.3, la - 1.3, true);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }
    if (b.ring) drawRing(x, y, r, true);
  };

  const drawRock = (b, star) => {
    const [x, y] = toScreen(b.x, b.y);
    const r = Math.max(1.6, b.r * depth(b.y));
    ctx.globalCompositeOperation = "lighter";
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5);
    glow.addColorStop(0, "rgba(255, 170, 110, 0.35)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 3.5, 0, TAU);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // irregular rotating rock
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(b.angle);
    ctx.beginPath();
    b.shape.forEach((k, i) => {
      const a = (i / b.shape.length) * TAU;
      if (i === 0) ctx.moveTo(Math.cos(a) * r * k, Math.sin(a) * r * k);
      else ctx.lineTo(Math.cos(a) * r * k, Math.sin(a) * r * k);
    });
    ctx.closePath();
    ctx.fillStyle = "#b9a58f";
    ctx.fill();
    ctx.restore();
    if (star) {
      const [sx, sy] = toScreen(star.x, star.y);
      const d = Math.hypot(sx - x, sy - y) || 1;
      ctx.fillStyle = "rgba(255, 240, 220, 0.9)";
      ctx.beginPath();
      ctx.arc(x + ((sx - x) / d) * r * 0.35, y + ((sy - y) / d) * r * 0.35, r * 0.45, 0, TAU);
      ctx.fill();
    }
  };

  // Faint dust band under the belt so it reads as a belt and not as stars.
  const drawBeltDust = (star) => {
    const [cx, cy] = toScreen(star.x, star.y);
    const inner = BELT.inner * s * 0.97;
    const outerR = BELT.outer * s * 1.03;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, tilt);
    const g = ctx.createRadialGradient(0, 0, inner, 0, 0, outerR);
    g.addColorStop(0, "rgba(210, 175, 130, 0)");
    g.addColorStop(0.5, "rgba(210, 175, 130, 0.09)");
    g.addColorStop(1, "rgba(210, 175, 130, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, TAU);
    ctx.arc(0, 0, inner, 0, TAU, true);
    ctx.fill();
    ctx.restore();
  };

  // Belt rocks: many of them, so no glow, just a lit rotating chip.
  const drawBeltRock = (b, star) => {
    const [x, y] = toScreen(b.x, b.y);
    const r = Math.max(1.1, b.r * depth(b.y));
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(b.angle);
    ctx.beginPath();
    for (let i = 0; i < b.shape.length; i += 2) {
      const a = (i / b.shape.length) * TAU;
      if (i === 0) ctx.moveTo(Math.cos(a) * r * b.shape[i], Math.sin(a) * r * b.shape[i]);
      else ctx.lineTo(Math.cos(a) * r * b.shape[i], Math.sin(a) * r * b.shape[i]);
    }
    ctx.closePath();
    ctx.fillStyle = "#b39a7c";
    ctx.fill();
    ctx.restore();
    if (star) {
      const [sx, sy] = toScreen(star.x, star.y);
      const d = Math.hypot(sx - x, sy - y) || 1;
      ctx.fillStyle = "rgba(255, 232, 200, 0.85)";
      ctx.fillRect(x + ((sx - x) / d) * r * 0.4 - r * 0.35, y + ((sy - y) / d) * r * 0.4 - r * 0.35, r * 0.7, r * 0.7);
    }
  };

  const drawComet = (b, star) => {
    const [x, y] = toScreen(b.x, b.y);
    ctx.globalCompositeOperation = "lighter";
    if (star) {
      // ion tail: straight, always pointing away from the star, longer when close
      const dx = b.x - star.x;
      const dy = b.y - star.y;
      const d = Math.hypot(dx, dy) || 1;
      const len = clamp((outer() * 55) / d, 12, 140) * size;
      const [tx, ty] = toScreen(b.x + (dx / d) * len, b.y + (dy / d) * len);
      for (const [w, a] of [[5, 0.18], [2, 0.5]]) {
        const g = ctx.createLinearGradient(x, y, tx, ty);
        g.addColorStop(0, `rgba(170, 215, 255, ${a})`);
        g.addColorStop(1, "rgba(170, 215, 255, 0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
    }
    const g = ctx.createRadialGradient(x, y, 0, x, y, b.r * 5);
    g.addColorStop(0, "rgba(230, 245, 255, 0.9)");
    g.addColorStop(0.3, "rgba(170, 215, 255, 0.35)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, b.r * 5, 0, TAU);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const drawEffects = () => {
    ctx.globalCompositeOperation = "lighter";
    for (const f of flashes) {
      const k = f.t / 1.1;
      const [x, y] = toScreen(f.x, f.y);
      const R = f.size * (0.4 + k * 1.6);
      const g = ctx.createRadialGradient(x, y, 0, x, y, R);
      g.addColorStop(0, `rgba(255, 248, 230, ${0.85 * (1 - k)})`);
      g.addColorStop(0.35, hexToRgba(f.color, 0.4 * (1 - k)));
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, R, 0, TAU);
      ctx.fill();
      // shockwave ring on the orbital plane
      ctx.strokeStyle = hexToRgba(f.color, 0.5 * (1 - k) ** 2);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(x, y, f.size * k * 3, f.size * k * 3 * tilt, 0, 0, TAU);
      ctx.stroke();
    }
    ctx.lineCap = "round";
    for (const d of debris) {
      const k = 1 - d.t / d.life;
      const [x, y] = toScreen(d.x, d.y);
      const [px, py] = toScreen(d.x - d.vx * 0.05, d.y - d.vy * 0.05);
      ctx.strokeStyle = hexToRgba(d.color, 0.9 * k);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const draw = (now) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const star = findStar();
    if (star) drawBeltDust(star);
    if (guides && star) drawGuides(star);
    if (guides) drawTrails();
    // far side first so bodies pass behind and in front of the star
    const sorted = [...bodies].sort((a, b) => a.y - b.y);
    for (const b of sorted) {
      if (b.kind === "star") drawStar(b, now);
      else if (b.kind === "planet" || b.kind === "moon") drawPlanet(b, star);
      else if (b.kind === "belt") drawBeltRock(b, star);
      else if (b.kind === "comet") drawComet(b, star);
      else drawRock(b, star);
    }
    drawEffects();
    if (star) drawFlare(star, now);
  };

  // ---------- launching ----------
  // Asteroids enter from the left or right edge, aimed to pass somewhere
  // around the star with a random miss distance.
  const spawnAsteroid = (delay = 0) => {
    if (bodies.length >= MAX_BODIES) return;
    const star = findStar();
    if (!star) return;
    const side = Math.random() < 0.6 ? -1 : 1;
    const v0 = circular(star.m, outer());
    const speed = rand(2.2, 3.4) * v0;
    const sx = cam.x + side * (W / 2 + 20 + delay * speed * 0.5);
    const sy = cam.y + rand(-origin.y + 110, H - origin.y - 30) / tilt;
    const tx = star.x;
    const ty = star.y + rand(-0.8, 0.8) * outer();
    const d = Math.hypot(tx - sx, ty - sy);
    const r = rand(1.8, 3.2) * size;
    // 5-30x a belt rock (it tugs and sweeps up rocks as it crosses the belt)
    // but well below the smallest planet, so a hit does not wreck its orbit
    const m = (r / size) ** 3 * 0.35 * s ** 3;
    bodies.push(makeBody("asteroid", sx, sy, ((tx - sx) / d) * speed, ((ty - sy) / d) * speed, m, r, rockShape()));
    computeAcc();
  };

  const launchAsteroid = () => spawnAsteroid();

  const launchShower = () => {
    for (let i = 0; i < 10; i++) spawnAsteroid(i * 0.45);
  };

  // A comet on a long, eccentric bound orbit: released far out with much
  // less speed than a circular orbit needs, so it plunges past the star.
  const launchComet = () => {
    const star = findStar();
    if (!star || bodies.length >= MAX_BODIES) return;
    const angle = rand(0, TAU);
    const dist = outer() * 1.25;
    const v = circular(star.m, dist) * rand(0.3, 0.42);
    const dir = Math.random() < 0.5 ? 1 : -1;
    bodies.push(
      makeBody(
        "comet",
        star.x + Math.cos(angle) * dist,
        star.y + Math.sin(angle) * dist,
        star.vx - Math.sin(angle) * v * dir,
        star.vy + Math.cos(angle) * v * dir,
        8 * s ** 3,
        2 * size
      )
    );
    computeAcc();
  };

  const setGuides = (on) => {
    guides = on;
  };

  const resize = (w, h) => {
    if (!w || !h) return;
    const first = W === 0;
    const oldS = s;
    W = w;
    H = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    layout();
    // rebuild only when the size changes a lot (e.g. rotating a tablet)
    if (first || Math.abs(s - oldS) / oldS > 0.15) seed();
    if (reducedMotion) draw(0);
  };

  const tick = (dt, now) => {
    update(dt);
    draw(now);
  };

  const count = () => bodies.filter((b) => b.kind === "asteroid" || b.kind === "comet").length;

  return { resize, tick, draw, reset: seed, launchAsteroid, launchShower, launchComet, setGuides, count };
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
