"use client";

import { FundingProduct } from "@/lib/types";

export function CompareMatrix({ items }: { items: FundingProduct[] }) {
  const fields: { label: string; get: (p: FundingProduct) => string }[] = [
    { label: "Provider", get: (p) => p.providerName },
    { label: "Product Type", get: (p) => p.productType },
    { label: "Amount", get: (p) => `$${Math.round(p.amountMin / 1000)}k–$${Math.round(p.amountMax / 1000)}k` },
    { label: "Time to Fund", get: (p) => p.timeToFund },
    { label: "Min Credit", get: (p) => `${p.minCreditScore}+` }
  ];

  if (items.length === 0) return <div className="text-sm text-slate-600">Select products to compare.</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-[720px] w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 border-b bg-card p-3 text-left text-sm font-semibold">Feature</th>
            {items.map((p) => (
              <th key={p.id} className="border-b p-3 text-left text-sm font-semibold">
                {p.name}
                <div className="mt-2">
                  <a className="inline-block rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:opacity-90" href={`/r/${p.id}`}>
                    Apply Now
                  </a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((row) => (
            <tr key={row.label}>
              <td className="sticky left-0 z-10 border-b bg-card p-3 text-sm font-medium">{row.label}</td>
              {items.map((p) => (
                <td key={p.id + row.label} className="border-b p-3 text-sm text-slate-700">
                  {row.get(p)}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td className="sticky left-0 z-10 border-b bg-card p-3 text-sm font-medium">Top Features</td>
            {items.map((p) => (
              <td key={p.id + "features"} className="border-b p-3 text-sm text-slate-700">
                <ul className="list-disc space-y-1 pl-5">
                  {p.features.slice(0, 6).map((f) => <li key={f}>{f}</li>)}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
