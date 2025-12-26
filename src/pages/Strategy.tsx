import { useState } from 'react';
import { Card } from '../components/ui';

interface StrategyCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  layer: 1 | 2 | 3;
  progress: number;
  questions: number;
  completedQuestions: number;
}

const STRATEGY_CATEGORIES: StrategyCategory[] = [
  // Layer 1: Brand Strategy
  {
    id: 'your-customer',
    name: 'Your Customer',
    description: 'Define who you serve and what they need',
    icon: '🎯',
    layer: 1,
    progress: 100,
    questions: 8,
    completedQuestions: 8,
  },
  {
    id: 'your-position',
    name: 'Your Position',
    description: 'Clarify what makes you unique in the market',
    icon: '📍',
    layer: 1,
    progress: 100,
    questions: 6,
    completedQuestions: 6,
  },
  {
    id: 'your-messaging',
    name: 'Your Messaging',
    description: 'Craft your core message and value proposition',
    icon: '💬',
    layer: 1,
    progress: 40,
    questions: 7,
    completedQuestions: 3,
  },
  // Layer 2: Marketing Strategy
  {
    id: 'your-voice',
    name: 'Your Voice',
    description: 'Develop your unique brand voice and style',
    icon: '✍️',
    layer: 2,
    progress: 100,
    questions: 5,
    completedQuestions: 5,
  },
  {
    id: 'your-reality',
    name: 'Your Reality',
    description: 'Assess your resources, constraints, and opportunities',
    icon: '🌍',
    layer: 2,
    progress: 85,
    questions: 6,
    completedQuestions: 5,
  },
  {
    id: 'your-landscape',
    name: 'Your Landscape',
    description: 'Map your competitive environment and market trends',
    icon: '🗺️',
    layer: 2,
    progress: 0,
    questions: 7,
    completedQuestions: 0,
  },
  // Layer 3: Marketing Plan
  {
    id: 'your-big-plans',
    name: 'Your Big Plans',
    description: 'Set your annual vision and quarterly themes',
    icon: '🎪',
    layer: 3,
    progress: 100,
    questions: 4,
    completedQuestions: 4,
  },
];

const LAYER_INFO = {
  1: {
    name: 'Layer 1: Brand Strategy',
    description: 'Build your foundation',
    color: '#7A2D4D', // burgundy
  },
  2: {
    name: 'Layer 2: Marketing Strategy',
    description: 'Define your approach',
    color: '#1B6B6B', // teal
  },
  3: {
    name: 'Layer 3: Marketing Plan',
    description: 'Execute with confidence',
    color: '#5A9A6B', // success green
  },
};

export function Strategy() {
  const [selectedCategory, setSelectedCategory] = useState<StrategyCategory | null>(null);

  const calculateLayerProgress = (layer: 1 | 2 | 3): number => {
    const layerCategories = STRATEGY_CATEGORIES.filter((cat) => cat.layer === layer);
    const totalProgress = layerCategories.reduce((sum, cat) => sum + cat.progress, 0);
    return Math.round(totalProgress / layerCategories.length);
  };

  const calculateOverallProgress = (): number => {
    const totalProgress = STRATEGY_CATEGORIES.reduce((sum, cat) => sum + cat.progress, 0);
    return Math.round(totalProgress / STRATEGY_CATEGORIES.length);
  };

  const getCategoriesByLayer = (layer: 1 | 2 | 3) => {
    return STRATEGY_CATEGORIES.filter((cat) => cat.layer === layer);
  };

  const getStatusLabel = (progress: number): string => {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Complete';
    return 'In Progress';
  };

  const getStatusColor = (progress: number): string => {
    if (progress === 0) return 'bg-gray-100 text-text-muted';
    if (progress === 100) return 'bg-success-light text-success';
    return 'bg-warning-light text-warning';
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
          Your Marketing Strategy
        </h1>
        <p className="text-text-secondary">
          Built on the 3-layer framework for sustainable growth.
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-headline font-semibold text-text-primary">
              Strategy Foundation
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Complete your strategic foundation to unlock powerful marketing
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-headline font-bold text-burgundy">
              {overallProgress}%
            </div>
            <p className="text-xs text-text-muted">Overall Complete</p>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%`, backgroundColor: '#7A2D4D' }}
          ></div>
        </div>
      </Card>

      {/* Framework Layers */}
      {([1, 2, 3] as const).map((layerNum) => {
        const layerInfo = LAYER_INFO[layerNum];
        const layerProgress = calculateLayerProgress(layerNum);
        const categories = getCategoriesByLayer(layerNum);

        return (
          <div key={layerNum} className="space-y-4">
            {/* Layer Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: layerInfo.color }}
              ></div>
              <div className="flex-1">
                <h2 className="text-xl font-headline font-semibold text-text-primary">
                  {layerInfo.name}
                </h2>
                <p className="text-sm text-text-secondary">{layerInfo.description}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-text-primary">{layerProgress}%</span>
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  hover
                  className="cursor-pointer transition-all hover:border-burgundy"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        <div>
                          <h3 className="font-headline font-semibold text-text-primary">
                            {category.name}
                          </h3>
                          <p className="text-xs text-text-muted mt-0.5">
                            {category.completedQuestions}/{category.questions} questions
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          category.progress
                        )}`}
                      >
                        {getStatusLabel(category.progress)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary">{category.description}</p>

                    {/* Progress Bar */}
                    <div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${category.progress}%`,
                            backgroundColor: layerInfo.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        category.progress === 0
                          ? 'bg-burgundy text-white hover:bg-burgundy/90'
                          : category.progress === 100
                          ? 'bg-cream-dark text-text-secondary hover:bg-cream'
                          : 'bg-teal-dark text-white hover:bg-teal-dark/90'
                      }`}
                    >
                      {category.progress === 0
                        ? 'Start Questionnaire'
                        : category.progress === 100
                        ? 'Review Answers'
                        : 'Continue'}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Recommendations */}
      {overallProgress < 100 && (
        <Card>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-dusty-pink flex-shrink-0 flex items-center justify-center text-2xl">
              🌸
            </div>
            <div className="flex-1">
              <h3 className="font-headline font-semibold text-text-primary mb-2">
                Heartie's Recommendation
              </h3>
              {overallProgress < 30 ? (
                <p className="text-text-secondary">
                  Start with <strong>Layer 1: Brand Strategy</strong>. Understanding your customer
                  and position will make everything else easier! 🎯
                </p>
              ) : overallProgress < 70 ? (
                <p className="text-text-secondary">
                  Great progress! Now move to <strong>Layer 2: Marketing Strategy</strong> to
                  define how you'll reach your audience. 🚀
                </p>
              ) : (
                <p className="text-text-secondary">
                  Almost there! Complete <strong>Layer 3: Marketing Plan</strong> to finalize your
                  annual vision and you're ready to execute! 🎉
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Success State */}
      {overallProgress === 100 && (
        <Card>
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-headline font-bold text-text-primary mb-2">
              Strategy Complete!
            </h2>
            <p className="text-text-secondary mb-6">
              You've built a solid strategic foundation. Now you're ready to create powerful
              marketing activities!
            </p>
            <button className="btn-primary">
              Start Planning Activities →
            </button>
          </div>
        </Card>
      )}

      {/* Category Detail Modal (Placeholder for now) */}
      {selectedCategory && (
        <>
          <div
            className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedCategory(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCategory.icon}</span>
                  <h2 className="text-2xl font-headline font-semibold text-text-primary">
                    {selectedCategory.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <p className="text-text-secondary mb-6">{selectedCategory.description}</p>

                <div className="bg-cream-dark rounded-lg p-6 text-center">
                  <span className="text-4xl mb-3 block">📝</span>
                  <h3 className="font-headline font-semibold text-text-primary mb-2">
                    Questionnaire Coming Soon
                  </h3>
                  <p className="text-sm text-text-secondary">
                    This guided questionnaire will help you define your {selectedCategory.name.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
