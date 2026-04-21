import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type WidgetState = 'pill' | 'expanded' | 'chat';

type Message = {
  from: 'user' | 'agent';
  text: string;
  type?: 'text' | 'loading' | 'response';
};

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

// Markdown-ish renderer: supports **bold** lines and `-` bullets
function RenderMarkdown({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        const isBulletBlock = lines.every((l) => l.trim().startsWith('-'));
        if (isBulletBlock) {
          return (
            <ul
              key={bi}
              style={{
                margin: '0 0 12px 0',
                paddingLeft: '20px',
                listStyle: 'disc',
                color: '#12182b',
              }}
            >
              {lines.map((l, li) => (
                <li
                  key={li}
                  style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    marginBottom: '4px',
                  }}
                >
                  {l.replace(/^-\s*/, '')}
                </li>
              ))}
            </ul>
          );
        }
        // Heading-ish bold-only line
        if (lines.length === 1 && /^\*\*.+\*\*$/.test(lines[0].trim())) {
          return (
            <p
              key={bi}
              style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '16px',
                fontWeight: 500,
                color: '#12182b',
                margin: '0 0 8px 0',
                lineHeight: '20px',
              }}
            >
              {lines[0].replace(/\*\*/g, '')}
            </p>
          );
        }
        return (
          <p
            key={bi}
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#12182b',
              lineHeight: '22px',
              margin: '0 0 12px 0',
            }}
          >
            {block}
          </p>
        );
      })}
    </>
  );
}

const SparkleIcon = ({ size = 16, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      fill={color}
    />
    <path d="M19 3L19.7 5.3L22 6L19.7 6.7L19 9L18.3 6.7L16 6L18.3 5.3L19 3Z" fill={color} opacity={0.7} />
  </svg>
);

const ArrowUpRight = ({ size = 14, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 17L17 7M17 7H8M17 7V16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function AgentMarkWidget() {
  const [state, setState] = useState<WidgetState>('pill');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [pillInputText, setPillInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hide during fragmentation scroll. `visible` drives AnimatePresence so the
  // exit animation can play before unmount.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Small delay so the entrance fires after first paint
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const fragSection = document.querySelector('[data-section="fragmentation"]');
    if (!fragSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(fragSection);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  // Lock page scroll while the widget is expanded or in chat mode
  useEffect(() => {
    const isOpen = state === 'expanded' || state === 'chat';
    if (!isOpen) return;

    const lenis = (window as any).__lenis;
    lenis?.stop?.();

    const preventWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      // Allow scrolling inside the chat messages container
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
  }, [state]);

  const addAgentResponse = (responses: Message[]) => {
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, ...responses]);
      setIsLoading(false);
      setTurnCount((t) => t + 1);
    }, 1400);
  };

  const handleStarterClick = (starter: typeof starters[0]) => {
    setState('chat');
    setMessages([{ from: 'user', text: starter.text }]);
    addAgentResponse(conversationFlows[starter.key]);
  };

  const handlePillSend = () => {
    const text = pillInputText.trim();
    if (!text) return;
    setPillInputText('');
    setState('chat');
    setMessages([{ from: 'user', text }]);
    addAgentResponse(conversationFlows.what);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    setMessages((prev) => [...prev, { from: 'user', text }]);
    if (turnCount >= 1) {
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

  // Don't early-return — let AnimatePresence handle exit animation below.

  // ============ PILL + EXPANDED ============
  const renderPillView = () => (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: 0,
        right: 0,
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
    <motion.div
      key="pill-shell"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      }}
      onHoverStart={() => setState('expanded')}
      onHoverEnd={() => setState('pill')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '10px',
        width: 'min(480px, calc(100vw - 32px))',
        pointerEvents: 'auto',
      }}
    >
      {/* Suggestions card — appears above pill on hover */}
      <AnimatePresence>
        {state === 'expanded' && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              background: '#f9f9fb',
              borderRadius: '5px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 8px 32px rgba(8,13,25,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparkleIcon size={16} color="#12182b" />
              <p
                className="m8-p5"
                style={{
                  color: '#12182b',
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Suggestions
              </p>
            </div>

            {/* Cards */}
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 14px',
                    borderRadius: '5px',
                    background: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: '0 2px 8px rgba(130,130,130,0.06)',
                    width: '100%',
                  }}
                >
                  <p
                    className="m8-p6"
                    style={{
                      flex: 1,
                      color: '#12182b',
                      margin: 0,
                    }}
                  >
                    {s.text}
                  </p>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '40px',
                      background: '#8e59ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUpRight size={13} color="#fff" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill input — button is stationary on the right; input expands left into view */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 4px 4px 0px',
          background: '#ffffff',
          border: '1px solid #8e59ff',
          borderRadius: '5px',
          boxShadow: '0 8px 24px rgba(142,89,255,0.12)',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          exit={{ width: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
          style={{
            overflow: 'hidden',
            flex: 1,
            minWidth: 0,
            paddingLeft: '16px',
          }}
        >
          <input
            type="text"
            value={pillInputText}
            onChange={(e) => setPillInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePillSend()}
            onFocus={() => setState('expanded')}
            placeholder="Ask Agent Mark anything about Mark8 IQ…"
            className="agent-mark-pill-input m8-p6"
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#12182b',
              padding: '8px 0',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          />
        </motion.div>
        <style>{`
          .agent-mark-pill-input::placeholder {
            color: #656981;
            opacity: 1;
          }
          .agent-mark-chat-input::placeholder {
            color: #656981;
            opacity: 1;
          }
          .agent-mark-email-input::placeholder {
            color: #656981;
            opacity: 1;
          }
        `}</style>
        <button
          onClick={handlePillSend}
          className="m8-p6"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '5px',
            border: 'none',
            background: '#8e59ff',
            color: '#fff',
            fontWeight: 500,
            cursor: 'pointer',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <SparkleIcon size={13} color="#fff" />
          Ask Mark
        </button>
      </div>
    </motion.div>
    </div>
  );

  // ============ CHAT PANEL ============
  const renderChatView = () => (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: 0,
        right: 0,
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
    <motion.div
      key="chat-panel"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      style={{
        width: 'min(60vw, calc(100vw - 32px))',
        height: 'min(680px, calc(100vh - 80px))',
        background: '#f9f9fb',
        borderRadius: '5px',
        padding: '20px',
        boxShadow: '0 4px 16px 6px rgba(130,130,130,0.05), 0 24px 60px rgba(8,13,25,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontFamily: "'Saira', sans-serif",
            fontSize: '16px',
            fontWeight: 500,
            color: '#656981',
            lineHeight: '20px',
            margin: 0,
          }}
        >
          Your conversation with Agent Mark
        </p>
        <button
          onClick={() => {
            setState('pill');
            setMessages([]);
            setTurnCount(0);
            setEmail('');
            setEmailSent(false);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="#656981"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Messages scroll area with top fade — cosmetic match to AISummaryPanel */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 24,
            background: 'linear-gradient(to bottom, #f9f9fb 0%, rgba(249,249,251,0) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <div
          ref={scrollContainerRef}
          className="ai-panel-scroll"
          style={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            paddingRight: '6px',
          }}
        >
        {messages.map((msg, i) => {
          if (msg.from === 'user') {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    background: 'linear-gradient(to right, #e6e9f4, #eee5ff)',
                    padding: '10px 14px',
                    borderRadius: '5px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#12182b',
                      lineHeight: '22px',
                      textAlign: 'left',
                      margin: 0,
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          }

          // Agent response
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p
                style={{
                  fontFamily: "'Saira', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#656981',
                  margin: '0 0 8px 0',
                }}
              >
                Interesting ask ✨ — let me crunch this data and turn it into something useful.
              </p>
              <RenderMarkdown text={msg.text} />

              {/* Email capture inline */}
              {msg === emailAsk && !emailSent && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="your@email.com"
                    className="agent-mark-email-input"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(142,89,255,0.3)',
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '13px',
                      outline: 'none',
                      background: 'white',
                      color: '#12182b',
                    }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#8e59ff',
                      color: '#fff',
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading state */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p
              style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#656981',
                margin: 0,
              }}
            >
              Brewing insights… should take a few seconds 🍵 lining up the right target…
            </p>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingTop: '4px' }}>
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#8e59ff',
                    animation: 'agentDotPulse 1.4s infinite',
                    animationDelay: `${j * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
        </div>
        {/* Bottom fade — cosmetic match to AISummaryPanel */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 32,
            background: 'linear-gradient(to top, #f9f9fb 0%, rgba(249,249,251,0) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>

      {/* Input bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 6px 6px 20px',
          background: '#ffffff',
          border: '1px solid #8e59ff',
          borderRadius: '5px',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder={isLoading ? 'Agent Mark is thinking…' : 'Continue the conversation with Agent Mark…'}
          disabled={isLoading}
          className="agent-mark-chat-input"
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: "'Saira', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#12182b',
            padding: '10px 0',
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '5px',
            border: 'none',
            background: isLoading ? '#e6dcff' : '#8e59ff',
            color: isLoading ? '#8e59ff' : '#fff',
            fontFamily: "'Saira', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            cursor: isLoading ? 'default' : 'pointer',
          }}
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
    </motion.div>
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {visible && (state === 'pill' || state === 'expanded') && renderPillView()}
        {visible && state === 'chat' && renderChatView()}
      </AnimatePresence>

      <style>{`
        @keyframes agentDotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </>
  );
}
