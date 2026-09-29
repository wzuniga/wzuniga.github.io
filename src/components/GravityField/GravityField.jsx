import React, { useEffect, useRef, useState } from "react";
import "./GravityField.scss";
import { createGravitySim } from "./gravitySim";
import { useLanguage } from "../../i18n/LanguageContext";

const DESKTOP = "(min-width: 992px) and (pointer: fine)";

const icons = {
  asteroid: (
    <>
      <circle cx="16" cy="8" r="3.2" />
      <path d="M13.5 10.5 4 20M11 8.5 5 14.5M15.5 13 9.5 19" />
    </>
  ),
  shower: <path d="M20 4 12 12M16 3l-6 6M21 8l-6 6M12 12l-5 5M10 17l-4 4M15 14l-4 4" />,
  comet: (
    <>
      <circle cx="17" cy="7" r="2.6" />
      <path d="M15 9.5C11 13 7 16 3 21M14 8C10 9.5 6 11 3 14M19 10C18 14 16 18 13 21" />
    </>
  ),
  trails: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-20 12 12)" strokeDasharray="2 2.5" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4h4" />
    </>
  ),
};

const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {icons[name]}
  </svg>
);

// Gravity simulation that fills the hero section. It is dimmed while the
// greeting is centered and takes over once the greeting has moved up.
function GravityField({ lifted }) {
  const { t } = useLanguage();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const simRef = useRef(null);
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP).matches);
  const [inView, setInView] = useState(true);
  const [guides, setGuides] = useState(true);
  const [count, setCount] = useState(0);
  const reducedMotion = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches).current;

  useEffect(() => {
    const wrap = wrapRef.current;
    const sim = createGravitySim(canvasRef.current, { reducedMotion });
    simRef.current = sim;

    const resize = () => sim.resize(wrap.clientWidth, wrap.clientHeight);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // only simulate while the hero is on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setInView(visible);
    });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let lastCount = -1;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1000;
      last = now;
      if (document.hidden || !visible) return;
      sim.tick(dt, now / 1000);
      const c = sim.count();
      if (c !== lastCount) {
        lastCount = c;
        setCount(c);
      }
    };
    if (!reducedMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleGuides = () => {
    simRef.current.setGuides(!guides);
    setGuides(!guides);
  };

  const actions = [
    { key: "asteroid", run: () => simRef.current.launchAsteroid() },
    { key: "shower", run: () => simRef.current.launchShower() },
    { key: "comet", run: () => simRef.current.launchComet() },
  ];

  const showPanel = desktop && !reducedMotion;
  const panelOpen = lifted && inView;

  return (
    <>
      <div ref={wrapRef} className={`gravity ${lifted ? "is-active" : ""}`} aria-hidden="true">
        <canvas ref={canvasRef} className="gravity__canvas" />
      </div>

      {showPanel && (
        <aside className={`gravity-panel ${panelOpen ? "is-open" : ""}`} aria-label={t("gravity.label")} aria-hidden={!panelOpen}>
          <span className="gravity-panel__title">{t("gravity.title")}</span>
          {actions.map(({ key, run }) => (
            <button key={key} type="button" className="gravity-panel__btn" onClick={run} data-tip={t(`gravity.${key}`)} tabIndex={panelOpen ? 0 : -1}>
              <Icon name={key} />
              <span className="visually-hidden">{t(`gravity.${key}`)}</span>
            </button>
          ))}
          <span className="gravity-panel__sep" />
          <button
            type="button"
            className="gravity-panel__btn"
            aria-pressed={guides}
            onClick={toggleGuides}
            data-tip={t("gravity.trails")}
            tabIndex={panelOpen ? 0 : -1}
          >
            <Icon name="trails" />
            <span className="visually-hidden">{t("gravity.trails")}</span>
          </button>
          <button
            type="button"
            className="gravity-panel__btn"
            onClick={() => simRef.current.reset()}
            data-tip={t("gravity.reset")}
            tabIndex={panelOpen ? 0 : -1}
          >
            <Icon name="reset" />
            <span className="visually-hidden">{t("gravity.reset")}</span>
          </button>
          <span className="gravity-panel__count" title={t("gravity.inFlight")}>
            {count}
          </span>
        </aside>
      )}
    </>
  );
}

export default GravityField;
