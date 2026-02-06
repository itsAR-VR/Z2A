import { NextResponse, type NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Zero-to-Agent Admin"',
    },
  });
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_BASIC_AUTH_USER || "";
  const expectedPass =
    process.env.ADMIN_BASIC_AUTH_PASS ||
    process.env.ADMIN_BASIC_AUTH_PASSWORD ||
    "";

  // If unset, fail closed.
  if (!expectedUser || !expectedPass) {
    return unauthorized();
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return unauthorized();
  }

  const b64 = auth.slice("Basic ".length);
  let decoded = "";
  try {
    decoded = atob(b64);
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();

  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
