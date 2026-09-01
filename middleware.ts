// TEMPORARILY DISABLED — admin auth gate turned off while debugging a
// NextAuth session/cookie issue in production. Re-enable by restoring:
//
// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/admin/((?!login).*)"] };

import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
