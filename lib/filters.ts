import { Filters, FundingProduct, AmountRange, CreditTier, TimeToFund } from "@/lib/types";

export function amountToRange(min: number, max: number): AmountRange {
  if (max <= 25000) return "0-25k";
  if (max <= 100000) return "25k-100k";
  if (max <= 500000) return "100k-500k";
  return "500k+";
}

export function scoreToTier(score: number): CreditTier {
  if (score <= 579) return "Bad (≤579)";
  if (score <= 669) return "Fair (580-669)";
  if (score <= 739) return "Good (670-739)";
  return "Excellent (740+)";
}

export function speedRank(t: TimeToFund) {
  return t === "Same Day" ? 1 : t === "Next Day" ? 2 : t === "2-3 Days" ? 3 : 4;
}

export function filterProducts(all: FundingProduct[], f: Filters) {
  const q = f.q.trim().toLowerCase();

  let items = all.filter((p) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.providerName.toLowerCase().includes(q) ||
      p.features.some((x) => x.toLowerCase().includes(q));

    const matchesType = f.productTypes.length === 0 || f.productTypes.includes(p.productType);
    const matchesIndustry = f.industries.length === 0 || f.industries.some((i) => p.industries.includes(i));

    const pAmountRange = amountToRange(p.amountMin, p.amountMax);
    const matchesAmount = f.amountRanges.length === 0 || f.amountRanges.includes(pAmountRange);

    const matchesTime = f.times.length === 0 || f.times.includes(p.timeToFund);

    const tier = scoreToTier(p.minCreditScore);
    const matchesCredit = f.creditTiers.length === 0 || f.creditTiers.includes(tier);

    return matchesQ && matchesType && matchesIndustry && matchesAmount && matchesTime && matchesCredit;
  });

  items = sortProducts(items, f);
  return items;
}

export function sortProducts(items: FundingProduct[], f: Filters) {
  const copy = [...items];
  switch (f.sort) {
    case "rating":
      copy.sort((a, b) => b.rating - a.rating);
      break;
    case "amount":
      copy.sort((a, b) => (b.amountMax - b.amountMin) - (a.amountMax - a.amountMin));
      break;
    case "speed":
      copy.sort((a, b) => speedRank(a.timeToFund) - speedRank(b.timeToFund));
      break;
    case "relevance":
    default:
      copy.sort((a, b) => (b.rating * 10 - speedRank(b.timeToFund)) - (a.rating * 10 - speedRank(a.timeToFund)));
  }
  return copy;
}
