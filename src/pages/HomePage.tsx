import { useRef, useEffect } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { homePageHTML } from './homePageContent';

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  useNavigateLinks(ref);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Accordion click logic for "Engineered to power" section
    const accItems = el.querySelectorAll('.CustomImageAccordian_acc_item__SpMrV');
    const accImages = el.querySelectorAll('.CustomImageAccordian_acc_img_item__SCb4Z, .CustomImageAccordian_active_img__rIQ__');
    
    const handleAccClick = (index: number) => {
      accItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add('CustomImageAccordian_active_item__IkUwc');
        } else {
          item.classList.remove('CustomImageAccordian_active_item__IkUwc');
        }
      });
      // Also handle images - find all img containers in the right panel
      const imgWrap = el.querySelector('.CustomImageAccordian_acc_img_wrap__dnQfA');
      if (imgWrap) {
        const imgs = imgWrap.children;
        for (let i = 0; i < imgs.length; i++) {
          if (i === index) {
            imgs[i].className = 'CustomImageAccordian_acc_img_item__SCb4Z CustomImageAccordian_active_img__rIQ__';
          } else {
            imgs[i].className = 'CustomImageAccordian_acc_img_item__SCb4Z false';
          }
        }
      }
    };

    accItems.forEach((item, i) => {
      const title = item.querySelector('.CustomImageAccordian_acc_title__sTfie');
      if (title) {
        (title as HTMLElement).addEventListener('click', () => handleAccClick(i));
      }
    });

    // Also handle the mobile/desktop CustomAccordian version
    const customAccItems = el.querySelectorAll('.CustomAccordian_CustomAccordian__eCaoC .CustomAccordian_CustomAccordianHeader__W4nXl');
    customAccItems.forEach((header, i) => {
      (header as HTMLElement).style.cursor = 'pointer';
      header.addEventListener('click', () => {
        const parent = header.parentElement;
        if (!parent) return;
        const allItems = parent.parentElement?.children;
        if (!allItems) return;
        for (let j = 0; j < allItems.length; j++) {
          const item = allItems[j] as HTMLElement;
          const body = item.querySelector('.CustomAccordian_acc_body__hf1qd') as HTMLElement;
          if (body) {
            if (j === i) {
              body.style.display = body.style.display === 'block' ? 'none' : 'block';
            } else {
              body.style.display = 'none';
            }
          }
        }
      });
    });
  }, []);

  return (
    <Layout>
      <main ref={ref} className="Home_HomePage__ceAKX" dangerouslySetInnerHTML={{ __html: homePageHTML }} />
      <Footer />
    </Layout>
  );
}
