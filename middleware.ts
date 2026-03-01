import { NextRequest, NextResponse } from "next/server";

function adminEnabled() {
  return process.env.ADMIN_ENABLED === "true";
}

function submissionsEnabled() {
  return process.env.SUBMISSIONS_ENABLED === "true";
}

function basicAuthEnabled() {
  return !!process.env.BASIC_AUTH_USER && !!process.env.BASIC_AUTH_PASS;
}

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Moonshine Admin"' }
  });
}

function checkBasicAuth(req: NextRequest) {
  if (!basicAuthEnabled()) return true;

  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const b64 = auth.replace("Basic ", "");
  const decoded = Buffer.from(b64, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  return user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/portal/admin")) {
    if (!adminEnabled()) return NextResponse.redirect(new URL("/", req.url));
    if (!checkBasicAuth(req)) return unauthorized();
  }

  if (pathname.startsWith("/api/submissions")) {
    if (!submissionsEnabled()) return NextResponse.json({ error: "Submissions disabled" }, { status: 403 });
    if (req.method === "PATCH") {
      if (!adminEnabled()) return NextResponse.json({ error: "Admin disabled" }, { status: 403 });
      if (!checkBasicAuth(req)) return unauthorized();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/admin/:path*", "/api/submissions/:path*"]
};
