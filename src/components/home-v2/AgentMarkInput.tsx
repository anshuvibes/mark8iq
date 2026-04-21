import { useState } from 'react';
import {
  Paperclip,
  Calendar,
  Bookmark,
  Layers,
  LayoutGrid,
  Mic,
  Sparkles,
  X,
} from 'lucide-react';

type Tag = { id: string; label: string };

export default function AgentMarkInput() {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const removeTag = (id: string) =>
    setTags((prev) => prev.filter((t) => t.id !== id));

  const addTag = (label: string) => {
    // prevent duplicate labels stacking up
    setTags((prev) => {
      if (prev.some((t) => t.label === label)) return prev;
      return [...prev, { id: `${Date.now()}-${label}`, label }];
    });
  };

  const isActive = text.trim().length > 0 || tags.length > 0;

  const toolbarActions = [
    {
      key: 'attach',
      label: 'Attach',
      icon: <Paperclip size={15} strokeWidth={1.6} />,
      onClick: () => addTag('FILE.XLSX'),
    },
    {
      key: 'date',
      label: 'Select Date',
      icon: <Calendar size={15} strokeWidth={1.6} />,
      onClick: () => addTag('31/11/2025 - 31/12/2025'),
    },
    {
      key: 'brand',
      label: 'Select Brand',
      icon: <Bookmark size={15} strokeWidth={1.6} />,
      onClick: () => addTag('NAT HABIT'),
    },
    {
      key: 'platform',
      label: 'Select Platform',
      icon: <Layers size={15} strokeWidth={1.6} />,
      onClick: () => addTag('FLIPKART'),
    },
    {
      key: 'more',
      label: 'More Options',
      icon: <LayoutGrid size={15} strokeWidth={1.6} />,
      onClick: () => {},
    },
  ];

  return (
    <>
      <style>{`
        .agent-mark-input-textarea::placeholder {
          color: rgba(18, 24, 43, 0.35);
        }
        .agent-mark-input-textarea {
          scrollbar-width: thin;
        }
      `}</style>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid rgba(18,24,43,0.08)',
          padding: '16px 16px 12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        {/* Tags row */}
        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  background: 'rgba(142,89,255,0.08)',
                  borderRadius: '6px',
                  border: '1px solid rgba(142,89,255,0.2)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Saira', monospace",
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#8E59FF',
                  }}
                >
                  {tag.label}
                </span>
                <button
                  type="button"
                  onClick={() => removeTag(tag.id)}
                  aria-label={`Remove ${tag.label}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#8E59FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.7,
                  }}
                >
                  <X size={12} strokeWidth={2} />
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
          placeholder="Ask Anything..."
          rows={1}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: "'Saira', sans-serif",
            fontSize: '15px',
            fontWeight: 400,
            color: '#12182b',
            lineHeight: '24px',
            minHeight: '24px',
            maxHeight: '120px',
            overflowY: 'auto',
            padding: 0,
          }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
          }}
        />

        {/* Bottom toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Left: action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
            {toolbarActions.map((action, i) => (
              <div key={action.key} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => action.onClick()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(18,24,43,0.5)',
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {action.icon}
                  {action.label}
                </button>
                {i < toolbarActions.length - 1 && (
                  <div
                    style={{
                      width: '1px',
                      height: '16px',
                      background: 'rgba(18,24,43,0.12)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right: mic + send */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              type="button"
              aria-label="Voice input"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(18,24,43,0.06)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(18,24,43,0.55)',
              }}
            >
              <Mic size={16} strokeWidth={1.6} />
            </button>

            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: isActive ? 'pointer' : 'default',
                background: isActive ? '#8E59FF' : 'rgba(142,89,255,0.12)',
                color: isActive ? '#ffffff' : '#8E59FF',
                fontFamily: "'Saira', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              <Sparkles size={14} strokeWidth={1.6} />
              Ask Mark
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
