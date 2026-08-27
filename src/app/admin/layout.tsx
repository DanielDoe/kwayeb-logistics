import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { isStaffRole } from "@/lib/auth/roles";
import { getUserProfile } from "@/lib/supabase/server-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getUserProfile();
  if (!profile || !isStaffRole(profile.role)) {
    redirect("/login?redirect=%2Fadmin");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
