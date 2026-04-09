import { useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import HeroBanner from '../components/home/HeroBanner';
import EcommGrowth from '../components/home/EcommGrowth';
import BuildingBlocks from '../components/home/BuildingBlocks';
import MarketMarquee from '../components/home/MarketMarquee';
import ProductsSection from '../components/home/ProductsSection';
import TrustedCertified from '../components/home/TrustedCertified';
import ImageAccordion from '../components/home/ImageAccordion';
import StoriesSection from '../components/home/StoriesSection';
import IqInsight from '../components/home/IqInsight';
import HomeFaq from '../components/home/HomeFaq';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main className="Home_HomePage__ceAKX">
        <div className="Home_gradient_wrap__ullU_">
          <div className="Home_gradient_one__5X6bY Home_gradient_circles__i51jj">
            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.7 }}></div>
          </div>
          <div className="Home_gradient_two__2oNM7 Home_gradient_circles__i51jj">
            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.4 }}></div>
          </div>
        </div>
        <div className="Home_content__dmT6r">
          <HeroBanner />
          <EcommGrowth />
          <BuildingBlocks />
          <MarketMarquee />
          <ProductsSection />
          <TrustedCertified />
          <ImageAccordion />
          <StoriesSection />
          <IqInsight />
          <HomeFaq />
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
