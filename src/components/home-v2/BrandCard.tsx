import { useState } from 'react';

type BrandCardProps = {
  name: string;
  body: string;
  stat: string;
  statLabel: string;
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  href?: string;
};

export default function BrandCard({
  name,
  body,
  stat,
  statLabel,
  primaryColor,
  secondaryColor,
  logo,
  href = '/success-stories',
}: BrandCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '360px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid rgba(8,13,25,0.08)',
        borderRadius: '5px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${primaryColor}30`
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 20px 0 20px', gap: '12px' }}>
        <div>
          {logo ? (
            <img
              src={logo}
              alt={name}
              style={{ height: '28px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ fontFamily: "'Saira', sans-serif", fontSize: '17px', fontWeight: 500, color: '#080D19', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
              {name}
            </div>
          )}
        </div>
        <a
          href={href}
          style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', fontWeight: 400, color: primaryColor, textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, paddingTop: '2px', opacity: hovered ? 1 : 0.8, transition: 'opacity 0.15s ease' }}
        >
          Read story →
        </a>
      </div>

      <div style={{ margin: '14px 20px', height: '1px', background: 'rgba(8,13,25,0.08)' }} />

      <div style={{ padding: '0 20px', flex: 1 }}>
        <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(8,13,25,0.55)', lineHeight: '1.65', margin: 0 }}>
          {body}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', marginTop: '20px', minHeight: '72px' }}>
        <div style={{ background: primaryColor, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '90px' }}>
          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '22px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}>
            {stat}
          </span>
        </div>
        <div style={{ background: `${secondaryColor}18`, padding: '14px 14px', display: 'flex', alignItems: 'center', flex: 1 }}>
          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(8,13,25,0.65)', lineHeight: '1.4' }}>
            {statLabel}
          </span>
        </div>
      </div>
    </article>
  );
}