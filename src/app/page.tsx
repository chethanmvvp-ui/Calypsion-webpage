import LandingHero from '@/components/LandingHero';
import FullstackIoT from '@/components/FullstackIoT';
import AboutSection from '@/components/AboutSection';
import ProcessPillars from '@/components/ProcessPillars';
import ProductPortfolio from '@/components/ProductPortfolio';
import RDPrograms from '@/components/RDPrograms';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <LandingHero />
      <FullstackIoT />
      <AboutSection />
      <ProcessPillars />
      <ProductPortfolio />
      <RDPrograms />
      <ContactSection />
    </main>
  );
}
