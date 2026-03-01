export type ProductType = "Line of Credit" | "Term Loan" | "MCA" | "Invoice Financing" | "SBA" | "Equipment";

export type TimeToFund = "Same Day" | "Next Day" | "2-3 Days" | "1+ Week";
export type CreditTier = "Bad (≤579)" | "Fair (580-669)" | "Good (670-739)" | "Excellent (740+)";

export type Industry =
  | "SaaS"
  | "Ecommerce"
  | "Agency"
  | "Construction"
  | "Healthcare"
  | "Retail"
  | "Trucking"
  | "Hospitality"
  | "General";

export type AmountRange = "0-25k" | "25k-100k" | "100k-500k" | "500k+";

export type FundingProduct = {
  id: string;
  providerName: string;
  providerLogo: string;
  rating: number;
  reviewsCount: number;
  name: string;
  tagline: string;
  productType: ProductType;
  industries: Industry[];
  amountMin: number;
  amountMax: number;
  timeToFund: TimeToFund;
  minCreditScore: number;
  features: string[];
  eligibility: string[];
  processSteps: { title: string; detail: string }[];
  testimonials: { name: string; quote: string }[];
  applyUrl: string;
};

export type SubmissionStatus = "submitted" | "approved" | "rejected";

export type ProductSubmission = {
  id: string;
  submittedAt: string; // ISO
  status: SubmissionStatus;
  notes?: string;

  // product fields (subset)
  providerName: string;
  providerLogo?: string;
  name: string;
  tagline: string;
  productType: ProductType;
  industries: Industry[];
  amountMin: number;
  amountMax: number;
  timeToFund: TimeToFund;
  minCreditScore: number;
  features: string[];
  applyUrl: string;
};

export type Filters
 = {
  q: string;
  productTypes: ProductType[];
  amountRanges: AmountRange[];
  times: TimeToFund[];
  creditTiers: CreditTier[];
  industries: Industry[];
  sort: "relevance" | "speed" | "amount" | "rating";
  page: number;
};
