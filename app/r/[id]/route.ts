import { NextResponse } from "next/server";
import { products, quoteUrl } from "@/lib/data/directory";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const destination = product?.applyUrl || quoteUrl;

  return NextResponse.redirect(destination, 302);
}
