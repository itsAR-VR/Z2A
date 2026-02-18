import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { StickyApplyBar } from "@/components/StickyApplyBar";
import { Hero } from "@/components/sections/Hero";
import { Why } from "@/components/sections/Why";
import { Speakers } from "@/components/sections/Speakers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Agenda } from "@/components/sections/Agenda";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFooter } from "@/components/sections/CTAFooter";

export const metadata: Metadata = {
  title: "Zero-to-Agent for Individuals | Weekend Workshop",
  description:
    "Build a working AI agent in a focused in-person weekend workshop. Apply to reserve your seat.",
  openGraph: {
    title: "Zero-to-Agent for Individuals",
    description:
      "Focused in-person weekend workshop for builders who want to finish real AI workflows.",
    type: "website",
  },
};

export default function IndividualsPage() {
  return (
    <LenisProvider>
      <Nav />
      <StickyApplyBar />
      <main>
        <Hero />
        <Why />
        <Speakers />
        <HowItWorks />
        <Agenda />
        <Pricing />
        <FAQ />
        <CTAFooter />
      </main>
    </LenisProvider>
  );
}
