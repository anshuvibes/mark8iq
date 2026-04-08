import { useRef, useEffect, useState } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  useNavigateLinks(ref);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/homePage.html').then(r => r.text()).then(setHtml);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !html) return;

    const accItems = el.querySelectorAll('.CustomImageAccordian_acc_item__SpMrV');
    const handleAccClick = (index: number) => {
      accItems.forEach((item, i) => {
        item.classList.toggle('CustomImageAccordian_active_item__IkUwc', i === index);
      });
      const imgWrap = el.querySelector('.CustomImageAccordian_acc_img_wrap__dnQfA');
      if (imgWrap) {
        for (let i = 0; i < imgWrap.children.length; i++) {
          imgWrap.children[i].className = i === index
            ? 'CustomImageAccordian_acc_img_item__SCb4Z CustomImageAccordian_active_img__rIQ__'
            : 'CustomImageAccordian_acc_img_item__SCb4Z false';
        }
      }
    };
    accItems.forEach((item, i) => {
      const title = item.querySelector('.CustomImageAccordian_acc_title__sTfie');
      if (title) (title as HTMLElement).addEventListener('click', () => handleAccClick(i));
    });

    const customAccItems = el.querySelectorAll('.CustomAccordian_CustomAccordian__eCaoC .CustomAccordian_CustomAccordianHeader__W4nXl');
    customAccItems.forEach((header, i) => {
      (header as HTMLElement).style.cursor = 'pointer';
      header.addEventListener('click', () => {
        const allItems = header.parentElement?.parentElement?.children;
        if (!allItems) return;
        for (let j = 0; j < allItems.length; j++) {
          const body = allItems[j].querySelector('.CustomAccordian_acc_body__hf1qd') as HTMLElement;
          if (body) body.style.display = j === i ? (body.style.display === 'block' ? 'none' : 'block') : 'none';
        }
      });
    });
  }, [html]);

  return (
    <Layout>
      <main ref={ref} className="Home_HomePage__ceAKX" dangerouslySetInnerHTML={{ __html: html }} />
      <Footer />
    </Layout>
  );
}
