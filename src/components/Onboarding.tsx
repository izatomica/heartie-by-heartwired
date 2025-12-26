import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button, Input, RadioGroup, PhotoUpload } from './ui';
import type { BusinessType, BusinessStage } from '@/types/auth';

interface OnboardingStep {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    businessName: '',
    businessDescription: '',
    website: '',
    businessType: '' as BusinessType | '',
    businessStage: '' as BusinessStage | '',
  });
  const navigate = useNavigate();
  const { user, updateProfile, uploadProfilePhoto } = useAuth();

  const handleNext = async () => {
    setIsLoading(true);

    // Save progress at each step
    await updateProfile({
      displayName: formData.displayName || undefined,
      businessName: formData.businessName || undefined,
      businessDescription: formData.businessDescription || undefined,
      website: formData.website || undefined,
      businessType: formData.businessType || undefined,
      businessStage: formData.businessStage || undefined,
      onboardingStep: currentStep + 1,
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      await updateProfile({ onboardingComplete: true });
      navigate('/dashboard', { replace: true });
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = async () => {
    setIsLoading(true);
    await updateProfile({ onboardingComplete: true });
    navigate('/dashboard', { replace: true });
    setIsLoading(false);
  };

  const handlePhotoUpload = async (file: File) => {
    await uploadProfilePhoto(file);
  };

  const steps: OnboardingStep[] = [
    // Step 1: Welcome / Heartie Introduction
    {
      id: 'welcome',
      title: 'Welcome to Heartie!',
      content: (
        <div className="text-center py-12">
          {/* Heartie Avatar */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-dusty-pink-light flex items-center justify-center">
            <span className="text-6xl">🌸</span>
          </div>

          <h1 className="font-headline text-3xl font-semibold text-text-primary mb-4">
            Hey! I'm Heartie
          </h1>

          <p className="text-lg text-text-secondary mb-4 max-w-md mx-auto">
            I'm your marketing companion. Not a guru. Not a bot. Just... help.
          </p>

          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            I'm here to make sure you never stare at a blank screen wondering "what should I even post?"
          </p>

          <div className="bg-white rounded-xl p-6 max-w-sm mx-auto mb-8 shadow-sm">
            <p className="text-text-secondary text-sm">
              Ready to set things up? It takes about 5 minutes.
              <br />
              <span className="text-text-muted">(I promise not to ask your blood type.)</span>
            </p>
          </div>

          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? 'Loading...' : "Let's do this →"}
          </Button>

          <button
            onClick={handleSkip}
            className="block mx-auto mt-4 text-sm text-text-muted hover:text-text-secondary transition-colors"
            disabled={isLoading}
          >
            Skip for now - just show me around
          </button>
        </div>
      ),
    },

    // Step 2: Basic Info
    {
      id: 'basic-info',
      title: 'The Basics',
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="font-headline text-2xl font-semibold text-text-primary mb-2">
            The Basics
          </h2>
          <p className="text-text-secondary mb-8">Let's start with the essentials.</p>

          <div className="space-y-6">
            <Input
              label="What should I call you?"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="Sarah"
            />
            <p className="text-xs text-text-muted -mt-4">
              This is how Heartie will greet you. First name is perfect.
            </p>

            <Input
              label="What's your business called?"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Bloom Coaching"
            />
            <p className="text-xs text-text-muted -mt-4">
              Don't have one yet? No problem - your name works great.
            </p>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                What do you do in one sentence?
              </label>
              <textarea
                className="textarea"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                placeholder="I help busy moms build sustainable self-care habits"
                rows={2}
              />
              <p className="text-xs text-text-muted mt-1">
                Don't overthink it. We'll refine this together.
              </p>
            </div>

            <Input
              label="Your website (optional)"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourbusiness.com"
            />
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} variant="ghost">
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!formData.displayName || isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue →'}
            </Button>
          </div>
        </div>
      ),
    },

    // Step 3: Business Type & Stage
    {
      id: 'business-type',
      title: 'About Your Business',
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-xl mx-auto">
          <h2 className="font-headline text-2xl font-semibold text-text-primary mb-2">
            About Your Business
          </h2>
          <p className="text-text-secondary mb-8">This helps us tailor your experience.</p>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-4">
                What type of business do you run?
              </label>
              <RadioGroup
                name="businessType"
                value={formData.businessType}
                onChange={(value) => setFormData({ ...formData, businessType: value as BusinessType })}
                options={[
                  { value: 'service', label: 'Service-based', description: 'Coaching, consulting, freelancing' },
                  { value: 'digital', label: 'Digital products', description: 'Courses, templates, memberships' },
                  { value: 'product', label: 'Product-based', description: 'Physical products' },
                  { value: 'mixed', label: 'Mix of the above' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-4">
                What stage are you at?
              </label>
              <RadioGroup
                name="businessStage"
                value={formData.businessStage}
                onChange={(value) => setFormData({ ...formData, businessStage: value as BusinessStage })}
                options={[
                  { value: 'starting', label: 'Just starting', description: 'Pre-revenue or <$10K/year' },
                  { value: 'growing', label: 'Growing', description: '$10K-$100K/year' },
                  { value: 'established', label: 'Established', description: '$100K+/year' },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} variant="ghost">
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!formData.businessType || !formData.businessStage || isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue →'}
            </Button>
          </div>
        </div>
      ),
    },

    // Step 4: Profile Photo (Optional)
    {
      id: 'photo',
      title: 'One more thing',
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mx-auto text-center">
          <h2 className="font-headline text-2xl font-semibold text-text-primary mb-2">
            One more thing
          </h2>
          <p className="text-text-secondary mb-8">
            Totally optional, but it makes things feel more personal.
          </p>

          <div className="mb-8 flex justify-center">
            <PhotoUpload
              currentUrl={user?.profilePhotoUrl || undefined}
              onUpload={handlePhotoUpload}
              size="lg"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={handleNext} variant="ghost" disabled={isLoading}>
              Skip this - I'm camera shy
            </Button>
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Continue →'}
            </Button>
          </div>
        </div>
      ),
    },

    // Step 5: The Framework Explanation
    {
      id: 'framework',
      title: 'How Heartwired Works',
      content: (
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
          <h2 className="font-headline text-2xl font-semibold text-text-primary mb-4">
            Here's how Heartwired works differently
          </h2>

          <p className="text-text-secondary mb-6">
            Most marketing tools start with tactics: "Schedule this post. Write that email."
          </p>

          <p className="text-text-secondary mb-8">
            But tactics without strategy is just noise. Heartwired uses a 3-layer approach:
          </p>

          {/* Framework Diagram */}
          <div className="space-y-4 mb-8">
            {/* Layer 3 */}
            <Card className="border-l-4 border-success">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">📋</span>
                <h3 className="font-headline font-semibold text-text-primary">
                  3. Marketing Plan
                </h3>
              </div>
              <p className="text-sm text-text-secondary ml-9">
                What you do & when you do it
                <br />
                <span className="text-text-muted">Calendar • Activities • Campaigns</span>
              </p>
            </Card>

            <div className="text-center text-text-muted">↑ informs</div>

            {/* Layer 2 */}
            <Card className="border-l-4 border-teal-dark">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">🎯</span>
                <h3 className="font-headline font-semibold text-text-primary">
                  2. Marketing Strategy
                </h3>
              </div>
              <p className="text-sm text-text-secondary ml-9">
                Where you show up & how you sound
                <br />
                <span className="text-text-muted">Voice • Reality • Landscape</span>
              </p>
            </Card>

            <div className="text-center text-text-muted">↑ informs</div>

            {/* Layer 1 */}
            <Card className="border-l-4 border-burgundy">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">🌱</span>
                <h3 className="font-headline font-semibold text-text-primary">
                  1. Brand Strategy (Start here)
                </h3>
              </div>
              <p className="text-sm text-text-secondary ml-9">
                Who you serve & why you matter
                <br />
                <span className="text-text-muted">Customer • Position • Messaging</span>
              </p>
            </Card>
          </div>

          <p className="text-text-secondary text-center mb-8">
            We'll help you build from the foundation up. It takes a bit longer, but everything works better.
          </p>

          <div className="flex justify-between">
            <Button onClick={handleBack} variant="ghost">
              ← Back
            </Button>
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Got it, let's go →'}
            </Button>
          </div>
        </div>
      ),
    },

    // Step 6: Ready / Completion
    {
      id: 'complete',
      title: "You're all set!",
      content: (
        <div className="text-center py-8 max-w-xl mx-auto">
          {/* Celebration */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dusty-pink-light flex items-center justify-center">
            <span className="text-5xl">🎉</span>
          </div>

          <h2 className="font-headline text-3xl font-semibold text-text-primary mb-4">
            You're all set{formData.displayName ? `, ${formData.displayName}` : ''}!
          </h2>

          <p className="text-lg text-text-secondary mb-8">
            Your Heartwired dashboard is ready.
          </p>

          {/* Heartie tip */}
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto mb-8 shadow-sm text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-dusty-pink-light flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Quick tip from Heartie:
                </p>
                <p className="text-sm text-text-secondary">
                  "Start with Your Customer in the Strategy section. It takes 10 minutes and makes everything else click into place!"
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? 'Finishing up...' : 'Go to Dashboard →'}
          </Button>
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
          {currentStepData.content}

          {/* Skip Option (only show on first few steps) */}
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={handleSkip}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                disabled={isLoading}
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
