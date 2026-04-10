import { motion } from 'motion/react';
import { useState } from 'react';

const OutreachIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#8E59FF" strokeWidth="1.5">
    <circle cx="16" cy="16" r="4" />
    <path d="M22 10a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
    <path d="M25 7a12.5 12.5 0 0 1 0 18" strokeLinecap="round" />
    <path d="M10 22a8.5 8.5 0 0 1 0-12" strokeLinecap="round" />
    <path d="M7 25a12.5 12.5 0 0 1 0-18" strokeLinecap="round" />
  </svg>
);

const ExecutionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#8E59FF" strokeWidth="1.5">
    <circle cx="16" cy="16" r="12" />
    <line x1="16" y1="4" x2="16" y2="28" />
    <line x1="4" y1="16" x2="28" y2="16" />
    <circle cx="16" cy="16" r="2.5" fill="#8E59FF" stroke="none" />
  </svg>
);

const GrowthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#8E59FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,28 4,20 12,20 12,14 20,14 20,8" />
    <polyline points="17,5 23,5 23,11" />
    <line x1="20" y1="8" x2="23" y2="5" />
  </svg>
);

const RetentionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#8E59FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12a6 6 0 1 1-6-6" />
    <polyline points="22 6 22 12 16 12" />
    <path d="M10 20a6 6 0 1 1 6 6" />
    <polyline points="10 26 10 20 16 20" />
  </svg>
);

const hoverColors = ['#FC7459', '#8E59FF', '#7CBC71', '#52BFBC'];

const cards = [
  { title: 'Seller Outreach', desc: 'Dedicated tele-calling & onboarding teams that educate sellers on ads benefits and drive activation at scale.', Icon: OutreachIcon },
  { title: 'Ads Execution', desc: 'Campaign setup, bid optimization, SKU-level targeting — powered by AI dashboards that reduce manual work by 80%.', Icon: ExecutionIcon },
  { title: 'Growth & ROI', desc: 'Data-driven approach to maximize ROAS, demonstrate clear ROI to sellers, and build habit of continued ads investment.', Icon: GrowthIcon },
  { title: 'Retention Engine', desc: 'Cohort management, success stories, peer proof, and tiered support to maximize post-program seller retention.', Icon: RetentionIcon },
];

function HoverCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: `1px solid ${hovered ? hoverColors[index] : '#EDF0F7'}`,
        borderRadius: 12,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'border-color 0.2s ease',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(142,89,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <card.Icon />
      </div>
      <p className="m8-p3-medium" style={{ color: '#080D19' }}>{card.title}</p>
      <p className="m8-p5" style={{ color: '#12182B' }}>{card.desc}</p>
    </motion.div>
  );
}

export default function DeckSection02WhatWeDo() {
  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(8,13,25,0.03)' }}>02</div>

      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', paddingBottom: 56 }}>
        <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          What We Do
        </motion.p>
        <motion.h2 className="m8-h2" style={{ color: '#080D19', marginBottom: 16 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
          Ads Activation & Retention at Scale
        </motion.h2>
        <motion.p className="m8-p4" style={{ color: '#12182B' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
          We help marketplace platforms activate seller advertising programs — from outreach to optimization to long-term retention.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {cards.map((card, i) => (
          <HoverCard key={i} card={card} index={i} />
        ))}
      </div>

      <style>{`
        .deck-slide-number {
          position: absolute;
          top: 60px;
          right: 48px;
          font-family: 'Saira', sans-serif;
          font-size: 120px;
          font-weight: 400;
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
          user-select: none;
        }
      `}</style>
    </section>
  );
}
