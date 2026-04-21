import { useState } from 'react';
import { Paperclip, Calendar, Bookmark, Layers, Grid3x3, Mic } from 'lucide-react';

type Tag = { id: string; label: string };

export default function AgentMarkInput() {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const removeTag = (id: string) => setTags((prev) => prev.filter((t) => t.id !== id));

  const addTag = (label: string) => {
    // avoid duplicates
    if (tags.some((t) => t.label === label)) return;
    const id = `${Date.now()}-${Math.random()}`;
    setTags((prev) => [...prev, { id, label }]);
  };

  const isActive = text.trim().length > 0 || tags.length > 0;

  const toolbarActions = [
    { key: 'attach',   label: 'Attach',          icon: <Paperclip size={16} strokeWidth={1.5} />, onClick: () => addTag('FILE.XLSX') },
    { key: 'date',     label: 'Select Date',     icon: <Calendar size={16} strokeWidth={1.5} />,  onClick: () => addTag('31/11/2025 - 31/12/2025') },
    { key: 'brand',    label: 'Select Brand',    icon: <Bookmark size={16} strokeWidth={1.5} />,  onClick: () => addTag('NAT HABIT') },
    { key: 'platform', label: 'Select Platform', icon: <Layers size={16} strokeWidth={1.5} />,    onClick: () => addTag('FLIPKART') },
    { key: 'more',     label: 'More Options',    icon: <Grid3x3 size={16} strokeWidth={1.5} />,   onClick: () => {} },
  ];

  return (
    <div
      style={{
        background: '#f9f9fb',
        borderRadius: '16px',
        boxShadow: '0px 4px 16px 6px rgba(130,130,130,0.05)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: tags.length > 0 ? '20px' : '14px',
        width: '100%',
      }}
    >
      <style>{`
        .agent-mark-input-textarea::placeholder {
          color: #656981;
          opacity: 1;
        }
        .agent-mark-input-textarea {
          font-family: 'Saira', sans-serif;
        }
        .agent-mark-toolbar-btn {
          transition: color 0.15s ease;
        }
        .agent-mark-toolbar-btn:hover {
          color: #12182b !important;
        }
        .agent-mark-tag-close {
          transition: opacity 0.15s ease;
        }
        .agent-mark-tag-close:hover {
          opacity: 1 !important;
        }
        .agent-mark-mic {
          transition: background 0.15s ease, color 0.15s ease;
        }
        .agent-mark-mic:hover {
          background: rgba(18,24,43,0.10);
          color: #12182b;
        }
      `}</style>

      {/* Tags row — only when tags exist */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag) => (
            <div
              key={tag.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                background: '#f3effd',
                borderRadius: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Saira', sans-serif",
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#8E59FF',
                  lineHeight: 1,
                }}
              >
                {tag.label}
              </span>
              <button
                type="button"
                aria-label={`Remove ${tag.label}`}
                onClick={() => removeTag(tag.id)}
                className="agent-mark-tag-close"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '14px',
                  height: '14px',
                  color: '#8E59FF',
                  opacity: 0.7,
                  lineHeight: 1,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        className="agent-mark-input-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = 'auto';
          el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
        }}
        placeholder="Ask Anything..."
        rows={1}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: "'Saira', sans-serif",
          fontSize: '14px',
          fontWeight: 400,
          color: '#12182b',
          lineHeight: '20px',
          minHeight: '20px',
          maxHeight: '120px',
          overflowY: 'auto',
          padding: 0,
          margin: 0,
        }}
      />

      {/* Bottom toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Left: action buttons with dividers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {toolbarActions.map((action, i) => (
            <div key={action.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={action.onClick}
                className="agent-mark-toolbar-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#656981',
                  fontFamily: "'Saira', sans-serif",
                  fontSize: '10px',
                  fontWeight: 400,
                  lineHeight: '16px',
                }}
              >
                {action.icon}
                {action.label}
              </button>
              {i < toolbarActions.length - 1 && (
                <div style={{ width: '1px', height: '12px', background: 'rgba(18,24,43,0.12)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Right: mic + Ask Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            type="button"
            aria-label="Voice input"
            className="agent-mark-mic"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(18,24,43,0.06)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#656981',
              padding: 0,
            }}
          >
            <Mic size={15} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            disabled={!isActive}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '5px',
              border: 'none',
              cursor: isActive ? 'pointer' : 'default',
              background: isActive ? '#8E59FF' : 'rgba(142,89,255,0.12)',
              color: isActive ? '#ffffff' : '#8E59FF',
              fontFamily: "'Saira', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            <span style={{ fontSize: '13px', lineHeight: 1 }}>✦</span>
            Ask Mark
          </button>
        </div>
      </div>
    </div>
  );
}
