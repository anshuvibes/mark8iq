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
    <div style={{ fontFamily: 'var(--font_primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ═══ TOP NAV BAR (dark) — full width always ═══ */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 52,
        background: 'var(--color_neutral_dark)',
        flexShrink: 0,
        zIndex: 40,
      }}>
        {/* Left: Logo + Brand selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/img/product-logos/white/mark8-ads.svg" alt="Mark8 Ads" style={{ height: 22 }} />
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 14px',
            borderRadius: 'var(--m8-radius-md)',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.08)',
            color: '#FFFFFF',
            cursor: 'pointer',
            fontFamily: 'var(--font_primary)',
          }}>
            <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 10, lineHeight: 1 }}>Brand</span>
            <span className="m8-p6" style={{ color: '#FFFFFF' }}>Artment</span>
            <ChevronDown size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>
        </div>

        {/* Right: Date picker → Bell → User → Ask AI (far right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Date range */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 16px',
            borderRadius: 'var(--m8-radius-md)',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            color: '#FFFFFF',
            cursor: 'pointer',
            fontFamily: 'var(--font_primary)',
          }}>
            <span className="m8-p6" style={{ color: '#FFFFFF' }}>06/04/2026 - 12/04/2026</span>
            <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.35)' }}>vs</span>
            <span className="m8-p6" style={{ color: '#FFFFFF' }}>06/03/2026 - 12/03/2026</span>
            <Calendar size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>

          {/* Bell */}
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            color: 'rgba(255,255,255,0.5)',
          }}>
            <Bell size={18} />
          </button>

          {/* User */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            cursor: 'pointer',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--color_primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: 13, fontFamily: 'var(--font_primary)',
            }}>
              S
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="m8-p6" style={{ color: '#FFFFFF', lineHeight: 1.2 }}>Satyam</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'var(--font_primary)', lineHeight: 1.2 }}>User</span>
            </div>
            <ChevronDown size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)', marginLeft: 4, marginRight: 4 }} />

          {/* Ask AI — far right */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            title="AI Summary"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px',
              borderRadius: 'var(--m8-radius-md)',
              border: 'none',
              background: panelOpen ? 'var(--color_primary)' : 'rgba(142,89,255,0.25)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s',
              fontFamily: 'var(--font_primary)',
            }}
          >
            <Sparkles size={14} />
            <span className="m8-p6" style={{ color: '#FFFFFF' }}>Ask AI</span>
          </button>
        </div>
      </header>

      {/* ═══ BODY: Sub-nav + content + panel side by side ═══ */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left: Dashboard (shrinks when panel opens) */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          transition: 'flex 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}>
          {/* ═══ SUB-NAV BAR (light) ═══ */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(18,24,43,0.08)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex' }}>
              <button className="m8-p6" style={{
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                color: 'var(--color_primary)',
                cursor: 'pointer',
                borderBottom: '2px solid var(--color_primary)',
                fontFamily: 'var(--font_primary)',
              }}>
                Amazon
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', borderRadius: 'var(--m8-radius-md)', overflow: 'hidden', border: '1px solid rgba(18,24,43,0.1)' }}>
                <button className="m8-p6" style={{
                  padding: '5px 14px', border: 'none',
                  background: 'var(--color_primary)', color: '#FFFFFF',
                  cursor: 'pointer', fontFamily: 'var(--font_primary)',
                  textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 11,
                }}>
                  Comparison
                </button>
                <button className="m8-p6" style={{
                  padding: '5px 14px', border: 'none',
                  background: '#FFFFFF', color: 'rgba(18,24,43,0.5)',
                  cursor: 'pointer', fontFamily: 'var(--font_primary)',
                  textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 11,
                }}>
                  Summary
                </button>
              </div>
              {dashboardPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPageId(page.id)}
                  className="m8-p6"
                  style={{
                    padding: '10px 12px',
                    border: 'none',
                    background: 'transparent',
                    color: currentPageId === page.id ? 'var(--color_primary)' : 'rgba(18,24,43,0.45)',
                    cursor: 'pointer',
                    borderBottom: currentPageId === page.id ? '2px solid var(--color_primary)' : '2px solid transparent',
                    fontFamily: 'var(--font_primary)',
                  }}
                >
                  {page.label}
                </button>
              ))}
              <button className="m8-p6" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px',
                borderRadius: 'var(--m8-radius-md)',
                border: '1px solid rgba(18,24,43,0.12)',
                background: '#FFFFFF',
                color: 'var(--color_text)',
                cursor: 'pointer',
                fontFamily: 'var(--font_primary)',
              }}>
                Select Sub Brand
                <ChevronDown size={12} style={{ color: 'rgba(18,24,43,0.35)' }} />
              </button>
              <button className="m8-p6" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px',
                borderRadius: 'var(--m8-radius-md)',
                border: '1px solid rgba(18,24,43,0.12)',
                background: '#FFFFFF',
                color: 'var(--color_text)',
                cursor: 'pointer',
                fontFamily: 'var(--font_primary)',
              }}>
                Select Panel
                <ChevronDown size={12} style={{ color: 'rgba(18,24,43,0.35)' }} />
              </button>
            </div>
          </div>

          {/* Dashboard Content — scrollable */}
          <div style={{ flex: 1, overflow: 'auto', padding: 24, background: '#F8F9FC' }}>
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
        </div>

        {/* Right: AI Panel — inline, pushes dashboard */}
        <div style={{
          width: panelOpen ? 420 : 0,
          flexShrink: 0,
          borderLeft: panelOpen ? '1px solid rgba(18,24,43,0.08)' : 'none',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: 'calc(100vh - 52px)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <AISummaryPanel
            isOpen={panelOpen}
            onClose={() => setPanelOpen(false)}
            currentPage={currentPage.label}
            currentPageId={currentPageId}
            dateRange={dateRange}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdsPage;
