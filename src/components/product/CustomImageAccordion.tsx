import { useState } from 'react';
import SectionTitle from '../shared/SectionTitle';

interface AccordionItem {
  title: string;
  description: string;
}

interface CustomImageAccordionProps {
  sectionTitle: string;
  introText: string;
  items: AccordionItem[];
  images: string[];
  color?: string;
}

export default function CustomImageAccordion({
  sectionTitle,
  introText,
  items,
  images,
  color = 'red',
}: CustomImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section_spacing">
      <div className="container">
        <div className="col-xs-12 col-md-6 p_lr_0">
          <SectionTitle title={sectionTitle} isHalf />
          <p className="fs_18 color_primary_dark m_t_10">{introText}</p>
        </div>
        <div className="CustomImageAccordian_CustomImageAccordian__gVOJN">
          <div className="CustomImageAccordian_acc_wrap__AHbWW">
            <div className="CustomImageAccordian_acc_left__iD9HY">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`CustomImageAccordian_acc_item__SpMrV ${
                    index === activeIndex ? 'CustomImageAccordian_active_item__IkUwc' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                >
                  <h4 className={`CustomImageAccordian_acc_title__sTfie fs_20 fw_500 color_text`}>
                    {item.title}
                  </h4>
                  {index === activeIndex && (
                    <p className="CustomImageAccordian_acc_desc__hBa3 fs_16 color_primary_dark">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="CustomImageAccordian_acc_right__GHGGd">
              <div className="CustomImageAccordian_acc_img_wrap__dnQfA">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`CustomImageAccordian_acc_img_item__SCb4Z ${
                      index === activeIndex ? 'CustomImageAccordian_active_img__rIQ' : ''
                    }`}
                  >
                    <img
                      alt=""
                      loading="lazy"
                      decoding="async"
                      src={img}
                      style={{ color: 'transparent' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile version */}
          <div className="CustomImageAccordian_mob_custom_accordian__BaZQE">
            {items.map((item, index) => (
              <div
                key={index}
                className={`CustomImageAccordian_acc_item__SpMrV ${
                  index === activeIndex ? 'CustomImageAccordian_active_item__IkUwc' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
              >
                <h4 className="CustomImageAccordian_acc_title__sTfie fs_20 fw_500 color_text">
                  {item.title}
                </h4>
                {index === activeIndex && (
                  <>
                    <p className="CustomImageAccordian_acc_desc__hBa3 fs_16 color_primary_dark">
                      {item.description}
                    </p>
                    <div className="CustomImageAccordian_acc_img_item__SCb4Z CustomImageAccordian_active_img__rIQ">
                      <img
                        alt=""
                        loading="lazy"
                        decoding="async"
                        src={images[index]}
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
