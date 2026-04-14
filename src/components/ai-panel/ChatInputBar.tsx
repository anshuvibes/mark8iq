import { useState, useRef, useEffect } from 'react';
import { ArrowUp, X } from 'lucide-react';

interface ChatInputBarProps {
  contextLabel: string;
  isLoading: boolean;
  onSend: (message: string) => void;
  pageName?: string;
  pageIcon?: string;
}

const ChatInputBar = ({ contextLabel, isLoading, onSend, pageName, pageIcon }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showChip, setShowChip] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = '40px';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasText = value.trim().length > 0;
  const canSend = hasText && !isLoading;

  const getBorderColor = () => {
    if (isFocused) return 'rgba(142,89,255,0.5)';
    return 'rgba(18,24,43,0.12)';
  };

  const displayName = pageName || 'Targeting Analysis';

  useEffect(() => {
    const id = 'chat-input-placeholder-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `.ai-chat-textarea::placeholder { color: rgba(18,24,43,0.4) !important; }`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{
      padding: '12px 16px 16px',
      borderTop: '1px solid rgba(18,24,43,0.06)',
      background: '#FFFFFF',
    }}>
      {/* Single container with border */}
      <div style={{
        borderRadius: 'var(--m8-radius-md)',
        border: `1.5px solid ${getBorderColor()}`,
        background: isLoading ? 'rgba(237,240,247,0.5)' : '#FFFFFF',
        transition: 'border-color 0.2s',
        overflow: 'hidden',
      }}>
        {/* Context chip row — full width bar */}
        {showChip && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderBottom: '1px solid rgba(18,24,43,0.08)',
            background: 'rgba(18,24,43,0.025)',
          }}>
            <img
              src={pageIcon || '/img/product-logos/black/mark8-ads.svg'}
              alt=""
              style={{ width: 16, height: 16, flexShrink: 0 }}
            />
            <span className="m8-p6" style={{
              color: 'var(--color_text)',
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              Reading "{displayName}"
            </span>
            <button
              onClick={() => setShowChip(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
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
        )}

        {/* Text input area */}
        <div style={{ padding: '8px 12px' }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isLoading ? 'Generating response...' : 'Ask about this page...'}
            disabled={isLoading}
            rows={1}
            className="m8-p6 ai-chat-textarea"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--color_text)',
              fontFamily: 'var(--font_primary)',
              resize: 'none',
              height: 40,
              maxHeight: 120,
              overflowY: 'auto',
              lineHeight: '22px',
              padding: 0,
            }}
          />
        </div>

        {/* Bottom row with send button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '4px 12px 8px',
        }}>
          <button
            onClick={handleSend}
            disabled={!canSend}
            style={{
              width: 30,
              height: 30,
              borderRadius: 'var(--m8-radius-md)',
              background: canSend ? 'var(--color_primary)' : 'rgba(18,24,43,0.08)',
              border: canSend ? '1.5px solid var(--color_primary)' : '1.5px solid transparent',
              color: canSend ? '#FFFFFF' : 'rgba(18,24,43,0.25)',
              cursor: canSend ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Show context link when chip is dismissed */}
      {!showChip && (
        <button
          onClick={() => setShowChip(true)}
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
