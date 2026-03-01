export function requireAuth() {
  return { ok: false, reason: "AUTH_REQUIRED" as const };
}
