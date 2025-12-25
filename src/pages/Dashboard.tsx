import { Card } from '../components/ui';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
              Good morning! 👋
            </h1>
            <p className="text-text-secondary">
              Here's your marketing snapshot.
            </p>
          </div>
          <div className="text-right text-sm text-text-muted">
            December 25, 2025
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
              <span>📝 3 posts planned</span>
            </div>
            <div className="flex items-center justify-between">
              <span>📧 1 newsletter</span>
            </div>
            <div className="flex items-center justify-between">
              <span>✅ 2 completed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>⏳ 2 remaining</span>
            </div>
          </div>
          <button className="mt-4 text-burgundy font-semibold hover:underline">
            View Calendar →
          </button>
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
            {/* Getting Seen */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  🟦 Getting Seen
                </span>
                <span className="text-sm text-text-muted">80%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '80%', backgroundColor: '#A8D5E5' }}></div>
              </div>
            </div>

            {/* Building Trust */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  🟩 Building Trust
                </span>
                <span className="text-sm text-text-muted">60%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%', backgroundColor: '#9DCDB5' }}></div>
              </div>
            </div>

            {/* Making the Ask */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  🟨 Making the Ask
                </span>
                <span className="text-sm text-text-muted">20%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%', backgroundColor: '#E8C86B' }}></div>
              </div>
            </div>

            {/* Keeping Connected */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  🟪 Keeping Connected
                </span>
                <span className="text-sm text-text-muted">0%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%', backgroundColor: '#C5C0E8' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-warning-light rounded-lg">
            <p className="text-sm text-warning">
              ⚠️ Add conversion content to balance your funnel
            </p>
          </div>
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
        <div className="space-y-3">
          <div className="p-4 bg-white border-l-4 border-funnel-awareness rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  LinkedIn Post
                </h3>
                <p className="text-sm text-text-secondary">
                  Topic: Behind-the-scenes
                </p>
                <span className="badge-draft mt-2">Draft</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost">Open</button>
                <button className="btn-primary">Complete</button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Framework Health */}
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
          <button className="mt-4 text-burgundy font-semibold hover:underline">
            Continue Building →
          </button>
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
                "You've been consistent for 2 weeks! Keep it up! 🌸"
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
