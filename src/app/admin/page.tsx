import { cookies } from "next/headers";
import { verifyAdminSessionToken, adminCookieName } from "@/lib/shop/admin-auth";
import { AdminApp } from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const jar = await cookies();
  const authed = verifyAdminSessionToken(jar.get(adminCookieName())?.value);
  return <AdminApp initiallyAuthed={authed} />;
}
