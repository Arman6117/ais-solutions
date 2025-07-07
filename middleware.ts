import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect only /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_otp_token")?.value;
 console.log(token)
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login/admin", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/auth/login/admin", request.url));
    }

    return NextResponse.next(); // ✅ Allow access
  } catch (err) {
    console.error("JWT Error:", err);
    return NextResponse.redirect(new URL("/auth/login/admin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // ✅ apply middleware only to admin routes
};
