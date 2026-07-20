import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { HOW_IT_WORKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About Kwayeb Logistics — your trusted bridge from China to the world.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About Kwayeb Logistics"
      description="Connecting international customers with reliable shipping and product sourcing from China."
    >
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted">
        <p>
          Kwayeb Logistics helps individuals, online sellers, importers, and businesses ship goods
          from China to destinations worldwide — including Ghana, the USA, the UK, Europe, Africa, and Australia.
        </p>
        <p>
          We offer air freight, sea freight, express delivery, FCL and LCL container shipping,
          cargo consolidation, China warehousing, supplier pickup, customs-support workflows,
          and door-to-door delivery.
        </p>
        <h2 className="text-lg font-semibold text-foreground">How we work</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step}><strong className="text-foreground">{step.title}</strong> — {step.description}</li>
          ))}
        </ol>
        <p className="text-xs">
          Kwayeb Logistics is a freight-forwarding coordination platform. We do not claim to be a
          licensed customs broker, carrier, or insurer unless explicitly verified and disclosed.
        </p>
      </div>
      <Link href="/source" className="mt-8 inline-block">
        <Button>Get a Freight Quote</Button>
      </Link>
    </PageShell>
  );
}
