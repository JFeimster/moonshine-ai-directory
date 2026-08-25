"use client";

import type { FundingProduct } from "@/lib/types";

function money(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function CompareMatrix({ items }: { items: FundingProduct[] }) {
  const fields: { label: string; get: (p: FundingProduct) => string }[] = [
    { label: "Provider", get: (p) => p.providerName },
    { label: "Funding Type", get: (p) => p.fundingType },
    { label: "Product Family", get: (p) => p.productFamilyName },
    { label: "Amount", get: (p) => `${money(p.amountMin)}–${money(p.amountMax)}` },
    { label: "Time to Funding", get: (p) => p.timeToFunding || "Varies" },
    { label: "Min Credit", get: (p) => p.minCreditScore != null ? `${p.minCreditScore}+` : "Not stated" },
    { label: "Monthly Revenue", get: (p) => p.minMonthlyRevenue != null ? `${money(p.minMonthlyRevenue)}+` : "Not stated" },
    { label: "Time in Business", get: (p) => p.minTimeInBusinessMonths != null ? `${p.minTimeInBusinessMonths}+ months` : "Not stated" },
    { label: "Term", get: (p) => p.termLength || "Varies" },
    { label: "Payment", get: (p) => p.paymentType || "Varies" },
    { label: "Cost / Rate", get: (p) => p.rateCostRange || "Varies" },
    { label: "Startup Eligible", get: (p) => p.startupEligible ? "Yes" : "No / not stated" }
  ];

  if (items.length === 0) return <div className="text-sm text-slate-600">Select products to compare.</div>;

  return (
    <div className="overflow-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 border-b bg-card p-3 text-left text-sm font-semibold">Feature</th>
            {items.map((p) => (
              <th key={p.id} className="border-b p-3 text-left text-sm font-semibold">
                {p.name}
                <div className="mt-2">
                  <a className="inline-block rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:opacity-90" href={`/r/${p.id}`}>
                    {p.ctaLabel || "Apply Now"}
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
        </tbody>
      </table>
    </div>
  );
}
