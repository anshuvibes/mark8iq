import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import WhyUsPage from "./pages/WhyUsPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import ProductAdsPage from "./pages/ProductAdsPage";
import ProductSightPage from "./pages/ProductSightPage";
import ProductShelfPage from "./pages/ProductShelfPage";
import ProductRecoPage from "./pages/ProductRecoPage";
import ProductReturnsPage from "./pages/ProductReturnsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import BlogSlugPage from "./pages/BlogSlugPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import HomePageV2 from "./pages/HomePageV2";
import DeckPage from "./pages/DeckPage";
import DashboardAdsPage from "./pages/DashboardAdsPage";

const App = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/get-in-touch" element={<ContactPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/why-us" element={<WhyUsPage />} />
      <Route path="/success-stories" element={<SuccessStoriesPage />} />
      <Route path="/products/ads" element={<ProductAdsPage />} />
      <Route path="/products/sight" element={<ProductSightPage />} />
      <Route path="/products/shelf" element={<ProductShelfPage />} />
      <Route path="/products/reco" element={<ProductRecoPage />} />
      <Route path="/products/returns" element={<ProductReturnsPage />} />
      <Route path="/blogs" element={<ComingSoonPage />} />
      <Route path="/blogs/:slug" element={<BlogSlugPage />} />
      <Route path="/tutorials" element={<ComingSoonPage />} />
      <Route path="/faqs" element={<ComingSoonPage />} />
      <Route path="/news" element={<ComingSoonPage />} />
      <Route path="/events" element={<ComingSoonPage />} />
      <Route path="/career" element={<ComingSoonPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="/home-v2" element={<HomePageV2 />} />
      <Route path="/deck" element={<DeckPage />} />
      <Route path="/dashboard/ads" element={<DashboardAdsPage />} />
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
