import { useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { V2ThemeProvider } from '../components/home-v2/ThemeContext';
import HeroV2 from '../components/home-v2/HeroV2';
import TrustStripV2 from '../components/home-v2/TrustStripV2';
import FragmentationV2 from '../components/home-v2/FragmentationV2';
import ProductSuiteV2 from '../components/home-v2/ProductSuiteV2';
import RoleBasedValueV2 from '../components/home-v2/RoleBasedValueV2';
import AgentMarkV2 from '../components/home-v2/AgentMarkV2';
import AgentFoundryV2 from '../components/home-v2/AgentFoundryV2';
import ProofV2 from '../components/home-v2/ProofV2';
import CredentialsV2 from '../components/home-v2/CredentialsV2';
import AgentMarkWidget from '../components/home-v2/AgentMarkWidget';

export default function HomePageV2() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <V2ThemeProvider>
      <Layout>
        <main>
          <HeroV2 />
          <TrustStripV2 />
          <FragmentationV2 />
          <ProductSuiteV2 />
          <RoleBasedValueV2 />
          <AgentMarkV2 />
          <AgentFoundryV2 />
          <ProofV2 />
          <CredentialsV2 />
        </main>
        <Footer />
        <AgentMarkWidget />
      </Layout>
    </V2ThemeProvider>
  );
}
