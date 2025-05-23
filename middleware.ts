import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const { pathname } = request.nextUrl;

  if (
    !token &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.next();
  }
  if (
    token &&
    (pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up") ||
      pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = decodeJwt(token);

  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  if (!decodedToken.admin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (decodedToken.admin && pathname.startsWith("/account/my-favourites")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
