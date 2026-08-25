import pagesRegistry from "@/lib/registry/funding-pages.registry.json";
import familiesRegistry from "@/lib/registry/funding-product-families.registry.json";
import productsRegistry from "@/lib/registry/funding-products.registry.json";
import providersRegistry from "@/lib/registry/funding-providers.registry.json";
import toolsRegistry from "@/lib/registry/funding-tools.registry.json";
import type { FundingFamily, FundingProduct, FundingProvider, FundingTool, PublicFundingPage } from "./types";

type Row = Record<string, any>;

const pages = (pagesRegistry.pages ?? []) as Row[];
const families = (familiesRegistry.entries ?? []) as Row[];
const products = (productsRegistry.entries ?? []) as Row[];
const providers = (providersRegistry.entries ?? []) as Row[];
const tools = (toolsRegistry.entries ?? []) as Row[];

const activeProductRows = products.filter((p) => p.status === "active");

export const fundingPages: PublicFundingPage[] = pages
  .filter((p) => p.visibility === "public")
  .map((p) => ({
    id: p.id,
    slug: p.slug,
    route: p.route,
    template: p.template,
    status: p.status,
    nav: p.nav,
    seo: p.seo,
    hero: p.hero,
    pageIntent: p.pageIntent ?? [],
    audiences: p.audiences ?? [],
    sections: p.sections ?? [],
    dataRefs: p.dataRefs ?? {},
    filters: p.filters ?? {},
    compliance: p.compliance
  }));

export const fundingFamilies: FundingFamily[] = families
  .filter((f) => f.visibility === "public" && !f.deprecated)
  .map((f) => ({
    id: f.id,
    slug: f.slug,
    route: f.route ?? null,
    name: f.name,
    publicName: f.publicName || f.name,
    category: f.category,
    summary: f.summary,
    bestFitBorrower: f.bestFitBorrower ?? [],
    avoidWhen: f.avoidWhen ?? [],
    commonUseCases: f.commonUseCases ?? [],
    qualificationSignals: {
      minCreditScoreGuide: f.qualificationSignals?.minCreditScoreGuide ?? null,
      minMonthlyRevenueGuide: f.qualificationSignals?.minMonthlyRevenueGuide ?? null,
      minTimeInBusinessMonthsGuide: f.qualificationSignals?.minTimeInBusinessMonthsGuide ?? null,
      creditTier: f.qualificationSignals?.creditTier ?? [],
      repaymentSource: f.qualificationSignals?.repaymentSource
    },
    speedProfile: f.speedProfile ?? null,
    requiredDocuments: f.requiredDocuments ?? [],
    fastDisqualifiers: f.fastDisqualifiers ?? [],
    primaryCta: f.primaryCta
  }));

export const fundingProducts: FundingProduct[] = activeProductRows.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  providerId: p.providerId,
  providerName: p.providerName,
  productFamily: p.productFamily,
  category: p.category,
  fundingType: p.fundingType,
  minAmount: p.minAmount ?? null,
  maxAmount: p.maxAmount ?? null,
  minCreditScore: p.minCreditScore ?? null,
  minMonthlyRevenue: p.minMonthlyRevenue ?? null,
  minMonthlyRevenueNote: p.minMonthlyRevenueNote ?? null,
  minTimeInBusinessMonths: p.minTimeInBusinessMonths ?? null,
  creditTier: p.creditTier ?? null,
  termLength: p.termLength ?? null,
  paymentType: p.paymentType ?? null,
  rateCostRange: p.rateCostRange ?? null,
  timeToFunding: p.timeToFunding ?? null,
  startupEligible: Boolean(p.startupEligible),
  ctaLabel: p.cta?.label || "Check Eligibility"
}));

export const fundingProviders: FundingProvider[] = providers
  .map((p) => {
    const productCount = activeProductRows.filter((product) => product.providerId === p.id).length;
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      categories: p.categories ?? [],
      productFamilyIds: p.productFamilyIds ?? [],
      financingProducts: p.financingProducts ?? [],
      geographicCoverage: p.geographicCoverage ?? [],
      industryAppetite: p.industryAppetite ?? [],
      typicalBorrowerProfile: p.typicalBorrowerProfile ?? null,
      eligibility: {
        minCreditScore: p.eligibility?.minCreditScore ?? null,
        minMonthlyRevenue: p.eligibility?.minMonthlyRevenue ?? null,
        minTimeInBusinessMonths: p.eligibility?.minTimeInBusinessMonths ?? null
      },
      fundingAmountText: p.terms?.fundingAmountText ?? null,
      productCount
    };
  })
  .filter((p) => p.productCount > 0)
  .sort((a, b) => b.productCount - a.productCount || a.name.localeCompare(b.name));

export const fundingTools: FundingTool[] = tools
  .filter((t) => !t.duplicate && t.live_url)
  .map((t) => ({
    name: t.name,
    slug: t.slug,
    brand: t.brand ?? null,
    persona: t.persona ?? null,
    problem: t.problem ?? null,
    output_artifact: t.output_artifact ?? null,
    asset_type: t.asset_type ?? null,
    live_url: t.live_url
  }));

export const pageBySlug = (slug: string) => fundingPages.find((x) => x.slug === slug);
export const familyById = (id: string) => fundingFamilies.find((x) => x.id === id);
export const familyByRouteSlug = (slug: string) => fundingFamilies.find((x) => x.route?.split("/").pop() === slug);
export const productBySlug = (slug: string) => fundingProducts.find((x) => x.slug === slug);
export const providerBySlug = (slug: string) => fundingProviders.find((x) => x.slug === slug);
export const productsForFamily = (id: string) => fundingProducts.filter((x) => x.productFamily === id);
export const productsForProvider = (id: string) => fundingProducts.filter((x) => x.providerId === id);
export const providersForFamily = (id: string) => fundingProviders.filter((x) => x.productFamilyIds.includes(id));
