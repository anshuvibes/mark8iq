import { useEffect } from 'react';
import Layout from '../Layout';
import Footer from '../Footer';
import GradientCircle from '../shared/GradientCircle';
import ProductInsideBanner from './ProductInsideBanner';
import CustomImageAccordion from './CustomImageAccordion';
import ProductVideoCard from './ProductVideoCard';
import ProductInsideBuiltFor from './ProductInsideBuiltFor';
import ProductPricing from './ProductPricing';
import ProductInsideInsights from './ProductInsideInsights';
import CustomAccordion from './CustomAccordion';
import ProductInsideOtherProducts from './ProductInsideOtherProducts';
import type { ProductPageData } from '../../data/productPageTypes';

interface ProductPageLayoutProps {
  data: ProductPageData;
}

export default function ProductPageLayout({ data }: ProductPageLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main className="ProductInside_ProductInsidePage__h7vgk">
        {/* Gradient circles background */}
        <div className="ProductInside_gradient_wrap__3Gtf3">
          <div className="ProductInside_gradient_one__Hw_t9 ProductInside_gradient_circles__t7wBC">
            <GradientCircle color={data.color} opacity={0.7} />
          </div>
          <div className="ProductInside_gradient_two__KvzK0 ProductInside_gradient_circles__t7wBC">
            <GradientCircle color={data.color} opacity={0.4} />
          </div>
        </div>

        {/* Section 1: Banner */}
        <ProductInsideBanner
          title={data.bannerTitle}
          description={data.bannerDescription}
          bannerImage={data.bannerImage}
          color={data.color}
        />

        {/* Section 2: Image Accordion */}
        <CustomImageAccordion
          sectionTitle={data.accordionSectionTitle}
          introText={data.accordionIntroText}
          items={data.accordionItems}
          images={data.accordionImages}
          color={data.color}
        />

        {/* Section 3: Video Card */}
        <ProductVideoCard
          logoSrc={data.videoLogo}
          videoSrc={data.videoSrc}
          title={data.videoTitle}
        />

        {/* Section 4: Built For / Feature Cards */}
        {data.featureCards.length > 0 && (
          <ProductInsideBuiltFor
            sectionTitle={data.featureSectionTitle}
            cards={data.featureCards}
            color={data.color}
          />
        )}

        {/* Section 5: Pricing */}
        <ProductPricing
          sectionTitle={data.pricingSectionTitle}
          slabValues={data.pricingSlabs}
          marketplaces={data.marketplaces}
          color={data.color}
        />

        {/* Section 6: Insights */}
        <ProductInsideInsights
          sectionTitle={data.insightsSectionTitle}
          cards={data.insightCards}
        />

        {/* Section 7: FAQ */}
        {data.faqItems.length > 0 && (
          <CustomAccordion
            sectionTitle={data.faqSectionTitle}
            items={data.faqItems}
          />
        )}

        {/* Section 8: Other Products */}
        <ProductInsideOtherProducts
          products={data.otherProducts}
          color={data.color}
        />
      </main>
      <Footer />
    </Layout>
  );
}
