"use client";

export function FilterGroup({
  title,
  options,
  selected,
  counts,
  labels,
  onChange
}: {
  title: string;
  options: string[];
  selected: string[];
  counts: Map<string, number>;
  labels?: Map<string, string>;
  onChange: (next: string[]) => void;
}) {
  function toggle(v: string) {
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  }

  return (
    <fieldset className="rounded-xl border p-3">
      <legend className="px-1 text-sm font-semibold">{title}</legend>
      <div className="mt-2 space-y-1">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(o)}
                onChange={() => toggle(o)}
                className="h-4 w-4"
              />
              <span className="text-sm">{labels?.get(o) ?? o}</span>
            </span>
            <span className="text-xs text-slate-500">{counts.get(o) ?? 0}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
