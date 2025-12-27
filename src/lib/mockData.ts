import type { Activity, User, WeeklyGoal, Campaign } from '../types';

// Mock User
export const mockUser: User = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'Sarah',
  businessName: 'Coaching by Sarah',
  businessType: 'service',
  businessStage: 'growing',
  tier: 'growth',
  createdAt: new Date('2024-01-15'),
  onboardingComplete: true,
};

// Helper to get date for current week
const getDateInCurrentWeek = (dayOffset: number): Date => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
  monday.setHours(0, 0, 0, 0);

  const targetDate = new Date(monday);
  targetDate.setDate(monday.getDate() + dayOffset);
  return targetDate;
};

// Mock Activities
export const mockActivities: Activity[] = [
  // Monday
  {
    id: 'act-1',
    userId: 'user-1',
    date: getDateInCurrentWeek(0), // Monday
    title: 'LinkedIn Post: Behind the Scenes',
    content: 'Share a behind-the-scenes look at how I prepare for coaching sessions...',
    funnelStage: 'awareness',
    platform: 'linkedin',
    contentPillar: 'Behind-the-scenes',
    status: 'complete',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'act-2',
    userId: 'user-1',
    date: getDateInCurrentWeek(0), // Monday
    title: 'Engagement: Comment on 5 posts',
    content: 'Engage with ideal client content on LinkedIn',
    funnelStage: 'consideration',
    platform: 'linkedin',
    status: 'complete',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Tuesday
  {
    id: 'act-3',
    userId: 'user-1',
    date: getDateInCurrentWeek(1), // Tuesday
    title: 'Weekly Newsletter',
    content: 'This week\'s topic: Finding clarity in your marketing...',
    funnelStage: 'consideration',
    platform: 'email',
    contentPillar: 'Education',
    status: 'ready',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Wednesday
  {
    id: 'act-4',
    userId: 'user-1',
    date: getDateInCurrentWeek(2), // Wednesday
    title: 'LinkedIn Post: Client Win',
    content: 'Celebrating a client breakthrough...',
    funnelStage: 'awareness',
    platform: 'linkedin',
    contentPillar: 'Social proof',
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'act-5',
    userId: 'user-1',
    date: getDateInCurrentWeek(2), // Wednesday
    title: 'Engagement: LinkedIn activity',
    content: 'Comment on 5 posts from ideal clients',
    funnelStage: 'consideration',
    platform: 'linkedin',
    status: 'idea',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Thursday
  {
    id: 'act-6',
    userId: 'user-1',
    date: getDateInCurrentWeek(3), // Thursday
    title: 'DM Follow-up',
    content: 'Follow up with 3 warm leads from last week',
    funnelStage: 'conversion',
    platform: 'linkedin',
    status: 'idea',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Friday
  {
    id: 'act-7',
    userId: 'user-1',
    date: getDateInCurrentWeek(4), // Friday
    title: 'LinkedIn Post: Framework Share',
    content: 'Share my 3-step framework for...',
    funnelStage: 'awareness',
    platform: 'linkedin',
    contentPillar: 'Education',
    status: 'idea',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper to get a specific date in the current month
const getDateInCurrentMonth = (day: number): Date => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), day);
};

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    userId: 'user-1',
    name: 'December Glow Campaign',
    startDate: getDateInCurrentMonth(5),
    endDate: getDateInCurrentMonth(29),
    color: '#FBCB6E', // Gold/yellow
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Weekly Goals
export const mockWeeklyGoals: WeeklyGoal[] = [
  {
    id: 'goal-1',
    userId: 'user-1',
    weekStartDate: getDateInCurrentWeek(0),
    category: 'content',
    title: 'Post 3x on LinkedIn',
    targetCount: 3,
    currentCount: 2,
    isComplete: false,
    createdAt: new Date(),
  },
  {
    id: 'goal-2',
    userId: 'user-1',
    weekStartDate: getDateInCurrentWeek(0),
    category: 'engagement',
    title: 'Comment on 25 posts',
    targetCount: 25,
    currentCount: 28,
    isComplete: true,
    createdAt: new Date(),
  },
  {
    id: 'goal-3',
    userId: 'user-1',
    weekStartDate: getDateInCurrentWeek(0),
    category: 'email',
    title: 'Send weekly newsletter',
    targetCount: 1,
    currentCount: 0,
    isComplete: false,
    createdAt: new Date(),
  },
  {
    id: 'goal-4',
    userId: 'user-1',
    weekStartDate: getDateInCurrentWeek(0),
    category: 'business',
    title: 'Book 2 discovery calls',
    targetCount: 2,
    currentCount: 1,
    isComplete: false,
    createdAt: new Date(),
  },
];

// Helper functions
export const getActivitiesForDate = (date: Date): Activity[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return mockActivities.filter((activity) => {
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate.getTime() === targetDate.getTime();
  });
};

export const getActivitiesForWeek = (weekStart: Date): Activity[] => {
  const start = new Date(weekStart);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return mockActivities.filter((activity) => {
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate >= start && activityDate < end;
  });
};

export const getActivityById = (id: string): Activity | undefined => {
  return mockActivities.find((activity) => activity.id === id);
};

// Funnel health calculation
export const calculateFunnelHealth = (activities: Activity[]) => {
  const stageCounts = {
    awareness: 0,
    consideration: 0,
    conversion: 0,
    retention: 0,
  };

  activities.forEach((activity) => {
    stageCounts[activity.funnelStage]++;
  });

  const total = activities.length || 1;

  return {
    awareness: Math.round((stageCounts.awareness / total) * 100),
    consideration: Math.round((stageCounts.consideration / total) * 100),
    conversion: Math.round((stageCounts.conversion / total) * 100),
    retention: Math.round((stageCounts.retention / total) * 100),
  };
};
