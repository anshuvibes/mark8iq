import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgentMarkDock, type DockState } from './AgentMarkDockContext';
import { useAgentMarkDemo, DEMO_CYCLE } from './useAgentMarkDemo';

type Mode = 'pill' | 'expanded' | 'chat';

type Message = {
  from: 'user' | 'agent';
  text: string;
  type?: 'text' | 'loading' | 'response';
};

const FADE_TIME = 600;

// Floating coordinates
const FLOAT_BOTTOM = 24;
const FLOAT_PILL_WIDTH = 480;
const FLOAT_PILL_HEIGHT = 56;
const FLOAT_CHAT_WIDTH = 480;
const FLOAT_CHAT_HEIGHT = 560;
const PILL_RADIUS = 5;
const CHAT_RADIUS = 5;
const DOCK_HEIGHT_DESKTOP = 520;

const SESSION_EMAIL_KEY = 'agentMark.emailSent';

const starters = [
  { text: 'What does Mark8 IQ actually do for a D2C brand?', key: 'what' },
  { text: 'How did Asian Shoes save ₹60 lakh a month?', key: 'casestudy' },
  { text: 'How is this different from what I already use?', key: 'differentiation' },
];

const conversationFlows: Record<string, Message[]> = {
  what: [
    {
      from: 'agent',
      type: 'response',
      text: `**What Mark8 IQ does**\n\n- Pulls data from Amazon, Flipkart, Myntra, Meesho, Zepto, Blinkit into one source of truth\n- Standardises every metric through PRISM so you stop reconciling spreadsheets\n- Layers Agent Mark on top to tell you exactly what to act on next\n\n**Where it fits**\n\n- Replaces fragmented dashboards across ads, inventory, returns, shelf health, reconciliation\n- One operating system for the full e-commerce stack`,
    },
  ],
  casestudy: [
    {
      from: 'agent',
      type: 'response',
      text: `**Asian Shoes — ₹62 lakh saved per month**\n\n- Was spending ₹90 lakh a month on Amazon ads\n- Mark8 IQ flagged that 70% of budget was hitting non-converting hours\n- After re-targeting, ad spend dropped to ₹28 lakh\n\n**Outcome**\n\n- Same ₹6.5 Cr in monthly sales\n- 68% reduction in ad spend, every single month`,
    },
  ],
  differentiation: [
    {
      from: 'agent',
      type: 'response',
      text: `**Why Mark8 IQ is different**\n\n- Most tools cover one function — ads, or inventory, or reconciliation\n- They do not talk to each other and you end up stitching insights manually\n\n**How we connect it**\n\n- Six modules feed Market One — one shared source of truth\n- When ad spend changes, inventory forecasts update automatically\n- When returns spike, reconciliation flags it and the ads team gets alerted`,
    },
  ],
};

const followUpFlow: Message[] = [
  {
    from: 'agent',
    type: 'response',
    text: `**Quick follow-up**\n\n- What is the biggest headache right now — ads performance, inventory visibility, returns, or something else?\n- I can pull a tailored answer once I know your stack`,
  },
];

const emailAsk: Message = {
  from: 'agent',
  type: 'response',
  text: `**A 20-minute live demo will show you the exact impact**\n\n- Drop your email below\n- Someone from the Mark8 IQ team reaches out today\n- You get a tailored walk-through against your own data`,
};

function RenderMarkdown({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        const isBulletBlock = lines.every((l) => l.trim().startsWith('-'));
        if (isBulletBlock) {
          return (
            <ul key={bi} style={{ margin: '0 0 12px 0', paddingLeft: '20px', listStyle: 'disc', color: '#12182b' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: '22px', marginBottom: '4px' }}>
                  {l.replace(/^-\s*/, '')}
                </li>
              ))}
            </ul>
          );
        }
        if (lines.length === 1 && /^\*\*.+\*\*$/.test(lines[0].trim())) {
          return (
            <p key={bi} style={{ fontFamily: "'Saira', sans-serif", fontSize: '16px', fontWeight: 500, color: '#12182b', margin: '0 0 8px 0', lineHeight: '20px' }}>
              {lines[0].replace(/\*\*/g, '')}
            </p>
          );
        }
        return (
          <p key={bi} style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#12182b', lineHeight: '22px', margin: '0 0 12px 0' }}>
            {block}
          </p>
        );
      })}
    </>
  );
}

const SparkleIcon = ({ size = 16, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill={color} />
    <path d="M19 3L19.7 5.3L22 6L19.7 6.7L19 9L18.3 6.7L16 6L18.3 5.3L19 3Z" fill={color} opacity={0.7} />
  </svg>
);

const ArrowUpRight = ({ size = 14, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L17 7M17 7H8M17 7V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Coords {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
}

function getFloatingCoords(mode: Mode): Coords {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sideGutter = 16;
  const isChat = mode === 'chat';
  const w = isChat
    ? Math.min(FLOAT_CHAT_WIDTH, (typeof window !== 'undefined' ? window.innerWidth : 1024) - sideGutter * 2)
    : Math.min(FLOAT_PILL_WIDTH, (typeof window !== 'undefined' ? window.innerWidth : 1024) - sideGutter * 2);
  const h = isChat ? Math.min(FLOAT_CHAT_HEIGHT, (typeof window !== 'undefined' ? window.innerHeight : 800) - 80) : FLOAT_PILL_HEIGHT;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const left = (vw - w) / 2;
  const top = vh - h - FLOAT_BOTTOM;
  return {
    top,
    left,
    width: w,
    height: h,
    borderRadius: isChat ? CHAT_RADIUS : PILL_RADIUS,
  };
}

function getDockCoords(el: HTMLElement | null): Coords | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
    borderRadius: CHAT_RADIUS,
  };
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function AgentMarkWidget() {
  const dockCtx = useAgentMarkDock();
  const dockInView = dockCtx?.dockInView ?? false;
  const dockRef = dockCtx?.dockRef;

  const [mode, setMode] = useState<Mode>('pill');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [pillInputText, setPillInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(SESSION_EMAIL_KEY) === '1';
  });

  // Docking state
  const [docked, setDocked] = useState<'free' | 'docking' | 'docked' | 'undocking'>('free');
  const [coords, setCoords] = useState<Coords>(() => getFloatingCoords('pill'));
  const [animateEnabled, setAnimateEnabled] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [hiddenBelow, setHiddenBelow] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hide during fragmentation scroll (E7 — top priority)
  const [fragmentationHidden, setFragmentationHidden] = useState(false);
  useEffect(() => {
    const fragSection = document.querySelector('[data-section="fragmentation"]');
    if (!fragSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFragmentationHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(fragSection);
    return () => observer.disconnect();
  }, []);

  // Persist emailSent (E10)
  useEffect(() => {
    if (emailSent && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_EMAIL_KEY, '1');
    }
  }, [emailSent]);

  // Detect when section is scrolled past (above viewport) — hide widget entirely
  useEffect(() => {
    const el = dockRef?.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          if (rect.top < 0) {
            // Section scrolled above viewport — hide widget, reset to free
            setHiddenBelow(true);
            setDocked('free');
            setMode('pill');
            setIsExpanding(false);
          } else {
            // Section is below viewport — normal float state
            setHiddenBelow(false);
          }
        } else {
          setHiddenBelow(false);
        }
      },
      { threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [dockRef]);

  // Snap-dock + CSS height expand. No spring morph.
  useEffect(() => {
    if (!dockCtx) return;

    if (dockInView) {
      if (mode === 'chat' && docked === 'free') {
        setMode('pill');
        setMessages([]);
        setTurnCount(0);
        setEmail('');
      }

      if (docked === 'free' || docked === 'undocking') {
        const el = dockRef?.current;
        if (!el) return;
        const r = el.getBoundingClientRect();

        // Snap directly to dock position. No spring. No morph.
        setCoords({
          top: r.top,
          left: r.left,
          width: r.width,
          height: FLOAT_PILL_HEIGHT,
          borderRadius: CHAT_RADIUS,
        });

        setDocked('docking');

        // After one frame (position snap complete), expand height with CSS transition
        requestAnimationFrame(() => {
          setIsExpanding(true);
          setCoords((prev) => ({
            ...prev,
            height: DOCK_HEIGHT_DESKTOP,
          }));
          setTimeout(() => {
            setDocked('docked');
          }, 380);
        });
      }
    } else {
      if (docked === 'docked' || docked === 'docking') {
        // Shrink height back, then undock to floating
        setIsExpanding(true);
        setCoords((prev) => ({
          ...prev,
          height: FLOAT_PILL_HEIGHT,
        }));
        setTimeout(() => {
          setIsExpanding(false);
          setDocked('undocking');
          setMode('pill');
          const floatCoords = getFloatingCoords('pill');
          setCoords(floatCoords);
          setTimeout(() => setDocked('free'), 50);
        }, 380);
      }
    }
  }, [dockInView, dockCtx]);

  // Direct scroll-sync: when docked, track dock position on every frame
  useEffect(() => {
    if (docked !== 'docking' && docked !== 'docked') return;

    let rafId = 0;

    const syncPosition = () => {
      const el = dockRef?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCoords((prev) => ({
        top: r.top,
        left: r.left,
        width: r.width,
        height: prev.height,
        borderRadius: CHAT_RADIUS,
      }));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncPosition);
    };

    syncPosition();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [docked, dockRef]);

  // Window resize: keep floating coords correct when free
  useEffect(() => {
    if (docked !== 'free') return;
    const onResize = () => {
      setCoords(getFloatingCoords(mode));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [docked, mode]);

  // Update floating coords when mode changes while free (pill ↔ expanded ↔ chat)
  useEffect(() => {
    if (docked !== 'free') return;
    setCoords(getFloatingCoords(mode));
  }, [mode, docked]);

  // Sync to context dockState
  useEffect(() => {
    const map: Record<typeof docked, DockState> = {
      free: 'floating',
      docking: 'docking',
      docked: 'docked',
      undocking: 'undocking',
    };
    dockCtx?.setDockState(map[docked]);
  }, [docked, dockCtx]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  // Lock page scroll only when LIVE chat is open AND we're floating (E3 — also lock if chat open while docked)
  useEffect(() => {
    const isLiveChatOpen = mode === 'chat';
    if (!isLiveChatOpen) return;

    const lenis = (window as any).__lenis;
    lenis?.stop?.();

    const preventWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (scrollContainerRef.current?.contains(target)) return;
      e.preventDefault();
    };
    const preventTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (scrollContainerRef.current?.contains(target)) return;
      e.preventDefault();
    };

    window.addEventListener('wheel', preventWheel, { passive: false });
    window.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      lenis?.start?.();
      window.removeEventListener('wheel', preventWheel);
      window.removeEventListener('touchmove', preventTouch);
    };
  }, [mode, docked]);

  // Demo runs only when fully docked AND not in live chat (E2, E5)
  const demoEnabled = docked === 'docked' && mode !== 'chat';
  const demo = useAgentMarkDemo({ enabled: demoEnabled });

  const addAgentResponse = (responses: Message[]) => {
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, ...responses]);
      setIsLoading(false);
      setTurnCount((t) => t + 1);
    }, 1400);
  };

  const handleStarterClick = (starter: typeof starters[0]) => {
    setMode('chat');
    setMessages([{ from: 'user', text: starter.text }]);
    addAgentResponse(conversationFlows[starter.key]);
  };

  const handlePillSend = () => {
    const text = pillInputText.trim();
    if (!text) return;
    setPillInputText('');
    setMode('chat');
    setMessages([{ from: 'user', text }]);
    addAgentResponse(conversationFlows.what);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    setMessages((prev) => [...prev, { from: 'user', text }]);
    if (turnCount >= 1 && !emailSent) {
      addAgentResponse([emailAsk]);
    } else {
      addAgentResponse(followUpFlow);
    }
  };

  const handleEmailSubmit = () => {
    if (!email.includes('@')) return;
    setEmailSent(true);
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: email },
      {
        from: 'agent',
        type: 'response',
        text: `**You're in**\n\n- Someone from Mark8 IQ reaches out within a few hours\n- Meanwhile, keep exploring the rest of the site`,
      },
    ]);
  };

  const closeChat = () => {
    setMode('pill');
    setMessages([]);
    setTurnCount(0);
    setEmail('');
  };

  // Visibility resolution: fragmentation > hiddenBelow > docked > floating-pill (E7)
  if (fragmentationHidden) return null;
  if (hiddenBelow) return null;

  // What content shows in the container
  const showDemo = docked === 'docked' && mode !== 'chat';
  const showChat = mode === 'chat';
  const showPillContent = !showDemo && !showChat && mode === 'pill';
  // Only show suggestions when truly free-floating (not docking/docked/undocking)
  const showExpanded = !showDemo && !showChat && mode === 'expanded' && docked === 'free';

  // Suggestions card — anchored to pill's current floating coords with hover bridge
  const renderSuggestions = () => {
    const pillCoords = getFloatingCoords('pill');
    const cardWidth = pillCoords.width;
    const cardLeft = pillCoords.left;
    // Position card directly above pill; use bottom anchored to viewport bottom
    const bottomFromViewport = window.innerHeight - pillCoords.top + 10;
    return (
      <motion.div
        key="suggestions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onMouseEnter={() => setMode('expanded')}
        onMouseLeave={() => setMode('pill')}
        style={{
          position: 'fixed',
          bottom: bottomFromViewport,
          left: cardLeft,
          width: cardWidth,
          background: '#f9f9fb',
          borderRadius: '20px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '0 8px 32px rgba(8,13,25,0.08)',
          zIndex: 100000,
          pointerEvents: 'auto',
        }}
      >
        {/* Invisible hover bridge between card and pill so hover doesn't break */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -12, height: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparkleIcon size={16} color="#12182b" />
          <p className="m8-p5" style={{ color: '#12182b', margin: 0, fontWeight: 500 }}>Suggestions</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {starters.map((s, i) => (
            <motion.button
              key={s.key}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => handleStarterClick(s)}
              whileHover={{ background: '#f5f0ff' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 14px', borderRadius: '16px', background: '#ffffff',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 2px 8px rgba(130,130,130,0.06)', width: '100%',
              }}
            >
              <p className="m8-p6" style={{ flex: 1, color: '#12182b', margin: 0 }}>{s.text}</p>
              <div style={{ width: '26px', height: '26px', borderRadius: '40px', background: '#8e59ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowUpRight size={13} color="#fff" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  // Pill content (input bar) — shown inside the morphing container when floating + pill/expanded
  const renderPillContent = () => (
    <div
      onMouseEnter={() => setMode('expanded')}
      onMouseLeave={() => setMode('pill')}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '4px 8px 4px 16px',
        background: '#ffffff',
        border: '1px solid #8e59ff',
        borderRadius: '5px',
        boxShadow: '0 8px 24px rgba(142,89,255,0.12)',
        width: '100%', height: '100%',
      }}
    >
      <input
        type="text"
        value={pillInputText}
        onChange={(e) => setPillInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handlePillSend()}
        onFocus={() => setMode('expanded')}
        placeholder="Ask Agent Mark anything about Mark8 IQ…"
        className="agent-mark-pill-input m8-p6"
        style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#12182b', padding: '8px 0', fontSize: '14px' }}
      />
      <button
        onClick={handlePillSend}
        className="m8-p6"
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '7px 14px', borderRadius: '5px', border: 'none',
          background: '#8e59ff', color: '#fff', fontWeight: 500, cursor: 'pointer',
        }}
      >
        <SparkleIcon size={13} color="#fff" />
        Ask Mark
      </button>
    </div>
  );

  // Demo content (auto-cycling) — shown when docked
  const insightsWordList = demo.current.response.insights.split(' ');
  const rcWordList = demo.current.response.rootCause.split(' ');
  const showResponse = ['insights', 'rootcause', 'recommendations', 'complete'].includes(demo.phase);

  const renderDemoContent = () => (
    <div style={{
      width: '100%', height: '100%',
      background: '#ffffff', borderRadius: `${CHAT_RADIUS}px`,
      boxShadow: '0 4px 24px rgba(130,130,130,0.08)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '24px', flex: 1, overflow: 'hidden',
        opacity: demo.opacity, transition: `opacity ${FADE_TIME}ms ease-out`,
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        {demo.phase !== 'idle' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#F5F0FF', border: '1px solid #E2D6FF', borderRadius: '20px', padding: '8px 16px', maxWidth: '70%' }}>
              <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#12182b', margin: 0, lineHeight: '20px' }}>
                {demo.current.halt.statement}
              </p>
            </div>
          </div>
        )}

        {demo.phase === 'loading' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #608ff6)', flexShrink: 0 }} />
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8E59FF', display: 'inline-block', animation: `agentDotPulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {showResponse && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #608ff6)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '6px' }}>INSIGHTS</p>
                <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: '22px', color: '#12182b', margin: 0 }}>
                  {insightsWordList.slice(0, demo.visibleWords).join(' ')}
                  {demo.visibleWords < insightsWordList.length && demo.phase === 'insights' && (
                    <span style={{ animation: 'agentCaretBlink 1s infinite', marginLeft: '2px' }}>|</span>
                  )}
                </p>
              </div>
              {['rootcause', 'recommendations', 'complete'].includes(demo.phase) && (
                <div>
                  <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '6px' }}>ROOT CAUSE</p>
                  <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: '22px', color: '#12182b', margin: 0 }}>
                    {rcWordList.slice(0, demo.visibleRcWords).join(' ')}
                    {demo.visibleRcWords < rcWordList.length && demo.phase === 'rootcause' && (
                      <span style={{ animation: 'agentCaretBlink 1s infinite', marginLeft: '2px' }}>|</span>
                    )}
                  </p>
                </div>
              )}
              {['recommendations', 'complete'].includes(demo.phase) && (
                <div>
                  <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '8px' }}>RECOMMENDATIONS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {demo.current.response.recommendations.slice(0, demo.visibleBullets).map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#8E59FF', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira', sans-serif", fontSize: '11px', fontWeight: 500, flexShrink: 0, marginTop: '1px' }}>
                          {i + 1}
                        </div>
                        <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: '22px', color: '#12182b', margin: 0, flex: 1 }}>
                          {rec}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Static input bar — clicking opens live chat (E2) */}
      <button
        onClick={() => {
          setMode('chat');
          setMessages([]);
          setTurnCount(0);
        }}
        style={{
          borderTop: '1px solid #EDF0F7',
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#f9f9fb',
          cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left',
        }}
      >
        <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#656981', margin: 0 }}>
          Ask Agent Mark anything...
        </p>
        <div style={{ height: '32px', padding: '0 14px', borderRadius: '40px', background: '#e2e6ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', fontWeight: 500, color: '#8E59FF' }}>
            ✦ Ask Mark
          </span>
        </div>
      </button>
    </div>
  );

  // Live chat content
  const renderChatContent = () => (
    <div style={{
      width: '100%', height: '100%',
      background: '#f9f9fb',
      borderRadius: `${CHAT_RADIUS}px`,
      padding: '20px',
      boxShadow: docked === 'docked' ? 'none' : '0 4px 16px 6px rgba(130,130,130,0.05), 0 24px 60px rgba(8,13,25,0.18)',
      display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '16px', fontWeight: 500, color: '#656981', lineHeight: '20px', margin: 0 }}>
          Your conversation with Agent Mark
        </p>
        <button
          onClick={closeChat}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="#656981" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 24, background: 'linear-gradient(to bottom, #f9f9fb 0%, rgba(249,249,251,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />
        <div ref={scrollContainerRef} className="ai-panel-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '6px' }}>
          {messages.map((msg, i) => {
            if (msg.from === 'user') {
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', width: '100%' }}>
                  <div style={{ width: '100%', background: 'linear-gradient(to right, #e6e9f4, #eee5ff)', padding: '16px', borderRadius: '8px' }}>
                    <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#12182b', lineHeight: '22px', textAlign: 'right', margin: 0 }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 400, fontStyle: 'italic', color: '#656981', margin: '0 0 8px 0' }}>
                  Interesting ask ✨ — let me crunch this data and turn it into something useful.
                </p>
                <RenderMarkdown text={msg.text} />
                {msg === emailAsk && !emailSent && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                      placeholder="your@email.com"
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(142,89,255,0.3)', fontFamily: "'Saira', sans-serif", fontSize: '13px', outline: 'none', background: 'white', color: '#12182b' }}
                    />
                    <button onClick={handleEmailSubmit} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', background: '#8e59ff', color: '#fff', fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                      Send
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 400, fontStyle: 'italic', color: '#656981', margin: 0 }}>
                Brewing insights… should take a few seconds 🍵 lining up the right target…
              </p>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingTop: '4px' }}>
                {[0, 1, 2].map((j) => (
                  <div key={j} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8e59ff', animation: 'agentDotPulse 1.4s infinite', animationDelay: `${j * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'linear-gradient(to top, #f9f9fb 0%, rgba(249,249,251,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 6px 6px 20px', background: '#ffffff', border: '1px solid #8e59ff', borderRadius: '5px' }}>
        <input
          type="text" value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder={isLoading ? 'Agent Mark is thinking…' : 'Continue the conversation with Agent Mark…'}
          disabled={isLoading}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#12182b', padding: '10px 0' }}
        />
        <button
          onClick={handleSend} disabled={isLoading}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '5px', border: 'none', background: isLoading ? '#e6dcff' : '#8e59ff', color: isLoading ? '#8e59ff' : '#fff', fontFamily: "'Saira', sans-serif", fontSize: '13px', fontWeight: 500, cursor: isLoading ? 'default' : 'pointer' }}
        >
          {isLoading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
              </svg>
              Stop Mark
            </>
          ) : (
            <>
              <SparkleIcon size={14} color="#fff" />
              Ask Mark
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Suggestions card — only when free + expanded */}
      <AnimatePresence>
        {showExpanded && renderSuggestions()}
      </AnimatePresence>

      {/* Container — position is direct, only height transitions via CSS */}
      <div
        onMouseEnter={() => {
          if (docked === 'free' && mode === 'pill') setMode('expanded');
        }}
        onMouseLeave={() => {
          if (docked === 'free' && mode === 'expanded') setMode('pill');
        }}
        style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          width: coords.width,
          height: coords.height,
          borderRadius: coords.borderRadius,
          zIndex: 99999,
          pointerEvents: 'auto',
          overflow: 'hidden',
          transition: isExpanding ? 'height 0.35s ease' : 'none',
        }}
      >
        {showDemo && renderDemoContent()}
        {showChat && renderChatContent()}
        {(showPillContent || showExpanded) && renderPillContent()}
      </div>

      <style>{`
        @keyframes agentDotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes agentCaretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .agent-mark-pill-input::placeholder {
          color: #656981;
          opacity: 1;
        }
      `}</style>
    </>
  );
}
