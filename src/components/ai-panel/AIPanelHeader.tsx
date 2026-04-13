import { ArrowLeft, Menu, Settings, MessageSquare, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo, useRef } from 'react';

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  time: string;
  preview: string;
}

interface AIPanelHeaderProps {
  hasActiveChat: boolean;
  chatTitle?: string;
  onNewChat: () => void;
  onSelectChat?: (chatId: string) => void;
  chatHistory?: ChatHistoryItem[];
}

const mockChatHistory: ChatHistoryItem[] = [
  { id: 'h1', title: 'Budget overspend on top campaigns', date: 'Today', time: '9:14 AM', preview: '10 best-selling campaigns have gone out of budget…' },
  { id: 'h2', title: 'ACoS spike in Home & Kitchen', date: 'Today', time: '8:02 AM', preview: 'Home & Kitchen CTR dropped 61% vs comparison period…' },
  { id: 'h3', title: 'Under-spending strong performers', date: 'Yesterday', time: '4:45 PM', preview: '3 campaigns with strong ACoS are under-spending…' },
  { id: 'h4', title: 'Placement analysis for SP campaigns', date: 'Yesterday', time: '11:30 AM', preview: 'Top-of-search placements driving 72% of conversions…' },
  { id: 'h5', title: 'Weekly ROAS trend review', date: '10 Apr', time: '3:20 PM', preview: 'ROAS improved by 0.3x week-over-week across all…' },
  { id: 'h6', title: 'New keyword opportunities', date: '9 Apr', time: '10:15 AM', preview: 'Found 12 high-volume keywords with low competition…' },
  { id: 'h7', title: 'Retargeting campaign performance', date: '8 Apr', time: '2:00 PM', preview: 'SD retargeting showing 3.26x ROAS, recommend scaling…' },
  { id: 'h8', title: 'Brand vs generic keyword split', date: '7 Apr', time: '9:30 AM', preview: 'Brand keywords account for 38% of spend but 65% of sales…' },
  { id: 'h9', title: 'Dayparting analysis for Beauty', date: '6 Apr', time: '1:15 PM', preview: 'Peak conversion hours are 8-10 PM for Beauty category…' },
  { id: 'h10', title: 'Competitor share of voice trends', date: '5 Apr', time: '11:45 AM', preview: 'SOV dropped 3pp in Kitchen Organiser segment this week…' },
  { id: 'h11', title: 'Auto vs manual campaign comparison', date: '4 Apr', time: '10:00 AM', preview: 'Manual campaigns outperforming auto by 1.2x ROAS on avg…' },
  { id: 'h12', title: 'Budget allocation recommendations', date: '3 Apr', time: '4:00 PM', preview: 'Recommend shifting 15% budget from SD to SP exact match…' },
  { id: 'h13', title: 'CTR benchmarking across categories', date: '2 Apr', time: '9:45 AM', preview: 'Electronics below benchmark at 1.2% vs industry 1.8%…' },
  { id: 'h14', title: 'Negative keyword audit', date: '1 Apr', time: '3:30 PM', preview: 'Found 24 irrelevant search terms consuming ₹8,400/week…' },
  { id: 'h15', title: 'Seasonal trend preparation', date: '31 Mar', time: '2:15 PM', preview: 'Historical data shows 40% spend increase needed for Q2…' },
];

// Simple fuzzy match: checks if all query chars appear in order in the target
function fuzzyMatch(query: string, target: string): { match: boolean; score: number } {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (!q) return { match: true, score: 0 };

  let qi = 0;
  let consecutiveBonus = 0;
  let lastMatchIdx = -2;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (ti === lastMatchIdx + 1) consecutiveBonus += 10;
      lastMatchIdx = ti;
      qi++;
    }
  }

  if (qi < q.length) return { match: false, score: 0 };

  // Higher score = better match. Bonus for consecutive chars and early matches.
  const score = consecutiveBonus + (100 - lastMatchIdx);
  return { match: true, score };
}

const AIPanelHeader = ({
  hasActiveChat,
  chatTitle,
  onNewChat,
  onSelectChat,
  chatHistory = mockChatHistory,
}: AIPanelHeaderProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) { setSearchQuery(''); setSearchActive(false); }
  }, [drawerOpen]);

  // Focus search input when search mode activates
  useEffect(() => {
    if (searchActive) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchActive]);

  const handleBack = () => {
    if (hasActiveChat) {
      setShowConfirm(true);
    } else {
      onNewChat();
    }
  };

  // Filter & sort chats
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chatHistory;
    return chatHistory
      .map((chat) => {
        const titleMatch = fuzzyMatch(searchQuery, chat.title);
        const previewMatch = fuzzyMatch(searchQuery, chat.preview);
        const bestScore = Math.max(titleMatch.score, previewMatch.score);
        return { chat, match: titleMatch.match || previewMatch.match, score: bestScore };
      })
      .filter((r) => r.match)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.chat);
  }, [chatHistory, searchQuery]);

  // Group chats by date
  const grouped: Record<string, ChatHistoryItem[]> = {};
  filteredChats.forEach((chat) => {
    if (!grouped[chat.date]) grouped[chat.date] = [];
    grouped[chat.date].push(chat);
  });

  return (
    <div style={{ borderBottom: '1px solid rgba(18,24,43,0.06)', flexShrink: 0, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}>
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

        <button
          onClick={() => setDrawerOpen(true)}
          title="Chat history"
          style={{
            background: 'none',
            border: 'none', cursor: 'pointer', padding: 5,
            color: 'rgba(18,24,43,0.4)',
            borderRadius: 'var(--m8-radius-sm)',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          <Menu size={16} />
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

      {/* ═══ FULL SLIDING DRAWER ═══ */}
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: 'calc(100vh - 52px)',
          zIndex: 90,
          pointerEvents: drawerOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer panel */}
      <div
        className="ai-panel-scroll"
        data-lenis-prevent=""
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '85%',
          height: 'calc(100vh - 52px)',
          background: '#FFFFFF',
          borderLeft: '1px solid rgba(18,24,43,0.1)',
          boxShadow: drawerOpen ? '-4px 0 20px rgba(8,13,25,0.08)' : 'none',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font_primary)',
        }}
      >
        {/* Drawer header — always shows title + search trigger + close */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
          borderBottom: searchActive ? 'none' : '1px solid rgba(18,24,43,0.06)',
          flexShrink: 0,
        }}>
          <span className="m8-p5" style={{ color: 'var(--color_text)', fontWeight: 500, flex: 1 }}>Chat History</span>
          {/* Search trigger — looks like a small input box */}
          <div
            onClick={() => setSearchActive(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              borderRadius: 'var(--m8-radius-md)',
              border: '1px solid rgba(18,24,43,0.1)',
              background: 'rgba(18,24,43,0.02)',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
              minWidth: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(18,24,43,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(18,24,43,0.1)'; }}
          >
            <Search size={11} style={{ color: 'rgba(18,24,43,0.3)', flexShrink: 0 }} />
            <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.3)', fontSize: 11, whiteSpace: 'nowrap' }}>Search chats</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              color: 'rgba(18,24,43,0.4)',
              borderRadius: 'var(--m8-radius-sm)',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Actual search input — appears below header when active */}
        {searchActive && (
          <div style={{ padding: '0 12px 8px', borderBottom: '1px solid rgba(18,24,43,0.06)', flexShrink: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 10px',
              borderRadius: 'var(--m8-radius-md)',
              border: '1px solid var(--color_primary)',
              background: 'rgba(142,89,255,0.03)',
            }}>
              <Search size={13} style={{ color: 'var(--color_primary)', flexShrink: 0 }} />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats…"
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
                onClick={() => { setSearchActive(false); setSearchQuery(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: 'rgba(18,24,43,0.4)' }}
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Chat list — scrollable */}
        <div className="ai-panel-scroll" data-lenis-prevent="" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 0' }}>
          {filteredChats.length === 0 ? (
            <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', textAlign: 'center', padding: '24px 16px' }}>
              No chats found for "{searchQuery}"
            </div>
          ) : (
            Object.entries(grouped).map(([date, chats]) => (
              <div key={date}>
                <div className="m8-p6" style={{
                  color: 'rgba(18,24,43,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: 10,
                  fontWeight: 500,
                  padding: '10px 16px 4px',
                }}>
                  {date}
                </div>
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setDrawerOpen(false);
                      onSelectChat?.(chat.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.03)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <MessageSquare size={14} style={{ color: 'rgba(18,24,43,0.25)', flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="m8-p6" style={{
                        color: 'var(--color_text)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: 2,
                      }}>
                        {chat.title}
                      </div>
                      <div className="m8-p6" style={{
                        color: 'rgba(18,24,43,0.35)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 11,
                      }}>
                        {chat.preview}
                      </div>
                    </div>
                    <span style={{ color: 'rgba(18,24,43,0.3)', fontSize: 10, fontFamily: 'var(--font_primary)', flexShrink: 0, marginTop: 2 }}>
                      {chat.time}
                    </span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Settings — pinned at bottom */}
        <div style={{
          borderTop: '1px solid rgba(18,24,43,0.06)',
          padding: '10px 16px',
          flexShrink: 0,
        }}>
          <button
            onClick={() => { setDrawerOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '8px 0',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <Settings size={15} style={{ color: 'rgba(18,24,43,0.4)' }} />
            <span className="m8-p6" style={{ color: 'var(--color_text)' }}>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPanelHeader;
