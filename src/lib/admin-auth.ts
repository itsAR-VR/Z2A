/**
 * Extract the admin username from a Basic Auth header.
 * Middleware already validates credentials; this just extracts the username for audit logging.
 */
export function getAdminActor(req: Request): string {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Basic ")) return "unknown";
  try {
    const decoded = atob(auth.slice("Basic ".length));
    const sep = decoded.indexOf(":");
    return sep === -1 ? "unknown" : decoded.slice(0, sep);
  } catch {
    return "unknown";
  }
}
