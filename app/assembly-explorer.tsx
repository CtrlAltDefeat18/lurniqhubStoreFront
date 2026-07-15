"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const layerDetails = {
  solar: {
    number: "01",
    label: "Solar + battery module",
    summary: "A weatherproof solar input charges an onboard battery pack, keeping the unit powered when grid electricity is intermittent or unavailable.",
    points: ["Solar-ready 12V input", "Onboard battery buffer", "Runs independent of grid power"],
  },
  mesh: {
    number: "02",
    label: "Raspberry Pi compute + radio",
    summary: "The board pairs Raspberry Pi compute with a mesh radio, letting one unit act as controller, router or end node depending on where it sits in the classroom.",
    points: ["Single-board compute", "Onboard mesh radio", "Controller, router or end-node role"],
  },
  content: {
    number: "03",
    label: "Rugged case + storage",
    summary: "A sealed, field-rated case protects the electronics, with onboard storage holding the STCW-aligned course library for offline access.",
    points: ["Dust- and knock-resistant shell", "Onboard SD/SSD storage", "Course content stays on-device"],
  },
} as const;

type LayerKey = keyof typeof layerDetails;

export default function AssemblyExplorer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState<LayerKey>("solar");
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const active = layerDetails[activeLayer];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])") ?? []);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} className="explore-button" type="button" onClick={() => setOpen(true)}>
        Explore the modular architecture <span aria-hidden="true">+</span>
      </button>
      {open && (
        <div className="explorer-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section ref={dialogRef} className="explorer-dialog" role="dialog" aria-modal="true" aria-labelledby="explorer-title" data-active-layer={activeLayer}>
            <header className="explorer-header">
              <div><p className="eyebrow">Interactive system drawing</p><h2 id="explorer-title">Explore the modular architecture</h2></div>
              <button ref={closeRef} className="explorer-close" type="button" onClick={() => setOpen(false)} aria-label="Close architecture explorer">Close</button>
            </header>
            <div className="explorer-body">
              <div className="explorer-figure" onClick={(event) => {
                const layer = (event.target as Element).closest<SVGGElement>("[data-layer]")?.dataset.layer as LayerKey | undefined;
                if (layer && layer in layerDetails) setActiveLayer(layer);
              }}>{children}</div>
              <div className="explorer-controls">
                <p className="explorer-instruction">Select a layer to isolate it and read the deployment detail.</p>
                <div className="layer-tabs" role="tablist" aria-label="Architecture layers">
                  {(Object.keys(layerDetails) as LayerKey[]).map((key) => (
                    <button key={key} type="button" role="tab" aria-selected={activeLayer === key} aria-controls="layer-detail" onClick={() => setActiveLayer(key)}>
                      <span>{layerDetails[key].number}</span>{layerDetails[key].label}
                    </button>
                  ))}
                </div>
                <article id="layer-detail" role="tabpanel" aria-live="polite">
                  <p className="eyebrow">Layer {active.number}</p>
                  <h3>{active.label}</h3>
                  <p>{active.summary}</p>
                  <ul>{active.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </article>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
