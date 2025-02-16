import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  // Paths that require authentication
  const authPaths = ["/checkout", "/profile"]
  // Paths that are only for non-authenticated users
  const publicPaths = ["/login", "/register", "/admin"]

  const path = request.nextUrl.pathname
  const isAuthPath = authPaths.some((ap) => path.startsWith(ap))
  const isPublicPath = publicPaths.includes(path)

  if (isAuthPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check for admin routes
    // if (path.startsWith("/admin") && payload.role !== "admin") {
    //   return NextResponse.redirect(new URL("/", request.url))
    // }
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*", "/admin/", "/login", "/register"],
}

