import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

type WidgetState = 'pill' | 'expanded' | 'chat' | 'complete';

type Message = {
  from: 'user' | 'agent';
  text: string;
  type?: 'text' | 'loading' | 'email';
};

const starters = [
  { text: 'What does Mark8 IQ actually do for a D2C brand?', key: 'what' },
  { text: 'How did Asian Shoes save ₹60 lakh a month?', key: 'casestudy' },
  { text: 'How is this different from what I already use?', key: 'differentiation' },
];

const conversationFlows: Record<string, Message[]> = {
  what: [
    { from: 'agent', text: 'Mark8 IQ is the operating system for e-commerce brands. It pulls data from every marketplace — Amazon, Flipkart, Myntra, Meesho, Zepto, Blinkit — standardises it through PRISM, and gives you one unified view across ads, inventory, returns, shelf health, and reconciliation.' },
    { from: 'agent', text: 'Agent Mark sits on top and tells you exactly what to act on. No more spreadsheets. No more switching tabs. Just decisions.' },
    { from: 'agent', text: 'Which marketplaces are you currently selling on? I can show you how this works specifically for your setup.' },
  ],
  casestudy: [
    { from: 'agent', text: 'Asian Shoes was spending ₹90 lakh a month on Amazon ads. Mark8 IQ identified that 70% of their budget was going to campaigns that were not converting during peak hours.' },
    { from: 'agent', text: 'After optimising campaign budgets, bid rules, and keyword targeting — same ₹6.5 Cr in monthly sales. Ad spend dropped to ₹28 lakh. ₹62 lakh saved. Every single month.' },
    { from: 'agent', text: 'This is a real client. What brand are you managing? I can run a rough estimate on what this might look like for you.' },
  ],
  differentiation: [
    { from: 'agent', text: 'Most tools give you one function — ads management, or inventory tracking, or reconciliation. They do not talk to each other.' },
    { from: 'agent', text: 'Mark8 IQ connects all six functions. When your ad spend changes, inventory forecasts update. When returns spike, reconciliation flags it. When rank drops, your ads team gets alerted. Everything is connected through Market One — one source of truth.' },
    { from: 'agent', text: 'What tool are you using right now? I can tell you exactly where the gaps are.' },
  ],
};

const followUpFlow: Message[] = [
  { from: 'agent', text: 'Got it. And what is the biggest headache right now — is it ads performance, inventory visibility, returns, or something else?' },
];

const emailAsk: Message = {
  from: 'agent',
  text: 'Based on what you have told me, I think a 20-minute live demo would show you the exact impact for your brand. Can I grab your email? Someone from the Mark8 IQ team will reach out today.',
  type: 'email',
};

export default function AgentMarkWidget() {
  const [state, setState] = useState<WidgetState>('pill');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hide during fragmentation scroll
  const [visible, setVisible] = useState(true);
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

  const addMessages = (newMsgs: Message[], delay = 800) => {
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'agent', text: 'Interesting ask 👀 — let me pull this up for you...', type: 'loading' },
      ]);
      setTimeout(() => {
        setMessages((prev) => [...prev.filter((m) => m.type !== 'loading'), ...newMsgs]);
        setIsLoading(false);
        setTurnCount((t) => t + 1);
      }, 1200);
    }, delay);
  };

  const handleStarterClick = (starter: typeof starters[0]) => {
    setState('chat');
    const userMsg: Message = { from: 'user', text: starter.text };
    setMessages([userMsg]);
    addMessages(conversationFlows[starter.key], 400);
  };

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    const userMsg: Message = { from: 'user', text: inputText };
    setInputText('');
    setMessages((prev) => [...prev, userMsg]);
    if (turnCount >= 2) {
      addMessages([emailAsk]);
    } else {
      addMessages(followUpFlow);
    }
  };

  const handleEmailSubmit = () => {
    if (!email.includes('@')) return;
    setEmailSent(true);
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: email },
      { from: 'agent', text: 'Perfect. Someone from Mark8 IQ will reach out within a few hours. In the meantime, feel free to keep exploring the site.' },
    ]);
  };

  if (!visible && state === 'pill') return null;

  const renderMessage = (msg: Message, i: number) => {
    if (msg.from === 'user') {
      return (
        <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              maxWidth: '75%',
              padding: '10px 14px',
              borderRadius: '12px 12px 4px 12px',
              background: '#8E59FF',
            }}
          >
            <p className="m8-p6" style={{ color: '#fff', lineHeight: 1.5 }}>{msg.text}</p>
          </div>
        </div>
      );
    }

    if (msg.type === 'loading') {
      return (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '85%' }}>
          <p className="m8-p6" style={{ color: '#656981', fontStyle: 'italic' }}>{msg.text}</p>
          <div style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#8E59FF',
                  animation: `dotPulse 1.4s infinite`,
                  animationDelay: `${j * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === 'email') {
      return (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '85%' }}>
          <p className="m8-p6" style={{ color: '#12182b', lineHeight: 1.6 }}>{msg.text}</p>
          {!emailSent && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                style={{
                  flex: 1,
                  padding: '8px 14px',
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
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#8E59FF',
                  color: '#fff',
                  fontFamily: "'Saira', sans-serif",
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={i} style={{ display: 'flex', maxWidth: '85%' }}>
        <p className="m8-p6" style={{ color: '#12182b', lineHeight: 1.6 }}>{msg.text}</p>
      </div>
    );
  };

  return (
    <>
      <LayoutGroup>
        {/* PILL + EXPANDED */}
        <AnimatePresence>
          {(state === 'pill' || state === 'expanded') && (
            <motion.div
              key="pill-shell"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setState('expanded')}
              onHoverEnd={() => setState('pill')}
              style={{
                position: 'fixed',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* Pill */}
              <motion.button
                layout
                onClick={() => setState((s) => (s === 'expanded' ? 'pill' : 'expanded'))}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  background: '#080D19',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  fontFamily: "'Saira', sans-serif",
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8E59FF',
                    animation: 'agentPulse 2s infinite',
                  }}
                />
                <span className="m8-p5" style={{ color: '#fff', fontWeight: 400 }}>
                  Ask Agent Mark
                </span>
              </motion.button>

              {/* Expanded starter chips */}
              <AnimatePresence>
                {state === 'expanded' && (
                  <motion.div
                    key="starters"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      width: 'min(420px, calc(100vw - 32px))',
                    }}
                  >
                    {starters.map((s, i) => (
                      <motion.button
                        key={s.key}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleStarterClick(s)}
                        whileHover={{ x: 2 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: 'white',
                          border: '1px solid rgba(142,89,255,0.15)',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          gap: '12px',
                          boxShadow: '0 4px 16px rgba(8,13,25,0.06)',
                          fontFamily: "'Saira', sans-serif",
                        }}
                      >
                        <span className="m8-p6" style={{ color: '#12182b', flex: 1 }}>
                          {s.text}
                        </span>
                        <span style={{ color: '#8E59FF', fontSize: '16px', flexShrink: 0 }}>→</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {state === 'chat' && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(700px, calc(100vw - 32px))',
              maxHeight: '70vh',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Blob glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-40px',
                background: 'radial-gradient(circle at 50% 50%, rgba(142,89,255,0.18), transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid rgba(142,89,255,0.12)',
                boxShadow: '0 24px 60px rgba(8,13,25,0.18)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(8,13,25,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#8E59FF',
                      animation: 'agentPulse 2s infinite',
                    }}
                  />
                  <span className="m8-p5" style={{ color: '#12182b', fontWeight: 500 }}>
                    Your conversation with Agent Mark
                  </span>
                </div>
                <button
                  onClick={() => setState('pill')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#656981',
                    fontSize: '20px',
                    padding: '4px 8px',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxHeight: '50vh',
                }}
              >
                {messages.map((msg, i) => renderMessage(msg, i))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid rgba(8,13,25,0.06)',
                  background: 'rgba(245,240,255,0.4)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'white',
                    border: '1px solid rgba(142,89,255,0.25)',
                    borderRadius: '10px',
                    padding: '8px 8px 8px 14px',
                  }}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    placeholder={isLoading ? 'Agent Mark is thinking...' : 'Continue the conversation with Agent Mark...'}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#12182b',
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() && !isLoading}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#8E59FF',
                      color: '#fff',
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      opacity: !inputText.trim() && !isLoading ? 0.5 : 1,
                    }}
                  >
                    {isLoading ? 'Stop Mark' : '✦ Ask Mark'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes agentPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </>
  );
}
