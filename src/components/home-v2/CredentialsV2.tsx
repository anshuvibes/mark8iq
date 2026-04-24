import { useState } from 'react';
import { motion } from 'motion/react';

type TabKey = 'excellence' | 'security' | 'people';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'excellence', label: 'Recognised Excellence' },
  { key: 'security', label: 'Data Security' },
  { key: 'people', label: 'People and Culture' },
];

const excellenceItems = [
  {
    logo: '/img/compliance/Amazon ADvisors.png',
    name: 'Amazon Ads Advisory Board Member',
    description: 'Selected for expertise in marketplace advertising optimization.',
  },
  {
    logo: '/img/compliance/Amazon Ads Advanced Partner.png',
    name: 'Top 5 Amazon Ads Agency in India',
    description: "Consistently ranked among India's leading Amazon advertising partners.",
  },
  {
    logo: '/img/compliance/Amazon Ads Verified Partner.png',
    name: 'Amazon Ads Verified Partner',
    description: 'Verified by Amazon for performance, compliance, and client outcomes.',
  },
  {
    logo: '/img/compliance/NVIDIA.png',
    name: 'NVIDIA Inception Program',
    description: 'Selected for AI/ML innovation in e-commerce intelligence. $1M grant.',
  },
  {
    logo: null as string | null,
    name: 'NIXI Partner',
    description: 'Official partner for compliant data collection infrastructure. 1.5 Crore IPs.',
  },
  {
    logo: null as string | null,
    name: 'Startup India Recognised',
    description: "Officially recognised under India's national startup programme.",
  },
];

const securityItems = [
  {
    logo: '/img/compliance/ISO Quality Management Systems.png',
    name: 'ISO 9001:2015',
    description: 'Quality Management Systems',
  },
  {
    logo: '/img/compliance/ISO Environmental Management Systems.png',
    name: 'ISO 14001:2015',
    description: 'Environmental Management Systems',
  },
  {
    // NOTE: filename has a double space between "ISO" and "Information"
    logo: '/img/compliance/ISO  Information Security Management Systems.png',
    name: 'ISO 27001:2022',
    description: 'Information Security Management',
  },
  {
    logo: '/img/compliance/SOC 2.png',
    name: 'SOC 2 Type 2',
    description: 'Service Organization Controls',
  },
  {
    logo: '/img/compliance/Safetica.png',
    name: 'Safetica',
    description: 'Data Loss Prevention',
  },
  {
    logo: '/img/compliance/Microsoft Security.png',
    name: 'Microsoft Security',
    description: 'Enterprise Security Suite',
  },
  {
    logo: '/img/compliance/Microsoft Intune.png',
    name: 'Microsoft Intune',
    description: 'Device Management',
  },
  {
    logo: '/img/compliance/Microsoft Defender.png',
    name: 'Microsoft Defender',
    description: 'Threat Protection',
  },
  {
    logo: '/img/compliance/Microsoft Entra ID.png',
    name: 'Microsoft Entra ID',
    description: 'Identity and Access Management',
  },
];

type PeopleItem = {
  logo: string | null;
  icon?: string;
  name: string;
  description: string;
};

const peopleItems: PeopleItem[] = [
  {
    logo: '/img/compliance/Great Place to Work.png',
    name: 'Great Place to Work',
    description: 'Certified Feb 2026 — Feb 2027, India.',
  },
  {
    logo: null,
    icon: '⚖️',
    name: 'POSH Law',
    description: 'Zero-tolerance workplace policy with certified compliance officer.',
  },
  {
    logo: null,
    icon: '📈',
    name: 'ESOP',
    description: "Every team member is a stakeholder in the company's long-term growth.",
  },
  {
    logo: null,
    icon: '🤝',
    name: 'Gratuity',
    description: 'Statutory gratuity recognizing loyalty and long-term contribution.',
  },
  {
    logo: null,
    icon: '🏥',
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
          src={encodeURI(logo)}
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

function IconCard({
  icon,
  name,
  description,
}: {
  icon: string;
  name: string;
  description: string;
}) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          height: '64px',
          width: '64px',
          borderRadius: '50%',
          background: 'rgba(142,89,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
        }}
      >
        {icon}
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
  const logoItems = excellenceItems.filter((i) => i.logo);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: '64px',
        alignItems: 'start',
      }}
    >
      {/* Left: list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {excellenceItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              paddingBottom: '24px',
              borderBottom:
                i < excellenceItems.length - 1
                  ? '1px solid rgba(8,13,25,0.08)'
                  : 'none',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '40px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {item.logo ? (
                <img
                  src={encodeURI(item.logo)}
                  alt={item.name}
                  style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                />
              ) : (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8E59FF',
                    marginLeft: '8px',
                    marginTop: '8px',
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                className="m8-p3-medium"
                style={{ color: '#080D19', marginBottom: '4px' }}
              >
                {item.name}
              </div>
              <div className="m8-p5" style={{ color: 'rgba(8,13,25,0.55)' }}>
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right: logo grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {logoItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              border: '1px solid rgba(8,13,25,0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
            }}
          >
            <img
              src={encodeURI(item.logo as string)}
              alt={item.name}
              style={{ maxHeight: '48px', maxWidth: '140px', objectFit: 'contain' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h3 className="m8-h3-m" style={{ color: '#080D19', marginBottom: '12px' }}>
          Data security built into every layer
        </h3>
        <p className="m8-p4" style={{ color: 'rgba(8,13,25,0.6)', maxWidth: '640px' }}>
          Compliance and infrastructure certifications that protect every brand on
          our platform.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}
        className="cred-grid"
      >
        {securityItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <LogoCard
              logo={item.logo}
              name={item.name}
              description={item.description}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

function PeopleTab() {
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h3 className="m8-h3-m" style={{ color: '#080D19', marginBottom: '12px' }}>
          A great place to work. Certified
        </h3>
        <p className="m8-p4" style={{ color: 'rgba(8,13,25,0.6)', maxWidth: '640px' }}>
          We invest in our people the same way we invest in our product.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
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
          >
            {item.logo ? (
              <LogoCard
                logo={item.logo}
                name={item.name}
                description={item.description}
              />
            ) : (
              <IconCard
                icon={item.icon || '•'}
                name={item.name}
                description={item.description}
              />
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function CredentialsV2() {
  const [activeTab, setActiveTab] = useState<TabKey>('excellence');

  return (
    <section style={{ padding: '100px 0', background: '#FFFFFF', position: 'relative' }}>
      <style>{`
        @media (max-width: 767px) {
          .cred-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cred-excellence-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .cred-grid { grid-template-columns: repeat(3, 1fr) !important; }
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

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {tabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                style={{
                  fontFamily: "'Saira', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? '#8E59FF' : 'rgba(8,13,25,0.06)',
                  color: isActive ? '#FFFFFF' : 'rgba(8,13,25,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className={activeTab === 'excellence' ? 'cred-excellence-grid' : ''}>
          {activeTab === 'excellence' && <ExcellenceTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'people' && <PeopleTab />}
        </div>
      </div>
    </section>
  );
}
