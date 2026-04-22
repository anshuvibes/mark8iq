import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TABS = [
  {
    id: 'ads',
    role: 'Ads Manager',
    oneliner: 'Find the keywords your competitors are winning on. And act on them automatically.',
    body: 'The Keyword Harvesting Agent scans competitor search visibility data from Mark8 Sight every hour. It identifies high-performing keywords you are not bidding on, maps them to your campaigns in Mark8 Ads, and queues them for deployment. No manual research. No missed opportunities. Your keyword strategy runs itself.',
    agentName: 'Keyword Harvesting Agent',
    connects: ['Mark8 Sight', 'Mark8 Ads'],
    lastAction: '1 hr ago',
    type: 'standard' as const,
  },
  {
    id: 'ecom',
    role: 'E-Commerce Head',
    oneliner: 'Protect your search rank before competitors take it.',
    body: 'The Visibility Booster Agent monitors your search rank across every marketplace through Mark8 Sight. The moment your position drops below the threshold you set, it triggers a targeted bid adjustment in Mark8 Ads to recover visibility. You do not find out after the damage is done. The agent acts while it is happening.',
    agentName: 'Visibility Booster Agent',
    connects: ['Mark8 Sight', 'Mark8 Ads'],
    lastAction: '22 min ago',
    type: 'standard' as const,
  },
  {
    id: 'finance',
    role: 'Finance Head',
    oneliner: 'Catch platform price violations before they cut your margin.',
    body: 'The Price Tracker Agent scans your agreed vendor prices against live selling prices across Amazon, Flipkart, Myntra, and quick commerce every hour through Mark8 Sight. The moment a platform drops below your floor price, it flags the violation with a timestamp and cascade chain. You know who violated first. You have the evidence to act.',
    agentName: 'Price Tracker Agent',
    connects: ['Mark8 Sight'],
    lastAction: '2 min ago',
    type: 'standard' as const,
  },
  {
    id: 'inventory',
    role: 'Inventory Head',
    oneliner: 'Stop burning ad spend on products you cannot fulfill.',
    body: 'The Low Stock AdFlow Agent monitors your inventory levels in Mark8 Shelf. The moment a SKU crosses your minimum stock threshold, it automatically pauses or reduces ad spend on that listing in Mark8 Ads. No wasted budget on products that cannot convert. No customer experience damaged by ads leading to out-of-stock pages.',
    agentName: 'Low Stock AdFlow Agent',
    connects: ['Mark8 Shelf', 'Mark8 Ads'],
    lastAction: '45 min ago',
    type: 'standard' as const,
  },
  {
    id: 'cxo',
    role: 'CXO',
    oneliner: 'Scale the operation without scaling the team.',
    body: 'Four agents. Running simultaneously. Acting on your data. Every hour of every day. Your ads optimise themselves. Your prices are protected. Your keywords grow automatically. Your inventory never wastes budget. This is not automation for automation\'s sake. This is the execution layer your operation always needed but could never hire.',
    agentName: 'All four agents active',
    connects: ['Mark8 Sight', 'Mark8 Ads', 'Mark8 Shelf'],
    lastAction: 'Continuous',
    type: 'cxo' as const,
  },
  {
    id: 'custom',
    role: 'Build Your Own',
    oneliner: 'Not every operation fits a template. Build the agent your business actually needs.',
    body: 'Agent Foundry includes a visual drag-and-drop builder. Connect to your data sources. Define your triggers. Set your rules. Deploy an agent that works exactly the way your operation demands. No engineering team required. No template constraints. If you can describe the workflow, you can build the agent.',
    agentName: 'Custom Agent Builder',
    connects: ['Any Mark8 IQ module'],
    lastAction: 'Ready to build',
    type: 'custom' as const,
  },
];

const CXO_AGENTS = [
  { name: 'Keyword Harvesting Agent', connects: ['Mark8 Sight', 'Mark8 Ads'], lastAction: '1 hr ago' },
  { name: 'Visibility Booster Agent', connects: ['Mark8 Sight', 'Mark8 Ads'], lastAction: '22 min ago' },
  { name: 'Price Tracker Agent', connects: ['Mark8 Sight'], lastAction: '2 min ago' },
  { name: 'Low Stock AdFlow Agent', connects: ['Mark8 Shelf', 'Mark8 Ads'], lastAction: '45 min ago' },
];

export default function AgentFoundryV2() {
  const [activeTab, setActiveTab] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const totalHeight = outer.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / totalHeight, 1);
      const newIndex = Math.min(
        Math.floor(progress * TABS.length),
        TABS.length - 1
      );
      setActiveTab(newIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

    <section style={{ padding: '60px 0 0 0', position: 'relative' }}>
        {/* Headline block — normal scroll, no sticky involvement */}
        <div className="container" style={{ textAlign: 'center', paddingBottom: '32px' }}>
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
            className="m8-h2"
            style={{ color: 'var(--v2-text)', marginBottom: 0 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08 }}
          >
            Deploy a workforce<br />that never clocks out.
          </motion.h2>
        </div>

        {/* Outer scroll container — starts AFTER headline */}
        <div
          ref={outerRef}
          style={{
            height: `${TABS.length * 50 + 100}vh`,
            position: 'relative',
          }}
        >
          {/* Sticky panel — centers in viewport */}
          <div
            ref={stickyRef}
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              padding: '40px 0',
            }}
          >
            <div className="container">
              {/* Two-column tab layout — exactly as-is */}
              <div className="agent-foundry-tabs" style={{
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
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
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
                    <span style={{
                      color: tab.id === 'custom'
                        ? '#8e59ff'
                        : activeTab === i ? '#8e59ff' : 'rgba(142,89,255,0.4)',
                    }}>
                      {tab.role}
                    </span>
                    {tab.id !== 'custom' && ' can'}
                  </span>
                  <span style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: activeTab === i ? 'var(--v2-text-subtle)' : 'var(--v2-text-muted)',
                    lineHeight: '18px',
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
                  {/* Role label + workflow label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#8e59ff',
                      margin: 0,
                    }}>
                      {TABS[activeTab].role}
                    </p>
                    {TABS[activeTab].type === 'standard' && (
                      <p style={{
                        fontFamily: "'Saira', sans-serif",
                        fontSize: '11px',
                        fontWeight: 400,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(18,24,43,0.3)',
                        margin: 0,
                      }}>
                        AGENTIC WORKFLOW
                      </p>
                    )}
                  </div>

                  {/* Headline */}
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

                  {/* Body */}
                  <p style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'var(--v2-text-subtle)',
                    lineHeight: '1.7',
                    margin: '0 0 28px 0',
                  }}>
                    {TABS[activeTab].body}
                  </p>

                  {/* Standard tab: single agent card */}
                  {TABS[activeTab].type === 'standard' && (
                    <div style={{
                      background: 'rgba(142,89,255,0.04)',
                      border: '1px solid rgba(142,89,255,0.12)',
                      borderRadius: '10px',
                      padding: '16px 20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: '#4ade80',
                            boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                            flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--v2-text)' }}>
                            {TABS[activeTab].agentName}
                          </span>
                        </div>
                        <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', color: 'var(--v2-text-muted)' }}>
                          Last action: {TABS[activeTab].lastAction}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {TABS[activeTab].connects.map((tag) => (
                          <span key={tag} style={{
                            fontFamily: "'Saira', sans-serif",
                            fontSize: '11px',
                            fontWeight: 400,
                            letterSpacing: '0.05em',
                            padding: '3px 10px',
                            borderRadius: '4px',
                            background: 'rgba(142,89,255,0.08)',
                            color: '#8e59ff',
                            border: '1px solid rgba(142,89,255,0.15)',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CXO tab: 2x2 grid of all four agent cards */}
                  {TABS[activeTab].type === 'cxo' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {CXO_AGENTS.map((agent) => (
                        <div key={agent.name} style={{
                          background: 'rgba(142,89,255,0.04)',
                          border: '1px solid rgba(142,89,255,0.12)',
                          borderRadius: '10px',
                          padding: '14px 16px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: '#4ade80',
                              boxShadow: '0 0 4px rgba(74,222,128,0.6)',
                              flexShrink: 0,
                            }} />
                            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--v2-text)' }}>
                              {agent.name}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {agent.connects.map((tag) => (
                              <span key={tag} style={{
                                fontFamily: "'Saira', sans-serif",
                                fontSize: '10px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: 'rgba(142,89,255,0.08)',
                                color: '#8e59ff',
                                border: '1px solid rgba(142,89,255,0.12)',
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '11px', color: 'var(--v2-text-muted)', margin: '8px 0 0 0' }}>
                            Last: {agent.lastAction}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Custom tab: open CTA */}
                  {TABS[activeTab].type === 'custom' && (
                    <div style={{
                      background: 'rgba(142,89,255,0.06)',
                      border: '1px dashed rgba(142,89,255,0.25)',
                      borderRadius: '10px',
                      padding: '24px',
                      textAlign: 'center',
                    }}>
                      <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', color: '#8e59ff', margin: '0 0 8px 0', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        AGENT FOUNDRY — CUSTOM BUILDER
                      </p>
                      <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', color: 'var(--v2-text-subtle)', margin: 0, lineHeight: '1.6' }}>
                        Drag. Connect. Deploy. Your workflow. Your rules.
                      </p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

              </div>
            </div>
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
              padding: '80px 40px',
              fontStyle: 'italic',
            }}
          >
            While you were in that meeting, your agents closed the gap.
          </motion.p>

        <style>{`
          @media (max-width: 991px) {
            .agent-foundry-tabs { flex-direction: column !important; }
            .agent-foundry-tabs > div { flex: 1 1 100% !important; }
          }
        `}</style>

    </section>
    </>
  );
}
