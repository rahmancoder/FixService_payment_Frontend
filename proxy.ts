import { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getNewAccessToken } from './service/refreshToken';
import { jwtUtils } from './utils/jwt';

// NOTE: this file is the actual Next.js "Proxy" (the renamed Middleware
// convention) — it runs on every matched request, before any page renders.
// It is NOT the backend-fetch helper; that lives in `lib/backendFetch.ts`.

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/services', '/technicians'];

const dashboardByRole: Record<string, string> = {
    CUSTOMER: '/dashboard',
    TECHNICIAN: '/technician-dashboard',
    ADMIN: '/admin-dashboard',
};

// proxy.ts always runs on the Node.js runtime in Next.js 16 (it can't be
// configured to run on Edge) — that's what makes using `jsonwebtoken` here
// safe, unlike the old middleware.ts convention.
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    let decodedAccessToken = accessToken
        ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        : null;

    const decodedRefreshToken = refreshToken
        ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
        : null;

    const response = NextResponse.next();

    // Access token expired (or missing) but refresh token still valid —
    // silently mint a new access token instead of forcing a re-login.
    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken(refreshToken!);

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            response.cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24,
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(newAccessToken, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    let userRole: string | null = null;

    if (!decodedAccessToken?.success) {
        // Both tokens are gone/invalid — clear whatever's left so we don't keep
        // retrying a dead refresh token on every request.
        response.cookies.delete(ACCESS_TOKEN_COOKIE);
        if (!decodedRefreshToken?.success) {
            response.cookies.delete(REFRESH_TOKEN_COOKIE);
        }
    } else if (decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role as string;
    }

    const isLoggedIn = Boolean(accessToken && decodedAccessToken?.success);

    // Logged-in user hitting /login or /register — send them to their dashboard.
    if (isLoggedIn && AUTH_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL(dashboardByRole[userRole || ''] || '/', request.url));
    }

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));

    // Everything else requires a session.
    if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based access control for each dashboard + the booking flow.
    if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith('/technician-dashboard') && userRole !== 'TECHNICIAN') {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith('/book') && userRole !== 'CUSTOMER') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return isLoggedIn ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};