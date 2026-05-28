import { motion } from 'motion/react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  featured?: boolean;
  featuredImage?: string;
};

const ROW_1: Testimonial[] = [
  {
    quote: 'Mark8 IQ collapsed three dashboards and two agencies into a single morning standup. We finally trust the number on the screen.',
    name: 'Samer Hamadeh',
    role: 'CEO and Co-Founder @ Zeel',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format&fit=crop',
  },
  {
    quote: 'The Agent Foundry built our reorder agent in two days. It now runs procurement decisions that used to take a planner an entire week.',
    name: 'Priya Nair',
    role: 'VP Growth @ MARS Cosmetics',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote: 'Our share-of-voice on Amazon Beauty climbed for nine straight weeks. The bidding agent simply never sleeps.',
    name: 'Rohan Mehta',
    role: 'Head of Marketplaces @ Neude',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
  },
];

const ROW_2: Testimonial[] = [
  {
    quote: 'Mark8 Returns paid for itself in the first quarter. The root-cause clustering caught a packaging defect our QA team had missed for months.',
    name: 'Ananya Iyer',
    role: 'Director Supply Chain @ Asian',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote: 'Agent Mark answers questions in plain language about my ad spend, my margin, my inventory. It is the analyst I always wanted on call.',
    name: 'Vikram Sethi',
    role: 'Founder @ Urban Gabru',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop',
  },
  {
    quote: 'We onboarded Mark8 IQ in a week and shut down four point tools by month two. The org runs leaner and decides faster.',
    name: 'Kavya Reddy',
    role: 'CMO @ Fast&Up',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
  },
];

function QuoteIcon({ light = false }: { light?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 7.5C7 8.2 5 10.5 5 13.5V17h4.5v-4.5H7.4c.2-1.4 1-2.4 2.1-2.8V7.5zm9 0c-2.5.7-4.5 3-4.5 6V17H18.5v-4.5h-2.1c.2-1.4 1-2.4 2.1-2.8V7.5z"
        fill={light ? '#FFFFFF' : '#8e59ff'}
        opacity={light ? 0.95 : 0.9}
      />
    </svg>
  );
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  const isDark = t.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      style={{
        position: 'relative',
        flex: '1 1 0',
        minWidth: 0,
        background: isDark ? '#12182b' : '#FFFFFF',
        borderRadius: '16px',
        padding: '30px',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.06)',
        boxShadow: '0 12px 28px -18px rgba(15,23,42,0.18)',
        overflow: 'hidden',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '40px',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {isDark && t.featuredImage && (
        <>
          <img
            src={t.featuredImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.45,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(18,24,43,0) 30%, rgba(18,24,43,0.85) 95%)',
            }}
          />
        </>
      )}

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <QuoteIcon light={isDark} />
        <p
          className="m8-p6"
          style={{
            color: isDark ? '#FFFFFF' : '#40445a',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {t.quote}
        </p>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!isDark && t.avatar && (
          <img
            src={t.avatar}
            alt=""
            aria-hidden
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '999px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: "'Saira', sans-serif",
              fontWeight: 500,
              fontSize: '18px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: isDark ? '#FFFFFF' : '#40445a',
            }}
          >
            {t.name}
          </span>
          <span
            style={{
              fontFamily: "'Saira', sans-serif",
              fontStyle: 'italic',
              fontSize: '12px',
              lineHeight: 1,
              color: isDark ? '#c9ccd9' : '#797fa0',
            }}
          >
            {t.role}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsV2() {
  return (
    <section data-section="testimonials" style={{ position: 'relative', background: 'transparent' }}>
      <div style={{ padding: '100px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            className="m8-eyebrow"
            style={{ color: '#8e59ff', textAlign: 'center', marginBottom: '12px' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            TESTIMONIALS
          </motion.p>
          <motion.h2
            className="m8-h2"
            style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '48px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.05 }}
          >
            They said it better than we could
          </motion.h2>

          <div className="testimonials-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="testimonials-row" style={{ display: 'flex', gap: '24px' }}>
              {ROW_1.map((t, i) => (
                <Card key={`r1-${i}`} t={t} index={i} />
              ))}
            </div>
            <div className="testimonials-row" style={{ display: 'flex', gap: '24px' }}>
              {ROW_2.map((t, i) => (
                <Card key={`r2-${i}`} t={t} index={i + ROW_1.length} />
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 991px) {
              .testimonials-row { flex-wrap: wrap; }
              .testimonials-row > article { flex: 1 1 calc(50% - 12px) !important; min-width: 0; }
            }
            @media (max-width: 640px) {
              .testimonials-row { flex-direction: column; }
              .testimonials-row > article { flex: 1 1 100% !important; width: 100%; min-height: 220px !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
