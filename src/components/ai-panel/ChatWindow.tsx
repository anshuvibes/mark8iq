import { useEffect, useRef, type RefObject } from 'react';
import AIResponseBlock from './AIResponseBlock';
import { Button } from '@/components/ui/button';
import type { ChatMessage, Halt, Suggestion } from '@/data/aiPanelMockData';

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

const ChatWindow = ({ messages, showLoadPrevious, onLoadPrevious, onRetry, scrollContainerRef, onInsightAnalyse, onHaltSelect, onViewAll, onSuggestionInlineSelect }: ChatWindowProps) => {
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
                <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginBottom: 2 }}>
                  Starting from {msg.pillVariant === 'halt' ? 'highlight' : 'suggestion'}:
                </div>
                <div className="m8-p6" style={{ color: 'var(--color_text)' }}>{msg.pillText}</div>
              </div>
            );

          case 'user-bubble':
            return (
              <div ref={isLastUserMsg ? lastUserMsgRef : undefined} key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: '12px 12px 2px 12px',
                  background: 'var(--color_primary)',
                  color: '#FFFFFF',
                }}>
                  <span className="m8-p6" style={{ fontWeight: 300 }}>{msg.userText}</span>
                </div>
              </div>
            );

          case 'ai-response':
            return msg.aiResponse ? (
              <div key={msg.id} style={{ marginBottom: 8 }}>
                <AIResponseBlock response={msg.aiResponse} />
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
                  Here are all your insights
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
              <div key={msg.id} style={{ marginBottom: 12 }}>
                <div className="m8-p5" style={{ color: 'var(--color_text)', marginBottom: 14, lineHeight: '1.5' }}>
                  Hey Satyam, I've been looking at your Targeting Analysis data. Here are a few highlights I found for you.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {msg.welcomeHalts?.map((halt, i) => (
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
                        onClick={() => onHaltSelect?.(halt)}
                        style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto' }}
                      >
                        Get Insights
                      </Button>
                    </div>
                  ))}
                </div>
                {/* View all insights link */}
                <button
                  onClick={() => onViewAll?.()}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '8px 0 0',
                    color: 'var(--color_primary)',
                  }}
                >
                  <span className="m8-p6">+ View all insights ({5} total)</span>
                </button>
              </div>
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
                        borderRadius: 999,
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
