import { useState } from 'react';

type BrandCardProps = {
  name: string;
  logo?: string;
  stat: string;
  statLabel: string;
  category: string;
  primaryColor: string;
};

export default function BrandCard({
  name,
  logo,
  stat,
  statLabel,
  category,
  primaryColor,
}: BrandCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '430px',
        minHeight: '430px',
        maxHeight: '430px',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid rgba(8,13,25,0.08)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.12)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.22s ease, transform 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        padding: '0 20px',
        gap: '12px',
        flexShrink: 0,
      }}>
        {logo ? (
          <img
            src={logo}
            alt={name}
            style={{
              height: '32px',
              width: 'auto',
              maxWidth: '130px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <span style={{
            fontFamily: "'Saira', sans-serif",
            fontSize: '16px',
            fontWeight: 500,
            color: '#080D19',
            letterSpacing: '-0.02em',
          }}>
            {name}
          </span>
        )}

      </div>

      <div style={{
        width: '100%',
        height: '200px',
        background: `${primaryColor}10`,
        flexShrink: 0,
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '92px',
        padding: '0 20px',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Saira', sans-serif",
          fontSize: '48px',
          fontWeight: 500,
          color: '#080D19',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          flexShrink: 0,
        }}>
          {stat}
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'rgba(8,13,25,0.12)',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "'Saira', sans-serif",
          fontSize: '13px',
          fontWeight: 400,
          color: 'rgba(8,13,25,0.55)',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {statLabel}
        </span>
      </div>

      <div style={{
        height: '1px',
        background: 'rgba(8,13,25,0.06)',
        margin: '0 20px',
      }} />

      <div style={{
        height: '65px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Söhne Mono', 'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: primaryColor,
          background: `${primaryColor}14`,
          border: `1px solid ${primaryColor}33`,
          borderRadius: '5px',
          padding: '5px 10px',
          display: 'inline-block',
        }}>
          {category}
        </span>
      </div>
    </div>
  );
}