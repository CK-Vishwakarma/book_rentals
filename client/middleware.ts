import { NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS, USER_ROLE } from "./constants/common";
import { PAGE_ROUTES } from "./constants/pageRoutes";

// List of protected routes
const adminRoutes = [PAGE_ROUTES.adminRoutes.dashboard,PAGE_ROUTES.booksRoutes.books];
const memberRoutes = [PAGE_ROUTES.memberRoutes.dashboard,PAGE_ROUTES.booksRoutes.books];
const publicRoutes = [PAGE_ROUTES.authRoutes.login, PAGE_ROUTES.authRoutes.register];
export function middleware(request: NextRequest) {
  console.log("middle run");

  const { pathname } = request.nextUrl;
  console.log(pathname, "pathname");

  let token = request.cookies.get(COOKIE_KEYS.token)?.value || "";
  let role = (request.cookies.get(COOKIE_KEYS.role)?.value)?.toLocaleLowerCase() || "";
  console.log("---",role, "from middle",request.url,"====");

  // If not logged in, redirect to login page
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(PAGE_ROUTES.authRoutes.login, request.url));
  }

  // // If logged in, prevent access to login and register pages
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(role === USER_ROLE.ADMIN ? PAGE_ROUTES.adminRoutes.dashboard : PAGE_ROUTES.memberRoutes.dashboard, request.url));
  }

  // // Role-based route access
  // if (role === USER_ROLE.ADMIN && !adminRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL(PAGE_ROUTES.adminRoutes.dashboard, request.url));
  // }

  // if (role === USER_ROLE.MEMBER && !memberRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL(PAGE_ROUTES.memberRoutes.dashboard, request.url));
  // }

  // Continue to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: [ "/admin/dashboard","/members/dashboard","/books"

    // '/((?!login|register).*)',
  ],
};
