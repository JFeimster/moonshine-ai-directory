export type Resource = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  publishedAt: string; // ISO date
  body: Array<{ type: "h2" | "p" | "ul"; content: string | string[] }>;
};

export const resources: Resource[] = [
  {
    slug: "how-to-choose-funding",
    title: "How to Choose Funding (Without Getting Cooked)",
    excerpt: "Pick the right product by matching speed, cost, and constraints to your cash cycle.",
    tags: ["Basics", "Strategy"],
    readingTime: "6 min",
    publishedAt: "2026-03-01",
    body: [
      { type: "h2", content: "Start with the constraint" },
      { type: "p", content: "Most founders shop by headline rate. Pros shop by constraint: speed, credit, revenue, and collateral. Pick the constraint first, then optimize the rest." },
      { type: "h2", content: "Match product to cash cycle" },
      { type: "ul", content: [
        "Short cash gaps: LOC or invoice financing",
        "Urgent needs: speed products (MCA/fast options)",
        "Expansion: term loan with predictable payments"
      ]},
      { type: "h2", content: "Avoid the approval trap" },
      { type: "p", content: "Multiple applications can hurt. Use a directory + compare flow to narrow to 1–2 best fits before you apply." }
    ]
  },
  {
    slug: "application-tips",
    title: "Application Tips That Actually Move Approval Odds",
    excerpt: "The documents and numbers underwriters really care about—and what to fix before you hit apply.",
    tags: ["Approval", "Docs"],
    readingTime: "5 min",
    publishedAt: "2026-02-20",
    body: [
      { type: "h2", content: "Clean revenue story" },
      { type: "p", content: "Underwriting is pattern recognition. If deposits are irregular, add context in your notes and be ready with invoices/contracts." },
      { type: "h2", content: "Common rejection causes" },
      { type: "ul", content: [
        "Short time in business",
        "Thin average balance",
        "Recent NSFs",
        "Unexplained cash withdrawals"
      ]}
    ]
  },
  {
    slug: "credit-building-for-founders",
    title: "Credit Building for Founders: From ‘Meh’ to Bankable",
    excerpt: "A practical path to raise your score and unlock cheaper capital.",
    tags: ["Credit"],
    readingTime: "7 min",
    publishedAt: "2026-01-30",
    body: [
      { type: "h2", content: "Separate personal and business" },
      { type: "p", content: "Get the basics right: EIN, business bank account, and consistent deposits. Lenders want trackable cash flow." },
      { type: "h2", content: "Pay down utilization" },
      { type: "p", content: "Utilization is a fast lever. Bring revolving balances down before you apply." }
    ]
  }
];
