import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request);
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("jwt-token")?.value || null;
  console.log("Path:", path, "Token:", token);
  const publicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgetpassword" ||
    path === "/updatepassword";
  if (publicPath && token) {
    return NextResponse.redirect(new URL(path, request.nextUrl));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/profiles",
    "/logout",
    "/signup",
    "/verifyemail",
    "/forgetpassword",
    "/updatepassword",
  ],
};
