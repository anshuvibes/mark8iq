import { useState, useEffect, useRef, type RefObject } from 'react';
import AIResponseBlock from './AIResponseBlock';
import { Button } from '@/components/ui/button';
import type { ChatMessage, Halt, Suggestion } from '@/data/aiPanelMockData';
import { mockSuggestions } from '@/data/aiPanelMockData';

interface ChatWindowProps {
  messages: ChatMessage[];
  showLoadPrevious: boolean;
  onLoadPrevious: () => void;
  onRetry: (messageId: string) => void;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  onInsightAnalyse?: (halt: Halt, insightsMessageId: string) => void;
  onHaltSelect?: (halt: Halt) => void;
  onViewAll?: () => void;
  onSuggestionInlineSelect?: (suggestion: Suggestion, messageId: string) => void;
  onWelcomeSuggestionSelect?: (suggestion: Suggestion) => void;
  onTypingComplete?: () => void;
}

const LoadingDots = () => (
  <div style={{ display: 'flex', gap: 4, padding: '16px 0' }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--color_primary)',
          animation: `ai-panel-dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

/** Minimal TypedText — reveals words one at a time */
const TypedText = ({ text, speed = 40, onDone }: { text: string; speed?: number; onDone?: () => void }) => {
  const words = text.split(' ');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setCount(i);
      if (i < words.length) {
        setTimeout(tick, speed);
      } else {
        onDone?.();
      }
    };
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (count === 0) return null;
  return <>{words.slice(0, count).join(' ')}</>;
};

/* ─── WelcomeMessage ─── */

interface WelcomeMessageProps {
  halts: Halt[];
  onHaltSelect: (halt: Halt) => void;
  onViewAll: () => void;
  onSuggestionSelect: (suggestion: Suggestion) => void;
}

const WelcomeMessage = ({ halts, onHaltSelect, onViewAll, onSuggestionSelect }: WelcomeMessageProps) => {
  const [beat, setBeat] = useState(0);
  const [cardsRevealed, setCardsRevealed] = useState(0);
  const [viewAllVisible, setViewAllVisible] = useState(false);
  const [chipsRevealed, setChipsRevealed] = useState(0);
  const [thinkingFading, setThinkingFading] = useState(false);
  const timerRefs = useRef<number[]>([]);

  const clearTimers = () => {
    timerRefs.current.forEach(t => clearTimeout(t));
    timerRefs.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timerRefs.current.push(t);
    return t;
  };

  useEffect(() => {
    setBeat(1);
    return clearTimers;
  }, []);

  // Beat 2.5 → 3 transition
  useEffect(() => {
    if (beat !== 2.5) return;
    const t1 = addTimer(() => {
      setThinkingFading(true);
      addTimer(() => setBeat(3), 200);
    }, 1800);
    return () => clearTimeout(t1);
  }, [beat]);

  // Beat 3: stagger cards after line types
  const startCardReveal = () => {
    halts.forEach((_, i) => {
      addTimer(() => setCardsRevealed(i + 1), i * 350);
    });
    // After last card + 300ms → show view all
    addTimer(() => setViewAllVisible(true), halts.length * 350 + 300);
    // After view all → beat 4
    addTimer(() => setBeat(4), halts.length * 350 + 300 + 100);
  };

  // Beat 4: stagger suggestion chips
  const startChipReveal = () => {
    mockSuggestions.forEach((_, i) => {
      addTimer(() => setChipsRevealed(i + 1), i * 250);
    });
    addTimer(() => setBeat(5), mockSuggestions.length * 250 + 100);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Beat 1: Line 1 */}
      {beat >= 1 && (
        <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color_text)', lineHeight: '1.4', marginBottom: 4, fontFamily: 'var(--font_primary)' }}>
          <TypedText
            text="Hey Satyam..."
            speed={40}
            onDone={() => addTimer(() => setBeat(2), 400)}
          />
        </div>
      )}

      {/* Beat 2: Line 2 */}
      {beat >= 2 && (
        <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(18,24,43,0.65)', lineHeight: '1.5', marginBottom: 8, fontFamily: 'var(--font_primary)' }}>
          <TypedText
            text="I've been going through your Targeting Analysis."
            speed={40}
            onDone={() => addTimer(() => setBeat(2.5), 300)}
          />
        </div>
      )}

      {/* Beat 2.5: Thinking state */}
      {beat >= 2.5 && beat < 3 && (
        <div style={{
          opacity: thinkingFading ? 0 : 1,
          transition: 'opacity 0.2s ease-out',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 400,
            color: 'rgba(18,24,43,0.45)',
            fontStyle: 'italic',
            lineHeight: '1.5',
            marginBottom: 4,
          }}>
            Give me a moment.
          </div>
          <LoadingDots />
        </div>
      )}

      {/* nothing — beat 2.5→3 handled by effect below */}

      {/* Beat 3: Highlights line + cards */}
      {beat >= 3 && (
        <>
          <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(18,24,43,0.65)', lineHeight: '1.5', marginBottom: 12, fontFamily: 'var(--font_primary)' }}>
            <TypedText
              text="Here are a few highlights that need your attention."
              speed={40}
              onDone={startCardReveal}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
            {halts.map((halt, i) => (
              <div
                key={halt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 'var(--m8-radius-md)',
                  background: 'rgba(237,240,247,0.5)',
                  border: '1px solid rgba(18,24,43,0.06)',
                  opacity: cardsRevealed > i ? 1 : 0,
                  transform: cardsRevealed > i ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(18,24,43,0.25)', minWidth: 16, textAlign: 'center', fontFamily: 'var(--font_primary)' }}>{i + 1}</span>
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--color_text)', flex: 1, fontFamily: 'var(--font_primary)' }}>{halt.statement}</span>
                <Button
                  variant="m8-outline-violet"
                  size="sm"
                  onClick={() => onHaltSelect(halt)}
                  style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto' }}
                >
                  Get Insights
                </Button>
              </div>
            ))}
          </div>

          {/* View all insights link */}
          <div style={{
            opacity: viewAllVisible ? 1 : 0,
            transition: 'opacity 0.25s ease-out',
          }}>
            <button
              onClick={onViewAll}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 0 0',
                color: 'var(--color_primary)',
              }}
            >
              <span className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={12} style={{ color: 'var(--color_primary)' }} />
                View all highlights ({5} total)
              </span>
            </button>
          </div>
        </>
      )}

      {/* Beat 4: Suggestions line + chips */}
      {beat >= 4 && (
        <>
          <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(18,24,43,0.65)', lineHeight: '1.5', marginTop: 14, marginBottom: 10, fontFamily: 'var(--font_primary)' }}>
            <TypedText
              text="Here are a few questions worth asking."
              speed={40}
              onDone={startChipReveal}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {mockSuggestions.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onSuggestionSelect(s)}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  borderRadius: 'var(--m8-radius-md)',
                  background: 'transparent',
                  border: '1px solid rgba(18,24,43,0.12)',
                  outline: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font_primary)',
                  opacity: chipsRevealed > i ? 1 : 0,
                  transform: chipsRevealed > i ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.25s ease-out, transform 0.25s ease-out, border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(142,89,255,0.5)';
                  e.currentTarget.style.background = 'rgba(142,89,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(18,24,43,0.12)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--color_text)', fontFamily: 'var(--font_primary)' }}>{s.question}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─── ChatWindow ─── */

const ChatWindow = ({ messages, showLoadPrevious, onLoadPrevious, onRetry, scrollContainerRef, onInsightAnalyse, onHaltSelect, onViewAll, onSuggestionInlineSelect, onWelcomeSuggestionSelect, onTypingComplete }: ChatWindowProps) => {
  const lastUserMsgRef = useRef<HTMLDivElement>(null);
  const lastScrolledId = useRef<string | null>(null);

  const lastUserMsg = [...messages].reverse().find(
    m => m.type === 'user-bubble' || m.type === 'context-pill'
  );

  useEffect(() => {
    if (!lastUserMsg || lastUserMsg.id === lastScrolledId.current) return;
    lastScrolledId.current = lastUserMsg.id;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = lastUserMsgRef.current;
        const container = scrollContainerRef?.current;
        if (el && container) {
          const elRect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const scrollOffset = elRect.top - containerRect.top + container.scrollTop;
          container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        }
      });
    });
  }, [lastUserMsg?.id, scrollContainerRef]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '12px 16px' }}>
      {/* Load previous */}
      {showLoadPrevious && (
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button
            onClick={onLoadPrevious}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color_primary)' }}
          >
            <span className="m8-p6">Load previous chats</span>
          </button>
        </div>
      )}

      {messages.map((msg, idx) => {
        const isLastUserMsg =
          (msg.type === 'user-bubble' || msg.type === 'context-pill') &&
          !messages.slice(idx + 1).some(m => m.type === 'user-bubble' || m.type === 'context-pill');

        switch (msg.type) {
          case 'date-separator':
            return (
              <div key={msg.id} style={{ textAlign: 'center', margin: '16px 0 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(18,24,43,0.1)' }} />
                  <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)' }}>{msg.date}</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(18,24,43,0.1)' }} />
                </div>
                {msg.sessionContext && (
                  <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.3)', marginTop: 4 }}>{msg.sessionContext}</div>
                )}
              </div>
            );

          case 'divider':
            return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(18,24,43,0.1)' }} />
                <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', whiteSpace: 'nowrap' }}>Switched to: {msg.dividerPage}</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(18,24,43,0.1)' }} />
              </div>
            );

          case 'context-pill':
            return (
              <div ref={isLastUserMsg ? lastUserMsgRef : undefined} key={msg.id} style={{
                padding: '8px 12px',
                borderRadius: 'var(--m8-radius-md)',
                background: 'rgba(142,89,255,0.06)',
                border: '1px solid rgba(142,89,255,0.1)',
                marginBottom: 8,
              }}>
                <div style={{ fontSize: 11, fontWeight: 400, color: 'rgba(18,24,43,0.35)', marginBottom: 2, fontFamily: 'var(--font_primary)' }}>
                  Starting from {msg.pillVariant === 'halt' ? 'highlight' : 'suggestion'}:
                </div>
                <div style={{ fontSize: 13, fontWeight: 400, color: 'var(--color_text)', fontFamily: 'var(--font_primary)' }}>{msg.pillText}</div>
              </div>
            );

          case 'user-bubble':
            return (
              <div ref={isLastUserMsg ? lastUserMsgRef : undefined} key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: '12px 12px 2px 12px',
                  background: 'rgba(18,24,43,0.06)',
                  color: 'var(--color_text)',
                }}>
                  <span className="m8-p6" style={{ fontWeight: 300 }}>{msg.userText}</span>
                </div>
              </div>
            );

          case 'ai-response':
            return msg.aiResponse ? (
              <div key={msg.id} style={{ marginBottom: 20 }}>
                <AIResponseBlock response={msg.aiResponse} onTypingComplete={onTypingComplete} />
              </div>
            ) : null;

          case 'loading':
            return (
              <div key={msg.id} style={{ marginBottom: 8 }}>
                <LoadingDots />
              </div>
            );

          case 'error':
            return (
              <div key={msg.id} style={{
                padding: '12px',
                borderRadius: 'var(--m8-radius-md)',
                background: 'rgba(252,116,89,0.06)',
                border: '1px solid rgba(252,116,89,0.15)',
                marginBottom: 8,
              }}>
                <div className="m8-p6" style={{ color: 'var(--color_text)', marginBottom: msg.errorPersistent ? 0 : 8 }}>
                  {msg.errorPersistent
                    ? 'Still not working. Try again in a moment.'
                    : 'Something went wrong. The response could not be generated.'}
                </div>
                {!msg.errorPersistent && (
                  <Button variant="m8-outline-violet" size="sm" onClick={() => onRetry(msg.id)} style={{ padding: '4px 12px', fontSize: 12, height: 'auto' }}>
                    Try again
                  </Button>
                )}
              </div>
            );

          case 'insights-list':
            return (
              <div key={msg.id} style={{ marginBottom: 8 }}>
                <div className="m8-p6" style={{
                  color: 'var(--color_primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  Here are all your highlights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {msg.insightsList?.map((halt, i) => (
                    <div key={halt.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 'var(--m8-radius-md)',
                      background: 'rgba(237,240,247,0.5)',
                      border: '1px solid rgba(18,24,43,0.06)',
                    }}>
                      <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', minWidth: 16, textAlign: 'center' }}>{i + 1}</span>
                      <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1 }}>{halt.statement}</span>
                      <Button
                        variant="m8-outline-violet"
                        size="sm"
                        onClick={() => onInsightAnalyse?.(halt, msg.id)}
                        style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto' }}
                      >
                        Get Insights
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'welcome':
            return (
              <WelcomeMessage
                key={msg.id}
                halts={msg.welcomeHalts || []}
                onHaltSelect={(halt) => onHaltSelect?.(halt)}
                onViewAll={() => onViewAll?.()}
                onSuggestionSelect={(s) => onWelcomeSuggestionSelect?.(s)}
              />
            );

          case 'suggestions-inline':
            return (
              <div key={msg.id} style={{ marginBottom: 8 }}>
                <div className="m8-p6" style={{
                  color: 'var(--color_primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                  marginBottom: 10,
                }}>
                  Here are a few suggestions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {msg.suggestionsList?.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSuggestionInlineSelect?.(s, msg.id)}
                      style={{
                        width: '100%',
                        padding: '8px 14px',
                        borderRadius: 'var(--m8-radius-md)',
                        background: 'transparent',
                        border: '1px solid rgba(18,24,43,0.12)',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s, background 0.15s',
                        textAlign: 'left',
                        fontFamily: 'var(--font_primary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(142,89,255,0.5)';
                        e.currentTarget.style.background = 'rgba(142,89,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(18,24,43,0.12)';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span className="m8-p6" style={{ color: 'var(--color_text)', fontSize: 12 }}>{s.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}

      {/* Spacer to push user message to top of viewport */}
      <div style={{ minHeight: scrollContainerRef?.current ? scrollContainerRef.current.clientHeight * 0.75 : '70vh' }} />
    </div>
  );
};

export default ChatWindow;
