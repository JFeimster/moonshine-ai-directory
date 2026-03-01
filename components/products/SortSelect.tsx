"use client";

export function SortSelect({
  value,
  onChange
}: {
  value: "relevance" | "speed" | "amount" | "rating";
  onChange: (v: "relevance" | "speed" | "amount" | "rating") => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-slate-600">Sort</span>
      <select
        className="rounded-xl border bg-white px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
        aria-label="Sort products"
      >
        <option value="relevance">Relevance</option>
        <option value="speed">Speed</option>
        <option value="amount">Amount</option>
        <option value="rating">Rating</option>
      </select>
    </label>
  );
}
