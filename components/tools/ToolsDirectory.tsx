"use client";

import { useMemo, useState } from "react";
import { tools } from "@/lib/data/directory";

type Tab = "live" | "concept";

function cleanProblem(value: string | null) {
  if (!value) return "Funding workflow helper.";
  return value.replace(/\s+\d+(?:,\s*\d+)*\.?$/g, "").trim();
}

export function ToolsDirectory() {
  const [tab, setTab] = useState<Tab>("live");
  const [q, setQ] = useState("");
  const [assetType, setAssetType] = useState("all");

  const liveCount = tools.filter((t) => t.buildState === "live" && t.liveUrl).length;
  const conceptCount = tools.filter((t) => t.buildState !== "live").length;

  const assetTypes = useMemo(
    () => Array.from(new Set(tools.map((t) => t.assetType))).sort(),
    []
  );

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();

    return tools
      .filter((t) => (tab === "live" ? t.buildState === "live" && t.liveUrl : t.buildState !== "live"))
      .filter((t) => assetType === "all" || t.assetType === assetType)
      .filter((t) => {
        if (!query) return true;
        return [t.name, t.persona, t.problem, t.outputArtifact, t.brand]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      });
  }, [tab, q, assetType]);

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-soft md:flex-row md:items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("live")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${tab === "live" ? "bg-primary text-white" : "border bg-white"}`}
          >
            Available ({liveCount})
          </button>
          <button
            onClick={() => setTab("concept")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${tab === "concept" ? "bg-primary text-white" : "border bg-white"}`}
          >
            Coming Soon ({conceptCount})
          </button>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search calculators, estimators, scorecards..."
          className="min-w-0 flex-1 rounded-xl border bg-white px-4 py-2 text-sm"
        />

        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="rounded-xl border bg-white px-3 py-2 text-sm"
        >
          <option value="all">All tool types</option>
          {assetTypes.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((tool) => (
          <article key={tool.slug} className="flex h-full flex-col rounded-2xl bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-primary">{tool.assetType}</span>
              <span className={`rounded-full px-3 py-1 text-xs ${tool.buildState === "live" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                {tool.buildState === "live" ? "Available" : "Coming soon"}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold">{tool.name}</h2>

            {tool.persona && (
              <div className="mt-3 text-xs text-slate-500">
                Built for <span className="font-medium text-slate-800">{tool.persona}</span>
              </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-slate-600">{cleanProblem(tool.problem)}</p>

            {tool.outputArtifact && (
              <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                <span className="font-medium text-slate-900">Output:</span> {tool.outputArtifact}
              </div>
            )}

            <div className="mt-auto pt-5">
              {tool.buildState === "live" && tool.liveUrl ? (
                <a
                  href={tool.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-secondary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
                >
                  Launch Tool ↗
                </a>
              ) : (
                <button disabled className="w-full rounded-xl border bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500">
                  Coming Soon
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
