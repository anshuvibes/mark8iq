import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Background, Handle, Position, ReactFlow, type Edge, type Node, type NodeProps, type NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useV2Theme } from './ThemeContext';
import AgentMarqueeStrip from './AgentMarqueeStrip';

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

type WorkflowNodeData = {
  label: string;
  meta: string;
  tone: 'source' | 'agent' | 'action';
};

type WorkflowNode = Node<WorkflowNodeData, 'agentWorkflow'>;

function AgentWorkflowNode({ data }: NodeProps<WorkflowNode>) {
  return (
    <div className={`agent-flow-node agent-flow-node--${data.tone}`}>
      <Handle type="target" position={Position.Left} className="agent-flow-handle" />
      <p className="agent-flow-node__label">{data.label}</p>
      <p className="agent-flow-node__meta">{data.meta}</p>
      <Handle type="source" position={Position.Right} className="agent-flow-handle" />
    </div>
  );
}

const agentFlowNodeTypes: NodeTypes = { agentWorkflow: AgentWorkflowNode };

const adsWorkflowNodes: WorkflowNode[] = [
  { id: 'sight', type: 'agentWorkflow', position: { x: 18, y: 78 }, data: { label: 'Mark8 Sight', meta: 'Competitor search scan', tone: 'source' } },
  { id: 'agent', type: 'agentWorkflow', position: { x: 220, y: 38 }, data: { label: 'Keyword Harvesting Agent', meta: 'Ranks, clusters, validates', tone: 'agent' } },
  { id: 'ads', type: 'agentWorkflow', position: { x: 474, y: 78 }, data: { label: 'Mark8 Ads', meta: 'Queues bid deployment', tone: 'action' } },
];

const adsWorkflowEdges: Edge[] = [
  { id: 'sight-agent', source: 'sight', target: 'agent', animated: true, style: { stroke: 'var(--v2-accent)', strokeWidth: 1.4 } },
  { id: 'agent-ads', source: 'agent', target: 'ads', animated: true, style: { stroke: 'var(--v2-accent)', strokeWidth: 1.4 } },
];

export default function AgentFoundryV2() {
  const [activeTab, setActiveTab] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  
  const { setTheme } = useV2Theme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('[data-section="agent-foundry"]');
    if (!section) return;

    const finalPanel = panelRefs.current[TABS.length - 1];

    // Scrubbed theme trigger: theme toggles based on scroll progress through the section,
    // making the dark <-> light transition feel coupled to scroll instead of a hard snap.
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      endTrigger: finalPanel || section,
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        // Active range: keep dark while scrolling through the section
        if (self.progress > 0.02 && self.progress < 0.98) {
          setThemeRef.current('dark');
        } else if (self.progress >= 0.98) {
          setThemeRef.current('light');
        } else if (self.progress <= 0.02) {
          setThemeRef.current('light');
        }
      },
    });

    return () => {
      trigger.kill();
      setThemeRef.current('light');
    };
  }, []);

  const activePersona = TABS[activeTab];


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

        </div>

        {/* Agent marquee strip */}
        <AgentMarqueeStrip />

        <div className="container">
          <div className="agent-foundry-tabs" style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '64px',
            alignItems: 'flex-start',
            position: 'relative',
          }}>
            {/* LEFT — Sticky tab list */}
            <div
              ref={navRef}
              style={{
                flex: '0 0 300px',
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                alignSelf: 'flex-start',
              }}
            >
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    padding: '20px 20px',
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
                    fontSize: '16px',
                    fontWeight: activeTab === i ? 500 : 400,
                    color: activeTab === i ? 'var(--v2-text)' : 'var(--v2-text-subtle)',
                    transition: 'color 0.2s ease',
                    lineHeight: '1.4',
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
                    fontSize: '14px',
                    fontWeight: 400,
                    color: activeTab === i ? 'var(--v2-text-subtle)' : 'var(--v2-text-muted)',
                    lineHeight: '1.6',
                    transition: 'color 0.2s ease',
                  }}>
                    {tab.oneliner}
                  </span>
                </button>
              ))}
            </div>

            {/* RIGHT — Only active panel shown */}
            <div style={{
              flex: 1,
              minWidth: 0,
              position: 'sticky',
              top: '100px',
              alignSelf: 'flex-start',
            }}>
              <div
                key={activePersona.id}
                ref={(el) => {
                  panelRefs.current[activeTab] = el;
                  panelRefs.current[TABS.length - 1] = el;
                }}
                style={{
                  background: 'var(--v2-bg-card)',
                  border: '1px solid rgba(142,89,255,0.25)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                  borderRadius: '5px',
                  padding: '40px',
                  height: '480px',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
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
          .agent-flow-canvas {
            width: 100%;
            height: 220px;
            border: 1px solid rgba(142, 89, 255, 0.16);
            border-radius: 5px;
            overflow: hidden;
            background: linear-gradient(180deg, rgba(142, 89, 255, 0.08), rgba(8, 13, 25, 0.44));
          }

          .agent-flow-canvas .react-flow__pane,
          .agent-flow-canvas .react-flow__renderer,
          .agent-flow-canvas .react-flow__viewport {
            cursor: default;
          }

          .agent-flow-node {
            min-width: 154px;
            border: 1px solid rgba(142, 89, 255, 0.2);
            border-radius: 5px;
            padding: 12px 14px;
            background: rgba(8, 13, 25, 0.88);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.26);
          }

          .agent-flow-node--agent {
            min-width: 192px;
            border-color: rgba(142, 89, 255, 0.46);
            background: rgba(142, 89, 255, 0.14);
          }

          .agent-flow-node__label,
          .agent-flow-node__meta {
            font-family: 'Saira', sans-serif;
            margin: 0;
          }

          .agent-flow-node__label {
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
            color: var(--v2-text);
            white-space: nowrap;
          }

          .agent-flow-node__meta {
            margin-top: 4px;
            font-size: 10px;
            font-weight: 400;
            line-height: 15px;
            color: var(--v2-text-muted);
          }

          .agent-flow-handle {
            width: 7px;
            height: 7px;
            border: 1px solid rgba(142, 89, 255, 0.64);
            background: var(--v2-accent);
          }

          @media (max-width: 991px) {
            .agent-foundry-tabs { flex-direction: column !important; }
            .agent-foundry-tabs > div { flex: 1 1 100% !important; }
          }
        `}</style>
      </section>
    </>
  );
}
