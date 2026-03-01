import { NextResponse } from "next/server";
import { products as staticProducts } from "@/lib/data/products";
import { supabaseAdmin } from "@/lib/supabase";

function redirectsEnabled() {
  return process.env.REDIRECTS_ENABLED !== "false";
}

function submissionsEnabled() {
  return process.env.SUBMISSIONS_ENABLED === "true";
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!redirectsEnabled()) return NextResponse.json({ error: "Redirects disabled" }, { status: 403 });

  const id = params.id;

  const staticHit = staticProducts.find((p) => p.id === id);
  if (staticHit) {
    await track(id, staticHit.applyUrl, req);
    return NextResponse.redirect(staticHit.applyUrl, 302);
  }

  if (submissionsEnabled() && id.startsWith("sub-")) {
    const subId = id.replace(/^sub-/, "");
    try {
      const supabase = supabaseAdmin();
      const { data, error } = await supabase
        .from("product_submissions")
        .select("id, apply_url")
        .eq("id", subId)
        .eq("status", "approved")
        .maybeSingle();

      if (!error && data?.apply_url) {
        await track(id, data.apply_url, req);
        return NextResponse.redirect(data.apply_url, 302);
      }
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

async function track(productId: string, applyUrl: string, req: Request) {
  try {
    const supabase = supabaseAdmin();
    const ua = req.headers.get("user-agent") ?? "";
    const ref = req.headers.get("referer") ?? "";
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? null;

    await supabase.from("apply_clicks").insert({
      product_id: productId,
      apply_url: applyUrl,
      user_agent: ua,
      referer: ref,
      ip
    });
  } catch {
    // never block redirect
  }
}
