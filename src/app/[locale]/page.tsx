import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

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
      <EmergencyBanner />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedProjects />
        <WhyUs />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
