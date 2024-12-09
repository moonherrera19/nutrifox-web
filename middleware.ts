import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
// import { rutas } from "./lib/rutas";
const unAuthRoutes = ["/", "/registro"];

export function middleware(request: NextRequest) {
  const userCookie = cookies().get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;
  const route = request.nextUrl.pathname;

  const isunAuthRoutes = unAuthRoutes.includes(route);
  if (isunAuthRoutes) {
    if (user) return NextResponse.redirect(new URL("/aplicacion", request.url));
  } else if (!user) return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/aplicacion/:path*", "/:path", "/registro:path"], // Match all routes under /aplicacion
};
