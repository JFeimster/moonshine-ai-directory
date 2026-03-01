"use client";

import { FundingProduct } from "@/lib/types";
import { RatingStars } from "./RatingStars";
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
    <article className="rounded-2xl bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100" aria-hidden="true" />
          <div>
            <div className="text-sm font-semibold">{product.providerName}</div>
            <div className="flex items-center gap-2">
              <RatingStars value={product.rating} />
              <span className="text-xs text-slate-600">
                {product.rating.toFixed(1)} ({product.reviewsCount})
              </span>
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

      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-600">{product.tagline}</p>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Amount</dt>
          <dd className="font-medium text-slate-900">
            ${Math.round(product.amountMin / 1000)}k–${Math.round(product.amountMax / 1000)}k
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Speed</dt>
          <dd className="font-medium text-slate-900">{product.timeToFund}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <dt className="text-slate-500">Min Credit</dt>
          <dd className="font-medium text-slate-900">{product.minCreditScore}+</dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-2 text-sm">
        {product.features.slice(0, 4).map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onLearnMore}
          className="flex-1 rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary"
        >
          Learn More
        </button>
        <a
          href={`/r/${product.id}`}className="flex-1 rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
        >
          Apply Now
        </a>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <button
          className="rounded-lg px-2 py-2 hover:bg-slate-50"
          onClick={() => alert("Saving requires an account. Wire this to auth + DB.")}
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
    </article>
  );
}
