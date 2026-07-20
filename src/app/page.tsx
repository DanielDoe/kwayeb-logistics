import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { RoutesSection } from "@/components/home/routes-section";
import { Services } from "@/components/home/services";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <RoutesSection />
      <CtaBanner />
    </>
  );
}
