import { useState } from 'react';
import { Modal } from '../ui';
import type { Activity, FunnelStage, Platform, ActivityStatus, ActivityType } from '../../types';
import { FUNNEL_STAGES, CHANNEL_INFO, ACTIVITY_TYPE_INFO, STATUS_INFO } from '../../types';


interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  initialDate?: Date;
}

export function AddActivityModal({
  isOpen,
  onClose,
  onSave,
  initialDate,
}: AddActivityModalProps) {
  const [formData, setFormData] = useState<{
    date: Date;
    title: string;
    content: string;
    funnelStage: FunnelStage | '';
    platform: Platform | '';
    activityType: ActivityType | '';
    status: ActivityStatus;
  }>({
    date: initialDate || new Date(),
    title: '',
    content: '',
    funnelStage: '',
    platform: '',
    activityType: '',
    status: 'idea',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.funnelStage) return;

    onSave({
      date: formData.date,
      title: formData.title,
      content: formData.content,
      funnelStage: formData.funnelStage as FunnelStage,
      platform: formData.platform as Platform,
      activityType: formData.activityType ? formData.activityType as ActivityType : undefined,
      status: formData.status,
    });

    // Reset form
    setFormData({
      date: initialDate || new Date(),
      title: '',
      content: '',
      funnelStage: '',
      platform: '',
      activityType: '',
      status: 'idea',
    });

    onClose();
  };

  const handleClose = () => {
    setFormData({
      date: initialDate || new Date(),
      title: '',
      content: '',
      funnelStage: '',
      platform: '',
      activityType: '',
      status: 'idea',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Activity" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Activity Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Activity Type
          </label>
          <select
            className="input"
            value={formData.activityType}
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
            Date *
          </label>
          <input
            type="date"
            className="input"
            value={formData.date.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
            required
          />
        </div>

        {/* Funnel Stage & Platform - Side by side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Funnel Stage */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Funnel Stage *
            </label>
            <select
              className="input"
              value={formData.funnelStage}
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
              Channel *
            </label>
            <div className="relative">
              <select
                className="input pl-10"
                value={formData.platform}
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
            Title *
          </label>
          <input
            type="text"
            className="input"
            placeholder="Brief description of the activity"
            value={formData.title}
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
            placeholder="Write your content here or use AI to generate..."
            value={formData.content}
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
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ActivityStatus })}
            required
          >
            {Object.entries(STATUS_INFO).map(([key, info]) => (
              <option key={key} value={key}>
                {info.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="button" onClick={handleClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1">
            Add Activity
          </button>
        </div>
      </form>
    </Modal>
  );
}
