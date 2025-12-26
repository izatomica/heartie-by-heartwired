# Data Models

## User
```typescript
{
  id: string
  email: string
  name: string
  businessName: string
  businessType: 'service' | 'product' | 'digital' | 'mixed'
  businessStage: 'starting' | 'growing' | 'established'
  tier: 'starter' | 'growth' | 'partner'
  createdAt: Date
  onboardingComplete: boolean
}
```

## StrategicCategory
```typescript
{
  id: string
  userId: string
  categoryType: 'customer' | 'position' | 'messaging' | 'voice' | 'reality' | 'landscape' | 'plans'
  version: 'quick' | 'deep'
  data: Record<string, any>
  completionPercentage: number
  updatedAt: Date
}
```

## Activity
```typescript
{
  id: string
  userId: string
  date: Date
  title: string
  content: string
  funnelStage: 'awareness' | 'consideration' | 'conversion' | 'retention'
  platform: 'linkedin' | 'email' | 'instagram' | 'facebook' | 'tiktok' | 'blog' | 'other'
  contentPillar: string
  status: 'idea' | 'draft' | 'ready' | 'scheduled' | 'complete'
  linkedWeeklyGoalId?: string  // Optional link to weekly goal
  priorityQuadrant?: 'quick-wins' | 'big-bets' | 'fillers' | 'time-sinks'
  createdAt: Date
  updatedAt: Date
}
```

## MetricLog
```typescript
{
  id: string
  userId: string
  weekStartDate: Date
  linkedinFollowers: number
  emailSubscribers: number
  instagramFollowers?: number
  discoveryCalls: number
  sales: number
  revenue: number
  whatWorked: string
  whatToDifferently: string
  createdAt: Date
}
```

## AnnualGoal
```typescript
{
  id: string
  userId: string
  year: number
  revenueTarget: number
  linkedinTarget: number
  emailTarget: number
  instagramTarget?: number
  launchesTarget: number
  topPriority: string
  createdAt: Date
  updatedAt: Date
}
```

## QuarterlyGoal
```typescript
{
  id: string
  userId: string
  year: number
  quarter: 1 | 2 | 3 | 4
  theme: string
  description: string
  initiatives: QuarterlyInitiative[]
  revenueTarget: number
  linkedinTarget: number
  emailTarget: number
  createdAt: Date
  updatedAt: Date
}
```

## QuarterlyInitiative
```typescript
{
  id: string
  quarterlyGoalId: string
  title: string
  isComplete: boolean
  progressPercentage: number
  order: number
}
```

## WeeklyGoal
```typescript
{
  id: string
  userId: string
  weekStartDate: Date
  category: 'content' | 'engagement' | 'email' | 'business'
  title: string
  targetCount?: number
  currentCount: number
  isComplete: boolean
  linkedQuarterlyInitiativeId?: string
  createdAt: Date
}
```

## ActivityPriority
```typescript
{
  id: string
  activityId: string
  quadrant: 'quick-wins' | 'big-bets' | 'fillers' | 'time-sinks' | 'unprioritized'
  updatedAt: Date
}
```
