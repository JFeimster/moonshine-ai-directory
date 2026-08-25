export type FundingProduct = {
  id: string;
  slug: string;
  providerId: string;
  providerName: string;
  providerInitials: string;
  name: string;
  description: string;

  fundingType: string;
  productFamilyId: string;
  productFamilyName: string;
  category: string;

  amountMin: number;
  amountMax: number;
  minCreditScore: number | null;
  minMonthlyRevenue: number | null;
  minMonthlyRevenueNote: string | null;
  minTimeInBusinessMonths: number | null;
  creditTier: string | null;

  termLength: string | null;
  paymentType: string | null;
  rateCostRange: string | null;
  timeToFunding: string | null;
  startupEligible: boolean;

  industries: string[];
  qualificationProfile: string | null;
  bestFor: string[];
  requiredDocuments: string[];
  disqualifiers: string[];

  ctaLabel: string;
  applyUrl: string;
};

export type FundingPartner = {
  id: string;
  slug: string;
  name: string;
  initials: string;
  specialization: string;
  productFamilyIds: string[];
  productFamilyNames: string[];
  productTypes: string[];
  industries: string[];
  minCreditScore: number | null;
  minMonthlyRevenue: number | null;
  minTimeInBusinessMonths: number | null;
  qualificationProfile: string | null;
  fundingAmountText: string | null;
  productCount: number;
  directoryLink: string;
};

export type FundingTool = {
  name: string;
  slug: string;
  brand: string | null;
  persona: string | null;
  problem: string | null;
  coreLogic: string | null;
  outputArtifact: string | null;
  assetType: string;
  partnerChannel: string | null;
  buildState: "live" | "concept" | string;
  liveUrl: string | null;
};

export type SubmissionStatus = "submitted" | "approved" | "rejected";

// Legacy provider-submission API contract retained for existing /api/submissions routes.
export type ProductSubmission = {
  id: string;
  submittedAt: string;
  status: SubmissionStatus;
  notes?: string;
  providerName: string;
  providerLogo?: string;
  name: string;
  tagline: string;
  productType: string;
  industries: string[];
  amountMin: number;
  amountMax: number;
  timeToFund: string;
  minCreditScore: number;
  features: string[];
  applyUrl: string;
};

export type SortOption = "relevance" | "speed" | "amount" | "credit";

export type Filters = {
  q: string;
  familyIds: string[];
  fundingTypes: string[];
  amountBands: string[];
  speedBands: string[];
  creditBands: string[];
  revenueBands: string[];
  timeBands: string[];
  startupOnly: boolean;
  sort: SortOption;
  page: number;
};
