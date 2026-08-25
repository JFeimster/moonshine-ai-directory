import type { Filters } from "@/lib/types";

export const DEFAULT_FILTERS: Filters = {
  q: "",
  familyIds: [],
  fundingTypes: [],
  amountBands: [],
  speedBands: [],
  creditBands: [],
  revenueBands: [],
  timeBands: [],
  startupOnly: false,
  sort: "relevance",
  page: 1
};

function getAll(sp: URLSearchParams, key: string) {
  return sp.getAll(key).filter(Boolean);
}

export function filtersFromSearchParams(sp: URLSearchParams): Filters {
  return {
    q: sp.get("q") ?? "",
    familyIds: getAll(sp, "family"),
    fundingTypes: getAll(sp, "type"),
    amountBands: getAll(sp, "amt"),
    speedBands: getAll(sp, "speed"),
    creditBands: getAll(sp, "credit"),
    revenueBands: getAll(sp, "revenue"),
    timeBands: getAll(sp, "tib"),
    startupOnly: sp.get("startup") === "1",
    sort: (["relevance", "speed", "amount", "credit"].includes(sp.get("sort") || "")
      ? sp.get("sort")
      : "relevance") as Filters["sort"],
    page: Math.max(1, Number(sp.get("page") ?? "1") || 1)
  };
}

function setArrayParam(sp: URLSearchParams, key: string, values: string[]) {
  sp.delete(key);
  values.forEach((v) => sp.append(key, v));
}

export function filtersToSearchParams(f: Filters, providerId?: string | null) {
  const sp = new URLSearchParams();

  if (f.q) sp.set("q", f.q);
  setArrayParam(sp, "family", f.familyIds);
  setArrayParam(sp, "type", f.fundingTypes);
  setArrayParam(sp, "amt", f.amountBands);
  setArrayParam(sp, "speed", f.speedBands);
  setArrayParam(sp, "credit", f.creditBands);
  setArrayParam(sp, "revenue", f.revenueBands);
  setArrayParam(sp, "tib", f.timeBands);

  if (f.startupOnly) sp.set("startup", "1");
  if (f.sort !== "relevance") sp.set("sort", f.sort);
  if (f.page !== 1) sp.set("page", String(f.page));
  if (providerId) sp.set("provider", providerId);

  return sp;
}
