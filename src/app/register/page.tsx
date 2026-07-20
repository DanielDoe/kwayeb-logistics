import { PageShell } from "@/components/layout/page-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <PageShell title="Create Account" description="Register to manage shipments, quotes, and invoices.">
      <RegisterForm />
    </PageShell>
  );
}
