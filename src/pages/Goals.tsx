import { useState } from 'react';
import { Card, Modal, Input, Button, Textarea } from '../components/ui';
import type { QuarterlyInitiative, WeeklyGoal, WeeklyGoalCategory } from '../types';

type GoalTab = 'annual' | 'quarterly' | 'weekly';

// Extended types with current values
interface AnnualGoalData {
  revenueTarget: number;
  revenueCurrent: number;
  linkedinTarget: number;
  linkedinCurrent: number;
  emailTarget: number;
  emailCurrent: number;
  launchesTarget: number;
  launchesCurrent: number;
  topPriority: string;
}

interface QuarterlyGoalData {
  theme: string;
  description: string;
  revenueTarget: number;
  revenueCurrent: number;
  linkedinTarget: number;
  linkedinCurrent: number;
  emailTarget: number;
  emailCurrent: number;
  initiatives: QuarterlyInitiative[];
}

// Initial data
const initialAnnualGoal: AnnualGoalData = {
  revenueTarget: 150000,
  revenueCurrent: 8200,
  linkedinTarget: 5000,
  linkedinCurrent: 2847,
  emailTarget: 2000,
  emailCurrent: 412,
  launchesTarget: 3,
  launchesCurrent: 0,
  topPriority: 'Build consistent visibility on LinkedIn to drive discovery calls for 1:1 coaching',
};

const initialQuarterlyGoal: QuarterlyGoalData = {
  theme: 'Foundation',
  description: 'Build consistent visibility and grow email list to prepare for Q2 course launch',
  revenueTarget: 12500,
  revenueCurrent: 8200,
  linkedinTarget: 500,
  linkedinCurrent: 247,
  emailTarget: 200,
  emailCurrent: 89,
  initiatives: [
    { id: 'init-1', quarterlyGoalId: 'q1-2026', title: 'Post 3x/week on LinkedIn consistently', isComplete: false, progressPercentage: 67, order: 1 },
    { id: 'init-2', quarterlyGoalId: 'q1-2026', title: 'Create lead magnet and welcome sequence', isComplete: false, progressPercentage: 0, order: 2 },
    { id: 'init-3', quarterlyGoalId: 'q1-2026', title: 'Grow email list to 1,000 subscribers', isComplete: false, progressPercentage: 41, order: 3 },
    { id: 'init-4', quarterlyGoalId: 'q1-2026', title: 'Book 10 discovery calls', isComplete: false, progressPercentage: 30, order: 4 },
  ],
};

const initialWeeklyGoals: WeeklyGoal[] = [
  { id: 'wg-1', userId: 'user-1', weekStartDate: new Date(), category: 'content', title: 'LinkedIn post #1 (Monday)', targetCount: 1, currentCount: 1, isComplete: true, createdAt: new Date() },
  { id: 'wg-2', userId: 'user-1', weekStartDate: new Date(), category: 'content', title: 'LinkedIn post #2 (Wednesday)', targetCount: 1, currentCount: 1, isComplete: true, createdAt: new Date() },
  { id: 'wg-3', userId: 'user-1', weekStartDate: new Date(), category: 'content', title: 'LinkedIn post #3 (Friday)', targetCount: 1, currentCount: 1, isComplete: true, createdAt: new Date() },
  { id: 'wg-4', userId: 'user-1', weekStartDate: new Date(), category: 'engagement', title: 'Comment on 25 posts this week', targetCount: 25, currentCount: 28, isComplete: true, createdAt: new Date() },
  { id: 'wg-5', userId: 'user-1', weekStartDate: new Date(), category: 'engagement', title: 'Reply to all DMs within 24 hours', targetCount: 1, currentCount: 1, isComplete: true, createdAt: new Date() },
  { id: 'wg-6', userId: 'user-1', weekStartDate: new Date(), category: 'engagement', title: 'Connect with 5 new ideal clients', targetCount: 5, currentCount: 3, isComplete: false, createdAt: new Date() },
  { id: 'wg-7', userId: 'user-1', weekStartDate: new Date(), category: 'email', title: 'Send weekly newsletter (Tuesday)', targetCount: 1, currentCount: 0, isComplete: false, createdAt: new Date() },
  { id: 'wg-8', userId: 'user-1', weekStartDate: new Date(), category: 'business', title: 'Book 2 discovery calls', targetCount: 2, currentCount: 2, isComplete: true, createdAt: new Date() },
  { id: 'wg-9', userId: 'user-1', weekStartDate: new Date(), category: 'business', title: 'Follow up with 3 warm leads', targetCount: 3, currentCount: 1, isComplete: false, createdAt: new Date() },
];

const categoryIcons: Record<WeeklyGoalCategory, string> = {
  content: '📝',
  engagement: '🤝',
  email: '📧',
  business: '🎯',
};

const categoryLabels: Record<WeeklyGoalCategory, string> = {
  content: 'CONTENT GOALS',
  engagement: 'ENGAGEMENT GOALS',
  email: 'EMAIL GOALS',
  business: 'BUSINESS GOALS',
};

export function Goals() {
  const [activeTab, setActiveTab] = useState<GoalTab>('annual');

  // Goals state
  const [annualGoal, setAnnualGoal] = useState<AnnualGoalData>(initialAnnualGoal);
  const [quarterlyGoal, setQuarterlyGoal] = useState<QuarterlyGoalData>(initialQuarterlyGoal);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(initialWeeklyGoals);

  // Modal states
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [isQuarterlyModalOpen, setIsQuarterlyModalOpen] = useState(false);
  const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
  const [editingWeeklyGoal, setEditingWeeklyGoal] = useState<WeeklyGoal | null>(null);

  // Form states
  const [annualForm, setAnnualForm] = useState<AnnualGoalData>(initialAnnualGoal);
  const [quarterlyForm, setQuarterlyForm] = useState<QuarterlyGoalData>(initialQuarterlyGoal);
  const [weeklyForm, setWeeklyForm] = useState({
    title: '',
    category: 'content' as WeeklyGoalCategory,
    targetCount: 1,
    currentCount: 0,
  });

  // Annual goal handlers
  const handleOpenAnnualModal = () => {
    setAnnualForm({ ...annualGoal });
    setIsAnnualModalOpen(true);
  };

  const handleSaveAnnualGoal = () => {
    setAnnualGoal({ ...annualForm });
    setIsAnnualModalOpen(false);
  };

  // Quarterly goal handlers
  const handleOpenQuarterlyModal = () => {
    setQuarterlyForm({
      ...quarterlyGoal,
      initiatives: quarterlyGoal.initiatives.map(i => ({ ...i })),
    });
    setIsQuarterlyModalOpen(true);
  };

  const handleSaveQuarterlyGoal = () => {
    setQuarterlyGoal({ ...quarterlyForm });
    setIsQuarterlyModalOpen(false);
  };

  const handleUpdateInitiative = (index: number, field: keyof QuarterlyInitiative, value: string | number | boolean) => {
    const newInitiatives = [...quarterlyForm.initiatives];
    newInitiatives[index] = { ...newInitiatives[index], [field]: value };
    setQuarterlyForm(prev => ({ ...prev, initiatives: newInitiatives }));
  };

  const handleAddInitiative = () => {
    const newInitiative: QuarterlyInitiative = {
      id: `init-${Date.now()}`,
      quarterlyGoalId: 'q1-2026',
      title: '',
      isComplete: false,
      progressPercentage: 0,
      order: quarterlyForm.initiatives.length + 1,
    };
    setQuarterlyForm(prev => ({ ...prev, initiatives: [...prev.initiatives, newInitiative] }));
  };

  const handleRemoveInitiative = (index: number) => {
    setQuarterlyForm(prev => ({
      ...prev,
      initiatives: prev.initiatives.filter((_, i) => i !== index),
    }));
  };

  // Weekly goal handlers
  const handleOpenWeeklyModal = (goal?: WeeklyGoal) => {
    if (goal) {
      setEditingWeeklyGoal(goal);
      setWeeklyForm({
        title: goal.title,
        category: goal.category,
        targetCount: goal.targetCount || 1,
        currentCount: goal.currentCount,
      });
    } else {
      setEditingWeeklyGoal(null);
      setWeeklyForm({
        title: '',
        category: 'content',
        targetCount: 1,
        currentCount: 0,
      });
    }
    setIsWeeklyModalOpen(true);
  };

  const handleSaveWeeklyGoal = () => {
    if (editingWeeklyGoal) {
      setWeeklyGoals(prev => prev.map(g =>
        g.id === editingWeeklyGoal.id
          ? { ...g, ...weeklyForm, isComplete: weeklyForm.currentCount >= weeklyForm.targetCount }
          : g
      ));
    } else if (weeklyForm.title.trim()) {
      const newGoal: WeeklyGoal = {
        id: `wg-${Date.now()}`,
        userId: 'user-1',
        weekStartDate: new Date(),
        ...weeklyForm,
        isComplete: weeklyForm.currentCount >= weeklyForm.targetCount,
        createdAt: new Date(),
      };
      setWeeklyGoals(prev => [...prev, newGoal]);
    }
    setIsWeeklyModalOpen(false);
    setEditingWeeklyGoal(null);
  };

  const handleDeleteWeeklyGoal = () => {
    if (editingWeeklyGoal) {
      setWeeklyGoals(prev => prev.filter(g => g.id !== editingWeeklyGoal.id));
      setIsWeeklyModalOpen(false);
      setEditingWeeklyGoal(null);
    }
  };

  const handleToggleWeeklyGoal = (id: string) => {
    setWeeklyGoals(prev => prev.map(g =>
      g.id === id
        ? { ...g, isComplete: !g.isComplete, currentCount: !g.isComplete ? (g.targetCount || 1) : 0 }
        : g
    ));
  };

  // Helper functions
  const getProgressPercentage = (current: number, target: number) =>
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  const getWeeklyGoalsByCategory = (category: WeeklyGoalCategory) =>
    weeklyGoals.filter(g => g.category === category);

  const getCategoryStats = (category: WeeklyGoalCategory) => {
    const goals = getWeeklyGoalsByCategory(category);
    const completed = goals.filter(g => g.isComplete).length;
    return { completed, total: goals.length };
  };

  const getTotalWeeklyStats = () => {
    const completed = weeklyGoals.filter(g => g.isComplete).length;
    return {
      completed,
      total: weeklyGoals.length,
      percentage: weeklyGoals.length > 0 ? Math.round((completed / weeklyGoals.length) * 100) : 0,
    };
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US').format(num);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
            Goals
          </h1>
          <p className="text-text-secondary">
            What you are working toward.
          </p>
        </div>
        {activeTab === 'annual' && (
          <Button variant="secondary" onClick={handleOpenAnnualModal}>Edit Goals</Button>
        )}
        {activeTab === 'quarterly' && (
          <Button variant="secondary" onClick={handleOpenQuarterlyModal}>Edit Quarter</Button>
        )}
        {activeTab === 'weekly' && (
          <Button variant="secondary" onClick={() => handleOpenWeeklyModal()}>Add Goal</Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('annual')}
          className={activeTab === 'annual' ? 'tab-active' : 'tab-inactive'}
        >
          Annual
        </button>
        <button
          onClick={() => setActiveTab('quarterly')}
          className={activeTab === 'quarterly' ? 'tab-active' : 'tab-inactive'}
        >
          Q1 2026
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={activeTab === 'weekly' ? 'tab-active' : 'tab-inactive'}
        >
          This Week
        </button>
      </div>

      {/* Annual Goals View */}
      {activeTab === 'annual' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💰</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">REVENUE</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(annualGoal.revenueTarget)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(annualGoal.revenueCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(annualGoal.revenueCurrent, annualGoal.revenueTarget)}%` }} />
                </div>
                <div className="text-sm text-text-muted">
                  {getProgressPercentage(annualGoal.revenueCurrent, annualGoal.revenueTarget)}% of target
                </div>
              </div>
            </Card>

            {/* LinkedIn Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📈</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">LINKEDIN</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">{formatNumber(annualGoal.linkedinTarget)} followers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">{formatNumber(annualGoal.linkedinCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(annualGoal.linkedinCurrent, annualGoal.linkedinTarget)}%` }} />
                </div>
                <div className="text-sm text-text-muted">
                  {getProgressPercentage(annualGoal.linkedinCurrent, annualGoal.linkedinTarget)}% of target
                </div>
              </div>
            </Card>

            {/* Email Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📧</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">EMAIL LIST</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">{formatNumber(annualGoal.emailTarget)} subscribers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">{formatNumber(annualGoal.emailCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(annualGoal.emailCurrent, annualGoal.emailTarget)}%` }} />
                </div>
                <div className="text-sm text-text-muted">
                  {getProgressPercentage(annualGoal.emailCurrent, annualGoal.emailTarget)}% of target
                </div>
              </div>
            </Card>

            {/* Launches Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">LAUNCHES</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">{annualGoal.launchesTarget} offers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">{annualGoal.launchesCurrent}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(annualGoal.launchesCurrent, annualGoal.launchesTarget)}%` }} />
                </div>
                <div className="text-sm text-text-muted">
                  {getProgressPercentage(annualGoal.launchesCurrent, annualGoal.launchesTarget)}% of target
                </div>
              </div>
            </Card>
          </div>

          {/* #1 Priority */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">#1 PRIORITY THIS YEAR</h2>
            </div>
            <p className="text-text-primary text-lg">"{annualGoal.topPriority}"</p>
          </Card>

          {/* Quarterly Overview */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📅</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">QUARTERLY OVERVIEW</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border-2 border-dusty-pink bg-dusty-pink-light">
                <div className="font-headline font-semibold text-sm mb-2">Q1: {quarterlyGoal.theme}</div>
                <div className="text-xs text-text-secondary mb-2">Build audience</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '75%' }} />
                </div>
                <div className="text-xs text-dusty-pink font-medium">In progress</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q2: Launch</div>
                <div className="text-xs text-text-secondary mb-2">Course launch</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }} />
                </div>
                <div className="text-xs text-text-muted">Upcoming</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q3: Scale</div>
                <div className="text-xs text-text-secondary mb-2">Ads + growth</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }} />
                </div>
                <div className="text-xs text-text-muted">Upcoming</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q4: Optimize</div>
                <div className="text-xs text-text-secondary mb-2">Review</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }} />
                </div>
                <div className="text-xs text-text-muted">Upcoming</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quarterly Goals View */}
      {activeTab === 'quarterly' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-headline font-bold text-text-primary">
              Q1 2026: {quarterlyGoal.theme.toUpperCase()}
            </h2>
            <p className="text-text-secondary">January - March</p>
          </div>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">QUARTERLY THEME</h2>
            </div>
            <p className="text-text-primary text-lg">"{quarterlyGoal.description}"</p>
          </Card>

          <div>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">KEY INITIATIVES</h3>
            <div className="space-y-3">
              {quarterlyGoal.initiatives.map((initiative) => (
                <Card key={initiative.id} padding="md">
                  <div className="flex items-start gap-3">
                    <span className={initiative.progressPercentage >= 100 ? 'text-success text-xl' : 'text-text-muted text-xl'}>
                      {initiative.progressPercentage >= 100 ? '✓' : '○'}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary mb-2">{initiative.title}</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${initiative.progressPercentage}%` }} />
                          </div>
                        </div>
                        <span className="text-sm text-text-muted">
                          {initiative.progressPercentage === 0 ? 'Not started' : `${initiative.progressPercentage}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">QUARTERLY METRICS TARGET</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Revenue: {formatCurrency(quarterlyGoal.revenueTarget)}</span>
                  <span className="text-sm font-medium text-text-primary">Current: {formatCurrency(quarterlyGoal.revenueCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(quarterlyGoal.revenueCurrent, quarterlyGoal.revenueTarget)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">LinkedIn: +{formatNumber(quarterlyGoal.linkedinTarget)} followers</span>
                  <span className="text-sm font-medium text-text-primary">Current: +{formatNumber(quarterlyGoal.linkedinCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(quarterlyGoal.linkedinCurrent, quarterlyGoal.linkedinTarget)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Email: +{formatNumber(quarterlyGoal.emailTarget)} subscribers</span>
                  <span className="text-sm font-medium text-text-primary">Current: +{formatNumber(quarterlyGoal.emailCurrent)}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercentage(quarterlyGoal.emailCurrent, quarterlyGoal.emailTarget)}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Weekly Goals View */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-headline font-bold text-text-primary">THIS WEEK: Dec 23-29</h2>
            <p className="text-text-secondary">How this week supports Q1 goals</p>
          </div>

          <Card padding="md">
            <p className="text-text-secondary italic">"{quarterlyGoal.initiatives[0]?.title || 'Set your quarterly initiative'}"</p>
          </Card>

          {(['content', 'engagement', 'email', 'business'] as WeeklyGoalCategory[]).map((category) => {
            const goals = getWeeklyGoalsByCategory(category);
            const stats = getCategoryStats(category);
            if (goals.length === 0) return null;

            return (
              <Card key={category}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <h3 className="text-lg font-headline font-semibold text-text-primary">{categoryLabels[category]}</h3>
                  </div>
                  <span className={`text-sm font-medium ${stats.completed === stats.total ? 'text-success' : 'text-text-primary'}`}>
                    {stats.completed}/{stats.total} Complete
                  </span>
                </div>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center gap-3 group">
                      <button
                        onClick={() => handleToggleWeeklyGoal(goal.id)}
                        className={goal.isComplete ? 'text-success' : 'text-text-muted hover:text-text-primary'}
                      >
                        {goal.isComplete ? '✓' : '○'}
                      </button>
                      <span
                        className="text-text-primary flex-1 cursor-pointer hover:text-burgundy"
                        onClick={() => handleOpenWeeklyModal(goal)}
                      >
                        {goal.title}
                      </span>
                      <span className={`text-sm ${goal.isComplete ? 'text-success' : 'text-text-muted'}`}>
                        {goal.isComplete
                          ? 'Done'
                          : goal.targetCount && goal.targetCount > 1
                            ? `${goal.currentCount}/${goal.targetCount}`
                            : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}

          {/* Week Score */}
          <Card>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">WEEK SCORE</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary">{getTotalWeeklyStats().completed}/{getTotalWeeklyStats().total} goals complete</span>
              <span className="text-text-primary font-semibold">{getTotalWeeklyStats().percentage}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getTotalWeeklyStats().percentage}%` }} />
            </div>
            <div className="mt-4 p-3 bg-info-light rounded-lg">
              <p className="text-sm text-info">
                💡 Heartie: "Great progress! You are building momentum. Keep up the great work!"
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Annual Goals Edit Modal */}
      <Modal isOpen={isAnnualModalOpen} onClose={() => setIsAnnualModalOpen(false)} title="Edit Annual Goals" size="lg">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Target ($)</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.revenueTarget}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, revenueTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Current ($)</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.revenueCurrent}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, revenueCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Target (followers)</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.linkedinTarget}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, linkedinTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Current</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.linkedinCurrent}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, linkedinCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email List Target</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.emailTarget}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, emailTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email List Current</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.emailCurrent}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, emailCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Launches Target</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.launchesTarget}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, launchesTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Launches Current</label>
              <input
                type="number"
                className="input w-full"
                value={annualForm.launchesCurrent}
                onChange={(e) => setAnnualForm(prev => ({ ...prev, launchesCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">#1 Priority This Year</label>
            <Textarea
              value={annualForm.topPriority}
              onChange={(e) => setAnnualForm(prev => ({ ...prev, topPriority: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setIsAnnualModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAnnualGoal}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Quarterly Goals Edit Modal */}
      <Modal isOpen={isQuarterlyModalOpen} onClose={() => setIsQuarterlyModalOpen(false)} title="Edit Q1 Goals" size="lg">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Quarter Theme</label>
              <Input
                value={quarterlyForm.theme}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, theme: e.target.value }))}
                placeholder="e.g., Foundation, Launch, Scale"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <Textarea
              value={quarterlyForm.description}
              onChange={(e) => setQuarterlyForm(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Target ($)</label>
              <Input
                type="number"
                value={quarterlyForm.revenueTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, revenueTarget: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Current ($)</label>
              <Input
                type="number"
                value={quarterlyForm.revenueCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, revenueCurrent: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Growth Target</label>
              <Input
                type="number"
                value={quarterlyForm.linkedinTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, linkedinTarget: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Growth Current</label>
              <Input
                type="number"
                value={quarterlyForm.linkedinCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, linkedinCurrent: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Growth Target</label>
              <Input
                type="number"
                value={quarterlyForm.emailTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, emailTarget: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Growth Current</label>
              <Input
                type="number"
                value={quarterlyForm.emailCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, emailCurrent: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-text-primary">Key Initiatives</label>
              <Button variant="secondary" onClick={handleAddInitiative}>+ Add Initiative</Button>
            </div>
            <div className="space-y-3">
              {quarterlyForm.initiatives.map((initiative, index) => (
                <div key={initiative.id} className="flex gap-3 items-start p-3 bg-cream rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={initiative.title}
                      onChange={(e) => handleUpdateInitiative(index, 'title', e.target.value)}
                      placeholder="Initiative title"
                    />
                    <div className="flex gap-2 items-center">
                      <label className="text-xs text-text-muted">Progress %</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={initiative.progressPercentage}
                        onChange={(e) => handleUpdateInitiative(index, 'progressPercentage', Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveInitiative(index)}
                    className="text-text-muted hover:text-error p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 sticky bottom-0 bg-white pb-2">
            <Button variant="secondary" onClick={() => setIsQuarterlyModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveQuarterlyGoal}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Weekly Goal Edit Modal */}
      <Modal
        isOpen={isWeeklyModalOpen}
        onClose={() => { setIsWeeklyModalOpen(false); setEditingWeeklyGoal(null); }}
        title={editingWeeklyGoal ? 'Edit Weekly Goal' : 'Add Weekly Goal'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Goal Title</label>
            <Input
              value={weeklyForm.title}
              onChange={(e) => setWeeklyForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Post on LinkedIn 3x"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
            <select
              value={weeklyForm.category}
              onChange={(e) => setWeeklyForm(prev => ({ ...prev, category: e.target.value as WeeklyGoalCategory }))}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
            >
              <option value="content">Content</option>
              <option value="engagement">Engagement</option>
              <option value="email">Email</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Target Count</label>
              <Input
                type="number"
                min="1"
                value={weeklyForm.targetCount}
                onChange={(e) => setWeeklyForm(prev => ({ ...prev, targetCount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Current Count</label>
              <Input
                type="number"
                min="0"
                value={weeklyForm.currentCount}
                onChange={(e) => setWeeklyForm(prev => ({ ...prev, currentCount: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-between pt-4">
            <div>
              {editingWeeklyGoal && (
                <Button variant="secondary" onClick={handleDeleteWeeklyGoal} className="text-error hover:bg-error/10">
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => { setIsWeeklyModalOpen(false); setEditingWeeklyGoal(null); }}>
                Cancel
              </Button>
              <Button onClick={handleSaveWeeklyGoal}>
                {editingWeeklyGoal ? 'Save Changes' : 'Add Goal'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
