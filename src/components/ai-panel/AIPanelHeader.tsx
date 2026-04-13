import { X, MessageSquarePlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AIPanelHeaderProps {
  userName: string;
  hasActiveChat: boolean;
  onClose: () => void;
  onNewChat: () => void;
  currentPage?: string;
  dateRange?: string;
}

const AIPanelHeader = ({ userName, hasActiveChat, onClose, onNewChat, currentPage, dateRange }: AIPanelHeaderProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleNewChat = () => {
    if (hasActiveChat) {
      setShowConfirm(true);
    } else {
      onNewChat();
    }
  };

  return (
    <div style={{ borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <Sparkles size={16} style={{ color: 'var(--color_primary)', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div className="m8-p5" style={{ color: 'var(--color_text)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentPage || 'AI Insights'}
            </div>
            {dateRange && (
              <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 1 }}>
                {dateRange}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <button
            onClick={handleNewChat}
            title="New chat"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              color: 'rgba(18,24,43,0.45)',
              borderRadius: 'var(--m8-radius-sm)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          >
            <MessageSquarePlus size={18} />
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              color: 'rgba(18,24,43,0.45)',
              borderRadius: 'var(--m8-radius-sm)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {showConfirm && (
        <div style={{
          padding: '10px 16px 12px',
          background: 'rgba(142,89,255,0.04)',
          borderTop: '1px solid rgba(142,89,255,0.1)',
        }}>
          <div className="m8-p6" style={{ color: 'var(--color_text)', marginBottom: 8 }}>
            Start a new chat? Your current conversation will be saved in history.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="m8-violet" size="sm" onClick={() => { setShowConfirm(false); onNewChat(); }} style={{ padding: '4px 12px', fontSize: 12, height: 'auto' }}>
              Start new
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
