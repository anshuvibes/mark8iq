export interface Halt {
  id: string;
  statement: string;
}

export interface Suggestion {
  id: string;
  question: string;
}

export interface AIResponse {
  insights: string;
  rootCause: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  type: 'context-pill' | 'user-bubble' | 'ai-response' | 'loading' | 'error' | 'divider' | 'date-separator' | 'insights-list';
  pillVariant?: 'halt' | 'suggestion';
  pillText?: string;
  userText?: string;
  aiResponse?: AIResponse;
  errorPersistent?: boolean;
  dividerPage?: string;
  date?: string;
  sessionContext?: string;
  insightsList?: Halt[];
}

export const mockHalts: Halt[] = [
  { id: 'h1', statement: '10 best-selling campaigns have gone out of budget' },
  { id: 'h2', statement: '3 campaigns with strong ACoS are under-spending' },
  { id: 'h3', statement: 'Home & Kitchen CTR dropped 61% vs comparison period' },
  { id: 'h4', statement: 'Ad Spend utilisation is below 45% across 6 campaigns' },
  { id: 'h5', statement: 'Beauty category ROAS declined 28% week-over-week' },
];

export const mockSuggestions: Suggestion[] = [
  { id: 's1', question: 'Which campaigns are spending budget without converting?' },
  { id: 's2', question: 'Why has ACoS increased for Home & Kitchen this week?' },
  { id: 's3', question: 'Which ASINs have the highest spend but lowest ROAS?' },
];

export const mockResponses: Record<string, AIResponse> = {
  h1: {
    insights: '10 of your top-performing campaigns by Ad Sales have exhausted their daily budget. This accounts for ₹2.4L in unrealised ad spend over the selected period.',
    rootCause: 'Budget caps were set during a lower-traffic period and have not been revised. These campaigns are hitting their limit before peak traffic hours (2 PM – 8 PM), resulting in impression drop-off.',
    recommendations: [
      'Increase daily budget by 20–30% for the top 5 impacted campaigns.',
      'Enable budget rules to auto-scale during peak hours.',
      'Review shared budget pools — 3 campaigns are sharing a pool that is undersized for current demand.',
    ],
  },
  h2: {
    insights: '3 campaigns in Electronics and Home & Kitchen have ACoS below 12% but are spending less than 40% of their allocated budget. Estimated missed revenue: ₹1.8L.',
    rootCause: 'These campaigns have conservative bid strategies that are not competitive enough to win impressions during high-traffic slots. Bids are 15–25% below the category average.',
    recommendations: [
      'Raise bids by 15–20% on the 3 under-spending campaigns.',
      'Switch bid strategy from "Fixed" to "Dynamic — Up and Down" for these campaigns.',
      'Monitor impression share over the next 48 hours to confirm recovery.',
    ],
  },
  h3: {
    insights: 'Home & Kitchen CTR has dropped from 0.42% to 0.16% compared to the previous period. This decline is concentrated in 4 campaigns targeting "kitchen organiser" and "storage solutions" keywords.',
    rootCause: 'Competitor ad creatives in this category have been refreshed with lifestyle imagery and video. Your campaigns are still running static product images from Q1. Additionally, 2 of the 4 campaigns have stale headlines.',
    recommendations: [
      'Refresh ad creatives with lifestyle and contextual imagery for the 4 impacted campaigns.',
      'A/B test video ads vs static images on the top 2 campaigns.',
      'Update headlines to include seasonal and benefit-driven copy.',
    ],
  },
  h4: {
    insights: '6 campaigns across 3 categories are utilising less than 45% of their allocated ad spend. Combined unspent budget: ₹3.1L over the past 14 days.',
    rootCause: 'Targeting is too narrow — these campaigns are restricted to exact-match keywords with low search volume. Additionally, 2 campaigns have dayparting rules that exclude evening hours when traffic peaks.',
    recommendations: [
      'Expand keyword match types from exact to phrase match on the 4 narrowest campaigns.',
      'Remove or extend dayparting windows to include 6 PM – 11 PM.',
      'Add 10–15 broad match keywords with negative keyword guardrails.',
    ],
  },
  h5: {
    insights: 'Beauty category ROAS has declined from 4.2x to 3.0x week-over-week. The decline is driven by 3 campaigns where cost-per-click has increased by 35% without a corresponding lift in conversion rate.',
    rootCause: 'Increased competition from new entrants running aggressive launch campaigns. Your bids have remained static while auction pressure has risen.',
    recommendations: [
      'Reduce bids by 10% on non-converting keywords in the 3 affected campaigns.',
      'Shift 20% of budget to Sponsored Display retargeting for higher-intent audiences.',
      'Review and pause keywords with CPC above ₹15 and zero conversions in the last 7 days.',
    ],
  },
  s1: {
    insights: '7 campaigns have spent a combined ₹4.6L in the selected period with zero attributed conversions. These campaigns are concentrated in the "Electronics — Accessories" and "Home Décor" categories.',
    rootCause: 'Product detail pages for the advertised ASINs have low content scores (below 60/100). Missing A+ content, poor image quality, and no reviews are causing high bounce rates post-click.',
    recommendations: [
      'Pause the 3 highest-spending zero-conversion campaigns immediately.',
      'Improve product detail page content scores to above 80 before reactivating ads.',
      'Redirect saved budget to campaigns with proven conversion rates above 2%.',
    ],
  },
  s2: {
    insights: 'ACoS for Home & Kitchen has increased from 18% to 31% this week. The spike is driven by 2 Sponsored Products campaigns where CPC has risen 40% while conversion rate has dropped 22%.',
    rootCause: 'A flash sale by a competing brand has temporarily inflated auction prices in this category. Your campaigns continued to bid at previous levels, winning impressions at a higher cost without incremental conversions.',
    recommendations: [
      'Temporarily reduce bids by 15% on the 2 affected campaigns until auction prices normalise.',
      'Set up automated rules to cap CPC at ₹12 for this category.',
      'Shift 30% of budget to Sponsored Brands where competition is lower.',
    ],
  },
  s3: {
    insights: '5 ASINs account for 38% of total ad spend but only 8% of attributed sales. The worst performer is ASIN B09XYZ with ₹1.2L spend and ₹18K sales (ROAS: 0.15x).',
    rootCause: 'These ASINs are in highly competitive sub-categories where organic rankings are low (page 3+). Ads are driving clicks but the products lack reviews (avg 12 reviews vs category avg of 200+), resulting in poor conversion.',
    recommendations: [
      'Reduce ad spend on the bottom 3 ASINs by 50% and reallocate to top-performing ASINs.',
      'Enrol the 5 ASINs in the Vine review programme to build social proof.',
      'Consider defensive-only bidding (brand keywords) for these ASINs until review counts exceed 50.',
    ],
  },
  generic: {
    insights: 'Based on the current filters and date range, your campaign portfolio shows mixed performance. Overall ROAS is 3.1x with 12 campaigns above target and 8 below.',
    rootCause: 'Under-performing campaigns share common traits: narrow targeting, stale creatives (older than 30 days), and bid strategies that have not been adjusted for recent auction dynamics.',
    recommendations: [
      'Review and refresh creatives on campaigns older than 30 days.',
      'Expand targeting on campaigns with impression share below 20%.',
      'Set up weekly automated performance reviews to catch declines earlier.',
    ],
  },
};

export const mockPreviousSession: ChatMessage[] = [
  {
    id: 'prev-date',
    type: 'date-separator',
    date: '12 Apr 2026',
    sessionContext: 'Targeting Analysis  ·  04 Jun – 04 Dec 2026',
  },
  {
    id: 'prev-1',
    type: 'context-pill',
    pillVariant: 'suggestion',
    pillText: 'Which campaigns are spending budget without converting?',
  },
  {
    id: 'prev-2',
    type: 'ai-response',
    aiResponse: mockResponses.s1,
  },
  {
    id: 'prev-3',
    type: 'user-bubble',
    userText: 'What about the Home Décor campaigns specifically?',
  },
  {
    id: 'prev-4',
    type: 'ai-response',
    aiResponse: {
      insights: 'Home Décor has 3 active campaigns with a combined spend of ₹2.1L and 0 conversions. The primary driver is the "Wall Art — Premium" campaign which alone accounts for ₹1.4L in spend.',
      rootCause: 'The targeted audience segment (25–34, Tier 1 cities) has high click-through but the product pricing is 40% above the category average, creating a conversion barrier.',
      recommendations: [
        'Test a 15% price reduction on the top ASIN to measure conversion lift.',
        'Create a separate campaign targeting deal-seekers with coupon-enabled ads.',
        'Pause the "Wall Art — Premium" campaign and reallocate budget to "Wall Art — Essentials" which has 2.8x ROAS.',
      ],
    },
  },
];

export const dashboardPages = [
  { id: 'targeting', label: 'Targeting Analysis' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'placement', label: 'Placement' },
] as const;

export type DashboardPageId = typeof dashboardPages[number]['id'];
