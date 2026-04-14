import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AIPanelHeader from './AIPanelHeader';
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
}

let msgCounter = 0;
const nextId = () => `msg-${++msgCounter}`;

const AISummaryPanel = ({ isOpen, onClose, currentPage, currentPageId, dateRange, inline }: AISummaryPanelProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponseComplete, setLastResponseComplete] = useState(true);
  const [contextNotice, setContextNotice] = useState<string | null>(null);
  const [lastPageId, setLastPageId] = useState<DashboardPageId>(currentPageId);

  const contextLabel = `${currentPage}  ·  ${dateRange}`;

  // Auto-generate welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: nextId(), type: 'welcome', welcomeHalts: mockHalts.slice(0, 3) }]);
    }
  }, []);

  // Detect page change
  if (currentPageId !== lastPageId && messages.length > 0) {
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
    setLastResponseComplete(false);
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

  const handleHaltSelect = useCallback((halt: Halt) => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'halt', pillText: halt.statement },
    ]);
    simulateResponse(halt.id);
  }, [simulateResponse]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'suggestion', pillText: suggestion.question },
    ]);
    simulateResponse(suggestion.id);
  }, [simulateResponse]);

  const handleSendMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { id: nextId(), type: 'user-bubble', userText: text }]);
    simulateResponse('generic');
  }, [simulateResponse]);

  const handleViewAll = useCallback(() => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'insights-list', insightsList: mockHalts },
    ]);
  }, []);

  const handleInsightAnalyse = useCallback((halt: Halt, insightsMessageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== insightsMessageId));
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

  const handleGetInsights = useCallback(() => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'insights-list', insightsList: mockHalts },
    ]);
  }, []);

  const handleGetSuggestions = useCallback(() => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'suggestions-inline', suggestionsList: mockSuggestions },
    ]);
  }, []);

  const handleSuggestionInlineSelect = useCallback((suggestion: Suggestion, messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'suggestion', pillText: suggestion.question },
    ]);
    simulateResponse(suggestion.id);
  }, [simulateResponse]);

  const panelContent = (
    <>
      <AIPanelHeader />

      {/* Scrollable middle area */}
      <div ref={scrollContainerRef} className="ai-panel-scroll" data-lenis-prevent="" style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: 32,
          background: 'linear-gradient(to top, transparent 0%, #FFFFFF 100%)',
          pointerEvents: 'none',
          zIndex: 1,
          marginBottom: -32,
          flexShrink: 0,
        }} />
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
          onHaltSelect={handleHaltSelect}
          onViewAll={handleViewAll}
          onSuggestionInlineSelect={handleSuggestionInlineSelect}
          onWelcomeSuggestionSelect={handleSuggestionSelect}
        />
      </div>

      {/* Horizontal suggestion strip — visible once user has interacted */}
      {messages.some(m => m.type === 'user-bubble' || m.type === 'context-pill') && !messages.some(m => m.type === 'suggestions-inline') && !isLoading && (
        <div
          key={`strip-${messages.length}`}
          style={{ position: 'relative', paddingTop: 8, paddingBottom: 0, marginBottom: 0, animation: 'suggestionSlideUp 0.4s ease-out' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        >
          <div style={{
            position: 'absolute',
            top: -32,
            left: 0,
            right: 0,
            height: 32,
            background: 'linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }} />
          <SuggestionsSection
            suggestions={mockSuggestions}
            onSelect={handleSuggestionSelect}
            isStale={false}
            mode="horizontal"
          />
        </div>
      )}

      {/* Chat input pinned at bottom */}
      <ChatInputBar
        contextLabel={contextLabel}
        isLoading={isLoading}
        onSend={handleSendMessage}
        pageName={currentPage}
        onGetInsights={handleGetInsights}
        onGetSuggestions={handleGetSuggestions}
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
