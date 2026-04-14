import { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Plus } from 'lucide-react';

interface ChatInputBarProps {
  contextLabel: string;
  isLoading: boolean;
  onSend: (message: string) => void;
  pageName?: string;
  pageIcon?: string;
}

const ChatInputBar = ({ contextLabel, isLoading, onSend, pageName }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const [showChip, setShowChip] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
  };

  const hasText = value.trim().length > 0;
  const canSend = hasText && !isLoading;
  const displayName = pageName || 'Targeting Analysis';

  useEffect(() => {
    const id = 'chat-input-placeholder-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `.ai-chat-input::placeholder { color: rgba(18,24,43,0.4) !important; }`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{
      padding: '12px 16px 16px',
      borderTop: '1px solid rgba(18,24,43,0.06)',
      background: '#FFFFFF',
    }}>
      {/* Single rounded container */}
      <div style={{
        borderRadius: 16,
        border: '1px solid rgba(18,24,43,0.10)',
        background: '#FFFFFF',
        overflow: 'hidden',
      }}>
        {/* Row 1: Context strip */}
        {showChip && (
          <>
            <div style={{
              height: 44,
              paddingLeft: 16,
              paddingRight: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {/* Left side */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                minWidth: 0,
                flex: 1,
              }}>
                {/* Product icon square */}
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: '#FC7459',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#FFFFFF', fontSize: 10, lineHeight: 1 }}>✦</span>
                </div>
                <span className="m8-p6" style={{
                  color: 'rgba(18,24,43,0.55)',
                  fontSize: 13,
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                }}>
                  Reading "{displayName}"
                </span>
              </div>

              {/* Right side: close */}
              <button
                onClick={() => setShowChip(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(18,24,43,0.35)',
                  flexShrink: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(18,24,43,0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(18,24,43,0.35)'; }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(18,24,43,0.08)' }} />
          </>
        )}

        {/* Row 2: Input area */}
        <div style={{
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={isLoading ? 'Generating response...' : 'Ask about this page...'}
            disabled={isLoading}
            className="m8-p6 ai-chat-input"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--color_text)',
              fontFamily: 'var(--font_primary)',
              fontSize: 15,
              fontWeight: 400,
              lineHeight: '22px',
              padding: 0,
            }}
          />

          {/* Bottom row: + and send */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Plus button */}
            <button
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(18,24,43,0.06)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(18,24,43,0.4)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.10)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.06)'; }}
            >
              <Plus size={14} />
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!canSend}
              style={{
                height: 34,
                padding: '0 14px',
                borderRadius: 20,
                background: canSend ? 'var(--color_primary)' : 'rgba(142,89,255,0.25)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canSend ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (canSend) e.currentTarget.style.background = 'rgba(142,89,255,0.8)'; }}
              onMouseLeave={(e) => { if (canSend) e.currentTarget.style.background = 'var(--color_primary)'; }}
            >
              <ArrowUp size={16} style={{ color: '#FFFFFF' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Show context link when dismissed */}
      {!showChip && (
        <button
          onClick={() => setShowChip(true)}
          className="m8-p6"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: 'rgba(18,24,43,0.4)',
            fontFamily: 'var(--font_primary)',
            fontSize: 11,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color_primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(18,24,43,0.4)'; }}
        >
          + Show context
        </button>
      )}
    </div>
  );
};

export default ChatInputBar;
