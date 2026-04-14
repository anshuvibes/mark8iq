import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import AIPanelHeader from './AIPanelHeader';

import ChatWindow from './ChatWindow';
import ChatInputBar from './ChatInputBar';
import {
  mockHalts,
  mockSuggestions,
  mockResponses,
  mockGoalFAQs,
  type ChatMessage,
  type Halt,
  type Suggestion,
  type GoalFAQ,
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
  const highlightsRef = useRef<HTMLDivElement>(null);
  const highlightsItemsRef = useRef<HTMLDivElement[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponseComplete, setLastResponseComplete] = useState(true);
  const [contextNotice, setContextNotice] = useState<string | null>(null);
  const [lastPageId, setLastPageId] = useState<DashboardPageId>(currentPageId);
  const [view, setView] = useState<'chat' | 'highlights'>('chat');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [goalFAQSheetOpen, setGoalFAQSheetOpen] = useState(false);
  const [goalFAQView, setGoalFAQView] = useState(false);
  const goalFAQsRef = useRef<HTMLDivElement>(null);
  const goalFAQItemsRef = useRef<HTMLDivElement[]>([]);

  const handleHighlightsBack = useCallback(() => {
    if (highlightsRef.current) {
      gsap.to(highlightsRef.current, {
        x: '100%',
        opacity: 0.5,
        duration: 0.35,
        ease: 'expo.in',
        onComplete: () => setView('chat'),
      });
    } else {
      setView('chat');
    }
  }, []);

  useEffect(() => {
    if (view === 'highlights' && highlightsRef.current) {
      gsap.fromTo(
        highlightsRef.current,
        { x: '100%', opacity: 0.5 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'expo.out' }
      );

      const items = highlightsItemsRef.current.filter(Boolean);
      gsap.fromTo(
        items,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.04, delay: 0.15 }
      );
    }
  }, [view]);

  useEffect(() => {
    if (goalFAQView && goalFAQsRef.current) {
      gsap.fromTo(
        goalFAQsRef.current,
        { x: '100%', opacity: 0.5 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'expo.out' }
      );

      const items = goalFAQItemsRef.current.filter(Boolean);
      gsap.fromTo(
        items,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.04, delay: 0.15 }
      );
    }
  }, [goalFAQView]);

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
    setView('highlights');
  }, []);

  const handleHaltAnalyse = useCallback((halt: Halt) => {
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'halt', pillText: halt.statement },
    ]);
    simulateResponse(halt.id);
  }, [simulateResponse]);

  const handleInsightAnalyse = useCallback((halt: Halt, insightsMessageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== insightsMessageId));
    handleHaltAnalyse(halt);
  }, [handleHaltAnalyse]);

  const handleRetry = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    simulateResponse('generic');
  }, [simulateResponse]);

  const handleGetInsights = useCallback(() => {
    setSheetOpen(true);
  }, []);

  const handleGetGoalFAQs = useCallback(() => {
    setGoalFAQSheetOpen(true);
  }, []);

  const handleGoalFAQSelect = useCallback((faq: GoalFAQ) => {
    setGoalFAQSheetOpen(false);
    setGoalFAQView(false);
    setMessages(prev => [
      ...prev,
      { id: nextId(), type: 'context-pill', pillVariant: 'suggestion', pillText: faq.question },
    ]);
    simulateResponse('generic');
  }, [simulateResponse]);

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
      {view === 'highlights' ? (
        <div key="highlights" ref={highlightsRef} style={{
          display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0,
        }}>
          {/* Header */}
          <div
            ref={(el) => { if (el) highlightsItemsRef.current[0] = el; }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(18,24,43,0.06)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleHighlightsBack}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, color: 'rgba(18,24,43,0.4)',
                borderRadius: 'var(--m8-radius-sm)',
                display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
            >
              <ArrowLeft size={16} />
            </button>
            <span className="m8-p6" style={{
              color: 'var(--color_text)', fontWeight: 500, flex: 1,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Sparkles size={12} style={{ color: 'var(--color_primary)', flexShrink: 0 }} />
              All Highlights
            </span>
            <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)' }}>
              {mockHalts.length} total
            </span>
          </div>

          {/* Scrollable list */}
          <div className="ai-panel-scroll" data-lenis-prevent="" style={{
            flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            {mockHalts.map((halt, i) => (
              <div
                key={halt.id}
                ref={(el) => { if (el) highlightsItemsRef.current[i + 1] = el; }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  borderRadius: 'var(--m8-radius-md)',
                  background: 'rgba(237,240,247,0.5)',
                  border: '1px solid rgba(18,24,43,0.06)',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onClick={() => {
                  setView('chat');
                  handleHaltAnalyse(halt);
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.9)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.5)'; }}
              >
                <span className="m8-p6" style={{
                  color: 'rgba(18,24,43,0.25)', minWidth: 16, textAlign: 'center', fontSize: 11,
                }}>
                  {i + 1}
                </span>
                <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1, fontSize: 13 }}>
                  {halt.statement}
                </span>
                <Button
                  variant="m8-outline-violet"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setView('chat');
                    handleHaltAnalyse(halt);
                  }}
                  style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto', flexShrink: 0 }}
                >
                  Get Insights
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div key="chat" style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
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
              onTypingComplete={() => setLastResponseComplete(true)}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>


          {/* Bottom sheet backdrop */}
          {sheetOpen && (
            <div
              onClick={() => setSheetOpen(false)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(8,13,25,0.15)',
                zIndex: 20,
              }}
            />
          )}

          {/* Bottom sheet panel */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            background: '#FFFFFF',
            borderRadius: '16px 16px 0 0',
            boxShadow: '0 -4px 24px rgba(8,13,25,0.1)',
            zIndex: 30,
            transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '70%',
          }}>
            {/* Sheet handle */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              padding: '10px 0 4px',
              flexShrink: 0,
            }}>
              <div style={{
                width: 32, height: 3,
                borderRadius: 99,
                background: 'rgba(18,24,43,0.15)',
              }} />
            </div>

            {/* Sheet header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px 12px',
              flexShrink: 0,
            }}>
              <span className="m8-p5" style={{
                color: 'var(--color_text)', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Sparkles size={12} style={{ color: 'var(--color_primary)', flexShrink: 0 }} />
                Highlights
              </span>
              <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)' }}>
                {mockHalts.length} total
              </span>
            </div>

            {/* Top 3 highlights */}
            <div style={{
              padding: '0 16px',
              display: 'flex', flexDirection: 'column', gap: 6,
              flexShrink: 0,
            }}>
              {mockHalts.slice(0, 3).map((halt, i) => (
                <div
                  key={halt.id}
                  onClick={() => {
                    setSheetOpen(false);
                    handleHaltAnalyse(halt);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    borderRadius: 'var(--m8-radius-md)',
                    background: 'rgba(237,240,247,0.5)',
                    border: '1px solid rgba(18,24,43,0.06)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.9)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.5)'; }}
                >
                  <span style={{
                    color: 'rgba(18,24,43,0.25)', fontSize: 11,
                    minWidth: 16, textAlign: 'center',
                  }}>
                    {i + 1}
                  </span>
                  <span className="m8-p6" style={{
                    color: 'var(--color_text)', flex: 1, fontSize: 13,
                  }}>
                    {halt.statement}
                  </span>
                  <ChevronRight size={14} style={{ color: 'rgba(18,24,43,0.25)', flexShrink: 0 }} />
                </div>
              ))}
            </div>

            {/* View all row */}
            <button
              onClick={() => {
                setSheetOpen(false);
                setView('highlights');
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '14px 16px',
                border: 'none', background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                borderTop: '1px solid rgba(18,24,43,0.06)',
                marginTop: 12,
                fontFamily: 'var(--font_primary)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="m8-p6" style={{ color: 'var(--color_primary)', flex: 1 }}>
                View all highlights
              </span>
              <ChevronRight size={14} style={{ color: 'var(--color_primary)' }} />
            </button>
          </div>

          {/* Goal FAQs bottom sheet backdrop */}
          {goalFAQSheetOpen && (
            <div
              onClick={() => setGoalFAQSheetOpen(false)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(8,13,25,0.15)',
                zIndex: 20,
              }}
            />
          )}

          {/* Goal FAQs bottom sheet */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            background: '#FFFFFF',
            borderRadius: '16px 16px 0 0',
            boxShadow: '0 -4px 24px rgba(8,13,25,0.1)',
            zIndex: 30,
            transform: goalFAQSheetOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '70%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px', flexShrink: 0 }}>
              <div style={{ width: 32, height: 3, borderRadius: 99, background: 'rgba(18,24,43,0.15)' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 16px 12px', flexShrink: 0,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Target size={14} style={{ color: 'var(--color_primary)' }} />
                <span className="m8-p5" style={{ color: 'var(--color_text)', fontWeight: 500 }}>Goal FAQs</span>
              </span>
              <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)' }}>{mockGoalFAQs.length} total</span>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
              {mockGoalFAQs.slice(0, 3).map((faq, i) => (
                <div
                  key={faq.id}
                  onClick={() => { setGoalFAQSheetOpen(false); handleGoalFAQSelect(faq); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    borderRadius: 'var(--m8-radius-md)',
                    background: 'rgba(237,240,247,0.5)',
                    border: '1px solid rgba(18,24,43,0.06)',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.9)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.5)'; }}
                >
                  <span style={{ color: 'rgba(18,24,43,0.25)', fontSize: 11, minWidth: 16, textAlign: 'center' }}>{i + 1}</span>
                  <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1, fontSize: 13 }}>{faq.question}</span>
                  <ChevronRight size={14} style={{ color: 'rgba(18,24,43,0.25)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
            <button
              onClick={() => { setGoalFAQSheetOpen(false); setGoalFAQView(true); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '14px 16px',
                border: 'none', background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                borderTop: '1px solid rgba(18,24,43,0.06)',
                marginTop: 12, fontFamily: 'var(--font_primary)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(18,24,43,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="m8-p6" style={{ color: 'var(--color_primary)', flex: 1 }}>View all Goal FAQs</span>
              <ChevronRight size={14} style={{ color: 'var(--color_primary)' }} />
            </button>
          </div>

          {/* Goal FAQs full-screen view */}
          {goalFAQView && (
            <div ref={goalFAQsRef} style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: '#FFFFFF',
              display: 'flex', flexDirection: 'column',
              zIndex: 15,
            }}>
              <div
                ref={(el) => { if (el) goalFAQItemsRef.current[0] = el; }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(18,24,43,0.06)',
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    gsap.to(goalFAQsRef.current, {
                      x: '100%', opacity: 0.5, duration: 0.35, ease: 'expo.in',
                      onComplete: () => setGoalFAQView(false),
                    });
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: 4, color: 'rgba(18,24,43,0.4)',
                    borderRadius: 'var(--m8-radius-sm)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <ArrowLeft size={16} />
                </button>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                  <Target size={14} style={{ color: 'var(--color_primary)' }} />
                  <span className="m8-p6" style={{ color: 'var(--color_text)', fontWeight: 500 }}>All Goal FAQs</span>
                </span>
                <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)' }}>{mockGoalFAQs.length} total</span>
              </div>
              <div className="ai-panel-scroll" data-lenis-prevent="" style={{
                flex: 1, minHeight: 0, overflowY: 'auto',
                padding: '12px 16px',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                {mockGoalFAQs.map((faq, i) => (
                  <div
                    key={faq.id}
                    ref={(el) => { if (el) goalFAQItemsRef.current[i + 1] = el; }}
                    onClick={() => handleGoalFAQSelect(faq)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px',
                      borderRadius: 'var(--m8-radius-md)',
                      background: 'rgba(237,240,247,0.5)',
                      border: '1px solid rgba(18,24,43,0.06)',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.9)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.5)'; }}
                  >
                    <span style={{ color: 'rgba(18,24,43,0.25)', fontSize: 11, minWidth: 16, textAlign: 'center' }}>{i + 1}</span>
                    <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1, fontSize: 13 }}>{faq.question}</span>
                    <ChevronRight size={14} style={{ color: 'rgba(18,24,43,0.25)', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat input pinned at bottom */}
          <ChatInputBar
            contextLabel={contextLabel}
            isLoading={isLoading}
            onSend={handleSendMessage}
            pageName={currentPage}
            onGetInsights={handleGetInsights}
            onGetGoalFAQs={handleGetGoalFAQs}
          />
        </div>
      )}
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
