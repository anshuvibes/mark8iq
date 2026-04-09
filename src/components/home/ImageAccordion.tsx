import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
        <motion.div
          className="SectionTitle_SectionTitle__fv0YD false half_title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section_title color_text" aria-label="Engineered to power every e-comm move">
            Engineered to power every e-comm move
          </h2>
        </motion.div>
      </div>
      <div className="CustomImageAccordian_CustomImageAccordian__gVOJN">
        <div className="CustomImageAccordian_acc_wrap__AHbWW">
          <div className="CustomImageAccordian_acc_left__iD9HY">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className={`CustomImageAccordian_acc_item__SpMrV ${i === activeIndex ? 'CustomImageAccordian_active_item__IkUwc' : 'false'} color_primary_dark`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="CustomImageAccordian_acc_title__sTfie"
                  onClick={() => setActiveIndex(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 className="fs_24">{item.title}</h5>
                </div>
                <AnimatePresence>
                  {i === activeIndex && (
                    <motion.div
                      className="CustomImageAccordian_acc_desc__hBa3_"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <h5 className="fs_18">{item.desc}</h5>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="CustomImageAccordian_acc_right__GHGGd">
            <div className="CustomImageAccordian_acc_img_wrap__dnQfA">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="CustomImageAccordian_acc_img_item__SCb4Z CustomImageAccordian_active_img__rIQ__"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                >
                  <img alt={items[activeIndex].title} loading="lazy" width={843} height={557} style={{ color: 'transparent' }} src={IMAGE_URL} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
