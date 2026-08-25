import type { Filters, FundingProduct } from "@/lib/types";

export const AMOUNT_BANDS = [
  { id: "0-25k", label: "Up to $25K", min: 0, max: 25_000 },
  { id: "25k-100k", label: "$25K–$100K", min: 25_000, max: 100_000 },
  { id: "100k-500k", label: "$100K–$500K", min: 100_000, max: 500_000 },
  { id: "500k+", label: "$500K+", min: 500_000, max: Number.POSITIVE_INFINITY }
] as const;

export const SPEED_BANDS = [
  { id: "day1", label: "≤ 24 Hours" },
  { id: "days2-3", label: "2–3 Days" },
  { id: "days4-7", label: "4–7 Days" },
  { id: "weekplus", label: "1+ Week" }
] as const;

export const CREDIT_BANDS = [
  { id: "under600", label: "Under 600" },
  { id: "600-649", label: "600–649" },
  { id: "650-679", label: "650–679" },
  { id: "680+", label: "680+" },
  { id: "nostated", label: "No stated minimum" }
] as const;

export const REVENUE_BANDS = [
  { id: "0-5k", label: "$0–$5K/mo" },
  { id: "5k-10k", label: "$5K–$10K/mo" },
  { id: "10k-25k", label: "$10K–$25K/mo" },
  { id: "25k+", label: "$25K+/mo" },
  { id: "nostated", label: "No stated minimum" }
] as const;

export const TIME_BANDS = [
  { id: "0-3", label: "0–3 months" },
  { id: "3-6", label: "3–6 months" },
  { id: "6-12", label: "6–12 months" },
  { id: "12+", label: "12+ months" },
  { id: "nostated", label: "No stated minimum" }
] as const;

function speedDays(text: string | null) {
  if (!text) return 999;
  const t = text.toLowerCase();

  if (t.includes("hour") || t.includes("same day")) {
    const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    if (!nums.length) return 1;
    return Math.max(...nums) / 24;
  }

  if (t.includes("day")) {
    const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    return nums.length ? Math.max(...nums) : 1;
  }

  if (t.includes("week")) {
    const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    return (nums.length ? Math.max(...nums) : 1) * 7;
  }

  if (t.includes("month")) {
    const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    return (nums.length ? Math.max(...nums) : 1) * 30;
  }

  return 999;
}

function speedBand(p: FundingProduct) {
  const d = speedDays(p.timeToFunding);
  if (d <= 1) return "day1";
  if (d <= 3) return "days2-3";
  if (d <= 7) return "days4-7";
  return "weekplus";
}

function creditBand(score: number | null) {
  if (score == null) return "nostated";
  if (score < 600) return "under600";
  if (score < 650) return "600-649";
  if (score < 680) return "650-679";
  return "680+";
}

function revenueBand(value: number | null) {
  if (value == null) return "nostated";
  if (value < 5_000) return "0-5k";
  if (value < 10_000) return "5k-10k";
  if (value < 25_000) return "10k-25k";
  return "25k+";
}

function timeBand(value: number | null) {
  if (value == null) return "nostated";
  if (value <= 3) return "0-3";
  if (value <= 6) return "3-6";
  if (value <= 12) return "6-12";
  return "12+";
}

export function matchesAmountBand(p: FundingProduct, bandId: string) {
  const band = AMOUNT_BANDS.find((b) => b.id === bandId);
  if (!band) return true;
  return p.amountMax >= band.min && p.amountMin <= band.max;
}

export function filterProducts(all: FundingProduct[], f: Filters, providerId?: string | null) {
  const q = f.q.trim().toLowerCase();

  const items = all.filter((p) => {
    if (providerId && p.providerId !== providerId) return false;

    const haystack = [
      p.name,
      p.providerName,
      p.description,
      p.fundingType,
      p.productFamilyName,
      p.category,
      ...p.industries,
      ...p.bestFor
    ]
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (f.familyIds.length && !f.familyIds.includes(p.productFamilyId)) return false;
    if (f.fundingTypes.length && !f.fundingTypes.includes(p.fundingType)) return false;
    if (f.amountBands.length && !f.amountBands.some((x) => matchesAmountBand(p, x))) return false;
    if (f.speedBands.length && !f.speedBands.includes(speedBand(p))) return false;
    if (f.creditBands.length && !f.creditBands.includes(creditBand(p.minCreditScore))) return false;
    if (f.revenueBands.length && !f.revenueBands.includes(revenueBand(p.minMonthlyRevenue))) return false;
    if (f.timeBands.length && !f.timeBands.includes(timeBand(p.minTimeInBusinessMonths))) return false;
    if (f.startupOnly && !p.startupEligible) return false;

    return true;
  });

  return sortProducts(items, f);
}

export function sortProducts(items: FundingProduct[], f: Filters) {
  const copy = [...items];

  switch (f.sort) {
    case "speed":
      copy.sort((a, b) => speedDays(a.timeToFunding) - speedDays(b.timeToFunding));
      break;
    case "amount":
      copy.sort((a, b) => b.amountMax - a.amountMax);
      break;
    case "credit":
      copy.sort(
        (a, b) =>
          (a.minCreditScore ?? Number.POSITIVE_INFINITY) -
          (b.minCreditScore ?? Number.POSITIVE_INFINITY)
      );
      break;
    case "relevance":
    default:
      copy.sort((a, b) => {
        const aScore = (a.timeToFunding ? 1 : 0) + (a.minCreditScore != null ? 1 : 0) + (a.minMonthlyRevenue != null ? 1 : 0);
        const bScore = (b.timeToFunding ? 1 : 0) + (b.minCreditScore != null ? 1 : 0) + (b.minMonthlyRevenue != null ? 1 : 0);
        return bScore - aScore || b.amountMax - a.amountMax;
      });
  }

  return copy;
}
