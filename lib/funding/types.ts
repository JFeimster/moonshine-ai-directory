export type PublicFundingPage = {
  id: string; slug: string; route: string; template: string; status: string;
  nav?: { label?: string; group?: string; order?: number; showInHeader?: boolean; showInFooter?: boolean };
  seo?: { title?: string; description?: string; canonical?: string; ogTitle?: string; ogDescription?: string; ogImage?: string; schemaType?: string };
  hero?: { eyebrow?: string; headline?: string; subheadline?: string; primaryCta?: {label:string;href:string}; secondaryCta?: {label:string;href:string} };
  pageIntent?: string[]; audiences?: string[]; sections?: any[]; dataRefs?: any; filters?: any;
  compliance?: { reviewStatus?: string; disclaimer?: string; forbiddenClaims?: string[] };
};

export type FundingFamily = {
  id:string; slug:string; route:string|null; name:string; publicName:string; category:string; summary?:string;
  bestFitBorrower:string[]; avoidWhen:string[]; commonUseCases:string[];
  qualificationSignals:{minCreditScoreGuide?:number|null;minMonthlyRevenueGuide?:number|null;minTimeInBusinessMonthsGuide?:number|null;creditTier?:string[];repaymentSource?:string};
  speedProfile?: {label?:string;typicalTimeToFunding?:string}|null; requiredDocuments:string[]; fastDisqualifiers:string[];
  primaryCta?: {label:string;href:string;trackingId?:string};
};

export type FundingProduct = {
  id:string; slug:string; name:string; providerId:string; providerName:string; productFamily:string; category?:string; fundingType?:string;
  minAmount?:number|null; maxAmount?:number|null; minCreditScore?:number|null; minMonthlyRevenue?:number|null; minMonthlyRevenueNote?:string|null;
  minTimeInBusinessMonths?:number|null; creditTier?:string|null; termLength?:string|null; paymentType?:string|null; rateCostRange?:string|null;
  timeToFunding?:string|null; startupEligible:boolean; ctaLabel:string;
};

export type FundingProvider = {
  id:string;slug:string;name:string;categories:string[];productFamilyIds:string[];financingProducts:string[];geographicCoverage:string[];
  industryAppetite:string[];typicalBorrowerProfile?:string|null;eligibility:{minCreditScore?:number|null;minMonthlyRevenue?:number|null;minTimeInBusinessMonths?:number|null};
  fundingAmountText?:string|null;productCount:number;
};

export type FundingTool = {name:string;slug:string;brand?:string|null;persona?:string|null;problem?:string|null;output_artifact?:string|null;asset_type?:string|null;live_url:string};
