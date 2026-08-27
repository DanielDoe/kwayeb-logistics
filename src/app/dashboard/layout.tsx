import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getUserProfile } from "@/lib/supabase/server-auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getUserProfile();
  if (!profile) redirect("/login?redirect=%2Fdashboard");

  return <DashboardShell profile={profile}>{children}</DashboardShell>;
}
