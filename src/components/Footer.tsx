import { Link } from 'react-router-dom';

const NAV = {
  products: [
    { label: 'Mark8 Ads', href: '/products/ads' },
    { label: 'Mark8 Shelf', href: '/products/shelf' },
    { label: 'Mark8 Returns', href: '/products/returns' },
    { label: 'Mark8 Sight', href: '/products/sight' },
    { label: 'Mark8 Reco', href: '/products/reco' },
    { label: 'Mark8 PO', href: '/products/po' },
  ],
  resources: [
    { label: 'Blogs', href: '/blogs' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'In the News', href: '/news' },
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Why Mark8 IQ?', href: '/why-us' },
  ],
};

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    path: 'm8.164 9.758.453-2.875H5.785V5.018a1.456 1.456 0 0 1 1.664-1.553h1.288V1.017A16 16 0 0 0 6.45.823a3.556 3.556 0 0 0-3.858 3.87v2.19H0v2.875h2.593v6.95h3.192v-6.95z',
    viewBox: '0 0 9 17',
    width: 11,
    height: 17,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M7.944 4.674a4.073 4.073 0 1 0 4.071 4.073 4.065 4.065 0 0 0-4.071-4.073m0 6.72a2.647 2.647 0 1 1-.002-5.293 2.647 2.647 0 0 1 .002 5.293m5.188-6.886a.95.95 0 1 1-1.897 0 .95.95 0 0 1 1.896 0zm2.696.967a4.7 4.7 0 0 0-1.282-3.328A4.73 4.73 0 0 0 11.218.864C9.907.79 5.978.79 4.666.864A4.72 4.72 0 0 0 1.338 2.14 4.72 4.72 0 0 0 .056 5.468c-.075 1.311-.075 5.242 0 6.554a4.7 4.7 0 0 0 1.282 3.327 4.74 4.74 0 0 0 3.327 1.28c1.312.074 5.241.074 6.553 0a4.7 4.7 0 0 0 3.327-1.283 4.73 4.73 0 0 0 1.283-3.328c.074-1.311.074-5.238 0-6.55zm-1.694 7.957a2.68 2.68 0 0 1-1.51 1.513c-1.045.415-3.526.32-4.68.32-1.156 0-3.64.091-4.682-.32a2.68 2.68 0 0 1-1.51-1.513c-.415-1.046-.319-3.527-.319-4.683s-.092-3.64.319-4.682a2.68 2.68 0 0 1 1.51-1.514c1.045-.415 3.526-.318 4.681-.318s3.64-.093 4.682.318a2.68 2.68 0 0 1 1.51 1.514c.414 1.045.318 3.527.318 4.682s.096 3.637-.319 4.68z',
    viewBox: '0 0 16 17',
    width: 18,
    height: 18,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M3.083 14.511H.241V5.363h2.842zM1.66 4.115a1.653 1.653 0 1 1 1.646-1.661A1.66 1.66 0 0 1 1.66 4.115M13.72 14.511h-2.837V10.06c0-1.06-.021-2.423-1.477-2.423-1.477 0-1.703 1.154-1.703 2.347v4.528H4.863V5.363h2.725v1.248h.04a2.99 2.99 0 0 1 2.688-1.477c2.875 0 3.404 1.894 3.404 4.353v5.024z',
    viewBox: '0 0 14 15',
    width: 16,
    height: 16,
  },
  {
    label: 'X',
    href: 'https://x.com',
    path: 'm.034.809 5.407 7.229L0 13.916h1.225L5.988 8.77l3.85 5.146h4.167L8.294 6.28 13.359.809h-1.225l-4.387 4.74L4.203.808zm1.8.901h1.913l8.454 11.304h-1.912z',
    viewBox: '0 0 14 14',
    width: 16,
    height: 16,
  },
];

function NavColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="m8-footer-col">
      <div className="m8-footer-col-title">{title}</div>
      <ul className="m8-footer-col-list">
        {items.map((it) => (
          <li key={it.href}>
            <Link to={it.href} className="m8-footer-link">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="m8-footer-root" aria-label="Site footer">
      <style>{`
        .m8-footer-root {
          width: 100%;
          padding: 60px 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
          font-family: 'Saira', sans-serif;
          color: #edeff7;
        }
        .m8-footer-inner {
          width: 100%;
          max-width: 1380px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ---------- CTA card ---------- */
        .m8-footer-cta {
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid #40445a;
          background:
            radial-gradient(120% 140% at 50% 100%, rgba(142,89,255,0.35) 0%, rgba(142,89,255,0) 55%),
            #0d1425;
          padding: 64px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          text-align: center;
        }
        .m8-footer-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(237,239,247,0.18) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.18;
          pointer-events: none;
        }
        .m8-footer-cta-title {
          position: relative;
          font-weight: 400;
          font-size: 50px;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: #edeff7;
          margin: 0;
          max-width: 880px;
        }
        .m8-footer-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 6px;
          background: #edeff7;
          color: #12182b;
          font-size: 18px;
          font-weight: 400;
          border: 1px solid rgba(237,239,247,0.1);
          text-decoration: none;
          box-shadow: 0 0 40px rgba(237,239,247,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .m8-footer-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 0 60px rgba(237,239,247,0.5); }

        /* ---------- Main panel ---------- */
        .m8-footer-panel {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          background: #080d19;
          border: 1px solid rgba(64,68,90,0.6);
          padding: 60px 60px 30px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
          gap: 60px;
        }
        .m8-footer-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(64,68,90,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64,68,90,0.18) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.5;
          pointer-events: none;
        }
        .m8-footer-panel::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0; height: 3px;
          background: linear-gradient(90deg, #f31aff 0%, #8e59ff 25%, #6895fc 50%, #52bfbc 75%, #fcb24f 100%);
        }
        .m8-footer-brand {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 30px;
          min-width: 0;
        }
        .m8-footer-logo { height: 28px; width: auto; }
        .m8-footer-heading {
          font-size: 40px;
          line-height: 1.3;
          letter-spacing: -1.2px;
          color: #edeff7;
          margin: 0;
          font-weight: 400;
          max-width: 480px;
        }
        .m8-footer-subhead {
          color: #aeb3c8;
          font-size: 18px;
          line-height: 1.4;
          margin: 0;
          max-width: 480px;
        }
        .m8-footer-nvidia {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
        }
        .m8-footer-nvidia img { height: 32px; width: auto; }
        .m8-footer-nvidia-sep { width: 1px; height: 40px; background: rgba(237,239,247,0.25); }
        .m8-footer-nvidia-text {
          font-family: 'DIN Next W1G', 'Saira', sans-serif;
          font-size: 12px;
          line-height: 1.1;
          color: #ffffff;
          letter-spacing: -0.1px;
          text-transform: uppercase;
        }

        .m8-footer-nav {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
          justify-content: end;
          align-items: start;
        }
        .m8-footer-col-title {
          color: #8e59ff;
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 24px;
        }
        .m8-footer-col-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .m8-footer-link {
          color: #aeb3c8;
          font-size: 14px;
          font-weight: 300;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .m8-footer-link:hover { color: #edeff7; }

        .m8-footer-gptw {
          position: absolute;
          top: 24px;
          right: 36px;
          height: 80px;
          width: auto;
          z-index: 2;
        }

        /* ---------- Bottom bar ---------- */
        .m8-footer-bottom {
          position: relative;
          grid-column: 1 / -1;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(174,179,200,0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .m8-footer-copyright {
          color: #edeff7;
          font-size: 16px;
          margin: 0;
        }
        .m8-footer-socials {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .m8-footer-socials-label {
          color: #edeff7;
          font-size: 16px;
          margin-right: 6px;
        }
        .m8-footer-social-icon {
          color: #8e59ff;
          display: inline-flex;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .m8-footer-social-icon:hover { color: #edeff7; transform: translateY(-2px); }

        /* ---------- Responsive ---------- */
        @media (max-width: 960px) {
          .m8-footer-panel {
            grid-template-columns: minmax(0, 1fr);
            gap: 40px;
            padding: 40px 28px 24px;
          }
          .m8-footer-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; }
          .m8-footer-heading { font-size: 30px; letter-spacing: -0.9px; line-height: 1.35; }
          .m8-footer-subhead { font-size: 16px; }
          .m8-footer-cta { padding: 44px 24px; border-radius: 18px; }
          .m8-footer-cta-title { font-size: 28px; letter-spacing: -0.84px; }
          .m8-footer-gptw { height: 60px; top: 16px; right: 16px; }
          .m8-footer-bottom { flex-direction: column; align-items: flex-start; }
          .m8-footer-root { padding: 32px 16px; }
        }
        @media (max-width: 520px) {
          .m8-footer-nav { grid-template-columns: minmax(0, 1fr); }
          .m8-footer-cta-title { font-size: 24px; }
        }
      `}</style>

      <div className="m8-footer-inner">
        {/* CTA */}
        <section className="m8-footer-cta" aria-label="Get in touch">
          <h2 className="m8-footer-cta-title">Your Margins Are Leaking. Let&apos;s Fix That.</h2>
          <Link to="/get-in-touch" className="m8-footer-cta-btn">Book a Demo</Link>
        </section>

        {/* Main panel */}
        <section className="m8-footer-panel">
          <img
            className="m8-footer-gptw"
            src="/img/compliance/great-place-to-work.png"
            alt="Great Place to Work — Certified"
          />

          {/* Brand column */}
          <div className="m8-footer-brand">
            <Link to="/" aria-label="Mark8 IQ home">
              <img className="m8-footer-logo" src="/img/product-logos/white/mark8-iq.svg" alt="Mark8 IQ" />
            </Link>
            <h3 className="m8-footer-heading">Your E-Commerce Command Center</h3>
            <p className="m8-footer-subhead">
              One platform for every marketplace,<br />every decision, and every rupee.
            </p>
            <div className="m8-footer-nvidia">
              <img src="/img/compliance/nvidia.png" alt="NVIDIA" />
              <span className="m8-footer-nvidia-sep" aria-hidden />
              <span className="m8-footer-nvidia-text">
                INCEPTION
                <br />
                PROGRAM
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <nav className="m8-footer-nav" aria-label="Footer">
            <NavColumn title="Products" items={NAV.products} />
            <NavColumn title="Resources" items={NAV.resources} />
            <NavColumn title="Company" items={NAV.company} />
          </nav>

          {/* Bottom bar */}
          <div className="m8-footer-bottom">
            <p className="m8-footer-copyright">All rights reserved. © 2026 Infytrix Ecom Pvt. Ltd</p>
            <div className="m8-footer-socials">
              <span className="m8-footer-socials-label">Follow us on</span>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  className="m8-footer-social-icon"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={s.width}
                    height={s.height}
                    viewBox={s.viewBox}
                    fill="currentColor"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
