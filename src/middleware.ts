// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    // If the user is not logged in and tries to access a protected route,
    // redirect them to the sign-in page.
    if (!sessionCookie && request.nextUrl.pathname.startsWith('/')) { // Adjust '/dashboard' to your protected route
        const signInUrl = new URL('/auth', request.url); // Adjust '/auth' to your sign-in page
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    // Specify the routes the middleware applies to.
    // Match all routes except for API routes, Next.js static files, and public files.
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)', // Adjust 'auth' if your sign-in page is different
    ],
};