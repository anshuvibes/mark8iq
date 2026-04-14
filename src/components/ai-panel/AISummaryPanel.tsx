import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AIPanelHeader from './AIPanelHeader';
import HaltsSection from './HaltsSection';
import SuggestionsSection from './SuggestionsSection';
import ChatWindow from './ChatWindow';
import ChatInputBar from './ChatInputBar';
import {
  mockHalts,
  mockSuggestions,
  mockResponses,
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
  isNewDay?: boolean;
}

let msgCounter = 0;
const nextId = () => `msg-${++msgCounter}`;

const AISummaryPanel = ({ isOpen, onClose, currentPage, currentPageId, dateRange, inline, isNewDay = false }: AISummaryPanelProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contextNotice, setContextNotice] = useState<string | null>(null);
  const [lastPageId, setLastPageId] = useState<DashboardPageId>(currentPageId);
  const [homeCollapsed, setHomeCollapsed] = useState(false);

  const hasMessages = messages.some(m => m.type !== 'date-separator' && m.type !== 'divider');
  const contextLabel = `${currentPage}  ·  ${dateRange}`;

  // Derive chat title from first meaningful message
  const firstMsg = messages.find(m => m.type === 'context-pill' || m.type === 'user-bubble');
  const chatTitle = firstMsg
    ? (firstMsg.type === 'context-pill' ? firstMsg.pillText : firstMsg.userText)?.slice(0, 40) + (((firstMsg.type === 'context-pill' ? firstMsg.pillText : firstMsg.userText)?.length || 0) > 40 ? '…' : '')
    : undefined;

  // Home state visibility:
  // State A: no messages → show home
  // State B2: isNewDay && !homeCollapsed → show home above history
  // Otherwise: hidden
  const homeStateVisible = !hasMessages || (isNewDay && !homeCollapsed && !hasMessages) ? true : (isNewDay && !homeCollapsed);

  // Detect page change
  if (currentPageId !== lastPageId && hasMessages) {
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

  const collapseHome = useCallback(() => {
    setHomeCollapsed(true);
  }, []);

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
    collapseHome();
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'halt', pillText: halt.statement },
    ]);
    simulateResponse(halt.id);
  }, [simulateResponse, collapseHome]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    collapseHome();
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'suggestion', pillText: suggestion.question },
    ]);
    simulateResponse(suggestion.id);
  }, [simulateResponse, collapseHome]);

  const handleSendMessage = useCallback((text: string) => {
    collapseHome();
    setMessages(prev => [...prev, { id: nextId(), type: 'user-bubble', userText: text }]);
    simulateResponse('generic');
  }, [simulateResponse, collapseHome]);

  const handleViewAll = useCallback(() => {
    collapseHome();
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'insights-list', insightsList: mockHalts },
    ]);
  }, [collapseHome]);

  const handleInsightAnalyse = useCallback((halt: Halt, insightsMessageId: string) => {
    // Remove the insights-list message
    setMessages(prev => prev.filter(m => m.id !== insightsMessageId));
    // Add context pill and simulate response
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'halt', pillText: halt.statement },
    ]);
    simulateResponse(halt.id);
  }, [simulateResponse]);

  const handleRetry = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    simulateResponse('generic');
  }, [simulateResponse]);

  const panelContent = (
    <>
      <AIPanelHeader chatTitle={chatTitle} />

      {/* Scrollable middle area */}
      <div ref={scrollContainerRef} className="ai-panel-scroll" data-lenis-prevent="" style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {homeStateVisible && (
          <>
            <HaltsSection
              halts={mockHalts}
              hasActiveChat={hasMessages}
              onAnalyse={handleHaltAnalyse}
              onViewAll={handleViewAll}
            />
            <SuggestionsSection
              suggestions={mockSuggestions}
              onSelect={handleSuggestionSelect}
              isStale={false}
            />
          </>
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
          showLoadPrevious={false}
          onLoadPrevious={() => {}}
          onRetry={handleRetry}
          scrollContainerRef={scrollContainerRef}
          onInsightAnalyse={handleInsightAnalyse}
        />
      </div>

      {/* Chat input pinned at bottom */}
      <ChatInputBar
        contextLabel={contextLabel}
        isLoading={isLoading}
        onSend={handleSendMessage}
        pageName={currentPage}
      />
    </>
  );

  // Inline mode
  if (inline) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        fontFamily: 'var(--font_primary)',
      }}>
        {panelContent}
      </div>
    );
  }

  // Fixed overlay mode
  return (
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
  );
};

export default AISummaryPanel;
