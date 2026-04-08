import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

export default function BlogSlugPage() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
          <h1 className="fs_50 text_center">This page is coming soon.</h1>
          <p className="fs_18 text_center">Blog: {slug}</p>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
