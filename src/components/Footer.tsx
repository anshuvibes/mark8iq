import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

const productLinks = [
  { label: 'Mark8 Ads', href: '/products/ads' },
  { label: 'Mark8 Sight', href: '/products/sight' },
  { label: 'Mark8 Shelf', href: '/products/shelf' },
  { label: 'Mark8 Returns', href: '/products/returns' },
  { label: 'Mark8 Reco', href: '/products/reco' },
  { label: 'Mark8 Inventory', href: '/products/inventory' },
  { label: 'Market One', href: '/' },
  { label: 'Agent Mark', href: '/' },
  { label: 'Agent Foundry', href: '/' },
];

const companyLinks = [
  { label: 'About', href: '/about-us' },
  { label: 'Careers', href: '/career' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/get-in-touch' },
];

const resourceLinks = [
  { label: 'Case Studies', href: '/success-stories' },
  { label: 'Documentation', href: '/' },
  { label: 'Partner Program', href: '/' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/' },
  { label: 'Terms of Service', href: '/' },
  { label: 'Cookie Policy', href: '/' },
];

const credentials = ['Amazon Partner', 'NVIDIA Inception', 'Startup India', 'NIXI Partner', 'Amazon Advisory Board'];

const socials = [
  { icon: Linkedin, href: '/' },
  { icon: Instagram, href: '/' },
  { icon: Twitter, href: '/' },
  { icon: Facebook, href: '/' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: '16px' }}>{title}</p>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="m8-p6"
          style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '10px', textDecoration: 'none' }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: '#12182B' }}>
      <div className="container">
        {/* Zone 1: Editorial Statement */}
        <h3 className="m8-h3" style={{ color: '#fff', paddingTop: '72px' }}>
          Built for the brands that <span style={{ color: '#8E59FF' }}>refuse to guess.</span>
        </h3>

        {/* Zone 2: Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '48px',
          paddingTop: '56px',
          paddingBottom: '56px',
        }}>
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* Zone 3: Authority Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Credential badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {credentials.map((c) => (
              <span
                key={c}
                className="m8-p8"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Infytrix Ecom Private Limited. All rights reserved.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={14} color="rgba(255,255,255,0.5)" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
