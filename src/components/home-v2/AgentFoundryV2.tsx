import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const TABS = [
  {
    role: 'Ads Manager',
    oneliner: 'Stop burning budget on the wrong keywords.',
    body: 'Your ROAS Optimiser Agent monitors every campaign across every marketplace, every hour. When a keyword drops below your target ACoS, it adjusts bids instantly. No manual review. No delay. No missed opportunity.',
    agent: 'ROAS Optimiser Agent',
    status: 'Active',
    lastAction: '14 min ago',
  },
  {
    role: 'Inventory Head',
    oneliner: 'Get ahead of stockouts before they cost you sales.',
    body: 'Your Stock Alert Agent tracks sell-through rates across every SKU on every marketplace. The moment inventory crosses a threshold you define, it flags the risk and pauses ads on affected listings automatically. No firefighting. No revenue lost to empty shelves.',
    agent: 'Stock Alert Agent',
    status: 'Active',
    lastAction: '1 hr ago',
  },
  {
    role: 'Finance Head',
    oneliner: 'Catch platform price violations before they cut your margin.',
    body: 'Your Price Tracker Agent scans agreed selling prices against actual live prices across Amazon, Flipkart, Myntra, and quick commerce every hour. The moment a platform drops below your floor price, it is flagged with evidence of who violated first.',
    agent: 'Price Tracker Agent',
    status: 'Active',
    lastAction: '2 min ago',
  },
  {
    role: 'Operations Head',
    oneliner: 'Close reconciliation gaps without chasing platform reports.',
    body: 'Your Return Reconciler Agent cross-references every return against platform settlements. Mismatches are flagged automatically. Leakages are surfaced before quarter end. No spreadsheets. No manual matching.',
    agent: 'Return Reconciler Agent',
    status: 'Active',
    lastAction: '3 hrs ago',
  },
  {
    role: 'CXO',
    oneliner: 'Run a leaner operation without adding headcount.',
    body: 'Deploy as many agents as your operation demands. Each one runs on your business data. Each one acts within rules you define. Your team focuses on decisions. Your agents handle execution. The operation scales. The team does not have to.',
    agent: '4 agents running',
    status: '100+ signals monitored',
    lastAction: 'Zero manual intervention',
  },
];

export default function AgentFoundryV2() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const totalTabs = TABS.length;
    const totalScrollDistance = window.innerHeight * totalTabs;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'center center',
      end: `+=${totalScrollDistance}`,
      pin: true,
      scrub: false,
      onUpdate: (self) => {
        const newIndex = Math.min(
          Math.floor(self.progress * totalTabs),
          totalTabs - 1
        );
        setActiveTab(newIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <>
      {/* Contained dark card callout */}
      <section style={{
        padding: '40px 0',
        background: 'transparent',
        position: 'relative',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#080d19',
              borderRadius: '20px',
              border: '1px solid rgba(142,89,255,0.2)',
              padding: '72px 60px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* Violet glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '250px',
              background: 'radial-gradient(ellipse, rgba(142,89,255,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: '1.6',
              color: '#ffffff',
              margin: 0,
              position: 'relative',
              zIndex: 1,
              maxWidth: '760px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              While your competitors wait for Monday morning reports,<br />
              what if your agents already acted on Friday night's data?
            </p>
          </motion.div>
        </div>
      </section>

    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* BLOCK 1 — Centered intro */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.p
            className="m8-eyebrow"
            style={{ color: '#8e59ff', marginBottom: '12px' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            INTRODUCING AGENT FOUNDRY
          </motion.p>

          <motion.h2
            className="m8-h1-large"
            style={{ color: 'var(--v2-text)', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            Deploy a workforce<br />that never clocks out.
          </motion.h2>
        </div>

        <div style={{ marginTop: '40px' }}>
          {/* Two column layout */}
          <div ref={sectionRef} className="agent-foundry-tabs" style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '64px',
            alignItems: 'flex-start',
          }}>

            {/* LEFT — Tab list */}
            <div style={{
              flex: '0 0 340px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.role}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    borderLeft: `2px solid ${activeTab === i ? '#8e59ff' : 'rgba(18,24,43,0.08)'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <span style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '16px',
                    fontWeight: activeTab === i ? 500 : 400,
                    color: activeTab === i ? 'var(--v2-text)' : 'var(--v2-text-subtle)',
                    transition: 'color 0.2s ease',
                    lineHeight: '24px',
                  }}>
                    <span style={{ color: activeTab === i ? '#8e59ff' : 'rgba(142,89,255,0.4)' }}>
                      {tab.role}
                    </span>
                    {' '}can
                  </span>
                  <span style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: activeTab === i ? 'var(--v2-text-subtle)' : 'var(--v2-text-muted)',
                    lineHeight: '20px',
                    transition: 'color 0.2s ease',
                  }}>
                    {tab.oneliner}
                  </span>
                </button>
              ))}
            </div>

            {/* RIGHT — Active tab content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(18,24,43,0.08)',
                    boxShadow: '0 4px 24px rgba(18,24,43,0.06)',
                    borderRadius: '16px',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                  }}
                >
                  {/* Role + one-liner */}
                  <div>
                    <p style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '13px',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#8e59ff',
                      margin: '0 0 12px 0',
                    }}>
                      {TABS[activeTab].role}
                    </p>
                    <h3 style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'var(--v2-text)',
                      margin: '0 0 16px 0',
                      lineHeight: '1.4',
                    }}>
                      {TABS[activeTab].oneliner}
                    </h3>
                    <p style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '15px',
                      fontWeight: 400,
                      color: 'var(--v2-text-subtle)',
                      lineHeight: '1.7',
                      margin: 0,
                    }}>
                      {TABS[activeTab].body}
                    </p>
                  </div>

                  {/* Agent status card */}
                  <div style={{
                    background: 'rgba(142,89,255,0.05)',
                    border: '1px solid rgba(142,89,255,0.15)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#4ade80',
                        boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                      }} />
                      <span style={{
                        fontFamily: "'Saira', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--v2-text)',
                      }}>
                        {TABS[activeTab].agent}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', color: 'var(--v2-text-muted)' }}>
                        {TABS[activeTab].status}
                      </span>
                      <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', color: 'var(--v2-text-muted)' }}>
                        Last action: {TABS[activeTab].lastAction}
                      </span>
                    </div>
                  </div>

                  {/* Workflow visual placeholder */}
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed rgba(18,24,43,0.08)',
                    borderRadius: '12px',
                    height: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <p style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '13px',
                      color: 'var(--v2-text-muted)',
                      margin: 0,
                    }}>
                      Agent workflow visual — coming next
                    </p>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Closing power line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--v2-text-subtle)',
              textAlign: 'center',
              margin: '72px auto 0',
              maxWidth: '600px',
              fontStyle: 'italic',
              lineHeight: '1.6',
            }}
          >
            While you were in that meeting, your agents closed the gap.
          </motion.p>
        </div>

        <style>{`
          @media (max-width: 991px) {
            .agent-foundry-tabs { flex-direction: column !important; }
            .agent-foundry-tabs > div { flex: 1 1 100% !important; }
          }
        `}</style>

      </div>
    </section>
    </>
  );
}
