import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export default function EcommGrowth() {
  const stats = [
    { value: '₹60+', unit: 'CR', label: 'Ad Spend Managed' },
    { value: '₹700+', unit: 'CR', label: 'GMV Driven' },
    { value: '14M+', unit: 'UNITS', label: 'Sold worldwide' },
  ];

  return (
    <section className="section_spacing">
      <div className="HomeEcommGrowth_HomeEcommGrowth__y_5jd">
        <div className="container">
          <div className="HomeEcommGrowth_home_ecomm_growth_inner__T2Xa0">
            <motion.div {...fadeInUp}>
              <div className="SectionTitle_SectionTitle__fv0YD false half_title">
                <h2 className="section_title color_text" aria-label="The force behind your e-commerce growth">
                  The force behind your e-commerce growth
                </h2>
                <div className="section_desc">
                  Mark8 IQ is redefining eCommerce analytics by solving the industry bottleneck of fragmentation. Trusted by top brands and catering to all major marketplaces, Mark8 IQ unifies your data into a single source of actionable insight.
                </div>
              </div>
            </motion.div>
            <motion.div
              className="HomeEcommGrowth_item_right__6gwri graph_animation"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="HomeEcommGrowth_graph_img_wrap__W6yZv">
                <div className="HomeEcommGrowth_graph_pointers__rOmQ1">
                  {stats.map((stat, i) => (
                    <motion.div
                      className="HomeEcommGrowth_pointer_item__EveEV"
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    >
                      <p className="fs_20 color_text">{stat.value} <span className="fs_14 text_uppercase">{stat.unit}</span></p>
                      <p className="fs_16 color_primary_dark">{stat.label}</p>
                      <div className="HomeEcommGrowth_line__U9ciX"></div>
                    </motion.div>
                  ))}
                </div>
                <div className="HomeEcommGrowth_graph_img__FkY5O">
                  <img alt="E-commerce growth graph" loading="lazy" width={699} height={312} style={{ color: 'transparent' }} src="https://infytrix.info/img/home/ecomm-growth.svg" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
