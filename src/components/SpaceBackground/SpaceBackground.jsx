import React, { useEffect, useRef } from "react";
import "./SpaceBackground.scss";
import { createSpaceRenderer } from "./spaceRenderer";

const FRAME_MS = 1000 / 30; // twinkling does not need 60 fps

function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = createSpaceRenderer(canvas, { reducedMotion });

    let raf = 0;
    let last = 0;
    let dirty = true;
    const start = performance.now();

    const render = (now) => renderer.draw((now - start) / 1000, window.scrollY);

    const onResize = () => {
      renderer.resize(window.innerWidth, window.innerHeight);
      dirty = true;
      if (reducedMotion) render(performance.now());
    };

    // Pre-build upcoming nebula chunks while the browser is idle.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    let idleId = 0;
    const schedulePrefetch = () => {
      if (idleId) return;
      idleId = idle(() => {
        idleId = 0;
        if (renderer.prefetch(window.scrollY)) schedulePrefetch();
      });
    };

    const onScroll = () => {
      dirty = true;
      schedulePrefetch();
      if (reducedMotion) render(performance.now());
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (!dirty && now - last < FRAME_MS) return;
      last = now;
      dirty = false;
      render(now);
    };

    onResize();
    schedulePrefetch();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reducedMotion) render(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      cancelIdle(idleId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="space" aria-hidden="true">
      <canvas ref={canvasRef} className="space__canvas" />
    </div>
  );
}

export default SpaceBackground;
