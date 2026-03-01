import { Filters } from "@/lib/types";

export const DEFAULT_FILTERS: Filters = {
  q: "",
  productTypes: [],
  amountRanges: [],
  times: [],
  creditTiers: [],
  industries: [],
  sort: "relevance",
  page: 1
};

function getAll(sp: URLSearchParams, key: string) {
  return sp.getAll(key).filter(Boolean);
}

export function filtersFromSearchParams(sp: URLSearchParams): Filters {
  return {
    q: sp.get("q") ?? "",
    productTypes: getAll(sp, "type") as any,
    amountRanges: getAll(sp, "amt") as any,
    times: getAll(sp, "time") as any,
    creditTiers: getAll(sp, "credit") as any,
    industries: getAll(sp, "industry") as any,
    sort: (sp.get("sort") as any) ?? "relevance",
    page: Math.max(1, Number(sp.get("page") ?? "1") || 1)
  };
}

export function setArrayParam(sp: URLSearchParams, key: string, values: string[]) {
  sp.delete(key);
  values.forEach((v) => sp.append(key, v));
}

export function filtersToSearchParams(f: Filters) {
  const sp = new URLSearchParams();
  if (f.q) sp.set("q", f.q);
  setArrayParam(sp, "type", f.productTypes as any);
  setArrayParam(sp, "amt", f.amountRanges as any);
  setArrayParam(sp, "time", f.times as any);
  setArrayParam(sp, "credit", f.creditTiers as any);
  setArrayParam(sp, "industry", f.industries as any);
  if (f.sort && f.sort !== "relevance") sp.set("sort", f.sort);
  if (f.page && f.page !== 1) sp.set("page", String(f.page));
  return sp;
}
