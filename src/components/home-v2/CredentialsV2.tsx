import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';

type TabKey = 'excellence' | 'security' | 'people';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'excellence', label: 'Recognised Excellence' },
  { key: 'security', label: 'Data Security' },
  { key: 'people', label: 'People and Culture' },
];

const excellenceItems = [
  {
    logo: '/img/compliance/amazon-advisors.png',
    name: 'Amazon Ads Advisory Board Member',
    description: 'Selected for expertise in marketplace advertising optimization.',
  },
  {
    logo: '/img/compliance/amazon-ads-advanced-partner.png',
    name: 'Top 5 Amazon Ads Agency in India',
    description: "Consistently ranked among India's leading Amazon advertising partners.",
  },
  {
    logo: '/img/compliance/amazon-ads-verified-partner.png',
    name: 'Amazon Ads Verified Partner',
    description: 'Verified by Amazon for performance, compliance, and client outcomes.',
  },
  {
    logo: '/img/compliance/nvidia.png',
    name: 'NVIDIA Inception Program',
    description: 'Selected for AI/ML innovation in e-commerce intelligence. $1M grant.',
  },
  {
    logo: '/img/compliance/nixi.png' as string | null,
    name: 'NIXI Partner',
    description: 'Official partner for compliant data collection infrastructure. 1.5 Crore IPs.',
  },
  {
    logo: '/img/compliance/startup-india.png' as string | null,
    name: 'Startup India Recognised',
    description: "Officially recognised under India's national startup programme.",
  },
];

const securityItems = [
  {
    logo: '/img/compliance/iso-9001.png',
    name: 'ISO 9001:2015',
    description: 'Quality Management Systems',
  },
  {
    logo: '/img/compliance/iso-14001.png',
    name: 'ISO 14001:2015',
    description: 'Environmental Management Systems',
  },
  {
    logo: '/img/compliance/iso-27001.png',
    name: 'ISO 27001:2022',
    description: 'Information Security Management',
  },
  {
    logo: '/img/compliance/soc-2.png',
    name: 'SOC 2 Type 2',
    description: 'Service Organization Controls',
  },
  {
    logo: '/img/compliance/safetica.png',
    name: 'Safetica',
    description: 'Data Loss Prevention',
  },
  {
    logo: '/img/compliance/microsoft-security.png',
    name: 'Microsoft Security',
    description: 'Enterprise Security Suite',
  },
  {
    logo: '/img/compliance/microsoft-intune.png',
    name: 'Microsoft Intune',
    description: 'Device Management',
  },
  {
    logo: '/img/compliance/microsoft-defender.png',
    name: 'Microsoft Defender',
    description: 'Threat Protection',
  },
  {
    logo: '/img/compliance/microsoft-entra-id.png',
    name: 'Microsoft Entra ID',
    description: 'Identity and Access Management',
  },
];

type PeopleItem = {
  logo: string;
  name: string;
  description: string;
};

const peopleItems: PeopleItem[] = [
  {
    logo: '/img/compliance/great-place-to-work.png',
    name: 'Great Place to Work',
    description: 'Certified Feb 2026 — Feb 2027, India.',
  },
  {
    logo: '/img/compliance/posh.png',
    name: 'POSH Law',
    description: 'Zero-tolerance workplace policy with certified compliance officer.',
  },
  {
    logo: '/img/compliance/esop.png',
    name: 'ESOP',
    description: "Every team member is a stakeholder in the company's long-term growth.",
  },
  {
    logo: '/img/compliance/gratuity.png',
    name: 'Gratuity',
    description: 'Statutory gratuity recognizing loyalty and long-term contribution.',
  },
  {
    logo: '/img/compliance/medical-insurance.png',
    name: 'Medical Insurance',
    description: 'Comprehensive health coverage for every employee and their family.',
  },
];

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(8,13,25,0.08)',
  borderRadius: '5px',
  padding: '28px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  textAlign: 'center',
};

function LogoCard({
  logo,
  name,
  description,
}: {
  logo: string;
  name: string;
  description: string;
}) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          src={logo}
          alt={name}
          style={{ maxHeight: '56px', maxWidth: '120px', objectFit: 'contain' }}
        />
      </div>
      <div
        style={{
          fontFamily: "'Saira', sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          color: '#080D19',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "'Saira', sans-serif",
          fontSize: '11px',
          fontWeight: 400,
          color: 'rgba(8,13,25,0.45)',
        }}
      >
        {description}
      </div>
    </div>
  );
}


function ExcellenceTab() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
      }}
      className="cred-excellence-grid"
    >
      {excellenceItems.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(8,13,25,0.06)',
          }}
        >
          {item.logo ? (
            <div
              className="cred-logo-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                border: '1px solid rgba(8,13,25,0.08)',
                borderRadius: '5px',
                width: '100%',
                height: '120px',
                maxHeight: '120px',
                background: '#FFFFFF',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <img
                src={item.logo}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          ) : (
            <div style={{ height: '72px', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#8E59FF',
                }}
              />
            </div>
          )}
          <p
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: '#080D19',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(8,13,25,0.5)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function SecurityTab() {
  const firstRow = securityItems.slice(0, 5);
  const secondRow = securityItems.slice(5);

  const cardBaseStyle: React.CSSProperties = {
    border: '1px solid rgba(8,13,25,0.08)',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: '#FFFFFF',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Row 1: 5 square cards — locks card height via aspect-ratio */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}
        className="cred-grid"
      >
        {firstRow.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{ ...cardBaseStyle, aspectRatio: '1 / 1' }}
            className="cred-logo-card"
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Row 2: remaining cards — width auto-fills, height matches row 1 squares */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${secondRow.length}, 1fr)`,
          gap: '16px',
          containerType: 'inline-size',
        }}
        className="cred-grid-row2"
      >
        {secondRow.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: (i + firstRow.length) * 0.05 }}
            style={{
              ...cardBaseStyle,
              // Height matches a row-1 square: (100vw_of_row - 4*16gap) / 5
              // Using cqw (container query width) of row container
              height: 'calc((100cqw - 64px) / 5)',
            }}
            className="cred-row2-card cred-logo-card"
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PeopleTab() {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          alignItems: 'stretch',
        }}
        className="cred-grid"
      >
        {peopleItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{ height: '100%' }}
          >
            <div
              className="cred-logo-card"
              style={{
                border: '1px solid rgba(8,13,25,0.08)',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#FFFFFF',
                height: '100%',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Logo area — full width, 1:1 square */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Text below the image */}
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#080D19',
                    margin: 0,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'rgba(8,13,25,0.5)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hiring callout — Figma 2245-13826: thin dark bar, violet glow under text, right wordmark panel */}
      <motion.div
        className="cred-hire-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          marginTop: '16px',
          background: '#0D1425',
          border: '1px solid #40445A',
          borderRadius: '5px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
          gap: '16px',
          padding: '16px',
        }}
      >
        {/* Violet glow — bottom-left under the text, soft rise */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '-180px',
            bottom: '-280px',
            width: '720px',
            height: '520px',
            background:
              'radial-gradient(ellipse at center, rgba(142,89,255,0.55) 0%, rgba(142,89,255,0.18) 40%, rgba(142,89,255,0) 72%)',
            pointerEvents: 'none',
            filter: 'blur(8px)',
            zIndex: 0,
          }}
        />
        {/* Violet wash — behind the right wordmark panel */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-160px',
            top: '-120px',
            width: '720px',
            height: '520px',
            background:
              'radial-gradient(ellipse at center, rgba(142,89,255,0.40) 0%, rgba(142,89,255,0.12) 45%, rgba(142,89,255,0) 75%)',
            pointerEvents: 'none',
            filter: 'blur(10px)',
            zIndex: 0,
          }}
        />

        {/* Left content block */}
        <div
          className="cred-hire-content"
          style={{ position: 'relative', zIndex: 2, flex: '1 1 auto', minWidth: 0, padding: '4px 8px' }}
        >
          <h3
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              color: '#EDEFF7',
              margin: 0,
              marginBottom: '6px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Build the future of e-commerce. With us.
          </h3>
          <p
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(237,239,247,0.75)',
              margin: 0,
              marginBottom: '10px',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            We are always looking for sharp, driven people. If that is you, let's talk.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="/career"
              style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                color: '#12182B',
                background: '#EDEFF7',
                padding: '8px 16px',
                borderRadius: '5px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.15s ease',
              }}
            >
              See Open Roles
            </a>
            <a
              href="mailto:careers@infytrix.com"
              style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                color: '#EDEFF7',
                background: 'rgba(237,239,247,0.08)',
                padding: '8px 16px',
                borderRadius: '5px',
                textDecoration: 'none',
                display: 'inline-block',
                border: '1px solid rgba(237,239,247,0.15)',
                transition: 'opacity 0.15s ease',
                backdropFilter: 'blur(17px)',
              }}
            >
              Write to us
            </a>
          </div>
        </div>

        {/* Right decorative panel — Mark8 IQ wordmark */}
        <div
          aria-hidden
          className="cred-hire-panel"
          style={{
            position: 'relative',
            zIndex: 1,
            flex: '1 1 40%',
            maxWidth: '520px',
            minWidth: '220px',
            alignSelf: 'stretch',
            borderRadius: '5px',
            background:
              'linear-gradient(135deg, rgba(142,89,255,0.18) 0%, rgba(142,89,255,0.06) 100%)',
            border: '1px solid rgba(142,89,255,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backdropFilter: 'blur(8px)',
          }}
        >
          <img
            src="/img/product-logos/white/mark8-iq.svg"
            alt="Mark8 IQ"
            style={{
              width: '38%',
              maxWidth: '160px',
              height: 'auto',
              objectFit: 'contain',
              opacity: 0.85,
            }}
          />
        </div>

        <style>{`
          @media (max-width: 767px) {
            .cred-hire-card {
              flex-direction: column !important;
              gap: 12px !important;
            }
            .cred-hire-panel {
              flex: 0 0 auto !important;
              width: 100% !important;
              height: 80px !important;
              max-width: none !important;
            }
          }
        `}</style>
      </motion.div>
    </>
  );
}

export default function CredentialsV2() {
  const [activeTab, setActiveTab] = useState<TabKey>('excellence');
  const securityRef = useRef<HTMLDivElement>(null);
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined);

  // SecurityTab is the tallest (2 rows). Measure its natural height and lock
  // the content area to it so switching tabs never changes container height.
  useLayoutEffect(() => {
    const measure = () => {
      const el = securityRef.current;
      if (!el) return;
      const prevDisplay = el.style.display;
      el.style.display = 'block';
      const h = el.offsetHeight;
      el.style.display = prevDisplay;
      if (h > 0) setLockedHeight(h);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section style={{ padding: '100px 0', position: 'relative', background: 'transparent' }}>
      <style>{`
        @media (max-width: 767px) {
          .cred-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cred-grid-row2 { grid-template-columns: repeat(2, 1fr) !important; }
          .cred-row2-card { height: calc((100cqw - 16px) / 2) !important; }
          .cred-excellence-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .cred-hire-panel { display: none !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .cred-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .cred-grid-row2 { grid-template-columns: repeat(3, 1fr) !important; }
          .cred-row2-card { height: calc((100cqw - 32px) / 3) !important; }
          .cred-excellence-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cred-hire-panel { width: 280px !important; height: 160px !important; }
        }
        .cred-logo-card:hover {
          border-color: rgba(142,89,255,0.6) !important;
          box-shadow: 0 0 0 1px rgba(142,89,255,0.4), 0 0 24px rgba(142,89,255,0.35), 0 0 48px rgba(142,89,255,0.18);
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p
          className="m8-eyebrow"
          style={{ color: '#8E59FF', marginBottom: '12px' }}
        >
          CREDIBILITY & ACHIEVEMENTS
        </p>
        <h2
          className="m8-h2"
          style={{ color: '#080D19', marginBottom: '48px', maxWidth: '900px' }}
        >
          Recognised by the best in the business.
        </h2>

        {/* Unified container card: tab switcher + content in one card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(8,13,25,0.08)',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          {/* Tab switcher — flush top, border-bottom separates from content */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(8,13,25,0.1)',
            }}
          >
            {tabs.map((tab, i, arr) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '18px 24px',
                    border: 'none',
                    borderRight:
                      i < arr.length - 1
                        ? '1px solid rgba(8,13,25,0.1)'
                        : 'none',
                    background: isActive ? '#8E59FF' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'rgba(8,13,25,0.45)',
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content area — locked to SecurityTab's natural height */}
          <div style={{ padding: '48px', minHeight: lockedHeight ? `${lockedHeight + 96}px` : undefined }}>
            <div style={{ display: activeTab === 'excellence' ? 'block' : 'none' }}>
              <ExcellenceTab />
            </div>
            <div ref={securityRef} style={{ display: activeTab === 'security' ? 'block' : 'none' }}>
              <SecurityTab />
            </div>
            <div style={{ display: activeTab === 'people' ? 'block' : 'none' }}>
              <PeopleTab />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
