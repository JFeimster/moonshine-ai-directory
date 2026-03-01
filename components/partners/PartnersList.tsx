import { partners } from "@/lib/data/partners";

export function PartnersList() {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <div>
        <h2 className="text-xl font-semibold">All Partners</h2>
        <p className="mt-1 text-sm text-slate-600">Full directory with specializations and constraints.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((p) => (
          <div key={p.id} className="rounded-2xl border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-slate-600">{p.specialization}</div>
              </div>
              <a className="rounded-xl border px-3 py-2 text-xs hover:border-secondary" href={p.link}>
                View products
              </a>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Speed</div>
                <div className="font-medium text-slate-900">{p.speed}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Min credit</div>
                <div className="font-medium text-slate-900">{p.minCredit}+</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Types</div>
                <div className="font-medium text-slate-900">{p.productTypes.join(", ")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
