import { useState } from 'react';

type BrandCardProps = {
  name: string;
  category: string;
  challenge: string;
  result: string;
  accent: string;
  size: 'hero' | 'card';
  href?: string;
};

export default function BrandCard({
  name,
  category,
  challenge,
  result,
  accent,
  size,
  href = '/success-stories',
}: BrandCardProps) {
  const [hovered, setHovered] = useState(false);

  if (size === 'hero') {
    return (
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
          minHeight: '440px',
          background: 'var(--v2-bg-card)',
          border: '1px solid var(--v2-border-strong)',
          borderTop: `4px solid ${accent}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 18px 60px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ padding: '44px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '18px' }}>
            <h3 className="m8-h3-l" style={{ color: 'var(--v2-text)' }}>{name}</h3>
            <a className="m8-p6" href={href} style={{ color: accent, textDecoration: 'none', whiteSpace: 'nowrap' }}>Read story →</a>
          </div>

          <p className="m8-p6" style={{ color: accent, marginBottom: '22px' }}>{category}</p>
          <div style={{ height: '1px', background: 'var(--v2-border-strong)', marginBottom: '28px' }} />

          <div style={{ marginBottom: 'auto' }}>
            <p className="m8-eyebrow" style={{ color: 'var(--v2-text-secondary)', marginBottom: '12px' }}>Challenge</p>
            <p className="m8-p3" style={{ color: 'var(--v2-text-secondary)', maxWidth: '620px' }}>{challenge}</p>
          </div>

          <div style={{ marginTop: '36px', background: accent, color: '#FFFFFF', padding: '24px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '24px', alignItems: 'center' }}>
            <p className="m8-eyebrow" style={{ color: '#FFFFFF' }}>Result</p>
            <p className="m8-p3-medium" style={{ color: '#FFFFFF' }}>{result}</p>
          </div>
        </div>

        <div style={{ background: accent, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <p className="m8-h1-large" style={{ color: '#FFFFFF', opacity: 0.24, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
            {name.split(' ')[0]}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '360px',
        minHeight: '320px',
        flex: '0 0 360px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--v2-bg-card)',
        border: '1px solid var(--v2-border-strong)',
        borderTop: `4px solid ${accent}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${accent}40` : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
          <h3 className="m8-p3-medium" style={{ color: 'var(--v2-text)' }}>{name}</h3>
          <a
            className="m8-p6"
            href={href}
            style={{ color: accent, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.85, transition: 'opacity 0.15s ease', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          >
            Read story →
          </a>
        </div>

        <p className="m8-p6" style={{ color: accent, marginBottom: '18px' }}>{category}</p>
        <div style={{ height: '1px', background: 'var(--v2-border-strong)', marginBottom: '22px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ padding: '0 24px 24px', flex: 1 }}>
          <p className="m8-eyebrow" style={{ color: 'var(--v2-text-secondary)', marginBottom: '10px' }}>Challenge</p>
          <p className="m8-p5" style={{ color: 'var(--v2-text-secondary)' }}>{challenge}</p>
        </div>

        <div style={{ background: accent, padding: '18px 24px', display: 'grid', gridTemplateColumns: '74px 1fr', gap: '16px', alignItems: 'center' }}>
          <p className="m8-eyebrow" style={{ color: '#FFFFFF' }}>Result</p>
          <p className="m8-p5" style={{ color: '#FFFFFF' }}>{result}</p>
        </div>
      </div>
    </article>
  );
}