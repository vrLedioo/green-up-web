import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyUs from "@/components/sections/WhyUs";
import CTABanner from "@/components/sections/CTABanner";
// NOTE: The Testimonials section is temporarily hidden until the client collects
// real customer reviews. The <Testimonials /> component and its translation data
// are intentionally kept in the codebase — re-add the import and the FloorSection
// below (and restore the "Voices" floor in ElevatorFrame's FLOORS) to bring it back.
import ElevatorFrame from "@/components/layout/ElevatorFrame";
import FloorSection from "@/components/layout/FloorSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "Green Up — Premium Elevator Solutions Kosovo",
    description: t("subheadline"),
  };
}

export default function HomePage() {
  return (
    <>
      <ElevatorFrame>
        <main>
          <FloorSection index={0} label="G" name="Welcome" tone="dark" tiltIntensity={0}>
            <Hero />
          </FloorSection>
          <FloorSection index={1} label="02" name="Services" tone="light">
            <Services />
          </FloorSection>
          <FloorSection index={2} label="03" name="Projects" tone="light">
            <FeaturedProjects />
          </FloorSection>
          <FloorSection index={3} label="04" name="Why Us" tone="light">
            <WhyUs />
          </FloorSection>
          <FloorSection index={4} label="PH" name="Arrival" tone="dark">
            <CTABanner />
          </FloorSection>
        </main>
      </ElevatorFrame>
      <Footer />
    </>
  );
}
