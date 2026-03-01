import { resources } from "@/lib/data/resources";

export function ResourcesSection() {
  const top = resources.slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 4);
  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Resources</h2>
          <p className="mt-1 text-sm text-slate-600">Practical education so users apply once—and get funded.</p>
        </div>
        <a className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary" href="/resources">
          View all
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {top.map((r) => (
          <article key={r.slug} className="rounded-2xl border bg-white p-4">
            <h3 className="text-sm font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{r.excerpt}</p>
            <a className="mt-3 inline-block text-sm font-medium text-secondary hover:underline" href={`/resources/${r.slug}`}>
              Read more →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
