import productsRegistry from "@/lib/registry/funding-products.registry.json";
import providersRegistry from "@/lib/registry/funding-providers.registry.json";
import familiesRegistry from "@/lib/registry/funding-product-families.registry.json";
import toolsRegistry from "@/lib/registry/funding-tools.registry.json";
import pagesRegistry from "@/lib/registry/funding-pages.registry.json";
import type { FundingPartner, FundingProduct, FundingTool } from "@/lib/types";

type AnyRow = Record<string, any>;

const rawProducts = (productsRegistry.entries ?? []) as AnyRow[];
const rawProviders = (providersRegistry.entries ?? []) as AnyRow[];
const rawFamilies = (familiesRegistry.entries ?? []) as AnyRow[];
const rawTools = (toolsRegistry.entries ?? []) as AnyRow[];

const providersById = new Map(rawProviders.map((p) => [p.id, p]));
const familiesById = new Map(rawFamilies.map((f) => [f.id, f]));

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");
}

function moneyShort(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

function cleanSentence(value: string | null | undefined) {
  if (!value) return null;
  return value.replace(/\s+/g, " ").trim();
}

function familyName(id: string) {
  const family = familiesById.get(id);
  return family?.publicName || family?.name || id;
}

function providerApplyUrl(provider: AnyRow | undefined) {
  const affiliate = provider?.affiliate ?? {};
  return affiliate.affiliateUrl || affiliate.applyUrl || "https://tally.so/r/mDEJB5";
}

function derivedDescription(product: AnyRow, family: AnyRow | undefined) {
  const familySummary = cleanSentence(family?.summary);
  const useCase = Array.isArray(family?.commonUseCases) ? family.commonUseCases[0] : null;

  if (useCase) {
    return `${product.fundingType} for ${String(useCase).toLowerCase()}, with funding from ${moneyShort(product.minAmount)} to ${moneyShort(product.maxAmount)}.`;
  }

  if (familySummary) {
    const first = familySummary.split(".")[0];
    return `${product.fundingType} in the ${family?.publicName || family?.name || "business funding"} lane. ${first}.`;
  }

  return `${product.fundingType} with funding from ${moneyShort(product.minAmount)} to ${moneyShort(product.maxAmount)}.`;
}

export const productFamilies = rawFamilies
  .filter((f) => !f.deprecated && f.visibility === "public")
  .map((f) => ({
    id: f.id as string,
    name: (f.publicName || f.name) as string,
    summary: cleanSentence(f.summary) || "",
    minCreditScore: f.qualificationSignals?.minCreditScoreGuide ?? null,
    minMonthlyRevenue: f.qualificationSignals?.minMonthlyRevenueGuide ?? null,
    minTimeInBusinessMonths: f.qualificationSignals?.minTimeInBusinessMonthsGuide ?? null,
    useCases: Array.isArray(f.commonUseCases) ? f.commonUseCases : [],
    route: f.route as string | null
  }));

export const products: FundingProduct[] = rawProducts
  .filter((p) => p.status === "active")
  .map((p) => {
    const provider = providersById.get(p.providerId);
    const family = familiesById.get(p.productFamily);

    const industries =
      Array.isArray(provider?.industryAppetite) && provider.industryAppetite.length
        ? provider.industryAppetite
        : [];

    const bestFor =
      Array.isArray(family?.commonUseCases) && family.commonUseCases.length
        ? family.commonUseCases.slice(0, 5)
        : [];

    const familyMinCredit = family?.qualificationSignals?.minCreditScoreGuide ?? null;
    const familyMinRevenue = family?.qualificationSignals?.minMonthlyRevenueGuide ?? null;
    const familyMinTib = family?.qualificationSignals?.minTimeInBusinessMonthsGuide ?? null;

    return {
      id: p.id,
      slug: p.slug,
      providerId: p.providerId,
      providerName: p.providerName,
      providerInitials: initials(p.providerName),
      name: p.name,
      description: derivedDescription(p, family),

      fundingType: p.fundingType,
      productFamilyId: p.productFamily,
      productFamilyName: familyName(p.productFamily),
      category: p.category,

      amountMin: p.minAmount,
      amountMax: p.maxAmount,
      minCreditScore: p.minCreditScore ?? provider?.eligibility?.minCreditScore ?? familyMinCredit,
      minMonthlyRevenue: p.minMonthlyRevenue ?? provider?.eligibility?.minMonthlyRevenue ?? familyMinRevenue,
      minMonthlyRevenueNote: p.minMonthlyRevenueNote ?? null,
      minTimeInBusinessMonths: p.minTimeInBusinessMonths ?? provider?.eligibility?.minTimeInBusinessMonths ?? familyMinTib,
      creditTier: p.creditTier ?? null,

      termLength: p.termLength ?? null,
      paymentType: p.paymentType ?? null,
      rateCostRange: p.rateCostRange ?? null,
      timeToFunding: p.timeToFunding ?? family?.speedProfile?.typicalTimeToFunding ?? null,
      startupEligible: Boolean(p.startupEligible),

      industries,
      qualificationProfile:
        cleanSentence(provider?.typicalBorrowerProfile) ||
        cleanSentence(provider?.requirements?.requirementsNote) ||
        null,
      bestFor,
      requiredDocuments: Array.isArray(family?.requiredDocuments) ? family.requiredDocuments : [],
      disqualifiers: Array.isArray(family?.fastDisqualifiers) ? family.fastDisqualifiers : [],

      ctaLabel: p.cta?.label || "Check Eligibility",
      applyUrl: providerApplyUrl(provider)
    };
  });

export const partners: FundingPartner[] = rawProviders
  .filter((p) => p.affiliate?.affiliateStatus === "active")
  .map((p) => {
    const linkedProducts = products.filter((product) => product.providerId === p.id);
    const productFamilyIds = Array.from(new Set(linkedProducts.map((x) => x.productFamilyId)));
    const productTypes = Array.from(new Set(linkedProducts.map((x) => x.fundingType)));

    const specialization =
      cleanSentence(p.typicalBorrowerProfile) ||
      (productTypes.length ? `Offers ${productTypes.slice(0, 3).join(", ")}.` : "Funding and capital partner.");

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      initials: initials(p.name),
      specialization,
      productFamilyIds,
      productFamilyNames: productFamilyIds.map(familyName),
      productTypes,
      industries: Array.isArray(p.industryAppetite) ? p.industryAppetite : [],
      minCreditScore: p.eligibility?.minCreditScore ?? null,
      minMonthlyRevenue: p.eligibility?.minMonthlyRevenue ?? null,
      minTimeInBusinessMonths: p.eligibility?.minTimeInBusinessMonths ?? null,
      qualificationProfile:
        cleanSentence(p.typicalBorrowerProfile) ||
        cleanSentence(p.requirements?.requirementsNote) ||
        null,
      fundingAmountText: p.terms?.fundingAmountText ?? null,
      productCount: linkedProducts.length,
      directoryLink: `/products?provider=${encodeURIComponent(p.id)}`
    };
  })
  .sort((a, b) => b.productCount - a.productCount || a.name.localeCompare(b.name));

export const featuredPartners = partners
  .filter((p) => p.productCount > 0)
  .slice(0, 10);

export const tools: FundingTool[] = rawTools
  .filter((t) => !t.duplicate)
  .map((t) => ({
    name: t.name,
    slug: t.slug,
    brand: t.brand ?? null,
    persona: cleanSentence(t.persona),
    problem: cleanSentence(t.problem),
    coreLogic: cleanSentence(t.core_logic),
    outputArtifact: cleanSentence(t.output_artifact),
    assetType: t.asset_type || "TOOL",
    partnerChannel: cleanSentence(t.partner_channel),
    buildState: t.build_state || "concept",
    liveUrl: t.live_url ?? null
  }));

export const fundingDisclaimer =
  (pagesRegistry.pages ?? []).find((p: any) => p.id === "funding")?.compliance?.disclaimer ||
  "Funding availability, terms, speed, and eligibility vary by provider, applicant profile, documentation, and underwriting review. No approval or funding outcome is guaranteed.";

export const quoteUrl =
  (pagesRegistry.pages ?? []).find((p: any) => p.id === "funding")?.hero?.primaryCta?.href ||
  "https://tally.so/r/mDEJB5";
