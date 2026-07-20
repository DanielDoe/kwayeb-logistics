import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kwayeb Logistics for shipping quotes and support.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" description="Speak with our team about shipping from China.">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <ContactForm />
          </CardContent>
        </Card>
        <div className="space-y-4 text-sm text-muted">
          <p><strong className="text-foreground">Email:</strong> {SITE.email}</p>
          <p><strong className="text-foreground">Phone:</strong> {SITE.phone}</p>
          <p><strong className="text-foreground">Website:</strong> {SITE.domain}</p>
          <p className="pt-4">We respond to all inquiries within 24 hours on business days.</p>
        </div>
      </div>
    </PageShell>
  );
}
