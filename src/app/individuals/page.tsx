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
import { ProofEvidence } from "@/components/sections/ProofEvidence";

export const metadata: Metadata = {
  title: "Zero-to-Agent for Individuals | Weekend Workshop",
  description:
    "Build and ship a working AI agent in a focused in-person weekend workshop. Apply to reserve your seat.",
  openGraph: {
    title: "Zero-to-Agent for Individuals",
    description:
      "Focused in-person weekend workshop for builders who want to ship real AI workflows.",
    type: "website",
  },
};

const individualsProofStats = [
  {
    value: "56%",
    label: "AI skill premium",
    detail: "AI-capable workers show materially higher compensation.",
    sourceHref:
      "https://www.pwc.com/gx/en/issues/data-and-analytics/publications/artificial-intelligence-study.html",
  },
  {
    value: "300M",
    label: "Jobs exposed to AI change",
    detail: "Large workforce shares are in transition, increasing execution pressure.",
    sourceHref: "https://www.cnbc.com/2023/03/28/ai-automation-could-impact-300-million-jobs-heres-which-ones.html",
  },
];

const individualsProofQuotes = [
  {
    quote:
      "AI won't replace humans. But humans who use AI will replace those who don't.",
    author: "Sam Altman",
    role: "CEO and Co-Founder, OpenAI",
    sourceHref: "https://x.com/sama/status/1751733984631882743",
  },
  {
    quote: "People who aren't keeping up even over the last 30 days already have a deprecated worldview on this topic.",
    author: "Andrej Karpathy",
    role: "Co-Founder, OpenAI",
    sourceHref: "https://www.infoworld.com/article/4111829/ais-trust-tax-for-developers.html",
  },
];

export default function IndividualsPage() {
  return (
    <LenisProvider>
      <Nav />
      <StickyApplyBar />
      <main>
        <Hero />
        <ProofEvidence
          id="proof"
          eyebrow="Signal"
          heading="For makers, urgency compounds."
          lead="Workshops and execution speed help, but long-term value comes from what teams do after they deploy."
          stats={individualsProofStats}
          quotes={individualsProofQuotes}
        />
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
