import { useState } from 'react';
import { Card } from '../components/ui';
import type { FunnelStage, Platform } from '../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../types';

type TimePeriod = 'week' | 'month' | 'quarter' | 'year';

interface Metric {
  label: string;
  value: number;
  unit: string;
  change: number;
  changeLabel: string;
}

interface PlatformStats {
  platform: Platform;
  posts: number;
  engagement: number;
  reach: number;
  trend: 'up' | 'down' | 'stable';
}

interface ContentPerformance {
  id: string;
  title: string;
  platform: Platform;
  funnelStage: FunnelStage;
  date: string;
  engagement: number;
  reach: number;
  conversions: number;
}

const MOCK_METRICS: Record<TimePeriod, Metric[]> = {
  week: [
    {
      label: 'Total Engagement',
      value: 487,
      unit: 'interactions',
      change: 12.5,
      changeLabel: 'vs last week',
    },
    {
      label: 'Content Reach',
      value: 2847,
      unit: 'people',
      change: 8.3,
      changeLabel: 'vs last week',
    },
    {
      label: 'Conversions',
      value: 23,
      unit: 'leads',
      change: -5.2,
      changeLabel: 'vs last week',
    },
    {
      label: 'Audience Growth',
      value: 156,
      unit: 'followers',
      change: 18.9,
      changeLabel: 'vs last week',
    },
  ],
  month: [
    {
      label: 'Total Engagement',
      value: 1943,
      unit: 'interactions',
      change: 15.7,
      changeLabel: 'vs last month',
    },
    {
      label: 'Content Reach',
      value: 11234,
      unit: 'people',
      change: 22.1,
      changeLabel: 'vs last month',
    },
    {
      label: 'Conversions',
      value: 87,
      unit: 'leads',
      change: 10.3,
      changeLabel: 'vs last month',
    },
    {
      label: 'Audience Growth',
      value: 623,
      unit: 'followers',
      change: 28.4,
      changeLabel: 'vs last month',
    },
  ],
  quarter: [
    {
      label: 'Total Engagement',
      value: 5829,
      unit: 'interactions',
      change: 31.2,
      changeLabel: 'vs last quarter',
    },
    {
      label: 'Content Reach',
      value: 33702,
      unit: 'people',
      change: 45.8,
      changeLabel: 'vs last quarter',
    },
    {
      label: 'Conversions',
      value: 261,
      unit: 'leads',
      change: 18.9,
      changeLabel: 'vs last quarter',
    },
    {
      label: 'Audience Growth',
      value: 1869,
      unit: 'followers',
      change: 52.3,
      changeLabel: 'vs last quarter',
    },
  ],
  year: [
    {
      label: 'Total Engagement',
      value: 23316,
      unit: 'interactions',
      change: 67.4,
      changeLabel: 'vs last year',
    },
    {
      label: 'Content Reach',
      value: 134808,
      unit: 'people',
      change: 89.2,
      changeLabel: 'vs last year',
    },
    {
      label: 'Conversions',
      value: 1044,
      unit: 'leads',
      change: 43.7,
      changeLabel: 'vs last year',
    },
    {
      label: 'Audience Growth',
      value: 7476,
      unit: 'followers',
      change: 124.8,
      changeLabel: 'vs last year',
    },
  ],
};

const PLATFORM_STATS: PlatformStats[] = [
  {
    platform: 'linkedin',
    posts: 18,
    engagement: 287,
    reach: 1543,
    trend: 'up',
  },
  {
    platform: 'email',
    posts: 4,
    engagement: 156,
    reach: 892,
    trend: 'up',
  },
  {
    platform: 'instagram',
    posts: 12,
    engagement: 44,
    reach: 412,
    trend: 'stable',
  },
];

const CONTENT_PERFORMANCE: ContentPerformance[] = [
  {
    id: '1',
    title: '5 mistakes keeping you invisible',
    platform: 'linkedin',
    funnelStage: 'awareness',
    date: '2025-01-20',
    engagement: 87,
    reach: 543,
    conversions: 8,
  },
  {
    id: '2',
    title: "Case study: Sarah's transformation",
    platform: 'linkedin',
    funnelStage: 'consideration',
    date: '2025-01-18',
    engagement: 62,
    reach: 412,
    conversions: 12,
  },
  {
    id: '3',
    title: 'My framework for consistent content',
    platform: 'linkedin',
    funnelStage: 'consideration',
    date: '2025-01-15',
    engagement: 94,
    reach: 687,
    conversions: 15,
  },
  {
    id: '4',
    title: 'Weekly newsletter: Marketing tips',
    platform: 'email',
    funnelStage: 'awareness',
    date: '2025-01-19',
    engagement: 78,
    reach: 412,
    conversions: 3,
  },
  {
    id: '5',
    title: 'Behind the scenes of my business',
    platform: 'instagram',
    funnelStage: 'retention',
    date: '2025-01-17',
    engagement: 23,
    reach: 189,
    conversions: 0,
  },
];

export function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');

  const currentMetrics = MOCK_METRICS[selectedPeriod];

  const funnelDistribution = [
    { stage: 'awareness' as FunnelStage, percentage: 35 },
    { stage: 'consideration' as FunnelStage, percentage: 30 },
    { stage: 'conversion' as FunnelStage, percentage: 20 },
    { stage: 'retention' as FunnelStage, percentage: 15 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-text-primary mb-2">
          Insights & Analytics
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Track your marketing performance and discover what's working.
        </p>
      </div>

      {/* Time Period Selector */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between">
          <p className="text-sm font-medium text-text-primary">Time Period:</p>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            {(['week', 'month', 'quarter', 'year'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedPeriod === period
                    ? 'bg-burgundy text-white'
                    : 'bg-cream-dark text-text-secondary hover:bg-cream'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMetrics.map((metric) => (
          <Card key={metric.label}>
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-secondary">{metric.label}</p>
              <div>
                <div className="text-3xl font-headline font-bold text-text-primary">
                  {metric.value.toLocaleString()}
                </div>
                <p className="text-xs text-text-muted mt-1">{metric.unit}</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.change > 0 ? 'text-success' : metric.change < 0 ? 'text-error' : 'text-text-muted'
                }`}
              >
                {metric.change > 0 ? '↑' : metric.change < 0 ? '↓' : '→'}
                <span>
                  {Math.abs(metric.change)}% {metric.changeLabel}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Platform Performance */}
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-headline font-semibold text-text-primary mb-1">
            Platform Performance
          </h2>
          <p className="text-sm text-text-secondary">Your activity and engagement by platform</p>
        </div>
        <div className="space-y-4">
          {PLATFORM_STATS.map((stat) => {
            const platformInfo = PLATFORM_INFO[stat.platform];
            return (
              <div
                key={stat.platform}
                className="p-4 bg-cream-dark rounded-lg hover:bg-cream transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platformInfo.icon}</span>
                    <div>
                      <h3 className="font-semibold text-text-primary">{platformInfo.name}</h3>
                      <p className="text-xs text-text-muted">{stat.posts} posts this period</p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up'
                        ? 'bg-success-light text-success'
                        : stat.trend === 'down'
                        ? 'bg-error-light text-error'
                        : 'bg-gray-100 text-text-muted'
                    }`}
                  >
                    {stat.trend === 'up' ? '↑ Growing' : stat.trend === 'down' ? '↓ Declining' : '→ Stable'}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Engagement</p>
                    <p className="text-lg font-bold text-text-primary">{stat.engagement}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Reach</p>
                    <p className="text-lg font-bold text-text-primary">{stat.reach.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Funnel Distribution */}
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-headline font-semibold text-text-primary mb-1">
            Funnel Stage Distribution
          </h2>
          <p className="text-sm text-text-secondary">How your content is distributed across the funnel</p>
        </div>
        <div className="space-y-4">
          {funnelDistribution.map(({ stage, percentage }) => {
            const stageInfo = FUNNEL_STAGES[stage];
            return (
              <div key={stage}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{stageInfo.emoji}</span>
                    <span className="text-sm font-medium text-text-primary">{stageInfo.name}</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary">{percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%`, backgroundColor: stageInfo.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        {funnelDistribution.find((d) => d.stage === 'conversion' && d.percentage < 20) && (
          <div className="mt-4 p-3 bg-warning-light rounded-lg">
            <p className="text-sm text-warning">
              ⚠️ Your conversion content is below 20%. Consider creating more offer-focused content.
            </p>
          </div>
        )}
      </Card>

      {/* Top Performing Content */}
      <Card>
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-headline font-semibold text-text-primary mb-1">
            Top Performing Content
          </h2>
          <p className="text-sm text-text-secondary">Your best content from this period</p>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Content</th>
                <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Platform</th>
                <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Stage</th>
                <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Engagement</th>
                <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Reach</th>
                <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-primary">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {CONTENT_PERFORMANCE.map((content) => {
                const platformInfo = PLATFORM_INFO[content.platform];
                const stageInfo = FUNNEL_STAGES[content.funnelStage];
                return (
                  <tr key={content.id} className="border-b border-border hover:bg-cream-dark transition-colors">
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-text-primary">{content.title}</p>
                        <p className="text-xs text-text-muted">{content.date}</p>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="text-xs sm:text-sm">{platformInfo.icon} <span className="hidden sm:inline">{platformInfo.name}</span></span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
                        style={{ backgroundColor: stageInfo.color }}
                      >
                        {stageInfo.emoji} <span className="hidden sm:inline">{stageInfo.name}</span>
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm text-text-primary">{content.engagement}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm text-text-primary">{content.reach}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm font-semibold text-success">
                      {content.conversions}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Key Insights */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">Key Insights</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-success-light rounded-lg">
              <p className="text-sm text-success font-medium mb-1">🎉 Strong LinkedIn Performance</p>
              <p className="text-xs text-text-secondary">
                Your LinkedIn content is driving 59% of total engagement. Keep it up!
              </p>
            </div>
            <div className="p-3 bg-warning-light rounded-lg">
              <p className="text-sm text-warning font-medium mb-1">⚠️ Low Conversion Rate</p>
              <p className="text-xs text-text-secondary">
                Only 20% of your content focuses on conversion. Add more offer-related posts.
              </p>
            </div>
            <div className="p-3 bg-cream-dark rounded-lg">
              <p className="text-sm text-text-primary font-medium mb-1">📈 Growing Audience</p>
              <p className="text-xs text-text-secondary">
                Your audience grew by 18.9% this period. Your awareness content is working!
              </p>
            </div>
          </div>
        </Card>

        {/* Heartie's Recommendations */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌸</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">
              Heartie's Recommendations
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                1. Double down on LinkedIn
              </h3>
              <p className="text-sm text-text-secondary">
                Your LinkedIn posts are 3x more engaging than other platforms. Post 2-3x per week for best results.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                2. Add conversion content
              </h3>
              <p className="text-sm text-text-secondary">
                Balance your funnel by creating 1-2 offer-related posts this week. Check the Templates library for ideas.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                3. Replicate top performers
              </h3>
              <p className="text-sm text-text-secondary">
                Your "framework" posts get the most conversions. Create similar content to build authority.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
