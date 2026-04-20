import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const roles = [
  {
    label: 'Analyst',
    tagline: 'Stop building reports. Start finding answers.',
    body: 'Raw data exports. ASIN-level breakdowns. Campaign performance tables. Reconciliation reports.',
    visual: 'Data table view',
  },
  {
    label: 'E-Commerce Manager',
    tagline: 'See what is moving, what is stuck, and why. Before your morning meeting.',
    body: 'Trend lines. Week-on-week movement. Marketplace comparison. Inventory alerts.',
    visual: 'Trend dashboard view',
  },
  {
    label: 'CEO / Founder',
    tagline: 'The full picture. In the time it takes to pour your first coffee.',
    body: 'P&L impact. Blended ROAS. GMV trajectory. Financial leakage alerts.',
    visual: 'Executive summary view',
  },
];

export default function RoleBasedValueV2() {
  const [activeRole, setActiveRole] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.33) {
          setActiveRole(0);
        } else if (p < 0.66) {
          setActiveRole(1);
        } else {
          setActiveRole(2);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollToRole = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const containerHeight = container.offsetHeight;
    // Nudge slightly past the threshold to land cleanly inside the role's zone
    const targetScroll = containerTop + (containerHeight / 3) * index + 4;

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetScroll, { duration: 1 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} style={{ height: '192vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.h2
            className="m8-h1-large"
            style={{ color: 'var(--v2-text)', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Everyone on your team gets exactly what they need.
          </motion.h2>
          <motion.p
            className="m8-p2"
            style={{ color: 'var(--v2-text-secondary)', textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            Same data. Delivered differently. For every role.
          </motion.p>

          <div style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
            <div className="role-cards-row" style={{ display: 'flex', gap: '16px', height: '100%' }}>
              {roles.map((role, i) => {
                const isActive = activeRole === i;
                return (
                  <motion.div
                    key={role.label}
                    onClick={() => scrollToRole(i)}
                    style={{
                      flex: isActive ? 2 : 0.5,
                      padding: '24px',
                      background: 'var(--v2-bg-card)',
                      borderRadius: '12px',
                      border: '1px solid var(--v2-border)',
                      borderLeft: isActive ? '3px solid #8E59FF' : '1px solid var(--v2-border)',
                      boxShadow: isActive ? `0 8px 32px var(--v2-shadow)` : 'none',
                      transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease',
                      overflow: 'hidden',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    whileHover={!isActive ? { y: -2 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="m8-p3-medium" style={{ color: 'var(--v2-text)', marginBottom: '8px' }}>{role.label}</h3>
                    <p className="m8-p5" style={{ color: 'var(--v2-text-subtle)', marginBottom: isActive ? '16px' : 0 }}>{role.tagline}</p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="m8-p5" style={{ color: 'var(--v2-text)', marginBottom: '16px' }}>{role.body}</p>
                          <div style={{
                            background: 'var(--v2-bg-subtle-2)',
                            borderRadius: '8px',
                            height: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <span className="m8-p6" style={{ color: 'var(--v2-text-muted)' }}>{role.visual}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.p
            className="m8-p3"
            style={{ color: 'var(--v2-text-subtle)', textAlign: 'center', marginTop: '32px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            One platform. Every role. No version of the truth gets lost.
          </motion.p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .role-cards-row { flex-direction: column !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
