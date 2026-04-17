import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const starters = [
  'What does Mark8 IQ actually do?',
  'How does it work for a brand on Amazon and Flipkart?',
  'What happened to Asian Shoes after using Mark8 IQ?',
  'How is this different from what I already use?',
  'Can I see a live example?',
];

type Message = { from: 'user' | 'agent'; text: string; action?: string };

const scriptedResponses: Record<string, Message[]> = {
  'What does Mark8 IQ actually do?': [
    { from: 'agent', text: 'Mark8 IQ is the operating system for e-commerce brands. It unifies every marketplace (Amazon, Flipkart, Myntra, Meesho, and more) into one dashboard, then layers AI on top to analyse, recommend, and act — automatically.' },
    { from: 'agent', text: 'Six product modules cover ads, visibility, shelf health, returns, reconciliation, and inventory. Agent Mark thinks with your data. Agent Foundry executes while you sleep.' },
  ],
  'How does it work for a brand on Amazon and Flipkart?': [
    { from: 'agent', text: 'Your Amazon and Flipkart data flows into Market One — our single source of truth. From there, Mark8 Ads optimizes spend across both platforms simultaneously, Mark8 Sight tracks your rank in real time, and Mark8 Returns flags problem SKUs before they hit your P&L.' },
    { from: 'agent', text: 'One dashboard. Two marketplaces. Zero manual cross-referencing.' },
  ],
  'What happened to Asian Shoes after using Mark8 IQ?': [
    { from: 'agent', text: 'Asian Shoes was spending ₹90 lakh per month on Amazon ads. After Mark8 IQ optimized their campaigns, spend dropped to ₹28 lakh — with the same ₹6.5 Cr in monthly sales.' },
    { from: 'agent', text: 'That is ₹60 lakh saved every single month. Same sales. 68% less ad spend.' },
  ],
  'How is this different from what I already use?': [
    { from: 'agent', text: 'Most tools give you one function: ads management, or inventory tracking, or reconciliation. Mark8 IQ connects all six functions into one system. When your ad spend changes, your inventory forecasts update. When returns spike, your reconciliation flags it. Everything talks to everything.' },
  ],
  'Can I see a live example?': [
    { from: 'agent', text: 'I would love to show you a live walkthrough tailored to your specific setup. A 20-minute demo would show you exactly how this works for your brand.' },
    { from: 'agent', text: 'Based on what you have told me, I think a demo would be the fastest way to see the impact. Can I grab your email and have someone from the team reach out today?', action: 'capture_email' },
  ],
};

const fallbackResponse: Message[] = [
  { from: 'agent', text: 'Great question. Mark8 IQ covers ads, visibility, shelf health, returns, reconciliation, and inventory — all in one platform. Would you like me to explain a specific module, or would a quick demo be more helpful?' },
];

export default function AgentMarkWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'agent', text: 'Hi. I am Agent Mark. I can tell you anything about Mark8 IQ, or show you what I can do for your brand. Where do you want to start?' },
  ]);
  const [emailCapture, setEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Nudge after 45 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowNudge(true);
    }, 45000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStarter = (text: string) => {
    const userMsg: Message = { from: 'user', text };
    const responses = scriptedResponses[text] || fallbackResponse;
    setMessages((prev) => [...prev, userMsg, ...responses]);

    if (responses.some((r) => r.action === 'capture_email')) {
      setTimeout(() => setEmailCapture(true), 500);
    }
  };

  const handleEmailSubmit = () => {
    if (!email.includes('@')) return;
    setEmailSent(true);
    setEmailCapture(false);
    setMessages((prev) => [
      ...prev,
      { from: 'agent', text: 'Done. Someone from Mark8 IQ will reach out within 24 hours. In the meantime, feel free to keep exploring.' },
    ]);
  };

  // Hide during fragmentation scroll using IntersectionObserver
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

  if (!visible && !isOpen) return null;

  return (
    <>
      {/* Pill / Nudge */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 99999,
              cursor: 'pointer',
            }}
            onClick={() => { setIsOpen(true); setShowNudge(false); }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              background: '#080D19',
              borderRadius: '9999px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8E59FF', animation: 'pulse 2s infinite' }} />
              <span className="m8-p5" style={{ color: '#fff', fontWeight: 400 }}>Ask Agent Mark</span>
            </div>
            <AnimatePresence>
              {showNudge && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '8px',
                    padding: '10px 16px',
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span className="m8-p6" style={{ color: '#080D19' }}>Ask me how Asian Shoes saved 60 lakh a month.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '400px',
              maxHeight: '600px',
              background: '#0D1117',
              borderRadius: '16px',
              overflow: 'hidden',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6C3AE0)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span className="m8-p5" style={{ color: '#fff', fontWeight: 500 }}>Agent Mark</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                  {msg.from === 'agent' && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6C3AE0)', flexShrink: 0, marginTop: '4px' }} />
                  )}
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: msg.from === 'user' ? '10px 10px 4px 10px' : '4px 10px 10px 10px',
                    background: msg.from === 'user' ? '#8E59FF' : 'rgba(255,255,255,0.06)',
                    maxWidth: '80%',
                  }}>
                    <p className="m8-p6" style={{ color: msg.from === 'user' ? '#fff' : 'rgba(255,255,255,0.85)', lineHeight: '1.5' }}>{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Email capture */}
              {emailCapture && !emailSent && (
                <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '14px',
                      fontFamily: "'Saira', sans-serif",
                      outline: 'none',
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    style={{
                      background: '#8E59FF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      color: '#fff',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontFamily: "'Saira', sans-serif",
                    }}
                  >
                    Send
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStarter(s)}
                    style={{
                      background: 'rgba(142,89,255,0.1)',
                      border: '1px solid rgba(142,89,255,0.2)',
                      borderRadius: '9999px',
                      padding: '6px 12px',
                      color: '#8E59FF',
                      fontSize: '12px',
                      fontFamily: "'Saira', sans-serif",
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
                padding: '10px 14px',
              }}>
                <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.25)' }}>Ask Agent Mark anything...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @media (max-width: 480px) {
          div[style*="width: 400px"] { width: calc(100vw - 32px) !important; right: 16px !important; bottom: 16px !important; }
        }
      `}</style>
    </>
  );
}
