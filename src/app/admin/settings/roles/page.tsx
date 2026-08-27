import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { PERMISSIONS, ROLE_PERMISSIONS } from "@/lib/auth/permissions";
import { STAFF_ROLES, STAFF_ROLE_LABELS } from "@/lib/auth/roles";

export default function AdminRolesPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="System"
        title="Roles & Permissions"
        description="Department-based roles with expandable permission sets."
      />
      <div className="space-y-4">
        {STAFF_ROLES.map((role) => (
          <div key={role} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">{STAFF_ROLE_LABELS[role]}</h2>
            <p className="mt-1 text-sm text-muted">Role: {role}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ROLE_PERMISSIONS[role].map((permission) => (
                <span
                  key={permission}
                  className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent-text"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">
        {PERMISSIONS.length} permissions defined · expandable for manager vs associate tiers
      </p>
    </>
  );
}
