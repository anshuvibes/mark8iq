import { useState } from 'react';
import { Bell, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import AISummaryPanel from '@/components/ai-panel/AISummaryPanel';
import { dashboardPages, type DashboardPageId } from '@/data/aiPanelMockData';

const mockTableData = [
  { campaign: 'SP — Kitchen Organiser — Exact', targeting: 'kitchen organiser', matchType: 'Exact', impressions: '12,450', clicks: '234', ctr: '1.88%', spend: '₹4,230', sales: '₹18,400', acos: '22.99%', roas: '4.35x' },
  { campaign: 'SP — Storage Solutions — Broad', targeting: 'storage box', matchType: 'Broad', impressions: '45,200', clicks: '890', ctr: '1.97%', spend: '₹12,670', sales: '₹34,200', acos: '37.05%', roas: '2.70x' },
  { campaign: 'SP — Home Décor — Phrase', targeting: 'wall art', matchType: 'Phrase', impressions: '8,900', clicks: '145', ctr: '1.63%', spend: '₹3,480', sales: '₹6,200', acos: '56.13%', roas: '1.78x' },
  { campaign: 'SB — Beauty Essentials', targeting: 'skincare set', matchType: 'Exact', impressions: '22,100', clicks: '567', ctr: '2.57%', spend: '₹8,900', sales: '₹42,300', acos: '21.04%', roas: '4.75x' },
  { campaign: 'SP — Electronics Acc — Auto', targeting: 'phone case', matchType: 'Auto', impressions: '67,800', clicks: '1,230', ctr: '1.81%', spend: '₹18,450', sales: '₹28,900', acos: '63.84%', roas: '1.57x' },
  { campaign: 'SD — Retargeting — Home', targeting: 'audience', matchType: 'Views', impressions: '34,500', clicks: '456', ctr: '1.32%', spend: '₹6,780', sales: '₹22,100', acos: '30.68%', roas: '3.26x' },
];

const DashboardAdsPage = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentPageId, setCurrentPageId] = useState<DashboardPageId>('targeting');

  const currentPage = dashboardPages.find(p => p.id === currentPageId)!;
  const dateRange = '04 Jun – 04 Dec 2026';

  return (
    <div style={{ fontFamily: 'var(--font_primary)', background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(18,24,43,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/img/product-logos/black/mark8-ads.svg" alt="Mark8 Ads" style={{ height: 24 }} />
        </div>

        {/* Center: Page tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {dashboardPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageId(page.id)}
              className="m8-p6"
              style={{
                padding: '8px 16px',
                border: 'none',
                background: currentPageId === page.id ? 'rgba(142,89,255,0.08)' : 'transparent',
                color: currentPageId === page.id ? 'var(--color_primary)' : 'rgba(18,24,43,0.5)',
                cursor: 'pointer',
                borderBottom: currentPageId === page.id ? '2px solid var(--color_primary)' : '2px solid transparent',
                transition: 'all 0.15s',
                fontFamily: 'var(--font_primary)',
              }}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            color: 'rgba(18,24,43,0.45)',
            borderRadius: 'var(--m8-radius-sm)',
          }}>
            <Bell size={18} />
          </button>

          <button
            onClick={() => setPanelOpen(!panelOpen)}
            title="AI Summary"
            style={{
              background: panelOpen ? 'rgba(142,89,255,0.08)' : 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: panelOpen ? 'var(--color_primary)' : 'rgba(18,24,43,0.45)',
              borderRadius: 'var(--m8-radius-sm)',
              transition: 'all 0.15s',
            }}
          >
            <Sparkles size={18} />
          </button>

          {/* User avatar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8,
            padding: '4px 8px', borderRadius: 'var(--m8-radius-md)',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--color_primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: 12, fontFamily: 'var(--font_primary)',
            }}>
              ST
            </div>
            <span className="m8-p6" style={{ color: 'var(--color_text)' }}>Satyam T.</span>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div style={{
        padding: 24,
        marginRight: panelOpen ? 420 : 0,
        transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Page title + date range */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="m8-p3-medium" style={{ color: 'var(--color_text)' }}>
            {currentPage.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="m8-p6" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px',
              borderRadius: 'var(--m8-radius-md)',
              border: '1px solid rgba(18,24,43,0.12)',
              background: '#FFFFFF',
              color: 'var(--color_text)',
              cursor: 'pointer',
              fontFamily: 'var(--font_primary)',
            }}>
              {dateRange}
              <ChevronDown size={14} style={{ color: 'rgba(18,24,43,0.35)' }} />
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Ad Spend', value: '₹54,510', change: '+12.4%' },
            { label: 'Ad Sales', value: '₹1,52,100', change: '+8.2%' },
            { label: 'ACoS', value: '35.8%', change: '-2.1%' },
            { label: 'ROAS', value: '2.79x', change: '+0.3x' },
          ].map((stat) => (
            <div key={stat.label} style={{
              padding: '16px 20px',
              background: '#FFFFFF',
              borderRadius: 'var(--m8-radius-md)',
              border: '1px solid rgba(18,24,43,0.06)',
            }}>
              <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.45)', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="m8-p3-medium" style={{ color: 'var(--color_text)' }}>{stat.value}</span>
                <span className="m8-p6" style={{
                  color: stat.change.startsWith('+') ? '#7CBC71' : '#FC7459',
                }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mock data table */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 'var(--m8-radius-md)',
          border: '1px solid rgba(18,24,43,0.06)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font_primary)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(18,24,43,0.08)' }}>
                {['Campaign', 'Targeting', 'Match', 'Impressions', 'Clicks', 'CTR', 'Spend', 'Sales', 'ACoS', 'ROAS'].map((h) => (
                  <th key={h} className="m8-p6" style={{
                    padding: '10px 12px', textAlign: 'left',
                    color: 'rgba(18,24,43,0.45)', fontWeight: 400,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(18,24,43,0.04)' }}>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.campaign}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.targeting}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'rgba(18,24,43,0.5)' }}>{row.matchType}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.impressions}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.clicks}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.ctr}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.spend}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: 'var(--color_text)' }}>{row.sales}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: parseFloat(row.acos) > 40 ? '#FC7459' : 'var(--color_text)' }}>{row.acos}</td>
                  <td className="m8-p6" style={{ padding: '10px 12px', color: parseFloat(row.roas) < 2 ? '#FC7459' : '#7CBC71' }}>{row.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Summary Panel */}
      <AISummaryPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        currentPage={currentPage.label}
        currentPageId={currentPageId}
        dateRange={dateRange}
      />
    </div>
  );
};

export default DashboardAdsPage;
