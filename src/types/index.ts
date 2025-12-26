// Activity Types
export type FunnelStage = 'awareness' | 'consideration' | 'conversion' | 'retention';
export type ActivityStatus = 'idea' | 'draft' | 'ready' | 'scheduled' | 'complete';
export type Platform = 'linkedin' | 'email' | 'instagram' | 'facebook' | 'tiktok' | 'blog' | 'other';

export interface Activity {
  id: string;
  userId: string;
  date: Date;
  title: string;
  content: string;
  funnelStage: FunnelStage;
  platform: Platform;
  contentPillar?: string;
  status: ActivityStatus;
  linkedWeeklyGoalId?: string;
  priorityQuadrant?: 'quick-wins' | 'big-bets' | 'fillers' | 'time-sinks';
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type BusinessType = 'service' | 'product' | 'digital' | 'mixed';
export type BusinessStage = 'starting' | 'growing' | 'established';
export type SubscriptionTier = 'starter' | 'growth' | 'partner';

export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  businessType: BusinessType;
  businessStage: BusinessStage;
  tier: SubscriptionTier;
  createdAt: Date;
  onboardingComplete: boolean;
}

// Strategic Category Types
export type CategoryType =
  | 'customer'
  | 'position'
  | 'messaging'
  | 'voice'
  | 'reality'
  | 'landscape'
  | 'plans';

export type CategoryVersion = 'quick' | 'deep';

export interface StrategicCategory {
  id: string;
  userId: string;
  categoryType: CategoryType;
  version: CategoryVersion;
  data: Record<string, any>;
  completionPercentage: number;
  updatedAt: Date;
}

// Goal Types

// Annual Plan Types (New Strategic Planning)
export type CoreGoalStatus = 'not_started' | 'in_progress' | 'complete';
export type OfferType = 'course' | 'membership' | 'service' | 'product' | 'other';
export type OfferStatus = 'planning' | 'not_started' | 'active';

export interface CoreGoal {
  id: string;
  title: string;
  what: string;
  whyItMatters: string;
  successLooksLike: string;
  status: CoreGoalStatus;
  order: 1 | 2 | 3;
}

export interface Offer {
  id: string;
  name: string;
  type: OfferType;
  launchDate: string;
  price: string;
  status: OfferStatus;
  order: number;
}

export interface NonNegotiable {
  id: string;
  text: string;
  checked: boolean;
}

export interface AnnualPlan {
  id: string;
  userId: string;
  year: number;
  marketingNorthStar: string;
  coreGoals: CoreGoal[];
  nonNegotiables: NonNegotiable[];
  sayingNoTo: string[];
  offers: Offer[];
  createdAt: Date;
  updatedAt: Date;
}

// Legacy Annual Goal (keeping for backwards compatibility)
export interface AnnualGoal {
  id: string;
  userId: string;
  year: number;
  revenueTarget: number;
  linkedinTarget: number;
  emailTarget: number;
  instagramTarget?: number;
  launchesTarget: number;
  topPriority: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuarterlyInitiative {
  id: string;
  quarterlyGoalId: string;
  title: string;
  isComplete: boolean;
  progressPercentage: number;
  order: number;
}

export interface QuarterlyGoal {
  id: string;
  userId: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  theme: string;
  description: string;
  initiatives: QuarterlyInitiative[];
  revenueTarget: number;
  linkedinTarget: number;
  emailTarget: number;
  createdAt: Date;
  updatedAt: Date;
}

export type WeeklyGoalCategory = 'content' | 'engagement' | 'email' | 'business';

export interface WeeklyGoal {
  id: string;
  userId: string;
  weekStartDate: Date;
  category: WeeklyGoalCategory;
  title: string;
  targetCount?: number;
  currentCount: number;
  isComplete: boolean;
  linkedQuarterlyInitiativeId?: string;
  createdAt: Date;
}

// Metric Log Types
export interface MetricLog {
  id: string;
  userId: string;
  weekStartDate: Date;
  linkedinFollowers: number;
  emailSubscribers: number;
  instagramFollowers?: number;
  discoveryCalls: number;
  sales: number;
  revenue: number;
  whatWorked: string;
  whatToDifferently: string;
  createdAt: Date;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  funnelStage: FunnelStage;
  platform: Platform;
  structure: string;
  example: string;
  prompts: string[];
  createdAt: Date;
}

// Funnel Stage Display Info
export interface FunnelStageInfo {
  name: string;
  color: string;
  emoji: string;
  description: string;
}

export const FUNNEL_STAGES: Record<FunnelStage, FunnelStageInfo> = {
  awareness: {
    name: 'Getting Seen',
    color: '#EECE7B',
    emoji: '🟨',
    description: 'Building visibility and attracting attention',
  },
  consideration: {
    name: 'Building Trust',
    color: '#B7D9FF',
    emoji: '🟦',
    description: 'Demonstrating expertise and building relationships',
  },
  conversion: {
    name: 'Making the Ask',
    color: '#B1D1A0',
    emoji: '🟩',
    description: 'Converting attention into action',
  },
  retention: {
    name: 'Keeping Connected',
    color: '#B6BBFB',
    emoji: '🟪',
    description: 'Nurturing relationships and encouraging repeat engagement',
  },
};

// Platform Display Info
export const PLATFORM_INFO: Record<Platform, { name: string; icon: string }> = {
  linkedin: { name: 'LinkedIn', icon: '💼' },
  email: { name: 'Email', icon: '📧' },
  instagram: { name: 'Instagram', icon: '📱' },
  facebook: { name: 'Facebook', icon: '👥' },
  tiktok: { name: 'TikTok', icon: '🎵' },
  blog: { name: 'Blog', icon: '📝' },
  other: { name: 'Other', icon: '📄' },
};
