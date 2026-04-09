import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
        <motion.div
          className="SectionTitle_SectionTitle__fv0YD false half_title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section_title color_text">Keep every detail on track</h2>
        </motion.div>
        <div className="CustomAccordian_CustomAccordian__eCaoC">
          <div>
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className="szh-accordion__item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
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
                        <motion.div
                          className="IconButton_IconButton__MhTxv bg_primary IconButton_size_regular__GEIC5 br_5"
                          animate={{ rotate: openIndex === i ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="IconButton_iconWrap__cJF8d iconWrap">
                            <CrossIcon />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </button>
                </h3>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      className="szh-accordion__item-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="szh-accordion__item-panel">
                        <div className="fs_18 color_primary_dark">{item.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
