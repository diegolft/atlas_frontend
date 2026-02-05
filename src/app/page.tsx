import { PageBackground } from "@/components/layout/page-background";
import { Header } from "@/components/layout/header";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductSection } from "@/components/sections/product-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <PageBackground>
      <Header />

      <main>
        <ScrollReveal initialVisible>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProductSection />
        </ScrollReveal>
        <ScrollReveal>
          <ComparisonSection />
        </ScrollReveal>
        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>
      </main>

      <Footer />
    </PageBackground>
  );
}
