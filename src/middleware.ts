import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For now, we'll just check if there's a user item in localStorage
  // In a real app, we would verify the session token with the backend
  const user = request.cookies.get("user");
  const isLoggedIn = !!user;

  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and trying to access the login page
  if (isLoggedIn && pathname === "/login") {
    // Redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
