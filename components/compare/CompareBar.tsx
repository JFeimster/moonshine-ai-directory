"use client";

import { useState } from "react";
import { useCompare } from "./useCompare";
import { CompareDrawer } from "./CompareDrawer";

export function CompareBar() {
  const compare = useCompare();
  const [open, setOpen] = useState(false);

  if (compare.items.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="text-sm font-semibold">Compare Products</div>
            <div className="text-xs text-slate-600">Selected {compare.items.length}/3</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {compare.items.map((p) => (
              <span key={p.id} className="rounded-full border px-3 py-1 text-xs">
                {p.name}
                <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => compare.toggle(p)} aria-label={`Remove ${p.name}`}>
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl border px-4 py-2 text-sm hover:border-secondary" onClick={compare.clear}>
              Clear
            </button>
            <button className="rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white hover:opacity-90" onClick={() => setOpen(true)}>
              Compare Now
            </button>
          </div>
        </div>
      </div>

      <CompareDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
