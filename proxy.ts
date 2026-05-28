import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
