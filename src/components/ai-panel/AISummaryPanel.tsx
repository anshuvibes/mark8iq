import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AIPanelHeader from './AIPanelHeader';
import HaltsSection from './HaltsSection';
import SuggestionsSection from './SuggestionsSection';
import ChatWindow from './ChatWindow';
import ChatInputBar from './ChatInputBar';
import ViewAllInsightsModal from './ViewAllInsightsModal';
import {
  mockHalts,
  mockSuggestions,
  mockResponses,
  mockPreviousSession,
  type ChatMessage,
  type Halt,
  type Suggestion,
  type DashboardPageId,
} from '@/data/aiPanelMockData';

interface AISummaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  currentPageId: DashboardPageId;
  dateRange: string;
  inline?: boolean;
}

let msgCounter = 0;
const nextId = () => `msg-${++msgCounter}`;

const AISummaryPanel = ({ isOpen, onClose, currentPage, currentPageId, dateRange, inline }: AISummaryPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatTitle, setChatTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [haltsCollapsed, setHaltsCollapsed] = useState(false);
  const [showViewAll, setShowViewAll] = useState(false);
  const [previousLoaded, setPreviousLoaded] = useState(false);
  const [contextNotice, setContextNotice] = useState<string | null>(null);
  const [lastPageId, setLastPageId] = useState<DashboardPageId>(currentPageId);

  const hasActiveChat = messages.some(m => m.type !== 'date-separator' && m.type !== 'divider');
  const contextLabel = `${currentPage}  ·  ${dateRange}`;

  // Detect page change
  if (currentPageId !== lastPageId && hasActiveChat) {
    const pageName = currentPage;
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'divider', dividerPage: pageName },
    ]);
    setContextNotice(`You've moved to ${pageName}. New questions will be based on this page.`);
    setLastPageId(currentPageId);
  } else if (currentPageId !== lastPageId) {
    setLastPageId(currentPageId);
  }

  const simulateResponse = useCallback((responseKey: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: nextId(), type: 'loading' }]);

    setTimeout(() => {
      const response = mockResponses[responseKey] || mockResponses.generic;
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'loading');
        return [...filtered, { id: nextId(), type: 'ai-response', aiResponse: response }];
      });
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleHaltAnalyse = useCallback((halt: Halt) => {
    setChatTitle(halt.statement.length > 40 ? halt.statement.slice(0, 40) + '…' : halt.statement);
    setMessages([
      { id: nextId(), type: 'context-pill', pillVariant: 'halt', pillText: halt.statement },
    ]);
    setHaltsCollapsed(true);
    simulateResponse(halt.id);
  }, [simulateResponse]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    setChatTitle(suggestion.question.length > 40 ? suggestion.question.slice(0, 40) + '…' : suggestion.question);
    setMessages([
      { id: nextId(), type: 'context-pill', pillVariant: 'suggestion', pillText: suggestion.question },
    ]);
    setHaltsCollapsed(true);
    simulateResponse(suggestion.id);
  }, [simulateResponse]);

  const handleSendMessage = useCallback((text: string) => {
    if (!chatTitle) setChatTitle(text.length > 40 ? text.slice(0, 40) + '…' : text);
    setMessages(prev => [...prev, { id: nextId(), type: 'user-bubble', userText: text }]);
    if (!haltsCollapsed) setHaltsCollapsed(true);
    simulateResponse('generic');
  }, [simulateResponse, haltsCollapsed, chatTitle]);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setChatTitle(null);
    setHaltsCollapsed(false);
    setPreviousLoaded(false);
    setContextNotice(null);
  }, []);

  const handleLoadPrevious = useCallback(() => {
    setMessages(prev => [...mockPreviousSession, ...prev]);
    setPreviousLoaded(true);
  }, []);

  const handleRetry = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    simulateResponse('generic');
  }, [simulateResponse]);

  const panelContent = (
    <>
      <AIPanelHeader
        hasActiveChat={hasActiveChat}
        chatTitle={chatTitle || undefined}
        onClose={onClose}
        onNewChat={handleNewChat}
      />

      {/* Scrollable middle area */}
      <div className="ai-panel-scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <HaltsSection
          halts={mockHalts}
          collapsed={haltsCollapsed}
          hasActiveChat={hasActiveChat}
          onAnalyse={handleHaltAnalyse}
          onViewAll={() => setShowViewAll(true)}
          onToggleCollapse={() => setHaltsCollapsed(!haltsCollapsed)}
        />

        {!haltsCollapsed && (
          <SuggestionsSection
            suggestions={mockSuggestions}
            onSelect={handleSuggestionSelect}
            isStale={false}
          />
        )}

        {contextNotice && (
          <div style={{
            padding: '8px 16px',
            background: 'rgba(142,89,255,0.04)',
            borderBottom: '1px solid rgba(142,89,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1 }}>{contextNotice}</span>
            <button
              onClick={() => setContextNotice(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: 'rgba(18,24,43,0.35)' }}
            >
              ×
            </button>
          </div>
        )}

        <ChatWindow
          messages={messages}
          showLoadPrevious={!previousLoaded && hasActiveChat}
          onLoadPrevious={handleLoadPrevious}
          onRetry={handleRetry}
        />
      </div>

      {/* Pinned at bottom */}
      <ChatInputBar
        contextLabel={contextLabel}
        isLoading={isLoading}
        onSend={handleSendMessage}
      />
    </>
  );

  // Inline mode: render content directly, parent controls the container
  if (inline) {
    return (
      <>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          fontFamily: 'var(--font_primary)',
        }}>
          {panelContent}
        </div>

        {showViewAll && (
          <ViewAllInsightsModal
            halts={mockHalts}
            contextLabel={contextLabel}
            hasActiveChat={hasActiveChat}
            onAnalyse={handleHaltAnalyse}
            onClose={() => setShowViewAll(false)}
          />
        )}
      </>
    );
  }

  // Fixed overlay mode (fallback)
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 420,
              background: '#FFFFFF',
              borderLeft: '1px solid rgba(18,24,43,0.08)',
              boxShadow: '-8px 0 30px rgba(8,13,25,0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 50,
              fontFamily: 'var(--font_primary)',
            }}
          >
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>

      {showViewAll && (
        <ViewAllInsightsModal
          halts={mockHalts}
          contextLabel={contextLabel}
          hasActiveChat={hasActiveChat}
          onAnalyse={handleHaltAnalyse}
          onClose={() => setShowViewAll(false)}
        />
      )}
    </>
  );
};

export default AISummaryPanel;
