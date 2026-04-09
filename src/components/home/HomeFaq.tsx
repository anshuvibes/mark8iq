import { useState } from 'react';

const faqItems = [
  { q: 'All-in-one e-commerce intelligence', a: 'No juggling tools. One platform that manages ads, inventory, finance, and operations seamlessly.' },
  { q: 'Cross-marketplace analytics that matter', a: 'Consolidate and compare performance across Amazon, Flipkart, Nykaa, and more—all in one view.' },
  { q: 'Automation & AI-driven precision', a: 'Set conditions, apply filters, and let Mark8IQ handle the heavy lifting—no spreadsheets needed.' },
  { q: 'Drill-down granular insights', a: 'See the big picture or zoom into SKU-level data for precision-driven decision-making.' },
  { q: 'Glimpse across all segments', a: 'Get a unified preview of related products such as Mark8 Sight, regardless of your plan.' },
  { q: 'Customizable & Enterprise-Ready', a: 'Built for fast-growing brands and enterprises needing deep analytics across thousands of SKUs.' },
];



const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" fill="none" viewBox="0 0 11 12">
    <path stroke="currentColor" strokeWidth="2" d="M.715 10.515 10.263.966M.715.966l9.548 9.548"></path>
  </svg>
);

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section_spacing">
      <div className="container">
        <div className="SectionTitle_SectionTitle__fv0YD false half_title">
          <h2 className="section_title color_text">Keep every detail on track</h2>
        </div>
      </div>
      <div className="CustomAccordian_CustomAccordian__eCaoC">
        <div>
          {faqItems.map((item, i) => (
            <div key={i} className="szh-accordion__item">
              <h3 style={{ margin: 0 }} className="szh-accordion__item-heading">
                <button
                  type="button"
                  className="szh-accordion__item-btn"
                  aria-expanded={openIndex === i}
                  onClick={() => toggleItem(i)}
                >
                  <div className="CustomAccordian_CustomAccordianHeader__W4nXl">
                    <h3 className="fs_28 color_primary_dark">{item.q}</h3>
                    <div className="CustomAccordian_arrow_icon__U8JY8">
                      <div className="IconButton_IconButton__MhTxv bg_primary IconButton_size_regular__GEIC5 br_5">
                        <div className="IconButton_iconWrap__cJF8d iconWrap">
                          <CrossIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </h3>
              <div
                className="szh-accordion__item-content"
                style={{ display: openIndex === i ? 'block' : 'none' }}
              >
                <div className="szh-accordion__item-panel">
                  <div>{item.a}</div>
                  <div>
                    <img alt={item.q} loading="lazy" width={843} height={557} style={{ color: 'transparent' }} src={IMAGE_URL} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
