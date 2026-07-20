import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppearanceSettings } from "@/components/theme/appearance-settings";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-1 text-muted">Manage your profile, appearance, and notification preferences.</p>
      <div className="mt-8">
        <AppearanceSettings />
      </div>
    </DashboardShell>
  );
}
