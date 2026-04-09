import { motion } from 'motion/react';

const logos = [
  { src: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Faicpa_7383a3995c.webp&w=384&q=75', w: 169, h: 147 },
  { src: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Fwing_afc7c11174.webp&w=256&q=75', w: 121, h: 102 },
  { src: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Fdpiit_61afde16a4.png&w=384&q=75', w: 160, h: 162 },
  { src: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Fgst_7849ad0280.webp&w=640&q=75', w: 252, h: 163 },
];

function LogoSet() {
  return (
    <>
      {logos.map((logo, i) => (
        <div className="rfm-child" style={{ '--transform': 'none' } as React.CSSProperties} key={i}>
          <div className="HomeTrustedCertified_image_item__pjsUg">
            <img alt="certified logo" loading="lazy" width={logo.w} height={logo.h} src={logo.src} style={{ color: 'transparent' }} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function TrustedCertified() {
  return (
    <section className="section_spacing">
      <div className="HomeTrustedCertified_HomeTrustedCertified__v8Z7X">
        <div className="container">
          <motion.div
            className="SectionTitle_SectionTitle__fv0YD false half_title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section_title color_text" aria-label="Trusted and Certified">
              Trusted and Certified
            </h2>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rfm-marquee-container" style={{ '--pause-on-hover': 'running', '--pause-on-click': 'running', '--width': '100%', '--transform': 'none' } as React.CSSProperties}>
            <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'normal', '--duration': '44.28s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
              <div className="rfm-initial-child-container">
                <LogoSet />
              </div>
            </div>
            <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'normal', '--duration': '44.28s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
              <LogoSet />
            </div>
          </div>
          <div className="rfm-marquee-container" style={{ '--pause-on-hover': 'running', '--pause-on-click': 'running', '--width': '100%', '--transform': 'none' } as React.CSSProperties}>
            <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'reverse', '--duration': '44.28s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
              <div className="rfm-initial-child-container">
                <LogoSet />
              </div>
            </div>
            <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'reverse', '--duration': '44.28s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
              <LogoSet />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
