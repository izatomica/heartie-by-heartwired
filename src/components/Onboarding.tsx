import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from './ui';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    businessName: '',
    industry: '',
    mainGoal: '',
  });
  const navigate = useNavigate();

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Heartie! 🌸',
      description: 'Your marketing planner designed for female solopreneurs',
      icon: '🌸',
      content: (
        <div className="text-center space-y-6 py-8">
          <div className="text-8xl mb-4">🌸</div>
          <h2 className="text-3xl font-headline font-bold text-text-primary mb-4">
            Welcome to Heartie
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Finally, a marketing planner that feels like it was built just for you.
          </p>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Heartie helps you plan, create, and track your marketing with clarity and confidence—
            without the overwhelm. Let's get you set up in just a few minutes.
          </p>
          <div className="pt-6">
            <Button onClick={() => setCurrentStep(1)}>
              Let's Get Started →
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'user-info',
      title: 'Tell us about yourself',
      description: 'Help us personalize your experience',
      icon: '👋',
      content: (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
              Nice to meet you!
            </h2>
            <p className="text-text-secondary">
              Tell us a bit about yourself so we can personalize Heartie for you.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What's your name?
            </label>
            <input
              type="text"
              className="input"
              placeholder="Your first name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What's your business called?
            </label>
            <input
              type="text"
              className="input"
              placeholder="Your business name"
              value={userInfo.businessName}
              onChange={(e) => setUserInfo({ ...userInfo, businessName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What industry are you in?
            </label>
            <select
              className="input"
              value={userInfo.industry}
              onChange={(e) => setUserInfo({ ...userInfo, industry: e.target.value })}
            >
              <option value="">Select your industry</option>
              <option value="coaching">Coaching & Consulting</option>
              <option value="creative">Creative Services</option>
              <option value="wellness">Health & Wellness</option>
              <option value="education">Education & Training</option>
              <option value="services">Professional Services</option>
              <option value="ecommerce">E-commerce & Products</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What's your main marketing goal right now?
            </label>
            <select
              className="input"
              value={userInfo.mainGoal}
              onChange={(e) => setUserInfo({ ...userInfo, mainGoal: e.target.value })}
            >
              <option value="">Select your main goal</option>
              <option value="visibility">Get more visible and grow my audience</option>
              <option value="leads">Generate more leads and inquiries</option>
              <option value="sales">Increase sales and conversions</option>
              <option value="consistency">Be more consistent with content</option>
              <option value="strategy">Develop a clear marketing strategy</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setCurrentStep(0)}>
              ← Back
            </Button>
            <Button
              className="flex-1"
              onClick={() => setCurrentStep(2)}
              disabled={!userInfo.name || !userInfo.businessName || !userInfo.industry || !userInfo.mainGoal}
            >
              Continue →
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'framework',
      title: 'The 3-Layer Framework',
      description: 'Your foundation for strategic marketing',
      icon: '🏗️',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
              How Heartie Works: The 3-Layer Framework
            </h2>
            <p className="text-text-secondary">
              Great marketing isn't random. It's built on a solid foundation.
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-l-4" style={{ borderColor: '#7A2D4D' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center text-white text-xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-semibold text-text-primary mb-2">
                    Layer 1: Brand Strategy
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Define <strong>who you serve</strong>, <strong>what makes you unique</strong>,
                    and <strong>how you talk about it</strong>.
                  </p>
                  <p className="text-xs text-text-muted">
                    This is your foundation. Everything else builds on this.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-l-4" style={{ borderColor: '#1B6B6B' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-dark flex items-center justify-center text-white text-xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-semibold text-text-primary mb-2">
                    Layer 2: Marketing Strategy
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Develop <strong>your voice</strong>, understand <strong>your reality</strong>,
                    and map <strong>your landscape</strong>.
                  </p>
                  <p className="text-xs text-text-muted">
                    This is your approach. How you'll reach your people.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-l-4" style={{ borderColor: '#5A9A6B' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white text-xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-semibold text-text-primary mb-2">
                    Layer 3: Marketing Plan
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Set <strong>your big plans</strong> and execute with a quarterly calendar.
                  </p>
                  <p className="text-xs text-text-muted">
                    This is your execution. Where strategy meets action.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-dusty-pink-light rounded-lg p-6 mt-6">
            <p className="text-sm text-text-primary">
              💡 <strong>Here's the magic:</strong> When you have all 3 layers in place,
              creating content becomes easy. You'll know exactly what to say, who to say it to,
              and why it matters.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setCurrentStep(1)}>
              ← Back
            </Button>
            <Button className="flex-1" onClick={() => setCurrentStep(3)}>
              Got it! →
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'funnel',
      title: 'The Marketing Funnel',
      description: 'Understanding the customer journey',
      icon: '🎯',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
              The 4-Stage Marketing Funnel
            </h2>
            <p className="text-text-secondary">
              Every piece of content moves people through a journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-l-4" style={{ borderColor: '#E8B4B8' }}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👁️</span>
                  <h3 className="font-headline font-semibold text-text-primary">
                    Getting Seen
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">
                  Awareness content that helps people discover you. Educational posts,
                  tips, and valuable insights.
                </p>
              </div>
            </Card>

            <Card className="border-l-4" style={{ borderColor: '#B4D4E8' }}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <h3 className="font-headline font-semibold text-text-primary">
                    Building Trust
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">
                  Consideration content that builds credibility. Case studies,
                  frameworks, and your unique perspective.
                </p>
              </div>
            </Card>

            <Card className="border-l-4" style={{ borderColor: '#D4B8E8' }}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <h3 className="font-headline font-semibold text-text-primary">
                    Making the Ask
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">
                  Conversion content that invites action. Launches, offers,
                  and sales-focused messages.
                </p>
              </div>
            </Card>

            <Card className="border-l-4" style={{ borderColor: '#B8E8D4' }}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💕</span>
                  <h3 className="font-headline font-semibold text-text-primary">
                    Keeping Connected
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">
                  Retention content that nurtures relationships. Client appreciation,
                  behind-the-scenes, and community building.
                </p>
              </div>
            </Card>
          </div>

          <div className="bg-dusty-pink-light rounded-lg p-6 mt-6">
            <p className="text-sm text-text-primary">
              💡 <strong>Balance is key:</strong> A healthy marketing funnel needs content
              at every stage. Heartie helps you track this automatically!
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setCurrentStep(2)}>
              ← Back
            </Button>
            <Button className="flex-1" onClick={() => setCurrentStep(4)}>
              Continue →
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Your Heartie Toolkit',
      description: 'Everything you need in one place',
      icon: '🛠️',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🛠️</div>
            <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
              Your Heartie Toolkit
            </h2>
            <p className="text-text-secondary">
              Everything you need to plan and execute your marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card hover className="cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Dashboard
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Your weekly overview, goals progress, and Heartie's daily guidance.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/calendar')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">📅</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Calendar
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Plan your content with drag-and-drop. See your whole week at a glance.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/goals')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Goals
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Track annual, quarterly, and weekly goals. Stay focused on what matters.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/strategy')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🏗️</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Strategy
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Build your 3-layer foundation with guided questionnaires.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/templates')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">📝</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Templates
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Ready-to-use content templates for every funnel stage.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover className="cursor-pointer" onClick={() => navigate('/insights')}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-headline font-semibold text-text-primary mb-1">
                    Insights
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Track what's working and get personalized recommendations.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setCurrentStep(3)}>
              ← Back
            </Button>
            <Button className="flex-1" onClick={() => setCurrentStep(5)}>
              Almost done! →
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: "You're all set!",
      description: 'Time to start planning',
      icon: '🎉',
      content: (
        <div className="text-center space-y-6 py-8 max-w-2xl mx-auto">
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-3xl font-headline font-bold text-text-primary mb-4">
            {userInfo.name ? `You're all set, ${userInfo.name}!` : "You're all set!"}
          </h2>
          <p className="text-lg text-text-secondary">
            Welcome to {userInfo.businessName || 'your marketing journey'}!
            Here's what to do next:
          </p>

          <div className="bg-cream-dark rounded-lg p-6 text-left space-y-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Complete Your Strategy Foundation
                </h3>
                <p className="text-sm text-text-secondary">
                  Head to <strong>Strategy</strong> and answer the questionnaires.
                  This is your marketing North Star.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-dark flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Set Your First Goals
                </h3>
                <p className="text-sm text-text-secondary">
                  Go to <strong>Goals</strong> and define what success looks like for you this quarter.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Plan Your Week
                </h3>
                <p className="text-sm text-text-secondary">
                  Open the <strong>Calendar</strong> and add your first content activities.
                  Use templates to get started fast!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dusty-pink-light rounded-lg p-6 mt-6">
            <div className="flex gap-4">
              <div className="text-4xl">🌸</div>
              <div className="text-left flex-1">
                <p className="text-sm text-text-primary">
                  <strong>Remember:</strong> Marketing doesn't have to be overwhelming.
                  Take it one step at a time. I'm here to guide you every step of the way.
                </p>
                <p className="text-sm text-text-muted mt-2">— Heartie</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => {
                onComplete();
                navigate('/dashboard');
              }}
            >
              Let's Go! →
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-cream z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🌸</span>
                <div>
                  <h1 className="text-xl font-headline font-bold text-text-primary">
                    Heartie
                  </h1>
                  <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
                </div>
              </div>
              <div className="text-sm text-text-muted">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: '#7A2D4D' }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <Card className="min-h-[500px]">
            {currentStepData.content}
          </Card>

          {/* Skip Option */}
          {currentStep < steps.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  onComplete();
                  navigate('/dashboard');
                }}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                Skip onboarding
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
