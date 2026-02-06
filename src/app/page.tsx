import { Nav } from "@/components/Nav";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Hero } from "@/components/sections/Hero";
import { Why } from "@/components/sections/Why";
import { Speakers } from "@/components/sections/Speakers";
import { Outcomes } from "@/components/sections/Outcomes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Agenda } from "@/components/sections/Agenda";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFooter } from "@/components/sections/CTAFooter";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <Why />
        <Speakers />
        <Outcomes />
        <HowItWorks />
        <Agenda />
        <Pricing />
        <FAQ />
        <CTAFooter />
      </main>
    </LenisProvider>
  );
}
