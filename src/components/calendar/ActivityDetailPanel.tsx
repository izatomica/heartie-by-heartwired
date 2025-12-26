import { useEffect, useState } from 'react';
import type { Activity, FunnelStage, Platform, ActivityStatus } from '../../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../../types';

interface ActivityDetailPanelProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
}

export function ActivityDetailPanel({
  activity,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: ActivityDetailPanelProps) {
  const [formData, setFormData] = useState<Partial<Activity>>({});

  useEffect(() => {
    if (activity) {
      setFormData(activity);
    }
  }, [activity]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !activity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      onSave(formData as Activity);
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      onDelete(activity.id);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-40"
        onClick={onClose}
        style={{ animation: 'fadeIn 200ms ease-out' }}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-white shadow-xl z-50 overflow-y-auto"
        style={{ animation: 'slideInRight 300ms ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-headline font-semibold text-text-primary">
            Edit Activity
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date
            </label>
            <input
              type="date"
              className="input"
              value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              required
            />
          </div>

          {/* Funnel Stage */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Funnel Stage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(FUNNEL_STAGES).map(([stage, info]) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setFormData({ ...formData, funnelStage: stage as FunnelStage })}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-left"
                  style={{
                    backgroundColor: formData.funnelStage === stage ? info.color : 'white',
                    borderColor: info.color,
                    color: formData.funnelStage === stage ? '#FFFFFF' : 'var(--color-text-primary)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>{info.emoji}</span>
                    <span>{info.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Platform
            </label>
            <select
              className="input"
              value={formData.platform || ''}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
              required
            >
              <option value="">Select platform</option>
              {Object.entries(PLATFORM_INFO).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.icon} {info.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content Pillar */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Content Pillar (optional)
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Education, Behind-the-scenes"
              value={formData.contentPillar || ''}
              onChange={(e) => setFormData({ ...formData, contentPillar: e.target.value })}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Title
            </label>
            <input
              type="text"
              className="input"
              placeholder="Brief description of the activity"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Content
            </label>
            <textarea
              className="textarea"
              rows={6}
              placeholder="Write your content here..."
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          {/* AI Generation Buttons */}
          <div className="flex gap-2">
            <button type="button" className="btn-secondary flex-1 text-sm">
              ✨ Generate with AI
            </button>
            <button type="button" className="btn-secondary flex-1 text-sm">
              📄 Use Template
            </button>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['idea', 'draft', 'ready', 'complete'] as ActivityStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, status })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.status === status
                      ? 'bg-teal-dark text-white'
                      : 'bg-cream-dark text-text-secondary hover:bg-cream'
                  }`}
                >
                  {status === 'idea' && '○'}
                  {status === 'draft' && '●'}
                  {status === 'ready' && '●'}
                  {status === 'complete' && '✓'}
                  {' '}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button type="submit" className="btn-primary flex-1">
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-ghost text-error hover:bg-error-light"
            >
              🗑️ Delete
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
