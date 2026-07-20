import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <PageShell title="Sign In" description="Access your Kwayeb Logistics customer dashboard.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </PageShell>
  );
}
