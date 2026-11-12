import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

// Pages are statically prerendered, so Next.js cannot attach a per-request nonce
// to its inline scripts/styles. A nonce in the CSP would also make browsers ignore
// 'unsafe-inline' and block hydration, so this policy uses 'unsafe-inline' instead.
// See node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md ("Without Nonces").
const posthogHosts = "https://us.i.posthog.com https://us-assets.i.posthog.com";

const csp = [
  "default-src 'self';",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://static.cloudflareinsights.com ${posthogHosts};`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  "font-src 'self' https://fonts.gstatic.com;",
  "img-src 'self' data:;",
  // Cloudflare Web Analytics: beacon script from static.cloudflareinsights.com, reports to cloudflareinsights.com
  `connect-src 'self' https://cloudflareinsights.com ${posthogHosts};`,
  "frame-src https://challenges.cloudflare.com;",
  "form-action 'self';",
  "base-uri 'self';",
  "object-src 'none'",
].join(" ");

export function middleware() {
  const response = NextResponse.next();

  // Security headers configuration
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
