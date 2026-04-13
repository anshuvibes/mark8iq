import { useEffect, useRef } from 'react';
import AIResponseBlock from './AIResponseBlock';
import { Button } from '@/components/ui/button';
import type { ChatMessage } from '@/data/aiPanelMockData';

interface ChatWindowProps {
  messages: ChatMessage[];
  showLoadPrevious: boolean;
  onLoadPrevious: () => void;
  onRetry: (messageId: string) => void;
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

const ChatWindow = ({ messages, showLoadPrevious, onLoadPrevious, onRetry }: ChatWindowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUserMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll so the newest user message sits at the top of the visible area
    if (lastUserMsgRef.current && containerRef.current) {
      const container = containerRef.current;
      const el = lastUserMsgRef.current;
      const offset = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', textAlign: 'center' }}>
          Ask anything about this page, or start from the highlights above.
        </div>
      </div>
    );
  }

  return (
    <div className="ai-panel-scroll" data-lenis-prevent="" style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: '12px 16px' }}>
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

      {messages.map((msg) => {
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
              <div key={msg.id} style={{
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
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
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

          default:
            return null;
        }
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
