export type Partner = {
  id: string;
  name: string;
  logo: string; // /logos/*.svg
  specialization: string;
  productTypes: string[];
  speed: "Same Day" | "Next Day" | "2-3 Days" | "1+ Week";
  minCredit: number;
  link: string;
};

export const partners: Partner[] = [
  {
    id: "moonshine",
    name: "Moonshine Capital",
    logo: "/logos/moonshine.svg",
    specialization: "Fast approvals, flexible credit, and reusable capital.",
    productTypes: ["Line of Credit", "Term Loan"],
    speed: "Next Day",
    minCredit: 600,
    link: "/products?type=Line%20of%20Credit"
  },
  {
    id: "steadyterm",
    name: "SteadyTerm",
    logo: "/logos/provider-b.svg",
    specialization: "Term loans for expansion with predictable payments.",
    productTypes: ["Term Loan", "SBA"],
    speed: "2-3 Days",
    minCredit: 660,
    link: "/products?type=Term%20Loan"
  },
  {
    id: "fastcash",
    name: "FastCash",
    logo: "/logos/provider-a.svg",
    specialization: "Speed-first short-term capital for urgent needs.",
    productTypes: ["MCA"],
    speed: "Same Day",
    minCredit: 520,
    link: "/products?type=MCA"
  }
];
