import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const privateRoutes = [
    "/add-ideas",
    "/my-ideas",
    "/my-interactions",
    "/ideas/",
  ];

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  // ❌ ONLY redirect when NO token
  if (isPrivate && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
