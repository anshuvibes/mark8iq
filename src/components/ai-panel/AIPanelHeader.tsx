import { ArrowLeft, Menu, Settings, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

interface AIPanelHeaderProps {
  hasActiveChat: boolean;
  chatTitle?: string;
  onNewChat: () => void;
  onSelectChat?: (chatId: string) => void;
  onViewAllChats?: () => void;
  chatHistory?: ChatHistoryItem[];
}

const mockChatHistory: ChatHistoryItem[] = [
  { id: 'h1', title: 'Budget overspend on top campaigns', date: 'Today' },
  { id: 'h2', title: 'ACoS spike in Home & Kitchen', date: 'Yesterday' },
  { id: 'h3', title: 'Under-spending strong performers', date: '2 days ago' },
];

const AIPanelHeader = ({
  hasActiveChat,
  chatTitle,
  onNewChat,
  onSelectChat,
  onViewAllChats,
  chatHistory = mockChatHistory,
}: AIPanelHeaderProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleBack = () => {
    if (hasActiveChat) {
      setShowConfirm(true);
    } else {
      onNewChat();
    }
  };

  const recentChats = chatHistory.slice(0, 3);

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

        {/* Menu button */}
        <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            title="Menu"
            style={{
              background: menuOpen ? 'rgba(18,24,43,0.06)' : 'none',
              border: 'none', cursor: 'pointer', padding: 5,
              color: 'rgba(18,24,43,0.4)',
              borderRadius: 'var(--m8-radius-sm)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { if (!menuOpen) e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
            onMouseLeave={(e) => { if (!menuOpen) e.currentTarget.style.background = 'none'; }}
          >
            <Menu size={16} />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 4,
              width: 260,
              background: '#FFFFFF',
              borderRadius: 'var(--m8-radius-md)',
              border: '1px solid rgba(18,24,43,0.1)',
              boxShadow: '0 8px 24px rgba(8,13,25,0.12)',
              zIndex: 100,
              overflow: 'hidden',
              fontFamily: 'var(--font_primary)',
            }}>
              {/* Recent chats section */}
              <div style={{ padding: '10px 12px 6px' }}>
                <div className="m8-p6" style={{
                  color: 'rgba(18,24,43,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: 10,
                  fontWeight: 500,
                  marginBottom: 6,
                }}>
                  Recent chats
                </div>
                {recentChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setMenuOpen(false);
                      onSelectChat?.(chat.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '8px 8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderRadius: 'var(--m8-radius-sm)',
                      textAlign: 'left',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <MessageSquare size={13} style={{ color: 'rgba(18,24,43,0.3)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="m8-p6" style={{
                        color: 'var(--color_text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {chat.title}
                      </div>
                      <div style={{ color: 'rgba(18,24,43,0.35)', fontSize: 10, fontFamily: 'var(--font_primary)' }}>
                        {chat.date}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* View all chats */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onViewAllChats?.();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  borderTop: '1px solid rgba(18,24,43,0.06)',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="m8-p6" style={{ color: 'var(--color_primary)', fontWeight: 500 }}>View all chats</span>
                <ChevronRight size={14} style={{ color: 'var(--color_primary)' }} />
              </button>

              {/* Settings */}
              <button
                onClick={() => { setMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  borderTop: '1px solid rgba(18,24,43,0.06)',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Settings size={14} style={{ color: 'rgba(18,24,43,0.4)' }} />
                <span className="m8-p6" style={{ color: 'var(--color_text)' }}>Settings</span>
              </button>
            </div>
          )}
        </div>
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
