import { X, ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AIPanelHeaderProps {
  hasActiveChat: boolean;
  chatTitle?: string;
  onClose: () => void;
  onNewChat: () => void;
}

const AIPanelHeader = ({ hasActiveChat, chatTitle, onClose, onNewChat }: AIPanelHeaderProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    if (hasActiveChat) {
      setShowConfirm(true);
    } else {
      onNewChat();
    }
  };

  return (
    <div style={{ borderBottom: '1px solid rgba(18,24,43,0.06)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}>
        {/* Back arrow — only visible when chat is active */}
        {hasActiveChat && (
          <button
            onClick={handleBack}
            title="Back to home"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 5,
              color: 'rgba(18,24,43,0.4)',
              borderRadius: 'var(--m8-radius-sm)',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          >
            <ArrowLeft size={16} />
          </button>
        )}

        {/* Chat title */}
        <div className="m8-p6" style={{
          color: 'var(--color_text)',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0,
          flex: 1,
          opacity: chatTitle ? 1 : 0,
          transition: 'opacity 0.2s',
        }}>
          {chatTitle || ''}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 5,
            color: 'rgba(18,24,43,0.4)',
            borderRadius: 'var(--m8-radius-sm)',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          <X size={16} />
        </button>
      </div>

      {showConfirm && (
        <div style={{
          padding: '10px 16px 12px',
          background: 'rgba(142,89,255,0.04)',
          borderTop: '1px solid rgba(142,89,255,0.1)',
        }}>
          <div className="m8-p6" style={{ color: 'var(--color_text)', marginBottom: 8 }}>
            Go back to home? Your current conversation will be cleared.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="m8-violet" size="sm" onClick={() => { setShowConfirm(false); onNewChat(); }} style={{ padding: '4px 12px', fontSize: 12, height: 'auto' }}>
              Go back
            </Button>
            <Button variant="m8-ghost" size="sm" onClick={() => setShowConfirm(false)} style={{ fontSize: 12 }}>
              Keep chatting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPanelHeader;
