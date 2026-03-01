import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { ProductSubmission } from "@/lib/types";

function enabled() {
  return process.env.SUBMISSIONS_ENABLED === "true";
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

export async function GET() {
  if (!enabled()) return NextResponse.json({ error: "Submissions disabled" }, { status: 403 });

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("product_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: (data ?? []).map(rowToSubmission) });
}

export async function POST(req: Request) {
  if (!enabled()) return NextResponse.json({ error: "Submissions disabled" }, { status: 403 });

  const body = (await req.json()) as Omit<ProductSubmission, "id" | "submittedAt" | "status">;

  const submission: ProductSubmission = {
    id: uid(),
    submittedAt: new Date().toISOString(),
    status: "submitted",
    providerName: body.providerName,
    providerLogo: body.providerLogo,
    name: body.name,
    tagline: body.tagline,
    productType: body.productType,
    industries: body.industries,
    amountMin: body.amountMin,
    amountMax: body.amountMax,
    timeToFund: body.timeToFund,
    minCreditScore: body.minCreditScore,
    features: body.features,
    applyUrl: body.applyUrl
  };

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("product_submissions").insert(submissionToRow(submission));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, submission });
}

export async function PATCH(req: Request) {
  if (!enabled()) return NextResponse.json({ error: "Submissions disabled" }, { status: 403 });

  const { id, status, notes } = (await req.json()) as { id: string; status: "approved" | "rejected"; notes?: string };

  const supabase = supabaseAdmin();
  const { error } = await supabase
    .from("product_submissions")
    .update({ status, notes: notes ?? null })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

function submissionToRow(s: ProductSubmission) {
  return {
    id: s.id,
    submitted_at: s.submittedAt,
    status: s.status,
    notes: s.notes ?? null,
    provider_name: s.providerName,
    provider_logo: s.providerLogo ?? null,
    name: s.name,
    tagline: s.tagline,
    product_type: s.productType,
    industries: s.industries,
    amount_min: s.amountMin,
    amount_max: s.amountMax,
    time_to_fund: s.timeToFund,
    min_credit_score: s.minCreditScore,
    features: s.features,
    apply_url: s.applyUrl
  };
}

function rowToSubmission(r: any): ProductSubmission {
  return {
    id: r.id,
    submittedAt: r.submitted_at,
    status: r.status,
    notes: r.notes ?? undefined,
    providerName: r.provider_name,
    providerLogo: r.provider_logo ?? undefined,
    name: r.name,
    tagline: r.tagline,
    productType: r.product_type,
    industries: r.industries ?? [],
    amountMin: r.amount_min,
    amountMax: r.amount_max,
    timeToFund: r.time_to_fund,
    minCreditScore: r.min_credit_score,
    features: r.features ?? [],
    applyUrl: r.apply_url
  };
}
