export interface AccordionItem {
  title: string;
  description: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface InsightCard {
  image: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OtherProduct {
  href: string;
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}

export interface MarketplaceItem {
  logo: string;
  name: string;
}

export interface ProductPageData {
  color: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerImage: string;
  accordionSectionTitle: string;
  accordionIntroText: string;
  accordionItems: AccordionItem[];
  accordionImages: string[];
  videoSrc: string;
  videoLogo: string;
  videoTitle: string;
  featureSectionTitle: string;
  featureCards: FeatureCard[];
  pricingSectionTitle: string;
  pricingSlabs: string[];
  marketplaces: MarketplaceItem[];
  insightsSectionTitle: string;
  insightCards: InsightCard[];
  faqSectionTitle: string;
  faqItems: FAQItem[];
  otherProducts: OtherProduct[];
}
