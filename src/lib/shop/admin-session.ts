import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminSessionMaxAge,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/shop/admin-auth";

export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(adminCookieName())?.value);
}

export function unauthorizedJson() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function setAdminSessionCookie(res: NextResponse) {
  res.cookies.set(adminCookieName(), createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge(),
  });
  return res;
}

export function clearAdminSessionCookie(res: NextResponse) {
  res.cookies.set(adminCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
