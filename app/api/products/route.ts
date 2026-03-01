import { NextResponse } from "next/server";
import { products as staticProducts } from "@/lib/data/products";
import { supabaseAdmin } from "@/lib/supabase";

function submissionsEnabled() {
  return process.env.SUBMISSIONS_ENABLED === "true";
}

export async function GET() {
  let submitted: any[] = [];
  if (submissionsEnabled()) {
    try {
      const supabase = supabaseAdmin();
      const { data, error } = await supabase
        .from("product_submissions")
        .select("*")
        .eq("status", "approved")
        .order("submitted_at", { ascending: false });

      if (!error && data) submitted = data;
    } catch {
      // ignore
    }
  }

  const approvedAsProducts = submitted.map((s: any) => ({
    id: `sub-${s.id}`,
    providerName: s.provider_name,
    providerLogo: s.provider_logo || "/logos/provider-a.svg",
    rating: 0,
    reviewsCount: 0,
    name: s.name,
    tagline: s.tagline,
    productType: s.product_type,
    industries: s.industries ?? ["General"],
    amountMin: s.amount_min,
    amountMax: s.amount_max,
    timeToFund: s.time_to_fund,
    minCreditScore: s.min_credit_score,
    features: s.features ?? [],
    eligibility: ["Provider-submitted listing (pending full underwriting details)."],
    processSteps: [
      { title: "Apply", detail: "Submit your information to the provider." },
      { title: "Review", detail: "Provider reviews eligibility and documents." },
      { title: "Fund", detail: "Funding timeline depends on approval." }
    ],
    testimonials: [],
    applyUrl: s.apply_url
  }));

  const items = [...approvedAsProducts, ...staticProducts];
  return NextResponse.json({ items, total: items.length });
}
