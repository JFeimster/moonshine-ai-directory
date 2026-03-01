import { FundingProduct } from "@/lib/types";

export const products: FundingProduct[] = [
  {
    id: "ms-capital-flex-loc",
    providerName: "Moonshine Capital",
    providerLogo: "/logos/moonshine.svg",
    rating: 4.8,
    reviewsCount: 412,
    name: "Flex Line of Credit",
    tagline: "Reusable capital with fast approvals.",
    productType: "Line of Credit",
    industries: ["SaaS", "Agency", "Ecommerce", "General"],
    amountMin: 10000,
    amountMax: 250000,
    timeToFund: "Next Day",
    minCreditScore: 600,
    features: ["Revolving credit", "No early payoff fees", "Draw as needed", "Weekly or monthly payments"],
    eligibility: ["6+ months in business", "$10k/mo revenue minimum", "US-based business entity"],
    processSteps: [
      { title: "Connect basics", detail: "Business details + revenue snapshot." },
      { title: "Get matched", detail: "AI suggests best-fit terms based on constraints." },
      { title: "Review offer", detail: "Confirm amounts, fees, and funding speed." },
      { title: "Fund", detail: "Capital delivered to your business account." }
    ],
    testimonials: [
      { name: "Rina (Agency Owner)", quote: "We replaced a messy stack with one clean LOC." },
      { name: "Marco (Ecom)", quote: "Fast decision. Funds hit next day." }
    ],
    applyUrl: "https://example.com/apply/flex-loc"
  },
  {
    id: "fastcash-mca-advance",
    providerName: "FastCash",
    providerLogo: "/logos/provider-a.svg",
    rating: 4.2,
    reviewsCount: 198,
    name: "Next-Day Advance",
    tagline: "Speed-first funding for urgent needs.",
    productType: "MCA",
    industries: ["Retail", "Hospitality", "Trucking", "General"],
    amountMin: 5000,
    amountMax: 150000,
    timeToFund: "Same Day",
    minCreditScore: 520,
    features: ["Same-day decisions", "Low-doc options", "Flexible credit", "Daily or weekly remits"],
    eligibility: ["3+ months in business", "$7k/mo revenue minimum"],
    processSteps: [
      { title: "Quick apply", detail: "2 minutes to submit." },
      { title: "Verify revenue", detail: "Bank statements or aggregator." },
      { title: "Receive offer", detail: "Transparent factor + remit schedule." },
      { title: "Fund today", detail: "Wire or ACH depending on cutoff." }
    ],
    testimonials: [{ name: "Dana (Retail)", quote: "Inventory emergency solved in hours." }],
    applyUrl: "https://example.com/apply/next-day-advance"
  },
  {
    id: "steadyterm-term-loan",
    providerName: "SteadyTerm",
    providerLogo: "/logos/provider-b.svg",
    rating: 4.6,
    reviewsCount: 305,
    name: "Growth Term Loan",
    tagline: "Predictable payments for expansion.",
    productType: "Term Loan",
    industries: ["Construction", "Healthcare", "Agency", "General"],
    amountMin: 25000,
    amountMax: 500000,
    timeToFund: "2-3 Days",
    minCreditScore: 660,
    features: ["Fixed terms", "No prepay penalty (select terms)", "Higher limits", "Dedicated underwriting"],
    eligibility: ["12+ months in business", "$20k/mo revenue minimum", "Good standing"],
    processSteps: [
      { title: "Apply", detail: "Business + owner details." },
      { title: "Underwrite", detail: "Cash flow + documents." },
      { title: "Finalize", detail: "Sign and schedule funding." }
    ],
    testimonials: [{ name: "Sam (Contractor)", quote: "Helped us take bigger projects without cash stress." }],
    applyUrl: "https://example.com/apply/growth-term-loan"
  }
];
