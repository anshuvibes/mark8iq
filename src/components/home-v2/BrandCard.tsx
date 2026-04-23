import { useState } from 'react';

type BrandCardProps = {
  name: string;
  category: string;
  body: string;
  stat: string;
  statLabel: string;
  accent: string;
  href?: string;
};

export default function BrandCard({
  name,
  category,
  body,
  stat,
  statLabel,
  accent,
  href = '/success-stories',
}: BrandCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '300px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid rgba(8,13,25,0.08)',
        borderTop: `3px solid ${accent}`,
        borderRadius: '5px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${accent}30`
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 20px 0 20px', gap: '12px' }}>
        <div style={{ fontFamily: "'Saira', sans-serif", fontSize: '17px', fontWeight: 500, color: '#080D19', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
          {name}
        </div>
        <a
          href={href}
          style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', fontWeight: 400, color: accent, textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, paddingTop: '2px', opacity: hovered ? 1 : 0.8, transition: 'opacity 0.15s ease' }}
        >
          Read story →
        </a>
      </div>

      <div style={{ padding: '4px 20px 0 20px', fontFamily: "'Saira', sans-serif", fontSize: '11px', fontWeight: 400, color: accent, letterSpacing: '0.03em' }}>
        {category}
      </div>

      <div style={{ margin: '14px 20px', height: '1px', background: 'rgba(8,13,25,0.08)' }} />

      <div style={{ padding: '0 20px', flex: 1 }}>
        <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(8,13,25,0.55)', lineHeight: '1.65', margin: 0 }}>
          {body}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', marginTop: '20px' }}>
        <div style={{ background: accent, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '90px' }}>
          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '22px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}>
            {stat}
          </span>
        </div>
        <div style={{ background: `${accent}18`, padding: '14px 14px', display: 'flex', alignItems: 'center', flex: 1 }}>
          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(8,13,25,0.65)', lineHeight: '1.4' }}>
            {statLabel}
          </span>
        </div>
      </div>
    </article>
  );
}