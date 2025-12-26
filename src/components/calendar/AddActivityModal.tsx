import { useState } from 'react';
import { Modal } from '../ui';
import type { Activity, FunnelStage, Platform, ActivityStatus } from '../../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../../types';

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
    funnelStage: FunnelStage;
    platform: Platform | '';
    contentPillar: string;
    status: ActivityStatus;
  }>({
    date: initialDate || new Date(),
    title: '',
    content: '',
    funnelStage: 'awareness',
    platform: '',
    contentPillar: '',
    status: 'idea',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform) return;

    onSave({
      date: formData.date,
      title: formData.title,
      content: formData.content,
      funnelStage: formData.funnelStage,
      platform: formData.platform as Platform,
      contentPillar: formData.contentPillar || undefined,
      status: formData.status,
    });

    // Reset form
    setFormData({
      date: initialDate || new Date(),
      title: '',
      content: '',
      funnelStage: 'awareness',
      platform: '',
      contentPillar: '',
      status: 'idea',
    });

    onClose();
  };

  const handleClose = () => {
    setFormData({
      date: initialDate || new Date(),
      title: '',
      content: '',
      funnelStage: 'awareness',
      platform: '',
      contentPillar: '',
      status: 'idea',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Activity" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Funnel Stage */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Funnel Stage *
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
                  <div>
                    <div className="font-semibold">{info.name}</div>
                    <div className="text-xs opacity-90">{info.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Platform *
          </label>
          <select
            className="input"
            value={formData.platform}
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
            placeholder="e.g., Education, Behind-the-scenes, Social proof"
            value={formData.contentPillar}
            onChange={(e) => setFormData({ ...formData, contentPillar: e.target.value })}
          />
          <p className="text-xs text-text-muted mt-1">
            Group similar content together for better organization
          </p>
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
            rows={6}
            placeholder="Write your content here or use AI to generate..."
            value={formData.content}
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
            {(['idea', 'draft', 'ready'] as ActivityStatus[]).map((status) => (
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
                {status === 'idea' && '○ '}
                {status === 'draft' && '● '}
                {status === 'ready' && '● '}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
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
