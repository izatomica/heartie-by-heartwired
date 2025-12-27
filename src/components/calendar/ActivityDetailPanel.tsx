import { useEffect, useState } from 'react';
import type { Activity, FunnelStage, Platform, ActivityStatus, ActivityType } from '../../types';
import { FUNNEL_STAGES, CHANNEL_INFO, ACTIVITY_TYPE_INFO, STATUS_INFO } from '../../types';


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

  const handleOpenFullEditor = () => {
    window.open(`/activity/${activity.id}`, '_blank');
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
        <div className="sticky top-0 bg-white border-b border-border px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl font-headline font-semibold text-text-primary">
            Edit Activity
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Activity Type
            </label>
            <select
              className="input"
              value={formData.activityType || ''}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value as ActivityType })}
            >
              <option value="">Select activity type</option>
              {Object.entries(ACTIVITY_TYPE_INFO).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.name}
                </option>
              ))}
            </select>
          </div>

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

          {/* Funnel Stage & Platform - Side by side */}
          <div className="grid grid-cols-2 gap-3">
            {/* Funnel Stage */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Funnel Stage
              </label>
              <select
                className="input"
                value={formData.funnelStage || ''}
                onChange={(e) => setFormData({ ...formData, funnelStage: e.target.value as FunnelStage })}
                required
              >
                <option value="">Select stage</option>
                {Object.entries(FUNNEL_STAGES).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Channel */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Channel
              </label>
              <div className="relative">
                <select
                  className="input pl-10"
                  value={formData.platform || ''}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                  required
                >
                  <option value="">Select</option>
                  {Object.entries(CHANNEL_INFO).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.name}
                    </option>
                  ))}
                </select>
                {formData.platform && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                    {CHANNEL_INFO[formData.platform]?.icon}
                  </span>
                )}
              </div>
            </div>
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
              rows={4}
              placeholder="Write your content here..."
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          {/* AI Generation Buttons */}
          <div className="flex gap-3">
            <button type="button" className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:sparkles" width="16" height="16"></iconify-icon>
              Generate with AI
            </button>
            <button type="button" className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:file-text" width="16" height="16"></iconify-icon>
              Use Template
            </button>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <select
              className="input"
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ActivityStatus })}
              required
            >
              <option value="">Select status</option>
              {Object.entries(STATUS_INFO).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.name}
                </option>
              ))}
            </select>
          </div>

          {/* Open full view window */}
          <div className="flex items-center justify-between py-2">
            <label className="text-sm font-medium text-text-primary">
              Open full view window
            </label>
            <button
              type="button"
              onClick={handleOpenFullEditor}
              className="p-2 text-text-secondary hover:text-burgundy hover:bg-cream-dark rounded-lg transition-colors"
              aria-label="Open in new window"
              title="Open full editor in new tab"
            >
              <iconify-icon icon="lucide:external-link" width="20" height="20"></iconify-icon>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-error hover:bg-error-light transition-colors"
            >
              <iconify-icon icon="lucide:trash-2" width="18" height="18"></iconify-icon>
              Delete
            </button>
            <button type="submit" className="btn-primary flex-1">
              Save Changes
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
