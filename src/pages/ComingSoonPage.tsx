import { useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

export default function ComingSoonPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <h1 className="fs_50 text_center">This page is coming soon.</h1>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
