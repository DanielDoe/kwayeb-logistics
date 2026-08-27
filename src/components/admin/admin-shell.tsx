import { AdminNav } from "@/components/admin/admin-nav";
import { AdminChromeProvider } from "@/components/admin/admin-chrome";

interface AdminShellProps {
  children: React.ReactNode;
  profile: {
    full_name: string | null;
    email: string;
    role: string;
    company: string | null;
  };
}

export function AdminShell({ children, profile }: AdminShellProps) {
  return (
    <AdminChromeProvider role={profile.role}>
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <AdminNav profile={profile} />
          <main className="relative z-10 min-w-0 flex-1 pb-6">{children}</main>
        </div>
      </div>
    </AdminChromeProvider>
  );
}
