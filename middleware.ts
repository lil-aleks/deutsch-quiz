import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookie = await cookies()
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.endsWith("/login")) {
    const password = cookie.get("password")?.value;
    if (!password || process.env.ADMIN_PASSWORD != password) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/quiz")) {
    const username = cookie.get("name")?.value
    if (!username) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}