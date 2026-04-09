import { useState } from 'react';

const items = [
  { title: 'All-in-one e-commerce intelligence', desc: 'No juggling tools. One platform that manages ads, inventory, finance, and operations seamlessly.' },
  { title: 'Cross-marketplace analytics that matter', desc: 'Consolidate and compare performance across Amazon, Flipkart, Nykaa, and more—all in one view.' },
  { title: 'Automation & AI-driven precision', desc: 'Set conditions, apply filters, and let Mark8IQ handle the heavy lifting—no spreadsheets needed.' },
  { title: 'Drill-down granular insights', desc: 'See the big picture or zoom into SKU-level data for precision-driven decision-making.' },
  { title: 'Glimpse across all segments', desc: 'Get a unified preview of related products such as Mark8 Sight, regardless of your plan.' },
  { title: 'Customizable & Enterprise-Ready', desc: 'Built for fast-growing brands and enterprises needing deep analytics across thousands of SKUs.' },
];

const IMAGES = [
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fecomm-intelligence.6c7b7e24.png&w=1920&q=75',
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanalytics-matter.2c7f06e0.png&w=1920&q=75',
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fai-driven.6dc2bb18.png&w=1920&q=75',
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgranular-insight.bfbfef3a.png&w=1920&q=75',
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fall-segments.58e90c25.png&w=1920&q=75',
  'https://infytrix.info/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenterprise-ready.3be11bfc.png&w=1920&q=75',
];

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

        {/* Desktop accordion */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 30, gap: 40 }}
             className="hide_on_mobile">
          {/* Left: accordion items */}
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 24, borderLeft: '1px solid rgba(18, 24, 43, 0.8)' }}>
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  paddingLeft: 30,
                  cursor: 'pointer',
                  opacity: i === activeIndex ? 1 : 0.5,
                  position: 'relative',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Active indicator bar */}
                {i === activeIndex && (
                  <div style={{
                    position: 'absolute',
                    left: -1,
                    top: 0,
                    width: 3,
                    height: '100%',
                    backgroundColor: 'var(--color_primary_dark)',
                  }} />
                )}
                <h5 className="fs_24 color_text" style={{ fontWeight: 500 }}>{item.title}</h5>
                {i === activeIndex && (
                  <p className="fs_18 color_primary_dark" style={{ paddingTop: 6, width: '80%' }}>
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: image */}
          <div style={{ flex: 1, position: 'relative' }}>
            <img
              alt={items[activeIndex].title}
              loading="lazy"
              src={IMAGES[activeIndex]}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Mobile version */}
        <div className="show_on_mobile" style={{ marginTop: 30 }}>
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                padding: '16px 0',
                borderBottom: '1px solid rgba(18, 24, 43, 0.1)',
                cursor: 'pointer',
                opacity: i === activeIndex ? 1 : 0.5,
              }}
            >
              <h4 className="fs_20 fw_500 color_text">{item.title}</h4>
              {i === activeIndex && (
                <>
                  <p className="fs_16 color_primary_dark" style={{ paddingTop: 6 }}>
                    {item.desc}
                  </p>
                  <img
                    alt=""
                    loading="lazy"
                    src={IMAGES[i]}
                    style={{ width: '100%', marginTop: 12, borderRadius: 8 }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
