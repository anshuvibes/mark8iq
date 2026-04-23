import { useState } from 'react';

type BrandCardProps = {
  name: string;
  logo?: string;
  stat: string;
  statLabel: string;
  category: string;
  primaryColor: string;
  href?: string;
};

export default function BrandCard({
  name,
  logo,
  stat,
  statLabel,
  category,
  primaryColor,
  href = '/success-stories',
}: BrandCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
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
        padding: '20px 20px 16px 20px',
        gap: '12px',
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

        <a
          href={href}
          style={{
            fontFamily: "'Saira', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: primaryColor,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.15s ease',
          }}
        >
          Read story →
        </a>
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
        padding: '20px 20px 16px 20px',
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
        }}>
          {statLabel}
        </span>
      </div>

      <div style={{
        height: '1px',
        background: 'rgba(8,13,25,0.06)',
        margin: '0 20px',
      }} />

      <div style={{ padding: '14px 20px' }}>
        <span style={{
          fontFamily: "'Saira', sans-serif",
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(8,13,25,0.6)',
          background: 'rgba(8,13,25,0.05)',
          borderRadius: '999px',
          padding: '4px 12px',
          display: 'inline-block',
        }}>
          {category}
        </span>
      </div>
    </div>
  );
}