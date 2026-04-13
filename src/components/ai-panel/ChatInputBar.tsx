import { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputBarProps {
  contextLabel: string;
  isLoading: boolean;
  onSend: (message: string) => void;
}

const ChatInputBar = ({ contextLabel, isLoading, onSend }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div style={{
      padding: '8px 16px 16px',
      borderTop: '1px solid rgba(18,24,43,0.06)',
      background: '#FFFFFF',
    }}>
      {/* Context label */}
      <div className="m8-p6" style={{
        color: 'rgba(18,24,43,0.4)',
        marginBottom: 8,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        Responding based on: {contextLabel}
      </div>

      {/* Input row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 'var(--m8-radius-md)',
        border: '1px solid rgba(18,24,43,0.12)',
        background: isLoading ? 'rgba(237,240,247,0.5)' : '#FFFFFF',
        transition: 'border-color 0.15s, background 0.15s',
      }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder={isLoading ? 'Generating response...' : 'Ask about this page...'}
          disabled={isLoading}
          className="m8-p6"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--color_text)',
            fontFamily: 'var(--font_primary)',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          style={{
            width: 28,
            height: 28,
            borderRadius: 'var(--m8-radius-md)',
            border: 'none',
            background: !value.trim() || isLoading ? 'rgba(18,24,43,0.08)' : 'var(--color_primary)',
            color: !value.trim() || isLoading ? 'rgba(18,24,43,0.25)' : '#FFFFFF',
            cursor: !value.trim() || isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
            flexShrink: 0,
          }}
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBar;
