import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Activity, FunnelStage, Platform, ActivityStatus, ActivityType } from '../types';
import { FUNNEL_STAGES, CHANNEL_INFO, ACTIVITY_TYPE_INFO, STATUS_INFO } from '../types';

const ACTIVITIES_STORAGE_KEY = 'heartie_activities';

export function ActivityEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Load activity from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (saved && id) {
      try {
        const activities = JSON.parse(saved);
        const found = activities.find((a: Activity) => a.id === id);
        if (found) {
          const loadedActivity = {
            ...found,
            date: new Date(found.date),
            createdAt: new Date(found.createdAt),
            updatedAt: new Date(found.updatedAt),
          };
          setActivity(loadedActivity);
          setFormData(loadedActivity);
        }
      } catch (e) {
        console.error('Failed to load activity:', e);
      }
    }
  }, [id]);

  // Track unsaved changes
  useEffect(() => {
    if (activity && formData && Object.keys(formData).length > 0) {
      const activityStr = JSON.stringify({
        ...activity,
        date: activity.date instanceof Date ? activity.date.toISOString() : activity.date,
      });
      const formDataStr = JSON.stringify({
        ...formData,
        date: formData.date instanceof Date ? formData.date.toISOString() : formData.date,
      });
      setHasUnsavedChanges(activityStr !== formDataStr);
    }
  }, [activity, formData]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = () => {
    if (!id || !formData) return;

    setIsSaving(true);

    const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (saved) {
      try {
        const activities = JSON.parse(saved);
        const updatedActivities = activities.map((a: Activity) =>
          a.id === id ? { ...formData, updatedAt: new Date().toISOString() } : a
        );
        localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updatedActivities));

        const updatedActivity = { ...formData, updatedAt: new Date() } as Activity;
        setActivity(updatedActivity);
        setHasUnsavedChanges(false);
        setSaveMessage('Changes saved!');
        setTimeout(() => setSaveMessage(null), 2000);
      } catch (e) {
        console.error('Failed to save activity:', e);
        setSaveMessage('Failed to save');
        setTimeout(() => setSaveMessage(null), 2000);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this activity?')) {
      const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (saved) {
        try {
          const activities = JSON.parse(saved);
          const updatedActivities = activities.filter((a: Activity) => a.id !== id);
          localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updatedActivities));
          navigate('/calendar');
        } catch (e) {
          console.error('Failed to delete activity:', e);
        }
      }
    }
  };

  if (!activity) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-headline font-semibold text-text-primary mb-4">
            Activity not found
          </h1>
          <p className="text-text-secondary mb-6">
            This activity may have been deleted or the link is invalid.
          </p>
          <button
            onClick={() => navigate('/calendar')}
            className="btn-primary"
          >
            Back to Calendar
          </button>
        </div>
      </div>
    );
  }

  const characterCount = (formData.content || '').length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-border z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (hasUnsavedChanges) {
                  if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                    navigate('/calendar');
                  }
                } else {
                  navigate('/calendar');
                }
              }}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <iconify-icon icon="lucide:arrow-left" width="20" height="20"></iconify-icon>
              <span className="font-medium">Back to Calendar</span>
            </button>
          </div>

          <h1 className="text-lg font-headline font-semibold text-text-primary truncate max-w-md">
            {formData.title || 'Untitled Activity'}
          </h1>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className="text-sm text-teal-dark font-medium">{saveMessage}</span>
            )}
            {hasUnsavedChanges && !saveMessage && (
              <span className="text-sm text-text-muted">Unsaved changes</span>
            )}
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPreviewMode
                  ? 'bg-teal-dark text-white'
                  : 'bg-cream-dark text-text-secondary hover:bg-cream'
              }`}
            >
              <iconify-icon icon={isPreviewMode ? 'lucide:eye-off' : 'lucide:eye'} width="18" height="18"></iconify-icon>
              <span className="font-medium">{isPreviewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <iconify-icon icon="lucide:save" width="18" height="18"></iconify-icon>
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Metadata */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-headline font-semibold text-text-primary mb-6">
                Activity Details
              </h2>

              {/* Activity Type */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Activity Type
                </label>
                <select
                  className="input"
                  value={formData.activityType || ''}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value as ActivityType })}
                  disabled={isPreviewMode}
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
              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                  disabled={isPreviewMode}
                />
              </div>

              {/* Funnel Stage */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Funnel Stage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(FUNNEL_STAGES).map(([stage, info]) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => !isPreviewMode && setFormData({ ...formData, funnelStage: stage as FunnelStage })}
                      disabled={isPreviewMode}
                      className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-left disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: formData.funnelStage === stage ? info.color : 'white',
                        borderColor: info.color,
                        color: formData.funnelStage === stage ? '#FFFFFF' : 'var(--color-text-primary)',
                        opacity: isPreviewMode ? 0.7 : 1,
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

              {/* Channel */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Channel
                </label>
                <select
                  className="input"
                  value={formData.platform || ''}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                  disabled={isPreviewMode}
                >
                  <option value="">Select channel</option>
                  {Object.entries(CHANNEL_INFO).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.icon} {info.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Brief description"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={isPreviewMode}
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(STATUS_INFO).map(([key, info]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => !isPreviewMode && setFormData({ ...formData, status: key as ActivityStatus })}
                      disabled={isPreviewMode}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all disabled:cursor-not-allowed ${
                        formData.status === key
                          ? 'bg-teal-dark text-white'
                          : 'bg-cream-dark text-text-secondary hover:bg-cream'
                      }`}
                      style={{ opacity: isPreviewMode ? 0.7 : 1 }}
                    >
                      {info.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-error text-error hover:bg-error-light transition-colors"
            >
              <iconify-icon icon="lucide:trash-2" width="18" height="18"></iconify-icon>
              <span className="font-medium">Delete Activity</span>
            </button>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-headline font-semibold text-text-primary">
                  {isPreviewMode ? 'Content Preview' : 'Content'}
                </h2>
                <span className="text-sm text-text-muted">
                  {characterCount} characters
                </span>
              </div>

              {isPreviewMode ? (
                <div className="min-h-[400px] p-4 bg-cream rounded-lg">
                  {formData.content ? (
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {formData.content}
                    </div>
                  ) : (
                    <p className="text-text-muted italic">No content to preview</p>
                  )}
                </div>
              ) : (
                <>
                  <textarea
                    className="textarea min-h-[400px] resize-y"
                    placeholder="Write your content here..."
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />

                  {/* AI Generation Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button type="button" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <iconify-icon icon="lucide:sparkles" width="18" height="18"></iconify-icon>
                      <span>Generate with AI</span>
                    </button>
                    <button type="button" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <iconify-icon icon="lucide:file-text" width="18" height="18"></iconify-icon>
                      <span>Use Template</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
