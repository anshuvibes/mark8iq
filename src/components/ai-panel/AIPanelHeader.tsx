import { X, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AIPanelHeaderProps {
  userName: string;
  hasActiveChat: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const AIPanelHeader = ({ userName, hasActiveChat, onClose, onNewChat }: AIPanelHeaderProps) => {
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 16px 12px' }}>
        <div>
          <div className="m8-p4" style={{ color: 'var(--color_text)' }}>
            Hello, {userName}
          </div>
          <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.45)', marginTop: 2 }}>
            How can I help you today?
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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

      {/* New Chat confirmation */}
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
