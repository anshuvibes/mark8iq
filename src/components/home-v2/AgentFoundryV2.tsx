import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';

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
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setTheme } = useV2Theme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('[data-section="agent-foundry"]');
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        setThemeRef.current('dark');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
      onLeave: () => {
        setThemeRef.current('light');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
      onEnterBack: () => {
        setThemeRef.current('dark');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
      onLeaveBack: () => {
        setThemeRef.current('light');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
    });

    return () => {
      trigger.kill();
      setThemeRef.current('light');
      document.dispatchEvent(new CustomEvent('cursor-show'));
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(i);
          }
        },
        {
          threshold: 0.4,
          rootMargin: '0px 0px -20% 0px',
        }
      );

      observer.observe(panel);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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

      <section
        data-section="agent-foundry"
        style={{ padding: '60px 0 0 0', position: 'relative' }}
      >
        {/* Headline block — normal scroll, no sticky involvement */}
        <div className="container" style={{ textAlign: 'center', paddingBottom: '48px' }}>
          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/img/agent-foundry-logo.svg"
              alt="Agent Foundry"
              style={{
                width: '72px',
                height: '72px',
                display: 'block',
              }}
            />
          </motion.div>

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

          <motion.div
            className="agent-node-showcase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.14 }}
          >
            <div className="agent-node-card" aria-label="Price Tracker Agent node">
              <div className="agent-node-icon" aria-hidden="true">
                <img src="/img/agent-foundry-logo.svg" alt="" />
              </div>
              <div className="agent-node-copy">
                <p className="agent-node-kicker">AGENT FOUNDRY</p>
                <h3 className="agent-node-title">Price Tracker Agent</h3>
                <div className="agent-node-badges" aria-label="Connected products">
                  <span className="agent-node-badge agent-node-badge-sight">Mark8 Sight</span>
                  <span className="agent-node-badge agent-node-badge-returns">Mark8 Returns</span>
                </div>
              </div>
              <div className="agent-node-status" aria-label="Agent active" />
            </div>
          </motion.div>
        </div>

        <div className="container">
          <div className="agent-foundry-tabs" style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '64px',
            alignItems: 'flex-start',
            position: 'relative',
          }}>
            {/* LEFT — Sticky tab list */}
            <div style={{
              flex: '0 0 300px',
              position: 'sticky',
              top: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              alignSelf: 'flex-start',
            }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    borderLeft: `2px solid ${activeTab === i ? '#8e59ff' : 'var(--v2-border)'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <span style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '15px',
                    fontWeight: activeTab === i ? 500 : 400,
                    color: activeTab === i ? 'var(--v2-text)' : 'var(--v2-text-subtle)',
                    transition: 'color 0.2s ease',
                    lineHeight: '22px',
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
                    fontSize: '12px',
                    fontWeight: 400,
                    color: activeTab === i ? 'var(--v2-text-subtle)' : 'var(--v2-text-muted)',
                    lineHeight: '17px',
                    transition: 'color 0.2s ease',
                  }}>
                    {tab.oneliner}
                  </span>
                </button>
              ))}
            </div>

            {/* RIGHT — All panels stacked vertically */}
            <div style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {TABS.map((tab, i) => (
                <div
                  key={tab.id}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  style={{
                    background: 'var(--v2-bg-card)',
                    border: '1px solid var(--v2-border)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    borderRadius: '5px',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    transition: 'box-shadow 0.3s ease',
                    ...(activeTab === i ? {
                      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(142,89,255,0.25)',
                    } : {}),
                  }}
                >
                  {/* Role label + workflow label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#8e59ff',
                      margin: 0,
                    }}>
                      {tab.role}
                    </p>
                    {tab.type === 'standard' && (
                      <p style={{
                        fontFamily: "'Saira', sans-serif",
                        fontSize: '11px',
                        fontWeight: 400,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--v2-text-muted)',
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
                    margin: 0,
                    lineHeight: '1.4',
                  }}>
                    {tab.oneliner}
                  </h3>

                  {/* Body */}
                  <p style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'var(--v2-text-subtle)',
                    lineHeight: '1.7',
                    margin: 0,
                  }}>
                    {tab.body}
                  </p>

                  {/* Standard: agent card */}
                  {tab.type === 'standard' && (
                    <div style={{
                      background: 'rgba(142,89,255,0.08)',
                      border: '1px solid rgba(142,89,255,0.12)',
                      borderRadius: '5px',
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
                            {tab.agentName}
                          </span>
                        </div>
                        <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', color: 'var(--v2-text-muted)' }}>
                          Last action: {tab.lastAction}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {tab.connects.map((tag) => (
                          <span key={tag} style={{
                            fontFamily: "'Saira', sans-serif",
                            fontSize: '11px',
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

                  {/* CXO: 2x2 grid */}
                  {tab.type === 'cxo' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {CXO_AGENTS.map((agent) => (
                        <div key={agent.name} style={{
                          background: 'rgba(142,89,255,0.08)',
                          border: '1px solid rgba(142,89,255,0.12)',
                          borderRadius: '5px',
                          padding: '14px 16px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 4px rgba(74,222,128,0.6)', flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--v2-text)' }}>
                              {agent.name}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {agent.connects.map((tag) => (
                              <span key={tag} style={{
                                fontFamily: "'Saira', sans-serif", fontSize: '10px',
                                padding: '2px 8px', borderRadius: '4px',
                                background: 'rgba(142,89,255,0.08)', color: '#8e59ff',
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

                  {/* Custom: dashed CTA */}
                  {tab.type === 'custom' && (
                    <div style={{
                      background: 'rgba(142,89,255,0.06)',
                      border: '1px dashed rgba(142,89,255,0.25)',
                      borderRadius: '5px',
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
                </div>
              ))}
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
