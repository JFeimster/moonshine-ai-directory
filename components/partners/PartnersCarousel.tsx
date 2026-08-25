import { featuredPartners } from "@/lib/data/directory";

function money(value: number | null) {
  if (value == null) return null;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function PartnersCarousel() {
  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {featuredPartners.map((p) => (
          <a
            key={p.id}
            href={p.directoryLink}
            className="min-w-[300px] snap-start rounded-2xl border bg-white p-4 hover:border-secondary"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-primary">
                {p.initials}
              </div>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 line-clamp-2 text-xs text-slate-600">{p.specialization}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.productFamilyNames.slice(0, 3).map((x) => (
                <span key={x} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">{x}</span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Products</div>
                <div className="font-medium text-slate-900">{p.productCount}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Min Credit</div>
                <div className="font-medium text-slate-900">{p.minCreditScore != null ? `${p.minCreditScore}+` : "Varies"}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Revenue</div>
                <div className="font-medium text-slate-900">{p.minMonthlyRevenue != null ? `${money(p.minMonthlyRevenue)}/mo` : "Varies"}</div>
              </div>
            </div>

            <div className="mt-4 inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white">
              View products →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
