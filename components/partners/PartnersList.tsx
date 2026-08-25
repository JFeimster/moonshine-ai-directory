import { partners } from "@/lib/data/directory";

function money(value: number | null) {
  if (value == null) return null;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function PartnersList() {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <div>
        <h2 className="text-xl font-semibold">All Funding Partners</h2>
        <p className="mt-1 text-sm text-slate-600">
          Browse partners by product focus, industries, and typical qualification profile.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((p) => (
          <article key={p.id} className="flex h-full flex-col rounded-2xl border bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-primary">
                {p.initials}
              </div>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 line-clamp-3 text-sm text-slate-600">{p.specialization}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Funding focus</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.productFamilyNames.slice(0, 4).map((x) => (
                  <span key={x} className="rounded-full bg-slate-100 px-2 py-1 text-[11px]">{x}</span>
                ))}
              </div>
            </div>

            {p.industries.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Best fit industries</div>
                <div className="mt-2 text-sm text-slate-700">{p.industries.slice(0, 5).join(" · ")}</div>
              </div>
            )}

            <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">Min credit</dt>
                <dd className="mt-1 font-medium text-slate-900">{p.minCreditScore != null ? `${p.minCreditScore}+` : "Varies"}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">Revenue</dt>
                <dd className="mt-1 font-medium text-slate-900">{p.minMonthlyRevenue != null ? `${money(p.minMonthlyRevenue)}/mo` : "Varies"}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">Products</dt>
                <dd className="mt-1 font-medium text-slate-900">{p.productCount}</dd>
              </div>
            </dl>

            {p.qualificationProfile && (
              <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                <span className="font-medium text-slate-900">Typical qualification profile:</span>{" "}
                {p.qualificationProfile}
              </div>
            )}

            <div className="mt-auto pt-4">
              <a className="block rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90" href={p.directoryLink}>
                View {p.productCount || ""} products
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
