import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./lib/supabaseTypes";
import { supabase } from "./lib/supabaseClient";

export default async function middleware(req: NextRequest) {
  const cookie = await cookies();
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !req.nextUrl.pathname.endsWith("/login")
  ) {
    const password = cookie.get("password")?.value;
    if (!password || process.env.ADMIN_PASSWORD != password) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  
  const username = cookie.get("name")?.value;
  if (!username) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    if ((await getUser(username)) !== null) {
      if (!req.nextUrl.pathname.endsWith("/complete")) {
        return NextResponse.redirect(new URL("/quiz/complete", req.url));
      }
    } else {
      if (req.nextUrl.pathname.endsWith("/complete")) {
        return NextResponse.redirect(new URL("/quiz", req.url));
      }
    }
  }
  
  return NextResponse.next();
}

const getUser: (name: string) => Promise<User | null> = async (name: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", name)
    .single();
    
  if (error) {
    return null;
  } else {
    return data;
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
