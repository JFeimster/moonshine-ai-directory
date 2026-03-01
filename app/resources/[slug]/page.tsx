import { Header } from "@/components/header/Header";
import { resources } from "@/lib/data/resources";
import { notFound } from "next/navigation";

export default function ResourcePostPage({ params }: { params: { slug: string } }) {
  const post = resources.find((r) => r.slug === params.slug);
  if (!post) return notFound();

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24">
        <nav className="pt-6 text-sm text-slate-600" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a className="hover:text-slate-900" href="/">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a className="hover:text-slate-900" href="/resources">Resources</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900">{post.title}</li>
          </ol>
        </nav>

        <article className="mt-6 rounded-2xl bg-card p-6 shadow-soft md:p-10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border bg-white px-3 py-1 text-xs">
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-slate-600">{post.excerpt}</p>
          <div className="mt-4 text-xs text-slate-500">
            {new Date(post.publishedAt).toLocaleDateString()} • {post.readingTime}
          </div>

          <div className="prose prose-slate mt-8 max-w-none">
            {post.body.map((b, idx) => {
              if (b.type === "h2") return <h2 key={idx}>{b.content as string}</h2>;
              if (b.type === "p") return <p key={idx}>{b.content as string}</p>;
              if (b.type === "ul") return (
                <ul key={idx}>
                  {(b.content as string[]).map((x) => <li key={x}>{x}</li>)}
                </ul>
              );
              return null;
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <a className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary" href="/resources">
              ← Back to resources
            </a>
            <a className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90" href="/products">
              Browse funding products
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
