import { useState } from 'react';
import { Card } from '../components/ui';

type GoalTab = 'annual' | 'quarterly' | 'weekly';

export function Goals() {
  const [activeTab, setActiveTab] = useState<GoalTab>('annual');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
          Goals
        </h1>
        <p className="text-text-secondary">
          What you're working toward.
        </p>
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
          {/* Annual Goal Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💰</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">
                  REVENUE
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">$150,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">$8,200</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: '5%' }}
                  ></div>
                </div>
                <div className="text-sm text-text-muted">
                  On track for: $98,400/yr
                </div>
              </div>
            </Card>

            {/* LinkedIn Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📈</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">
                  LINKEDIN
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">5,000 followers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">2,847</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: '57%' }}
                  ></div>
                </div>
                <div className="text-sm text-success flex items-center gap-1">
                  On track for: 5,200 ✓
                </div>
              </div>
            </Card>

            {/* Email Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📧</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">
                  EMAIL LIST
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">2,000 subscribers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">412</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: '21%' }}
                  ></div>
                </div>
                <div className="text-sm text-text-muted">
                  On track for: 1,648
                </div>
              </div>
            </Card>

            {/* Launches Goal */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <h2 className="text-lg font-headline font-semibold text-text-primary">
                  LAUNCHES
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="font-semibold text-text-primary">3 offers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current:</span>
                  <span className="font-semibold text-text-primary">0</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <div className="text-sm text-text-muted">
                  Q2: Course launch planned
                </div>
              </div>
            </Card>
          </div>

          {/* #1 Priority */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">
                #1 PRIORITY THIS YEAR
              </h2>
            </div>
            <p className="text-text-primary text-lg">
              "Build consistent visibility on LinkedIn to drive discovery calls for 1:1 coaching"
            </p>
          </Card>

          {/* Quarterly Overview */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📅</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">
                QUARTERLY OVERVIEW
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* Q1 */}
              <div className="p-4 rounded-lg border-2 border-dusty-pink bg-dusty-pink-light">
                <div className="font-headline font-semibold text-sm mb-2">Q1: Foundation</div>
                <div className="text-xs text-text-secondary mb-2">Build audience</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs text-dusty-pink font-medium">In progress</div>
              </div>

              {/* Q2 */}
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q2: Launch</div>
                <div className="text-xs text-text-secondary mb-2">Course launch</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-text-muted">Upcoming</div>
              </div>

              {/* Q3 */}
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q3: Scale</div>
                <div className="text-xs text-text-secondary mb-2">Ads + growth</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-text-muted">Upcoming</div>
              </div>

              {/* Q4 */}
              <div className="p-4 rounded-lg border border-border bg-white">
                <div className="font-headline font-semibold text-sm mb-2">Q4: Optimize</div>
                <div className="text-xs text-text-secondary mb-2">Review</div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-headline font-bold text-text-primary">
                Q1 2026: FOUNDATION
              </h2>
              <p className="text-text-secondary">January - March</p>
            </div>
            <button className="btn-secondary">Edit</button>
          </div>

          {/* Quarterly Theme */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">
                QUARTERLY THEME
              </h2>
            </div>
            <p className="text-text-primary text-lg">
              "Build consistent visibility and grow email list to prepare for Q2 course launch"
            </p>
          </Card>

          {/* Key Initiatives */}
          <div>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
              KEY INITIATIVES
            </h3>
            <div className="space-y-3">
              <Card padding="md">
                <div className="flex items-start gap-3">
                  <span className="text-success text-xl">✓</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Post 3x/week on LinkedIn consistently
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '67%' }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-text-muted">8/12 weeks</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-start gap-3">
                  <span className="text-text-muted text-xl">○</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Create lead magnet and welcome sequence
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-text-muted">Not started</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-start gap-3">
                  <span className="text-text-muted text-xl">○</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Grow email list to 1,000 subscribers
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '41%' }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-text-muted">412/1000</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-start gap-3">
                  <span className="text-text-muted text-xl">○</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Book 10 discovery calls
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <span className="text-sm text-text-muted">3/10</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Quarterly Metrics */}
          <Card>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
              QUARTERLY METRICS TARGET
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Revenue: $12,500</span>
                  <span className="text-sm font-medium text-text-primary">Current: $8,200</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '66%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">LinkedIn: +500 followers</span>
                  <span className="text-sm font-medium text-text-primary">Current: +247</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '49%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Email: +200 subscribers</span>
                  <span className="text-sm font-medium text-text-primary">Current: +89</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Weekly Goals View */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-headline font-bold text-text-primary">
                THIS WEEK: Dec 23-29
              </h2>
              <p className="text-text-secondary">How this week supports Q1 goals</p>
            </div>
            <button className="btn-secondary">Edit</button>
          </div>

          {/* Supporting Quote */}
          <Card padding="md">
            <p className="text-text-secondary italic">
              "Post 3x/week on LinkedIn consistently"
            </p>
          </Card>

          {/* Content Goals */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <h3 className="text-lg font-headline font-semibold text-text-primary">
                  CONTENT GOALS
                </h3>
              </div>
              <span className="text-sm font-medium text-success">3/3 Complete</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">LinkedIn post #1 (Monday)</span>
                <span className="ml-auto text-sm text-success">Done</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">LinkedIn post #2 (Wednesday)</span>
                <span className="ml-auto text-sm text-success">Done</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">LinkedIn post #3 (Friday)</span>
                <span className="ml-auto text-sm text-success">Done</span>
              </div>
            </div>
          </Card>

          {/* Engagement Goals */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                <h3 className="text-lg font-headline font-semibold text-text-primary">
                  ENGAGEMENT GOALS
                </h3>
              </div>
              <span className="text-sm font-medium text-text-primary">2/3 Complete</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">Comment on 25 posts this week</span>
                <span className="ml-auto text-sm text-success">28 done</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">Reply to all DMs within 24 hours</span>
                <span className="ml-auto text-sm text-success">Done</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-muted">○</span>
                <span className="text-text-primary">Connect with 5 new ideal clients</span>
                <span className="ml-auto text-sm text-text-muted">3/5</span>
              </div>
            </div>
          </Card>

          {/* Email Goals */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📧</span>
                <h3 className="text-lg font-headline font-semibold text-text-primary">
                  EMAIL GOALS
                </h3>
              </div>
              <span className="text-sm font-medium text-text-primary">0/1 Complete</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-text-muted">○</span>
                <span className="text-text-primary">Send weekly newsletter (Tuesday)</span>
                <span className="ml-auto text-sm text-text-muted">Scheduled</span>
              </div>
            </div>
          </Card>

          {/* Business Goals */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-headline font-semibold text-text-primary">
                  BUSINESS GOALS
                </h3>
              </div>
              <span className="text-sm font-medium text-text-primary">1/2 Complete</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-success">✓</span>
                <span className="text-text-primary">Book 2 discovery calls</span>
                <span className="ml-auto text-sm text-success">2 booked</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-muted">○</span>
                <span className="text-text-primary">Follow up with 3 warm leads</span>
                <span className="ml-auto text-sm text-text-muted">1/3</span>
              </div>
            </div>
          </Card>

          {/* Week Score */}
          <Card>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
              WEEK SCORE
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary">6/9 goals complete</span>
              <span className="text-text-primary font-semibold">67%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '67%' }}></div>
            </div>
            <div className="mt-4 p-3 bg-info-light rounded-lg">
              <p className="text-sm text-info">
                💡 Heartie: "Great progress! You're building momentum. Don't forget that newsletter - it's your trust-builder."
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
