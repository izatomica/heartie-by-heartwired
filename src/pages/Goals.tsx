import { useState } from 'react';
import { Card, Modal, Input, Button, Textarea } from '../components/ui';
import type { QuarterlyInitiative, WeeklyGoal, WeeklyGoalCategory, CoreGoal, Offer, NonNegotiable, CoreGoalStatus, OfferType, OfferStatus } from '../types';

type GoalTab = 'annual' | 'quarterly' | 'weekly';

// Annual Plan data structure
interface AnnualPlanData {
  marketingNorthStar: string;
  coreGoals: CoreGoal[];
  nonNegotiables: NonNegotiable[];
  sayingNoTo: string[];
  offers: Offer[];
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
const initialAnnualPlan: AnnualPlanData = {
  marketingNorthStar: '',
  coreGoals: [
    { id: 'goal-1', title: '', what: '', whyItMatters: '', successLooksLike: '', status: 'not_started', order: 1 },
    { id: 'goal-2', title: '', what: '', whyItMatters: '', successLooksLike: '', status: 'not_started', order: 2 },
    { id: 'goal-3', title: '', what: '', whyItMatters: '', successLooksLike: '', status: 'not_started', order: 3 },
  ],
  nonNegotiables: [
    { id: 'nn-1', text: 'No fear-based marketing', checked: false },
    { id: 'nn-2', text: 'Content that sounds like me', checked: false },
    { id: 'nn-3', text: 'One full day off per week', checked: false },
    { id: 'nn-4', text: '', checked: false },
    { id: 'nn-5', text: '', checked: false },
    { id: 'nn-6', text: '', checked: false },
    { id: 'nn-7', text: '', checked: false },
  ],
  sayingNoTo: [
    'No daily posting pressure',
    'No being on every platform',
    'No chasing every trend',
    '',
    '',
    '',
  ],
  offers: [
    { id: 'offer-1', name: '[Example: 6-Week Course]', type: 'course', launchDate: 'March 2026', price: '$XXX', status: 'planning', order: 1 },
    { id: 'offer-2', name: '[Example: Community]', type: 'membership', launchDate: 'April 2026', price: '$XX/mo', status: 'not_started', order: 2 },
    { id: 'offer-3', name: '[Example: 1:1 Mentorship]', type: 'service', launchDate: 'Ongoing', price: '$XXX', status: 'active', order: 3 },
  ],
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
  const [annualPlan, setAnnualPlan] = useState<AnnualPlanData>(initialAnnualPlan);
  const [quarterlyGoal, setQuarterlyGoal] = useState<QuarterlyGoalData>(initialQuarterlyGoal);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(initialWeeklyGoals);

  // Modal states
  const [isQuarterlyModalOpen, setIsQuarterlyModalOpen] = useState(false);
  const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
  const [editingWeeklyGoal, setEditingWeeklyGoal] = useState<WeeklyGoal | null>(null);

  // Annual Plan modal states
  const [editingCoreGoalIndex, setEditingCoreGoalIndex] = useState<number | null>(null);
  const [editingOfferIndex, setEditingOfferIndex] = useState<number | null>(null);
  const [isNorthStarModalOpen, setIsNorthStarModalOpen] = useState(false);

  // Individual edit modal states for quarterly
  const [editingQuarterlyField, setEditingQuarterlyField] = useState<'theme' | 'metrics' | null>(null);
  const [editingInitiativeIndex, setEditingInitiativeIndex] = useState<number | null>(null);

  // Form states
  const [annualPlanForm, setAnnualPlanForm] = useState<AnnualPlanData>(initialAnnualPlan);
  const [quarterlyForm, setQuarterlyForm] = useState<QuarterlyGoalData>(initialQuarterlyGoal);
  const [weeklyForm, setWeeklyForm] = useState({
    title: '',
    category: 'content' as WeeklyGoalCategory,
    targetCount: 1,
    currentCount: 0,
  });

  // Annual Plan handlers
  const handleOpenNorthStarModal = () => {
    setAnnualPlanForm({ ...annualPlan });
    setIsNorthStarModalOpen(true);
  };

  const handleSaveNorthStar = () => {
    setAnnualPlan({ ...annualPlanForm });
    setIsNorthStarModalOpen(false);
  };

  const handleOpenCoreGoal = (index: number) => {
    setAnnualPlanForm({ ...annualPlan, coreGoals: annualPlan.coreGoals.map(g => ({ ...g })) });
    setEditingCoreGoalIndex(index);
  };

  const handleSaveCoreGoal = () => {
    setAnnualPlan({ ...annualPlanForm });
    setEditingCoreGoalIndex(null);
  };

  const handleUpdateCoreGoal = (index: number, field: keyof CoreGoal, value: string | CoreGoalStatus) => {
    const newGoals = [...annualPlanForm.coreGoals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    setAnnualPlanForm(prev => ({ ...prev, coreGoals: newGoals }));
  };

  const handleOpenOffer = (index: number) => {
    setAnnualPlanForm({ ...annualPlan, offers: annualPlan.offers.map(o => ({ ...o })) });
    setEditingOfferIndex(index);
  };

  const handleSaveOffer = () => {
    setAnnualPlan({ ...annualPlanForm });
    setEditingOfferIndex(null);
  };

  const handleUpdateOffer = (index: number, field: keyof Offer, value: string | OfferType | OfferStatus | number) => {
    const newOffers = [...annualPlanForm.offers];
    newOffers[index] = { ...newOffers[index], [field]: value };
    setAnnualPlanForm(prev => ({ ...prev, offers: newOffers }));
  };

  const handleAddOffer = () => {
    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      name: '',
      type: 'course',
      launchDate: '',
      price: '',
      status: 'planning',
      order: annualPlan.offers.length + 1,
    };
    setAnnualPlan(prev => ({ ...prev, offers: [...prev.offers, newOffer] }));
  };

  const handleDeleteOffer = (index: number) => {
    setAnnualPlan(prev => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index),
    }));
    setEditingOfferIndex(null);
  };

  const handleToggleNonNegotiable = (index: number) => {
    setAnnualPlan(prev => ({
      ...prev,
      nonNegotiables: prev.nonNegotiables.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  const handleUpdateNonNegotiable = (index: number, text: string) => {
    setAnnualPlan(prev => ({
      ...prev,
      nonNegotiables: prev.nonNegotiables.map((item, i) =>
        i === index ? { ...item, text } : item
      ),
    }));
  };

  const handleUpdateSayingNoTo = (index: number, text: string) => {
    setAnnualPlan(prev => ({
      ...prev,
      sayingNoTo: prev.sayingNoTo.map((item, i) => (i === index ? text : item)),
    }));
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

  // Individual quarterly field handlers
  const handleOpenQuarterlyField = (field: 'theme' | 'metrics') => {
    setQuarterlyForm({
      ...quarterlyGoal,
      initiatives: quarterlyGoal.initiatives.map(i => ({ ...i })),
    });
    setEditingQuarterlyField(field);
  };

  const handleSaveQuarterlyField = () => {
    setQuarterlyGoal({ ...quarterlyForm });
    setEditingQuarterlyField(null);
  };

  // Individual initiative handlers
  const handleOpenInitiative = (index: number) => {
    setQuarterlyForm({
      ...quarterlyGoal,
      initiatives: quarterlyGoal.initiatives.map(i => ({ ...i })),
    });
    setEditingInitiativeIndex(index);
  };

  const handleSaveInitiative = () => {
    setQuarterlyGoal({ ...quarterlyForm });
    setEditingInitiativeIndex(null);
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
        {/* No button for annual - inline editing */}
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

      {/* Annual Goals View - Strategic Planning */}
      {activeTab === 'annual' && (
        <div className="space-y-8">
          {/* Marketing North Star */}
          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={handleOpenNorthStarModal}>
            <h2 className="text-xl font-headline font-bold text-text-primary mb-4">Your Marketing North Star</h2>
            <div className="p-4 bg-warning-light rounded-lg mb-4">
              <p className="text-text-primary font-medium">Guiding Question:</p>
              <p className="text-text-secondary">What do you want people to FEEL when they encounter your brand this year?</p>
            </div>
            <div className="p-4 bg-warning-light rounded-lg mb-4">
              <p className="text-sm text-text-secondary">
                <span className="font-medium">Tip:</span> Write it in one sentence. This becomes your emotional compass for every decision.
              </p>
            </div>
            <p className="text-sm text-text-secondary italic mb-4">
              <span className="font-medium">Example:</span> "I want people to feel understood, grounded, and capable — like marketing finally makes sense."
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-text-primary mb-2">Your Answer:</p>
              <p className="text-text-primary">
                {annualPlan.marketingNorthStar || <span className="text-text-muted">[Write your north star here]</span>}
              </p>
            </div>
          </Card>

          {/* 3 Core Goals */}
          <div>
            <h2 className="text-xl font-headline font-bold text-text-primary mb-4">Your 3 Core Goals for 2026</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {annualPlan.coreGoals.map((goal, index) => (
                <Card
                  key={goal.id}
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleOpenCoreGoal(index)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      index === 0 ? 'bg-success' : index === 1 ? 'bg-warning' : 'bg-[#9B8FD7]'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-headline font-semibold text-text-primary">Goal {index + 1}:</span>
                    <span className="text-text-primary">{goal.title || '[Title]'}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-text-primary">What:</span>{' '}
                      <span className="text-text-secondary">{goal.what || '[Description]'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-text-primary">Why it matters:</span>{' '}
                      <span className="text-text-secondary">{goal.whyItMatters || '[Emotional reason]'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-text-primary">Success looks like:</span>{' '}
                      <span className="text-text-secondary">{goal.successLooksLike || '[Specific outcome]'}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-medium text-text-primary">Status:</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        goal.status === 'complete' ? 'bg-success-light text-success' :
                        goal.status === 'in_progress' ? 'bg-warning-light text-warning' :
                        'bg-gray-100 text-text-muted'
                      }`}>
                        {goal.status === 'complete' && '✓ '}
                        {goal.status === 'not_started' ? 'Not started' :
                         goal.status === 'in_progress' ? 'In progress' : 'Complete'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Non-Negotiables + Saying NO To */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Non-Negotiables */}
            <Card>
              <h2 className="text-xl font-headline font-bold text-text-primary mb-4">Your Non-Negotiables</h2>
              <div className="p-3 bg-dusty-pink-light rounded-lg mb-4">
                <p className="text-sm text-text-primary italic">
                  <span className="font-medium">What you WON'T compromise — no matter what</span>
                </p>
              </div>
              <div className="space-y-2">
                {annualPlan.nonNegotiables.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleNonNegotiable(index)}
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        item.checked ? 'bg-success border-success text-white' : 'border-border hover:border-text-muted'
                      }`}
                    >
                      {item.checked && '✓'}
                    </button>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleUpdateNonNegotiable(index, e.target.value)}
                      placeholder={index < 3 ? `Example: ${['No fear-based marketing', 'Content that sounds like me', 'One full day off per week'][index]}` : '[Add your own]'}
                      className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-sm"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Saying NO To */}
            <Card>
              <h2 className="text-xl font-headline font-bold text-text-primary mb-4">What You're Saying NO To</h2>
              <div className="p-3 bg-warning-light rounded-lg mb-4">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium">Why this matters:</span> This is just as important as what you're saying yes to. Clarity requires boundaries.
                </p>
              </div>
              <ul className="space-y-2">
                {annualPlan.sayingNoTo.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-text-muted">•</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdateSayingNoTo(index, e.target.value)}
                      placeholder={index < 3 ? `Example: ${['No daily posting pressure', 'No being on every platform', 'No chasing every trend'][index]}` : '[Add your own]'}
                      className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-sm"
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Offers/Products Table */}
          <Card>
            <h2 className="text-xl font-headline font-bold text-text-primary mb-4">Your Offers/Products This Year</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Offer Name</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Launch Date</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {annualPlan.offers.map((offer, index) => (
                    <tr
                      key={offer.id}
                      className="border-b border-border hover:bg-cream cursor-pointer"
                      onClick={() => handleOpenOffer(index)}
                    >
                      <td className="py-3 px-4 text-text-primary">{offer.name || '[Offer name]'}</td>
                      <td className="py-3 px-4 text-text-secondary capitalize">{offer.type}</td>
                      <td className="py-3 px-4 text-text-secondary">{offer.launchDate || '—'}</td>
                      <td className="py-3 px-4 text-text-secondary">{offer.price || '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                          offer.status === 'active' ? 'bg-success-light text-success' :
                          offer.status === 'planning' ? 'bg-warning-light text-warning' :
                          'bg-gray-100 text-text-muted'
                        }`}>
                          {offer.status === 'active' && <span className="text-success">✓</span>}
                          {offer.status === 'planning' && <span className="w-2 h-2 rounded-full bg-warning" />}
                          {offer.status === 'not_started' && <span className="w-2 h-2 rounded bg-gray-400" />}
                          {offer.status === 'planning' ? 'Planning' :
                           offer.status === 'active' ? 'Active' : 'Not started'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="py-3 px-4">
                      <button
                        onClick={handleAddOffer}
                        className="text-text-muted hover:text-burgundy text-sm"
                      >
                        [Add row]
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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

          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleOpenQuarterlyField('theme')}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-lg font-headline font-semibold text-text-primary">QUARTERLY THEME</h2>
            </div>
            <p className="text-text-primary text-lg">"{quarterlyGoal.description}"</p>
          </Card>

          <div>
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">KEY INITIATIVES</h3>
            <div className="space-y-3">
              {quarterlyGoal.initiatives.map((initiative, index) => (
                <Card key={initiative.id} padding="md" className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleOpenInitiative(index)}>
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

          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleOpenQuarterlyField('metrics')}>
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

      {/* North Star Edit Modal */}
      <Modal isOpen={isNorthStarModalOpen} onClose={() => setIsNorthStarModalOpen(false)} title="Edit Your Marketing North Star">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Your Marketing North Star</label>
            <p className="text-sm text-text-secondary mb-2">What do you want people to FEEL when they encounter your brand this year?</p>
            <Textarea
              value={annualPlanForm.marketingNorthStar}
              onChange={(e) => setAnnualPlanForm(prev => ({ ...prev, marketingNorthStar: e.target.value }))}
              placeholder="I want people to feel..."
              rows={3}
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setIsNorthStarModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNorthStar}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Core Goal Edit Modal */}
      <Modal
        isOpen={editingCoreGoalIndex !== null}
        onClose={() => setEditingCoreGoalIndex(null)}
        title={`Edit Goal ${editingCoreGoalIndex !== null ? editingCoreGoalIndex + 1 : ''}`}
      >
        {editingCoreGoalIndex !== null && annualPlanForm.coreGoals[editingCoreGoalIndex] && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Goal Title</label>
              <Input
                value={annualPlanForm.coreGoals[editingCoreGoalIndex].title}
                onChange={(e) => handleUpdateCoreGoal(editingCoreGoalIndex, 'title', e.target.value)}
                placeholder="e.g., Build My Audience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">What (Description)</label>
              <Textarea
                value={annualPlanForm.coreGoals[editingCoreGoalIndex].what}
                onChange={(e) => handleUpdateCoreGoal(editingCoreGoalIndex, 'what', e.target.value)}
                placeholder="Describe what this goal involves..."
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Why It Matters</label>
              <Textarea
                value={annualPlanForm.coreGoals[editingCoreGoalIndex].whyItMatters}
                onChange={(e) => handleUpdateCoreGoal(editingCoreGoalIndex, 'whyItMatters', e.target.value)}
                placeholder="The emotional reason this matters to you..."
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Success Looks Like</label>
              <Textarea
                value={annualPlanForm.coreGoals[editingCoreGoalIndex].successLooksLike}
                onChange={(e) => handleUpdateCoreGoal(editingCoreGoalIndex, 'successLooksLike', e.target.value)}
                placeholder="A specific, measurable outcome..."
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
              <select
                value={annualPlanForm.coreGoals[editingCoreGoalIndex].status}
                onChange={(e) => handleUpdateCoreGoal(editingCoreGoalIndex, 'status', e.target.value as CoreGoalStatus)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
              >
                <option value="not_started">Not started</option>
                <option value="in_progress">In progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="secondary" onClick={() => setEditingCoreGoalIndex(null)}>Cancel</Button>
              <Button onClick={handleSaveCoreGoal}>Save</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Offer Edit Modal */}
      <Modal
        isOpen={editingOfferIndex !== null}
        onClose={() => setEditingOfferIndex(null)}
        title="Edit Offer"
      >
        {editingOfferIndex !== null && annualPlanForm.offers[editingOfferIndex] && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Offer Name</label>
              <Input
                value={annualPlanForm.offers[editingOfferIndex].name}
                onChange={(e) => handleUpdateOffer(editingOfferIndex, 'name', e.target.value)}
                placeholder="e.g., 6-Week Course"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Type</label>
              <select
                value={annualPlanForm.offers[editingOfferIndex].type}
                onChange={(e) => handleUpdateOffer(editingOfferIndex, 'type', e.target.value as OfferType)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
              >
                <option value="course">Course</option>
                <option value="membership">Membership</option>
                <option value="service">Service</option>
                <option value="product">Product</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Launch Date</label>
              <Input
                value={annualPlanForm.offers[editingOfferIndex].launchDate}
                onChange={(e) => handleUpdateOffer(editingOfferIndex, 'launchDate', e.target.value)}
                placeholder="e.g., March 2026 or Ongoing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Price</label>
              <Input
                value={annualPlanForm.offers[editingOfferIndex].price}
                onChange={(e) => handleUpdateOffer(editingOfferIndex, 'price', e.target.value)}
                placeholder="e.g., $497 or $47/mo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
              <select
                value={annualPlanForm.offers[editingOfferIndex].status}
                onChange={(e) => handleUpdateOffer(editingOfferIndex, 'status', e.target.value as OfferStatus)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
              >
                <option value="planning">Planning</option>
                <option value="not_started">Not started</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div className="flex gap-3 justify-between pt-4">
              <Button
                variant="secondary"
                onClick={() => handleDeleteOffer(editingOfferIndex)}
                className="text-error hover:bg-error/10"
              >
                Delete
              </Button>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setEditingOfferIndex(null)}>Cancel</Button>
                <Button onClick={handleSaveOffer}>Save</Button>
              </div>
            </div>
          </div>
        )}
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


      {/* Individual Quarterly Field Modals */}
      {/* Theme Modal */}
      <Modal isOpen={editingQuarterlyField === 'theme'} onClose={() => setEditingQuarterlyField(null)} title="Edit Quarterly Theme">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Theme</label>
            <Input
              value={quarterlyForm.theme}
              onChange={(e) => setQuarterlyForm(prev => ({ ...prev, theme: e.target.value }))}
              placeholder="e.g., Foundation, Launch, Scale"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <Textarea
              value={quarterlyForm.description}
              onChange={(e) => setQuarterlyForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setEditingQuarterlyField(null)}>Cancel</Button>
            <Button onClick={handleSaveQuarterlyField}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Quarterly Metrics Modal */}
      <Modal isOpen={editingQuarterlyField === 'metrics'} onClose={() => setEditingQuarterlyField(null)} title="Edit Quarterly Metrics">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Target ($)</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.revenueTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, revenueTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Revenue Current ($)</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.revenueCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, revenueCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Growth Target</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.linkedinTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, linkedinTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn Growth Current</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.linkedinCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, linkedinCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Growth Target</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.emailTarget}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, emailTarget: Number(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Growth Current</label>
              <input
                type="number"
                className="input w-full"
                value={quarterlyForm.emailCurrent}
                onChange={(e) => setQuarterlyForm(prev => ({ ...prev, emailCurrent: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setEditingQuarterlyField(null)}>Cancel</Button>
            <Button onClick={handleSaveQuarterlyField}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Individual Initiative Modal */}
      <Modal
        isOpen={editingInitiativeIndex !== null}
        onClose={() => setEditingInitiativeIndex(null)}
        title="Edit Initiative"
      >
        {editingInitiativeIndex !== null && quarterlyForm.initiatives[editingInitiativeIndex] && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Initiative Title</label>
              <Input
                value={quarterlyForm.initiatives[editingInitiativeIndex].title}
                onChange={(e) => handleUpdateInitiative(editingInitiativeIndex, 'title', e.target.value)}
                placeholder="What do you want to achieve?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="input w-full"
                value={quarterlyForm.initiatives[editingInitiativeIndex].progressPercentage}
                onChange={(e) => handleUpdateInitiative(editingInitiativeIndex, 'progressPercentage', Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
              />
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="secondary" onClick={() => setEditingInitiativeIndex(null)}>Cancel</Button>
              <Button onClick={handleSaveInitiative}>Save</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
