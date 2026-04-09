import { useState } from 'react';
import SectionTitle from '../shared/SectionTitle';

interface FAQItem {
  question: string;
  answer: string;
}

interface CustomAccordionProps {
  sectionTitle: string;
  items: FAQItem[];
}

export default function CustomAccordion({ sectionTitle, items }: CustomAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section_spacing">
      <div className="container">
        <div>
          <SectionTitle title={sectionTitle} isHalf />
          <div className="CustomAccordian_CustomAccordian__Q4Kkx">
            {items.map((item, index) => (
              <div
                key={index}
                className={`CustomAccordian_accordian_item__7bDRx ${
                  index === activeIndex ? 'CustomAccordian_active__jkkHd' : ''
                }`}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                role="button"
                tabIndex={0}
              >
                <div className="CustomAccordian_accordian_title_wrap__UlRbB">
                  <h4 className="CustomAccordian_title fs_20 fw_500 color_text">
                    {item.question}
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.344"
                    height="12.479"
                    viewBox="0 0 22.344 12.479"
                    className={`CustomAccordian_arrow__Hs8FV ${
                      index === activeIndex ? 'CustomAccordian_rotated__XyZ' : ''
                    }`}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                      d="m.703.71 10.469 10.362L21.641.71"
                    />
                  </svg>
                </div>
                {index === activeIndex && (
                  <p className="CustomAccordian_desc fs_18 color_primary_dark m_t_10">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
