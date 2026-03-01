"use client";

import { useEffect, useRef } from "react";
import { useCompare } from "./useCompare";
import { CompareMatrix } from "./CompareMatrix";

export function CompareDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const compare = useCompare();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 p-4" role="presentation">
      <div
        className="mx-auto max-w-6xl rounded-2xl bg-card shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label="Compare products"
        tabIndex={-1}
        ref={ref}
      >
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <div className="text-lg font-semibold">Side-by-side Comparison</div>
            <div className="text-sm text-slate-600">Pick the winner based on speed, credit, and limits.</div>
          </div>
          <button className="rounded-xl border px-3 py-2 text-sm hover:border-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="p-5">
          <CompareMatrix items={compare.items} />
        </div>
      </div>
    </div>
  );
}
