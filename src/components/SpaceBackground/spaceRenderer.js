// Procedural, scroll-driven space background rendered on a canvas.
//
// The "world" is split into vertical chunks that are generated lazily from a
// fixed seed, so the sky is endless, always identical, and only the visible
// part is ever built. Each layer scrolls at its own speed (parallax).

const SEED = 20260924;
const CHUNK = 1024; // world px per chunk
const NEBULA_SCALE = 4; // nebula textures are rendered at 1/4 resolution then smoothed
const NEBULA_PARALLAX = 0.55;

const STAR_LAYERS = [
  // p: parallax factor (1 = moves exactly with the page)
  { id: 1, p: 0.3, density: 480, r: [0.35, 0.8], a: [0.25, 0.65], twinkle: 0.35, warm: 0.04 },
  { id: 2, p: 0.6, density: 130, r: [0.55, 1.2], a: [0.4, 0.9], twinkle: 0.5, warm: 0.08 },
  { id: 3, p: 1, density: 42, r: [0.9, 1.7], a: [0.6, 1], twinkle: 0.65, warm: 0.14 },
];

const COOL = ["#ffffff", "#eef3ff", "#dbe5ff", "#c8d7ff", "#b9ccf5"];
const WARM = ["#ffd9a8", "#ffc38a", "#ffab70", "#ff9460"];

// ---------------------------------------------------------------------------
// Deterministic randomness
// ---------------------------------------------------------------------------
function mulberry32(a) {
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rngFor(...keys) {
  let h = SEED;
  for (const k of keys) h = Math.imul(h ^ (k | 0), 2654435761) >>> 0;
  return mulberry32(h);
}

const between = (rng, [min, max]) => min + rng() * (max - min);
const pick = (rng, list) => list[Math.floor(rng() * list.length)];

function hash2(x, y) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + SEED) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function valueNoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x, y, octaves) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

// ---------------------------------------------------------------------------
// Nebula (star dust clouds)
// ---------------------------------------------------------------------------

// Each chunk may host a cloud "system": an elongated band of soft blobs,
// like a stretch of the Milky Way.
function cloudSystems(chunk, width) {
  const rng = rngFor(11, chunk);
  const systems = [];
  const count = chunk === 0 ? 1 : rng() < 0.7 ? 1 : rng() < 0.5 ? 2 : 0;
  const scale = Math.min(1, Math.max(0.6, width / 1100));

  for (let s = 0; s < count; s++) {
    const cx = width * (chunk === 0 ? 0.58 : 0.2 + rng() * 0.6);
    const cy = chunk * CHUNK + (chunk === 0 ? 0.55 : 0.2 + rng() * 0.6) * CHUNK;
    const angle = Math.PI / 2 + (rng() - 0.5) * 0.9;
    const length = (520 + rng() * 520) * scale;
    const blobs = [];
    const n = 6 + Math.floor(rng() * 5);
    for (let i = 0; i < n; i++) {
      const t = (i / (n - 1) - 0.5) * length;
      const jitter = (rng() - 0.5) * 170 * scale;
      const r = (80 + rng() * 125) * scale;
      blobs.push({
        x: cx + Math.cos(angle) * t - Math.sin(angle) * jitter,
        y: cy + Math.sin(angle) * t + Math.cos(angle) * jitter,
        r2: 2 * r * r,
        reach: 3 * r,
        w: 0.4 + rng() * 0.45,
      });
    }
    // a brighter, compact core somewhere along the band
    const k = blobs[Math.floor(rng() * blobs.length)];
    const rc = (60 + rng() * 50) * scale;
    blobs.push({ x: k.x + (rng() - 0.5) * 60, y: k.y + (rng() - 0.5) * 60, r2: 2 * rc * rc, reach: 3 * rc, w: 0.95 });
    systems.push(...blobs);
  }
  return systems;
}

// Samples the nebula at a world point: m = cloud mask, lane = dark dust lane.
function sampleNebula(blobs, x, y) {
  let sum = 0;
  for (let i = 0; i < blobs.length; i++) {
    const b = blobs[i];
    const dx = x - b.x;
    const dy = y - b.y;
    if (Math.abs(dx) > b.reach || Math.abs(dy) > b.reach) continue;
    sum += b.w * Math.exp(-(dx * dx + dy * dy) / b.r2);
  }
  if (sum < 0.015) return null;
  const m = 1 - Math.exp(-sum * 1.5);
  const n2 = fbm(x / 150 + 40, y / 150 - 17, 3);
  // thin filaments, broken up by a second noise so they don't form one long river
  const broken = Math.max(0, (fbm(x / 90 - 31, y / 90 + 7, 2) - 0.35) / 0.3);
  const lane = Math.max(0, 1 - Math.abs(n2 - 0.5) / 0.05) * Math.min(1, broken);
  return { m, lane };
}

function renderNebulaTile(chunk, width, blobs) {
  const S = NEBULA_SCALE;
  const tw = Math.ceil(width / S);
  const th = Math.ceil(CHUNK / S);
  const canvas = document.createElement("canvas");
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(tw, th);
  const data = img.data;
  const y0 = chunk * CHUNK;

  for (let py = 0; py < th; py++) {
    for (let px = 0; px < tw; px++) {
      const x = px * S;
      const y = y0 + py * S;
      const s = sampleNebula(blobs, x, y);
      if (!s) continue;
      const n1 = fbm(x / 180, y / 180, 5);
      const n3 = fbm(x / 38 - 9, y / 38 + 3, 2); // fine grain
      let b = s.m * Math.pow(Math.max(0, (n1 - 0.3) / 0.4), 1.35);
      b *= 0.6 + 0.8 * n3;
      b *= 1 - 0.9 * s.lane * s.m; // dust lanes carve dark filaments
      if (b <= 0.004) continue;
      const t = 1 - Math.exp(-b * 1.4); // soft highlight roll-off
      const i = (py * tw + px) * 4;
      // steel blue body -> pale lavender-gray highlights
      data[i] = 26 + 60 * t + 90 * t * t;
      data[i + 1] = 40 + 70 * t + 80 * t * t;
      data[i + 2] = 64 + 112 * t + 40 * t * t;
      data[i + 3] = 175 * (1 - Math.exp(-b * 1.8));
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// ---------------------------------------------------------------------------
// Sprites
// ---------------------------------------------------------------------------
function makeGlowSprite(core, halo) {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.08, core);
  g.addColorStop(0.22, halo);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

function makeSpikeSprite(color) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const line = (horizontal) => {
    const g = horizontal
      ? ctx.createLinearGradient(0, 0, size, 0)
      : ctx.createLinearGradient(0, 0, 0, size);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.38, color);
    g.addColorStop(0.5, "#ffffff");
    g.addColorStop(0.62, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    if (horizontal) ctx.fillRect(0, size / 2 - 0.6, size, 1.2);
    else ctx.fillRect(size / 2 - 0.6, 0, 1.2, size);
  };
  line(true);
  line(false);
  return c;
}

const TONES = {
  cool: { core: "rgba(210,228,255,0.95)", halo: "rgba(120,160,255,0.16)", spike: "rgba(180,210,255,0.55)" },
  warm: { core: "rgba(255,226,180,0.95)", halo: "rgba(255,170,100,0.14)", spike: "rgba(255,210,160,0.5)" },
  white: { core: "rgba(255,255,255,0.95)", halo: "rgba(200,215,255,0.12)", spike: "rgba(235,240,255,0.5)" },
};

// ---------------------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------------------
export function createSpaceRenderer(canvas, { reducedMotion }) {
  const ctx = canvas.getContext("2d");
  const sprites = {};
  Object.entries(TONES).forEach(([key, t]) => {
    sprites[key] = { glow: makeGlowSprite(t.core, t.halo), spike: makeSpikeSprite(t.spike) };
  });

  let width = 0;
  let height = 0;
  let dpr = 1;
  const cache = new Map(); // key -> generated chunk content
  const blobCache = new Map();
  const shooting = [];
  let nextShooting = 3 + Math.random() * 4;

  function blobsNear(chunk) {
    if (!blobCache.has(chunk)) {
      const list = [];
      for (let c = chunk - 2; c <= chunk + 2; c++) {
        if (c < 0) continue;
        cloudSystems(c, width).forEach((b) => {
          if (b.y + b.reach >= chunk * CHUNK && b.y - b.reach <= (chunk + 1) * CHUNK) list.push(b);
        });
      }
      blobCache.set(chunk, list);
    }
    return blobCache.get(chunk);
  }

  function memo(key, build) {
    if (!cache.has(key)) cache.set(key, build());
    return cache.get(key);
  }

  function starsFor(layer, chunk) {
    return memo(`s${layer.id}:${chunk}`, () => {
      const rng = rngFor(layer.id, chunk);
      const count = Math.round((layer.density * width * CHUNK) / 1e6);
      const stars = [];
      for (let i = 0; i < count; i++) {
        const warm = rng() < layer.warm;
        stars.push({
          x: rng() * width,
          y: chunk * CHUNK + rng() * CHUNK,
          r: between(rng, layer.r),
          a: between(rng, layer.a),
          color: warm ? pick(rng, WARM) : pick(rng, COOL),
          tw: rng() < layer.twinkle ? 0.35 + rng() * 0.55 : 0,
          sp: 0.6 + rng() * 2.2,
          ph: rng() * Math.PI * 2,
        });
      }
      return stars;
    });
  }

  // Dense, fine star grain concentrated inside the dust clouds.
  function clusterStarsFor(chunk) {
    return memo(`c:${chunk}`, () => {
      const rng = rngFor(21, chunk);
      const blobs = blobsNear(chunk);
      const stars = [];
      if (!blobs.length) return stars;
      const candidates = Math.round((4200 * width * CHUNK) / 1e6);
      for (let i = 0; i < candidates; i++) {
        const x = rng() * width;
        const y = chunk * CHUNK + rng() * CHUNK;
        const s = sampleNebula(blobs, x, y);
        if (!s || rng() > s.m * (1 - 0.85 * s.lane)) continue;
        stars.push({
          x,
          y,
          r: 0.35 + rng() * 0.75,
          a: 0.35 + rng() * 0.6,
          color: pick(rng, COOL),
          tw: rng() < 0.3 ? 0.4 + rng() * 0.5 : 0,
          sp: 0.8 + rng() * 2.5,
          ph: rng() * Math.PI * 2,
        });
      }
      return stars;
    });
  }

  function brightFor(chunk) {
    return memo(`b:${chunk}`, () => {
      const rng = rngFor(31, chunk);
      const n = 2 + Math.floor(rng() * 3);
      const list = [];
      for (let i = 0; i < n; i++) {
        list.push({
          x: 0.03 * width + rng() * 0.94 * width,
          y: chunk * CHUNK + rng() * CHUNK,
          size: 16 + rng() * 22,
          tone: pick(rng, ["cool", "cool", "white", "warm"]),
          spikes: rng() < 0.45,
          sp: 0.4 + rng() * 0.8,
          ph: rng() * Math.PI * 2,
        });
      }
      return list;
    });
  }

  function galaxiesFor(chunk) {
    return memo(`g:${chunk}`, () => {
      const rng = rngFor(41, chunk);
      const n = rng() < 0.6 ? 1 : 2;
      const list = [];
      for (let i = 0; i < n; i++) {
        list.push({
          x: rng() * width,
          y: chunk * CHUNK + rng() * CHUNK,
          rx: 4 + rng() * 7,
          ry: 1.5 + rng() * 2.5,
          rot: rng() * Math.PI,
          color: pick(rng, ["rgba(225,228,240,0.55)", "rgba(255,190,130,0.5)", "rgba(200,170,230,0.45)"]),
        });
      }
      return list;
    });
  }

  function visibleChunks(p, scrollY) {
    const offset = scrollY * p;
    const first = Math.max(0, Math.floor((offset - 40) / CHUNK));
    const last = Math.floor((offset + height + 40) / CHUNK);
    const list = [];
    for (let c = first; c <= last; c++) list.push(c);
    return { offset, list };
  }

  function drawStars(stars, offset, t) {
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const y = s.y - offset;
      if (y < -4 || y > height + 4) continue;
      let a = s.a;
      if (s.tw) a *= 1 - s.tw * 0.5 * (1 + Math.sin(t * s.sp + s.ph));
      ctx.globalAlpha = a;
      ctx.fillStyle = s.color;
      if (s.r < 0.9) {
        ctx.fillRect(s.x - s.r, y - s.r, s.r * 2, s.r * 2);
      } else {
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawShootingStars(t, dt) {
    if (!reducedMotion && t > nextShooting) {
      const fromLeft = Math.random() < 0.5;
      const angle = (fromLeft ? 0.35 : Math.PI - 0.35) + (Math.random() - 0.5) * 0.3;
      shooting.push({
        x: width * (fromLeft ? 0.05 + Math.random() * 0.5 : 0.45 + Math.random() * 0.5),
        y: height * Math.random() * 0.5,
        vx: Math.cos(angle) * 900,
        vy: Math.sin(angle) * 900,
        len: 120 + Math.random() * 110,
        life: 0,
        max: 0.8 + Math.random() * 0.4,
      });
      nextShooting = t + 6 + Math.random() * 9;
    }
    for (let i = shooting.length - 1; i >= 0; i--) {
      const s = shooting[i];
      s.life += dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (s.life > s.max) {
        shooting.splice(i, 1);
        continue;
      }
      const k = s.life / s.max;
      const alpha = Math.sin(k * Math.PI);
      const speed = Math.hypot(s.vx, s.vy);
      const tx = s.x - (s.vx / speed) * s.len;
      const ty = s.y - (s.vy / speed) * s.len;
      const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
      g.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
      g.addColorStop(0.2, `rgba(190,215,255,${0.45 * alpha})`);
      g.addColorStop(1, "rgba(150,190,255,0)");
      ctx.globalAlpha = 1;
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    }
  }

  let lastT = 0;

  function draw(t, scrollY) {
    const dt = Math.min(0.1, Math.max(0, t - lastT));
    lastT = t;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, width, height);

    // 1. far stars
    const far = STAR_LAYERS[0];
    let v = visibleChunks(far.p, scrollY);
    v.list.forEach((c) => drawStars(starsFor(far, c), v.offset, t));

    // 2. nebula + the dense star grain living inside it
    v = visibleChunks(NEBULA_PARALLAX, scrollY);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    v.list.forEach((c) => {
      const blobs = blobsNear(c);
      if (!blobs.length) return;
      const tile = memo(`n:${c}`, () => renderNebulaTile(c, width, blobs));
      ctx.globalAlpha = 1;
      ctx.drawImage(tile, 0, c * CHUNK - v.offset, tile.width * NEBULA_SCALE, tile.height * NEBULA_SCALE);
    });
    v.list.forEach((c) => drawStars(clusterStarsFor(c), v.offset, t));

    // 3. tiny distant galaxies
    v = visibleChunks(0.45, scrollY);
    v.list.forEach((c) =>
      galaxiesFor(c).forEach((g) => {
        const y = g.y - v.offset;
        if (y < -20 || y > height + 20) return;
        ctx.save();
        ctx.translate(g.x, y);
        ctx.rotate(g.rot);
        ctx.scale(1, g.ry / g.rx);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.rx);
        grad.addColorStop(0, g.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, g.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      })
    );

    // 4. mid + near stars
    [STAR_LAYERS[1], STAR_LAYERS[2]].forEach((layer) => {
      const vv = visibleChunks(layer.p, scrollY);
      vv.list.forEach((c) => drawStars(starsFor(layer, c), vv.offset, t));
    });

    // 5. bright stars with glow and diffraction spikes
    v = visibleChunks(0.8, scrollY);
    v.list.forEach((c) =>
      brightFor(c).forEach((b) => {
        const y = b.y - v.offset;
        if (y < -60 || y > height + 60) return;
        const pulse = 0.82 + 0.18 * Math.sin(t * b.sp + b.ph);
        const s = b.size * pulse;
        ctx.globalAlpha = 0.95;
        ctx.drawImage(sprites[b.tone].glow, b.x - s / 2, y - s / 2, s, s);
        if (b.spikes) {
          const ss = s * 2.4;
          ctx.globalAlpha = 0.55 + 0.35 * pulse - 0.3;
          ctx.drawImage(sprites[b.tone].spike, b.x - ss / 2, y - ss / 2, ss, ss);
        }
      })
    );

    // 6. occasional shooting star (screen space)
    drawShootingStars(t, dt);
    ctx.globalAlpha = 1;
  }

  // Builds the nebula for the chunk just below the viewport ahead of time,
  // so scrolling never has to wait for it. Returns true if it did any work.
  function prefetch(scrollY) {
    const next = Math.floor((scrollY * NEBULA_PARALLAX + height) / CHUNK) + 1;
    for (const c of [next - 1, next]) {
      if (cache.has(`n:${c}`)) continue;
      const blobs = blobsNear(c);
      memo(`n:${c}`, () => (blobs.length ? renderNebulaTile(c, width, blobs) : null));
      clusterStarsFor(c);
      return true;
    }
    return false;
  }

  function resize(w, h) {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (Math.round(w) !== Math.round(width)) {
      cache.clear();
      blobCache.clear();
    }
    width = w;
    height = h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  return { draw, resize, prefetch };
}
