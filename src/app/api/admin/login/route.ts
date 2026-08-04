import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/shop/admin-auth";
import { clearAdminSessionCookie, setAdminSessionCookie } from "@/lib/shop/admin-session";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !checkAdminPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  return setAdminSessionCookie(NextResponse.json({ ok: true }));
}

export async function DELETE() {
  return clearAdminSessionCookie(NextResponse.json({ ok: true }));
}
