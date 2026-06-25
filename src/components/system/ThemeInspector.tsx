"use client";

import { useEffect, useMemo, useState } from "react";

const breakpoints = [
  { name: "Mobile", min: 0 },
  { name: "Tablet", min: 768 },
  { name: "Desktop", min: 1024 }
];

export function ThemeInspector() {
  const [width, setWidth] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showSpacing, setShowSpacing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.dsReducedMotion = reducedMotion ? "true" : "false";
    document.documentElement.style.setProperty("--ds-motion-speed", String(speed));
  }, [reducedMotion, speed]);

  const breakpoint = useMemo(() => {
    return [...breakpoints].reverse().find((item) => width >= item.min)?.name ?? "Mobile";
  }, [width]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <>
      {showGrid ? (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] mx-auto hidden h-dvh max-w-[1200px] grid-cols-12 gap-6 px-8 lg:grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-focus/10" />
          ))}
        </div>
      ) : null}
      {showSpacing ? (
        <div className="pointer-events-none fixed inset-0 z-[91] bg-[linear-gradient(to_bottom,rgba(77,111,114,0.13)_1px,transparent_1px)] bg-[length:100%_8px]" />
      ) : null}
      <aside className="fixed bottom-4 right-4 z-[100] w-[min(92vw,22rem)] rounded-md border border-border bg-surface p-4 text-small text-text shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption uppercase text-text-muted">Theme inspector</p>
            <h2 className="mt-1 font-display text-2xl">Dev only</h2>
          </div>
          <span className="rounded-sm bg-surface-muted px-2 py-1 text-caption text-text-muted">{breakpoint}</span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-caption">
          <div>
            <dt className="text-text-muted">Viewport</dt>
            <dd>{width}px</dd>
          </div>
          <div>
            <dt className="text-text-muted">Container</dt>
            <dd>1200px max</dd>
          </div>
          <div>
            <dt className="text-text-muted">Type token</dt>
            <dd>responsive clamp</dd>
          </div>
          <div>
            <dt className="text-text-muted">Colour token</dt>
            <dd>CSS variable</dd>
          </div>
        </dl>
        <div className="mt-4 grid gap-2">
          <label className="flex items-center justify-between gap-4">
            <span>Grid overlay</span>
            <input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Spacing overlay</span>
            <input type="checkbox" checked={showSpacing} onChange={(event) => setShowSpacing(event.target.checked)} />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Reduced motion</span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(event) => setReducedMotion(event.target.checked)}
            />
          </label>
          <label className="grid gap-1">
            <span>Animation speed {speed}x</span>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
          </label>
        </div>
      </aside>
    </>
  );
}

