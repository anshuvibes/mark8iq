import { motion } from 'motion/react';
import { useState } from 'react';

type CaseStudy = {
  logo: string;
  logoAlt: string;
  headline: { text: string; highlight?: boolean }[];
  gradient: string;
};

const STUDIES: CaseStudy[] = [
  {
    logo: '/img/logos/zeel-rainwear.svg',
    logoAlt: 'Zeel Rainwear',
    headline: [
      { text: '3x ROI', highlight: true },
      { text: ' on monsoon campaigns with predictive demand sensing across ' },
      { text: 'every pincode', highlight: true },
      { text: ' in six weeks.' },
    ],
    gradient: 'linear-gradient(138deg, #fcb24f 0%, #8e59ff 60%, #12182b 100%)',
  },
  {
    logo: '/img/logos/mars-cosmetics.svg',
    logoAlt: 'MARS Cosmetics',
    headline: [
      { text: '42% lift', highlight: true },
      { text: ' in share-of-voice on Amazon beauty after rebuilding the ' },
      { text: 'creative & bid stack', highlight: true },
      { text: '.' },
    ],
    gradient: 'linear-gradient(138deg, #dd4062 0%, #8e59ff 55%, #12182b 100%)',
  },
  {
    logo: '/img/logos/neude-skin.svg',
    logoAlt: 'Neude Skin',
    headline: [
      { text: '30% ACOS reduction', highlight: true },
      { text: ' in the first quarter by routing every SKU through ' },
      { text: 'autonomous bidding', highlight: true },
      { text: '.' },
    ],
    gradient: 'linear-gradient(138deg, #52bfbc 0%, #8e59ff 55%, #12182b 100%)',
  },
  {
    logo: '/img/logos/asian-shoes.svg',
    logoAlt: 'Asian Shoes',
    headline: [
      { text: '100Cr+ GMV', highlight: true },
      { text: ' managed across marketplaces with a single ' },
      { text: 'unified control plane', highlight: true },
      { text: '.' },
    ],
    gradient: 'linear-gradient(138deg, #6895fc 0%, #8e59ff 55%, #12182b 100%)',
  },
];

const CARD_WIDTH = 460;
const CARD_GAP = 24;

function Card({ s, hovered, onHover, onLeave }: { s: CaseStudy; hovered: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        flex: '0 0 auto',
        width: `${CARD_WIDTH}px`,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        borderRadius: '16px',
        border: hovered ? '1px solid #8e59ff' : '1px solid rgba(15,23,42,0.06)',
        boxShadow: hovered
          ? '0 18px 40px -16px rgba(142,89,255,0.35), 0 0 0 3px rgba(142,89,255,0.12)'
          : '0 12px 32px -18px rgba(15,23,42,0.18)',
        padding: '16px',
        height: '460px',
        overflow: 'hidden',
        gap: '20px',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Top gradient visual */}
      <div
        style={{
          flexShrink: 0,
          height: '220px',
          borderRadius: '12px',
          background: s.gradient,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%)',
          }}
        />
        <img
          src={s.logo}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: '140px',
            height: 'auto',
            filter: 'brightness(0) invert(1)',
            opacity: 0.9,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 16px 16px' }}>
        <img
          src={s.logo}
          alt={s.logoAlt}
          style={{ height: '28px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
        />
        <h3
          className="m8-h3-m"
          style={{
            color: '#2f3e6f',
            lineHeight: 1.45,
            margin: 0,
            fontSize: '22px',
          }}
        >
          {s.headline.map((seg, j) => (
            <span
              key={j}
              style={{
                color: seg.highlight ? '#8e59ff' : undefined,
                fontWeight: seg.highlight ? 500 : 400,
              }}
            >
              {seg.text}
            </span>
          ))}
        </h3>
      </div>
    </article>
  );
}

export default function CaseStudiesV2() {
  // Duplicate the array so the marquee loops seamlessly.
  const loop = [...STUDIES, ...STUDIES];
  const trackWidth = STUDIES.length * (CARD_WIDTH + CARD_GAP);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isPaused = hoveredIdx !== null;

  return (
    <section data-section="case-studies" style={{ position: 'relative', background: 'transparent' }}>
      <div style={{ padding: '100px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
        </div>

        {/* Marquee viewport — full bleed with edge fade */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maskImage:
              'linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)',
          }}
        >
          <motion.div
            animate={{ x: [0, -trackWidth] }}
            transition={{
              duration: STUDIES.length * 16,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              width: 'max-content',
              padding: '12px 0',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            {...(isPaused ? { animate: { x: undefined } } : {})}
          >
            {loop.map((s, i) => (
              <Card
                key={i}
                s={s}
                hovered={hoveredIdx === i}
                onHover={() => setHoveredIdx(i)}
                onLeave={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
