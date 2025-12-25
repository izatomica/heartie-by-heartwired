import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';
import { mockActivities, mockWeeklyGoals, mockUser, calculateFunnelHealth } from '../lib/mockData';
import { FUNNEL_STAGES } from '../types';

export function Dashboard() {
  const weekActivities = useMemo(() => mockActivities, []);
  const funnelHealth = useMemo(() => calculateFunnelHealth(weekActivities), [weekActivities]);

  const todayActivities = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return weekActivities.filter((activity) => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === today.getTime() && activity.status !== 'complete';
    });
  }, [weekActivities]);

  const completedCount = weekActivities.filter((a) => a.status === 'complete').length;
  const remainingCount = weekActivities.filter((a) => a.status !== 'complete').length;

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
              Good morning, {mockUser.name}! 👋
            </h1>
            <p className="text-text-secondary">
              Here's your marketing snapshot.
            </p>
          </div>
          <div className="text-right text-sm text-text-muted">
            {currentDate}
          </div>
        </div>
      </div>

      {/* Row 1: This Week & Funnel Health */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* This Week Card */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📅</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">
              THIS WEEK
            </h2>
          </div>
          <div className="space-y-3 text-text-secondary">
            <div className="flex items-center justify-between">
              <span>📝 {weekActivities.length} activities planned</span>
            </div>
            <div className="flex items-center justify-between">
              <span>✅ {completedCount} completed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>⏳ {remainingCount} remaining</span>
            </div>
          </div>
          <Link to="/calendar" className="block mt-4">
            <button className="text-burgundy font-semibold hover:underline">
              View Calendar →
            </button>
          </Link>
        </Card>

        {/* Funnel Health Card */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">
              FUNNEL HEALTH
            </h2>
          </div>
          <div className="space-y-3">
            {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
              const percentage = funnelHealth[stage as keyof typeof funnelHealth];
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {info.emoji} {info.name}
                    </span>
                    <span className="text-sm text-text-muted">{percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%`, backgroundColor: info.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          {funnelHealth.conversion < 20 && (
            <div className="mt-4 p-3 bg-warning-light rounded-lg">
              <p className="text-sm text-warning">
                ⚠️ Add conversion content to balance your funnel
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Today's Focus */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-headline font-semibold text-text-primary">
            TODAY'S FOCUS
          </h2>
        </div>
        {todayActivities.length > 0 ? (
          <div className="space-y-3">
            {todayActivities.map((activity) => {
              const stageInfo = FUNNEL_STAGES[activity.funnelStage];
              const badgeClass =
                activity.status === 'idea'
                  ? 'badge-idea'
                  : activity.status === 'draft'
                  ? 'badge-draft'
                  : 'badge-ready';

              return (
                <div
                  key={activity.id}
                  className="p-4 bg-white border-l-4 rounded-lg shadow-sm"
                  style={{ borderColor: stageInfo.color }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-1">
                        {activity.title}
                      </h3>
                      {activity.contentPillar && (
                        <p className="text-sm text-text-secondary">
                          Topic: {activity.contentPillar}
                        </p>
                      )}
                      <span className={`${badgeClass} mt-2`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-ghost">Open</button>
                      <button className="btn-primary">Complete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <p>No activities scheduled for today. You're all caught up! ✨</p>
          </div>
        )}
      </Card>

      {/* Weekly Goals */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-headline font-semibold text-text-primary">
            WEEKLY GOALS
          </h2>
        </div>
        <div className="space-y-4">
          {mockWeeklyGoals.map((goal) => {
            const progress = goal.targetCount
              ? Math.round((goal.currentCount / goal.targetCount) * 100)
              : 0;
            const isComplete = goal.isComplete || progress >= 100;

            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <span className="text-text-muted">○</span>
                    )}
                    <span className="text-sm font-medium text-text-primary">
                      {goal.title}
                    </span>
                  </div>
                  <span className="text-sm text-text-muted">
                    {goal.currentCount}/{goal.targetCount}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor: isComplete ? '#5A9A6B' : '#1B6B6B',
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/goals" className="block mt-4">
          <button className="text-burgundy font-semibold hover:underline">
            View All Goals →
          </button>
        </Link>
      </Card>

      {/* Framework Health & Heartie's Corner */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏗️</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">
              FRAMEWORK HEALTH
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">
                  Layer 1: Brand Strategy
                </span>
                <span className="text-sm text-text-muted">73%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '73%' }}></div>
              </div>
              <div className="flex gap-2 mt-1 text-xs">
                <span>🎯✓</span>
                <span>📍✓</span>
                <span className="text-text-muted">💬⋯</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">
                  Layer 2: Marketing Strategy
                </span>
                <span className="text-sm text-text-muted">53%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '53%' }}></div>
              </div>
              <div className="flex gap-2 mt-1 text-xs">
                <span>✍️✓</span>
                <span>🌍✓</span>
                <span className="text-text-muted">🗺️○</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">
                  Layer 3: Marketing Plan
                </span>
                <span className="text-sm text-success">Active</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%', backgroundColor: '#5A9A6B' }}></div>
              </div>
            </div>
          </div>
          <Link to="/strategy" className="block mt-4">
            <button className="text-burgundy font-semibold hover:underline">
              Continue Building →
            </button>
          </Link>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💬</span>
            <h2 className="text-lg font-headline font-semibold text-text-primary">
              HEARTIE'S CORNER
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-dusty-pink flex-shrink-0 flex items-center justify-center text-xl">
              🌸
            </div>
            <div className="flex-1">
              <p className="text-text-secondary mb-3">
                "You've completed {completedCount} activities this week! Keep up the great work! 🌸"
              </p>
              <button className="btn-secondary text-sm">
                Thanks, Heartie!
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
