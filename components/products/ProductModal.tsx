"use client";

import { useEffect, useRef } from "react";
import type { FundingProduct } from "@/lib/types";
import { fundingDisclaimer } from "@/lib/data/directory";

function money(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

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

  const eligibility = [
    product.minCreditScore != null ? `Minimum credit guide: ${product.minCreditScore}+` : null,
    product.minMonthlyRevenue != null ? `Monthly revenue guide: ${money(product.minMonthlyRevenue)}+` : null,
    product.minMonthlyRevenueNote ? `Revenue note: ${product.minMonthlyRevenueNote}` : null,
    product.minTimeInBusinessMonths != null ? `Time in business guide: ${product.minTimeInBusinessMonths}+ months` : null,
    product.qualificationProfile ? `Typical qualification profile: ${product.qualificationProfile}` : null
  ].filter(Boolean) as string[];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 md:items-center" role="presentation">
      <div
        className="w-full max-w-4xl rounded-2xl bg-card shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        tabIndex={-1}
        ref={ref}
      >
        <div className="flex items-start justify-between gap-3 border-b p-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-primary">
              {product.providerInitials}
            </div>
            <div>
              <div className="text-sm font-semibold">{product.providerName}</div>
              <h2 className="mt-1 text-2xl font-semibold">{product.name}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{product.fundingType}</span>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs text-primary">{product.productFamilyName}</span>
                {product.startupEligible && <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">Startup eligible</span>}
              </div>
            </div>
          </div>
          <button className="rounded-xl border px-3 py-2 text-sm hover:border-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="max-h-[72vh] overflow-auto p-5">
          <p className="text-slate-700">{product.description}</p>

          <h3 className="mt-6 text-lg font-semibold">Overview</h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Amount", `${money(product.amountMin)}–${money(product.amountMax)}`],
              ["Time to funding", product.timeToFunding || "Varies"],
              ["Term", product.termLength || "Varies"],
              ["Payment", product.paymentType || "Varies"],
              ["Cost / rate", product.rateCostRange || "Varies"],
              ["Minimum credit", product.minCreditScore != null ? `${product.minCreditScore}+` : "Not stated"],
              ["Monthly revenue", product.minMonthlyRevenue != null ? `${money(product.minMonthlyRevenue)}+` : "Not stated"],
              ["Time in business", product.minTimeInBusinessMonths != null ? `${product.minTimeInBusinessMonths}+ months` : "Not stated"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs text-slate-500">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>

          {eligibility.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Eligibility & qualification</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {eligibility.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {product.bestFor.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Common use cases</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.bestFor.map((x) => (
                  <span key={x} className="rounded-full border bg-white px-3 py-1 text-sm">
                    {x}
                  </span>
                ))}
              </div>
            </>
          )}

          {product.industries.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Provider industry appetite</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.industries.slice(0, 12).map((x) => (
                  <span key={x} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                    {x}
                  </span>
                ))}
              </div>
            </>
          )}

          {product.requiredDocuments.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Typical documents</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
                {product.requiredDocuments.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </>
          )}

          {product.disqualifiers.length > 0 && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Common disqualifiers</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
                {product.disqualifiers.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </>
          )}

          <div className="mt-6 rounded-xl border bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
            {fundingDisclaimer}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t p-5">
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary"
            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/products?open=${product.id}`)}
          >
            Copy Share Link
          </button>
          <a
            href={`/r/${product.id}`}
            className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {product.ctaLabel || "Apply Now"}
          </a>
        </div>
      </div>
    </div>
  );
}
