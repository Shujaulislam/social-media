import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes (accessible without authentication)
  const publicRoutes = ["/", "/login", "/register"];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Retrieve the token from cookies
  const token = req.cookies.get("firebaseToken")?.value;

  // If the user is not authenticated, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access to authenticated routes
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/feed/:path*", "/profile/:path*", "/protected/:path*"], // Add your protected route patterns
};
