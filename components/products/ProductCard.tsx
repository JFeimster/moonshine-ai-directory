"use client";

import type { FundingProduct } from "@/lib/types";

function money(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function ProductCard({
  product,
  onLearnMore,
  onToggleCompare,
  isCompared
}: {
  product: FundingProduct;
  onLearnMore: () => void;
  onToggleCompare: () => void;
  isCompared: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-primary">
            {product.providerInitials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{product.providerName}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">{product.fundingType}</span>
              <span className="rounded-full bg-violet-50 px-2 py-1 text-[11px] text-primary">{product.productFamilyName}</span>
            </div>
          </div>
        </div>

        <button
          className="rounded-lg border px-3 py-1 text-xs hover:border-secondary"
          onClick={onToggleCompare}
          aria-pressed={isCompared}
        >
          {isCompared ? "Selected" : "Compare"}
        </button>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug">{product.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-[40px] text-sm text-slate-600">{product.description}</p>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Amount</dt>
          <dd className="mt-1 font-medium text-slate-900">{money(product.amountMin)}–{money(product.amountMax)}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Speed</dt>
          <dd className="mt-1 font-medium text-slate-900">{product.timeToFunding || "Varies"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Min Credit</dt>
          <dd className="mt-1 font-medium text-slate-900">{product.minCreditScore != null ? `${product.minCreditScore}+` : "Not stated"}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-2 text-xs text-slate-600">
        {product.minMonthlyRevenue != null && (
          <div className="flex items-center justify-between gap-3">
            <span>Revenue guide</span>
            <span className="font-medium text-slate-900">{money(product.minMonthlyRevenue)}/mo</span>
          </div>
        )}
        {product.minTimeInBusinessMonths != null && (
          <div className="flex items-center justify-between gap-3">
            <span>Time in business</span>
            <span className="font-medium text-slate-900">{product.minTimeInBusinessMonths} mo+</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-5">
        <div className="flex gap-2">
          <button
            onClick={onLearnMore}
            className="flex-1 rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary"
          >
            Learn More
          </button>
          <a
            href={`/r/${product.id}`}
            className="flex-1 rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
          >
            {product.ctaLabel || "Apply Now"}
          </a>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
          <button
            className="rounded-lg px-2 py-2 hover:bg-slate-50"
            onClick={() => alert("Saving products can be added later with an account layer.")}
            aria-label="Save product"
          >
            ♥ Save
          </button>
          <button
            className="rounded-lg px-2 py-2 hover:bg-slate-50"
            onClick={() => navigator.clipboard.writeText(`${location.origin}/products?open=${product.id}`)}
          >
            Share
          </button>
        </div>
      </div>
    </article>
  );
}
