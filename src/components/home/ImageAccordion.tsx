import { useState } from 'react';

const items = [
  { title: 'All-in-one e-commerce intelligence', desc: 'No juggling tools. One platform that manages ads, inventory, finance, and operations seamlessly.' },
  { title: 'Cross-marketplace analytics that matter', desc: 'Consolidate and compare performance across Amazon, Flipkart, Nykaa, and more—all in one view.' },
  { title: 'Automation & AI-driven precision', desc: 'Set conditions, apply filters, and let Mark8IQ handle the heavy lifting—no spreadsheets needed.' },
  { title: 'Drill-down granular insights', desc: 'See the big picture or zoom into SKU-level data for precision-driven decision-making.' },
  { title: 'Glimpse across all segments', desc: 'Get a unified preview of related products such as Mark8 Sight, regardless of your plan.' },
  { title: 'Customizable & Enterprise-Ready', desc: 'Built for fast-growing brands and enterprises needing deep analytics across thousands of SKUs.' },
];

const IMAGE_URL = 'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fecomm-intelligence.6c7b7e24.png&w=1920&q=75';

export default function ImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section_spacing">
      <div className="container">
        <div className="SectionTitle_SectionTitle__fv0YD false half_title">
          <h2 className="section_title color_text" aria-label="Engineered to power every e-comm move">
            Engineered to power every e-comm move
          </h2>
        </div>
      </div>
      <div className="CustomImageAccordian_CustomImageAccordian__gVOJN">
        <div className="CustomImageAccordian_acc_wrap__AHbWW">
          <div className="CustomImageAccordian_acc_left__iD9HY">
            {items.map((item, i) => (
              <div
                key={i}
                className={`CustomImageAccordian_acc_item__SpMrV ${i === activeIndex ? 'CustomImageAccordian_active_item__IkUwc' : 'false'} color_primary_dark fadeInUp`}
                data-scroll="in"
              >
                <div
                  className="CustomImageAccordian_acc_title__sTfie"
                  onClick={() => setActiveIndex(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 className="fs_24">{item.title}</h5>
                </div>
                <div className="CustomImageAccordian_acc_desc__hBa3_">
                  <h5 className="fs_18">{item.desc}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="CustomImageAccordian_acc_right__GHGGd">
            <div className="CustomImageAccordian_acc_img_wrap__dnQfA">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`CustomImageAccordian_acc_img_item__SCb4Z ${i === activeIndex ? 'CustomImageAccordian_active_img__rIQ__' : 'false'}`}
                >
                  <img alt={item.title} loading="lazy" width={843} height={557} style={{ color: 'transparent' }} src={IMAGE_URL} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
