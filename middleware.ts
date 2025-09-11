import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function middleware(request: Request) {
  const nonce = crypto.getRandomValues(new Uint8Array(16)).reduce((acc, byte) =>
    acc + byte.toString(16).padStart(2, '0'), ''
  );
  const csp = [
    "default-src 'self';",
    "script-src 'self' 'nonce-" + nonce + "' https://challenges.cloudflare.com;",
    "style-src 'self' 'nonce-" + nonce + "' 'unsafe-inline' https://fonts.googleapis.com;",
    "font-src 'self' https://fonts.gstatic.com;",
    "img-src 'self' data:;",
    "connect-src 'self';",
    "frame-src https://challenges.cloudflare.com;",
    "form-action 'self';",
    "base-uri 'self';",
    "object-src 'none'"
  ].join(' ');

  const response = NextResponse.next();
  
  // Security headers configuration
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};