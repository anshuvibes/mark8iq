import { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Sparkles, MessageSquare } from 'lucide-react';

interface ChatInputBarProps {
  contextLabel: string;
  isLoading: boolean;
  onSend: (message: string) => void;
  pageName?: string;
  pageIcon?: string;
  onGetInsights: () => void;
  onGetSuggestions: () => void;
}

const ChatInputBar = ({ contextLabel, isLoading, onSend, pageName, pageIcon, onGetInsights, onGetSuggestions }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showChip, setShowChip] = useState(true);
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);
  const plusBtnRef = useRef<HTMLButtonElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = '44px';
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

  const getSendButtonStyle = () => {
    if (canSend) {
      return {
        background: 'var(--color_primary)',
        border: '1.5px solid var(--color_primary)',
        color: '#FFFFFF',
        cursor: 'pointer' as const,
      };
    }
    return {
      background: 'rgba(18,24,43,0.08)',
      border: '1.5px solid transparent',
      color: 'rgba(18,24,43,0.25)',
      cursor: 'not-allowed' as const,
    };
  };

  const sendStyle = getSendButtonStyle();
  const displayName = pageName || 'Targeting Analysis';

  useEffect(() => {
    const id = 'chat-input-placeholder-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `.ai-chat-textarea::placeholder { color: rgba(18,24,43,0.45) !important; }`;
      document.head.appendChild(style);
    }
  }, []);

  // Click outside handler for plus menu
  useEffect(() => {
    if (!plusMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        plusMenuRef.current && !plusMenuRef.current.contains(target) &&
        plusBtnRef.current && !plusBtnRef.current.contains(target)
      ) {
        setPlusMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [plusMenuOpen]);

  return (
    <div style={{
      padding: '6px 16px 12px',
      borderTop: 'none',
      background: '#FFFFFF',
    }}>
      {/* Larger container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--m8-radius-md)',
        background: 'rgba(142,89,255,0.06)',
        padding: 0,
        transition: 'background 0.2s',
      }}>

        {/* Context chip row — always visible, content changes on dismiss */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 6px',
          margin: '2px 0',
          marginBottom: 0,
          cursor: showChip ? 'default' : 'pointer',
        }}
          onClick={!showChip ? () => setShowChip(true) : undefined}
        >
          {showChip ? (
            <>
              <img
                src={pageIcon || '/img/product-logos/black/mark8-ads.svg'}
                alt=""
                style={{ height: 8, width: 'auto', flexShrink: 0, display: 'block' }}
              />
              <span className="m8-p6" style={{
                color: 'rgba(18,24,43,0.65)',
                fontSize: 12,
                lineHeight: '16px',
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                Sharing "{displayName}"
              </span>
              <button
                onClick={() => setShowChip(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
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
            </>
          ) : (
            <span className="m8-p6" style={{
              color: 'rgba(18,24,43,0.4)',
              fontSize: 11,
              lineHeight: '16px',
              transition: 'color 0.15s',
            }}
              onClick={() => { setPlusMenuOpen(!plusMenuOpen); }}
            >
              + Add context
            </span>
          )}
        </div>

        {/* Input box with its own stroke */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--m8-radius-md)',
          border: `1.5px solid ${getBorderColor()}`,
          background: isLoading ? 'rgba(237,240,247,0.5)' : '#FFFFFF',
          transition: 'border-color 0.2s',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            padding: '10px 12px',
            minHeight: 48,
          }}>
            {/* Plus button */}
            <div style={{ position: 'relative', flexShrink: 0, marginBottom: 2 }}>
              <button
                ref={plusBtnRef}
                onClick={() => setPlusMenuOpen(!plusMenuOpen)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--m8-radius-md)',
                  background: 'transparent',
                  border: '1.5px solid rgba(18,24,43,0.12)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(18,24,43,0.45)',
                  transition: 'border-color 0.15s, color 0.15s',
                  fontSize: 18,
                  lineHeight: 1,
                  fontFamily: 'var(--font_primary)',
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(142,89,255,0.5)';
                  e.currentTarget.style.color = 'var(--color_primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(18,24,43,0.12)';
                  e.currentTarget.style.color = 'rgba(18,24,43,0.45)';
                }}
              >
                +
              </button>

              {/* Plus menu popup */}
              {plusMenuOpen && (
                <div
                  ref={plusMenuRef}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    marginBottom: 8,
                    minWidth: 200,
                    background: '#FFFFFF',
                    border: '1px solid rgba(18,24,43,0.1)',
                    borderRadius: 'var(--m8-radius-md)',
                    boxShadow: '0 4px 20px rgba(8,13,25,0.12)',
                    padding: '4px 0',
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => { setPlusMenuOpen(false); onGetInsights(); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '9px 14px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font_primary)',
                      fontSize: 13,
                      color: 'var(--color_text)',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Sparkles size={14} style={{ color: 'rgba(18,24,43,0.5)', flexShrink: 0 }} />
                    Show highlights
                  </button>
                  <button
                    onClick={() => { setPlusMenuOpen(false); onGetSuggestions(); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '9px 14px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font_primary)',
                      fontSize: 13,
                      color: 'var(--color_text)',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <MessageSquare size={14} style={{ color: 'rgba(18,24,43,0.5)', flexShrink: 0 }} />
                    Show suggestions
                  </button>
                </div>
              )}
            </div>

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
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--color_text)',
                fontFamily: 'var(--font_primary)',
                resize: 'none',
                height: 44,
                maxHeight: 120,
                overflowY: 'auto',
                lineHeight: '22px',
                padding: 0,
              }}
            />
            <button
              onClick={handleSend}
              disabled={!canSend}
              style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--m8-radius-md)',
                ...sendStyle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s',
                flexShrink: 0,
                marginBottom: 2,
              }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatInputBar;
