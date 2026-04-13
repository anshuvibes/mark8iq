import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Halt } from '@/data/aiPanelMockData';

interface ViewAllInsightsModalProps {
  halts: Halt[];
  contextLabel: string;
  hasActiveChat: boolean;
  onAnalyse: (halt: Halt) => void;
  onClose: () => void;
}

const ViewAllInsightsModal = ({ halts, contextLabel, hasActiveChat, onAnalyse, onClose }: ViewAllInsightsModalProps) => {
  const [conflictHaltId, setConflictHaltId] = useState<string | null>(null);

  const handleAnalyse = (halt: Halt) => {
    if (hasActiveChat) {
      setConflictHaltId(halt.id);
    } else {
      onAnalyse(halt);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(8,13,25,0.5)',
    }}
      onClick={onClose}
    >
      <div
        style={{
          width: 480,
          maxHeight: '70vh',
          background: '#FFFFFF',
          borderRadius: 'var(--m8-radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
          <div>
            <div className="m8-p4" style={{ color: 'var(--color_text)' }}>All Insights</div>
            <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 2 }}>Based on {contextLabel}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'rgba(18,24,43,0.45)' }}>
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {halts.map((halt, i) => (
              <div key={halt.id}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  borderRadius: 'var(--m8-radius-md)',
                  background: 'rgba(237,240,247,0.5)',
                  border: '1px solid rgba(18,24,43,0.06)',
                }}>
                  <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', minWidth: 16, textAlign: 'center' }}>{i + 1}</span>
                  <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1 }}>{halt.statement}</span>
                  <Button variant="m8-outline-violet" size="sm" onClick={() => handleAnalyse(halt)} style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto' }}>
                    Analyse
                  </Button>
                </div>

                {conflictHaltId === halt.id && (
                  <div style={{
                    padding: '10px 12px', marginTop: 4,
                    borderRadius: 'var(--m8-radius-md)',
                    background: 'rgba(252,116,89,0.04)',
                    border: '1px solid rgba(252,116,89,0.12)',
                  }}>
                    <div className="m8-p6" style={{ color: 'var(--color_text)', marginBottom: 8 }}>
                      Starting this will end your current conversation. Current chat will be saved in history.
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="m8-violet" size="sm" onClick={() => { setConflictHaltId(null); onAnalyse(halt); onClose(); }} style={{ padding: '4px 12px', fontSize: 12, height: 'auto' }}>
                        Start anyway
                      </Button>
                      <Button variant="m8-ghost" size="sm" onClick={() => setConflictHaltId(null)} style={{ fontSize: 12 }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllInsightsModal;
