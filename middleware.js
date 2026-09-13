import { next } from '@vercel/edge';

// Protect the whole site with HTTP Basic Auth.
// Credentials are read from Vercel Environment Variables (never hard-coded):
//   BASIC_AUTH_USER      e.g. "stpi"
//   BASIC_AUTH_PASSWORD  e.g. "your-strong-password"
//
// Run on all paths EXCEPT the login/asset internals Vercel needs.
export const config = {
  matcher: ['/((?!_vercel|favicon.ico|robots.txt).*)'],
};

export default function middleware(request) {
  const USER = process.env.BASIC_AUTH_USER;
  const PASS = process.env.BASIC_AUTH_PASSWORD;

  // Fail-closed: if credentials are not configured, block access so the
  // site is never accidentally left open while "protected".
  if (!USER || !PASS) {
    return new Response(
      'Site is password-protected but credentials are not configured. ' +
        'Set BASIC_AUTH_USER and BASIC_AUTH_PASSWORD in Vercel project settings.',
      { status: 503 }
    );
  }

  const header = request.headers.get('authorization');
  if (header) {
    const encoded = header.split(' ')[1] || '';
    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch (_e) {
      decoded = '';
    }
    const idx = decoded.indexOf(':');
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    if (user === USER && pass === PASS) {
      return next(); // authenticated → continue to the static content
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected", charset="UTF-8"',
    },
  });
}
