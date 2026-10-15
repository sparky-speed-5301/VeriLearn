import Hero from '@/components/sections/Hero';
import BenefitsSection from '@/components/sections/home/BenefitsSection';
import OurSolutionSection from '@/components/sections/home/OurSolutionSection';
import FeaturesSection from '@/components/sections/home/FeaturesSection';
import Process from '@/components/sections/home/Process';
import CallToAction from '@/components/sections/home/CallToAction';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="pageShell">
        <BenefitsSection />
        <OurSolutionSection />
        <FeaturesSection />
        <Process />
        <CallToAction />
      </div>
    </>
  );
}
