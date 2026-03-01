"use client";

import { useEffect, useRef } from "react";
import { FundingProduct } from "@/lib/types";
import { RatingStars } from "./RatingStars";

export function ProductModal({
  product,
  open,
  onClose
}: {
  product: FundingProduct | null;
  open: boolean;
  onClose: () => void;
}) {
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

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 md:items-center" role="presentation">
      <div
        className="w-full max-w-3xl rounded-2xl bg-card shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        tabIndex={-1}
        ref={ref}
      >
        <div className="flex items-start justify-between gap-3 border-b p-5">
          <div>
            <div className="text-sm font-semibold">{product.providerName}</div>
            <h2 className="mt-1 text-2xl font-semibold">{product.name}</h2>
            <div className="mt-2 flex items-center gap-2">
              <RatingStars value={product.rating} />
              <span className="text-sm text-slate-600">{product.rating.toFixed(1)} ({product.reviewsCount})</span>
            </div>
          </div>
          <button className="rounded-xl border px-3 py-2 text-sm hover:border-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-5">
          <p className="text-slate-700">{product.tagline}</p>

          <h3 className="mt-6 text-lg font-semibold">Eligibility</h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
            {product.eligibility.map((e) => <li key={e}>{e}</li>)}
          </ul>

          <h3 className="mt-6 text-lg font-semibold">Application Process</h3>
          <ol className="mt-2 space-y-2">
            {product.processSteps.map((s, idx) => (
              <li key={s.title} className="rounded-xl bg-slate-50 p-3">
                <div className="text-sm font-semibold">{idx + 1}. {s.title}</div>
                <div className="text-sm text-slate-600">{s.detail}</div>
              </li>
            ))}
          </ol>

          <h3 className="mt-6 text-lg font-semibold">Reviews</h3>
          <div className="mt-2 space-y-3">
            {product.testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border p-3">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-sm text-slate-600">“{t.quote}”</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t p-5">
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Share Link
          </button>
          <a href={`/r/${product.id}`} className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
