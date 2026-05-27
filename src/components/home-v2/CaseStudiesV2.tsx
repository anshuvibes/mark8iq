import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type CaseStudy = {
  logo: string;
  logoAlt: string;
  headline: { text: string; highlight?: boolean }[];
  href: string;
  gradient: string;
};

const STUDIES: CaseStudy[] = [
  {
    logo: '/img/logos/zeel-rainwear.svg',
    logoAlt: 'Zeel Rainwear',
    headline: [
      { text: '3x ROI', highlight: true },
      { text: ' on monsoon campaigns with predictive demand sensing across ' },
      { text: 'every regional pincode', highlight: true },
      { text: ' in under six weeks.' },
    ],
    href: '#',
    gradient: 'linear-gradient(138deg, #fcb24f 0%, #8e59ff 60%, #12182b 100%)',
  },
  {
    logo: '/img/logos/mars-cosmetics.svg',
    logoAlt: 'MARS Cosmetics',
    headline: [
      { text: '42% lift', highlight: true },
      { text: ' in share-of-voice on Amazon beauty after rebuilding the ' },
      { text: 'creative & bid stack', highlight: true },
      { text: ' with Mark8 Ads.' },
    ],
    href: '#',
    gradient: 'linear-gradient(138deg, #dd4062 0%, #8e59ff 55%, #12182b 100%)',
  },
  {
    logo: '/img/logos/neude-skin.svg',
    logoAlt: 'Neude Skin',
    headline: [
      { text: '30% ACOS reduction', highlight: true },
      { text: ' in the first quarter by routing every SKU through ' },
      { text: 'autonomous bidding', highlight: true },
      { text: ' guardrails.' },
    ],
    href: '#',
    gradient: 'linear-gradient(138deg, #52bfbc 0%, #8e59ff 55%, #12182b 100%)',
  },
  {
    logo: '/img/logos/asian-shoes.svg',
    logoAlt: 'Asian Shoes',
    headline: [
      { text: '100Cr+ GMV', highlight: true },
      { text: ' managed across marketplaces with a single ' },
      { text: 'unified control plane', highlight: true },
      { text: ' for the merch team.' },
    ],
    href: '#',
    gradient: 'linear-gradient(138deg, #6895fc 0%, #8e59ff 55%, #12182b 100%)',
  },
];

export default function CaseStudiesV2() {
  const [index, setIndex] = useState(0);
  const study = STUDIES[index];

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + STUDIES.length) % STUDIES.length);
  };

  return (
    <section data-section="case-studies" style={{ position: 'relative', background: 'transparent' }}>
      <div style={{ padding: '100px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow + headline */}
          <motion.p
            className="m8-eyebrow"
            style={{ color: '#8e59ff', textAlign: 'center', marginBottom: '12px' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            CUSTOMER STORIES
          </motion.p>
          <motion.h2
            className="m8-h2"
            style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '48px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.05 }}
          >
            The brands that moved first
          </motion.h2>

          {/* Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 12px 32px -18px rgba(15,23,42,0.18)',
                  padding: '16px 16px 16px 40px',
                  width: '100%',
                  maxWidth: '1040px',
                  height: '410px',
                  overflow: 'hidden',
                }}
              >
                {/* Left content */}
                <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <img
                    src={study.logo}
                    alt={study.logoAlt}
                    style={{ height: '32px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
                  />

                  <h3
                    className="m8-h3-m"
                    style={{
                      color: '#2f3e6f',
                      maxWidth: '460px',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {study.headline.map((seg, i) => (
                      <span
                        key={i}
                        style={{
                          color: seg.highlight ? '#8e59ff' : undefined,
                          fontWeight: seg.highlight ? 500 : 400,
                        }}
                      >
                        {seg.text}
                      </span>
                    ))}
                  </h3>

                  <a
                    href={study.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--v2-text)',
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '16px',
                      lineHeight: 1,
                      paddingBottom: '6px',
                      borderBottom: '1px solid currentColor',
                      width: 'fit-content',
                    }}
                  >
                    Read the case study
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* Right gradient visual */}
                <div
                  style={{
                    width: '576px',
                    flexShrink: 0,
                    height: '100%',
                    borderRadius: '12px',
                    background: study.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                >
                  {/* subtle radial glow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%)',
                    }}
                  />
                  {/* logo watermark */}
                  <img
                    src={study.logo}
                    alt=""
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      margin: 'auto',
                      width: '160px',
                      height: 'auto',
                      filter: 'brightness(0) invert(1)',
                      opacity: 0.85,
                    }}
                  />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir as -1 | 1)}
                aria-label={dir === -1 ? 'Previous case study' : 'Next case study'}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  background: '#DFE5F1',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#12182B',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#cfd6e6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#DFE5F1'; }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ transform: dir === -1 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
