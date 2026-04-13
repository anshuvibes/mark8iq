import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputBarProps {
  contextLabel: string;
  isLoading: boolean;
  onSend: (message: string) => void;
}

const ChatInputBar = ({ contextLabel, isLoading, onSend }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // States: default, focused-empty (intermediate), has-text, loading
  const getBorderColor = () => {
    if (isFocused && hasText) return 'var(--color_primary)';
    if (isFocused) return 'rgba(142,89,255,0.35)';
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
    if (isFocused && !hasText && !isLoading) {
      // Intermediate: violet stroke, no fill
      return {
        background: 'transparent',
        border: '1.5px solid rgba(142,89,255,0.5)',
        color: 'rgba(142,89,255,0.5)',
        cursor: 'default' as const,
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

  // Inject placeholder style for better visibility
  useEffect(() => {
    const id = 'chat-input-placeholder-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `.ai-chat-textarea::placeholder { color: rgba(18,24,43,0.45) !important; }`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{
      padding: '12px 16px 16px',
      borderTop: '1px solid rgba(18,24,43,0.06)',
      background: '#FFFFFF',
    }}>
      {/* Input container */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        padding: '10px 12px',
        borderRadius: 'var(--m8-radius-md)',
        border: `1.5px solid ${getBorderColor()}`,
        background: isLoading ? 'rgba(237,240,247,0.5)' : '#FFFFFF',
        transition: 'border-color 0.2s',
        minHeight: 48,
      }}>
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
          className="m8-p6"
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
  );
};

export default ChatInputBar;
