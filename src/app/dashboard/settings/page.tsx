import { AppearanceSettings } from "@/components/theme/appearance-settings";
import { DashboardSubpageHeader } from "@/components/dashboard/dashboard-page-header";
import { getUserProfile } from "@/lib/supabase/server-auth";
import { Card, CardContent } from "@/components/ui/card";

export default async function SettingsPage() {
  const profile = await getUserProfile();

  return (
    <div className="space-y-4 sm:space-y-6">
      <DashboardSubpageHeader />

      <Card>
        <CardContent className="space-y-3 p-4 sm:p-6">
          <h2 className="font-semibold text-foreground">Profile</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Name</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{profile?.full_name ?? "—"}</dd>
            </div>
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Email</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{profile?.email ?? "—"}</dd>
            </div>
            <div className="rounded-xl border border-border bg-surface/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Account type</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {profile?.role === "business" ? "Business" : "Customer"}
              </dd>
            </div>
            {profile?.company ? (
              <div className="rounded-xl border border-border bg-surface/50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Company</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile.company}</dd>
              </div>
            ) : null}
          </dl>
        </CardContent>
      </Card>

      <AppearanceSettings />
    </div>
  );
}
