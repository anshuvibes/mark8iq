import { motion } from 'motion/react';

const credentials = [
  {
    abbr: 'AMZ',
    name: 'Amazon Ads Advisory Board Member',
    proof: "One of a handful of agencies globally invited to shape Amazon's advertising direction.",
    badge: { type: 'circle' as const, color: '#FF9900', label: 'AMZ' },
  },
  {
    abbr: 'TOP 5',
    name: 'Top 5 Amazon Ads Agency in India',
    proof: "Amazon Advanced Partner. Ranked among India's best for performance and outcomes.",
    badge: { type: 'circle' as const, color: '#FF9900', label: 'TOP 5' },
  },
  {
    abbr: 'NVDA',
    name: 'NVIDIA Inception Program',
    proof: '$1 million grant. Powering our AI infrastructure and model training.',
    badge: { type: 'rect' as const, color: '#76B900', label: 'NVDA' },
  },
  {
    abbr: 'NIXI',
    name: 'NIXI Partner',
    proof: '1.5 Crore IPs for compliant, reliable data collection at scale.',
    badge: { type: 'circle' as const, color: '#003DA5', label: 'NIXI' },
  },
  {
    abbr: 'SI',
    name: 'Startup India Recognised',
    proof: "Officially recognised under India's national startup programme.",
    badge: { type: 'tricolor' as const, color: '', label: 'SI' },
  },
];

function BadgeIcon({ badge }: { badge: typeof credentials[0]['badge'] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      {badge.type === 'circle' && (
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: badge.color }} />
      )}
      {badge.type === 'rect' && (
        <div style={{ width: '12px', height: '6px', borderRadius: '2px', background: badge.color }} />
      )}
      {badge.type === 'tricolor' && (
        <div style={{ width: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '3px', background: '#FF9933', width: '100%' }} />
          <div style={{ height: '3px', background: '#FFFFFF', width: '100%' }} />
          <div style={{ height: '3px', background: '#138808', width: '100%' }} />
        </div>
      )}
      <span style={{ fontSize: '9px', fontWeight: 500, fontFamily: 'Saira, sans-serif', color: 'var(--v2-text-subtle)', textAlign: 'center' }}>
        {badge.label}
      </span>
    </div>
  );
}

export default function CredentialsV2() {
  return (
    <section style={{ padding: '80px 0', position: 'relative', background: 'var(--v2-bg)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {credentials.map((c, i) => (
          <motion.div
            key={c.abbr}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '24px 0',
              borderBottom: i < credentials.length - 1 ? '1px solid var(--v2-border)' : 'none',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              border: '1px solid var(--v2-badge-border)',
              background: 'var(--v2-bg-card)',
              boxShadow: `0 2px 12px var(--v2-shadow)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
            }}>
              <BadgeIcon badge={c.badge} />
            </div>
            <div>
              <h3 className="m8-p3-medium" style={{ color: 'var(--v2-text)', marginBottom: '4px' }}>{c.name}</h3>
              <p className="m8-p5" style={{ color: 'var(--v2-text-muted)' }}>{c.proof}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
