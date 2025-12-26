import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Textarea, RadioGroup, PhotoUpload } from '@/components/ui';
import type { BusinessType, BusinessStage } from '@/types/auth';

export function ProfileSettings() {
  const { user, updateProfile, uploadProfilePhoto } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    displayName: '',
    fullName: '',
    businessName: '',
    businessDescription: '',
    website: '',
    timezone: 'America/New_York',
    businessType: '' as BusinessType | '',
    businessStage: '' as BusinessStage | '',
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        fullName: user.fullName || '',
        businessName: user.businessName || '',
        businessDescription: user.businessDescription || '',
        website: user.website || '',
        timezone: user.timezone || 'America/New_York',
        businessType: user.businessType || '',
        businessStage: user.businessStage || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveMessage(null);

    const { error } = await updateProfile({
      displayName: formData.displayName || undefined,
      fullName: formData.fullName || undefined,
      businessName: formData.businessName || undefined,
      businessDescription: formData.businessDescription || undefined,
      website: formData.website || undefined,
      timezone: formData.timezone,
      businessType: formData.businessType || undefined,
      businessStage: formData.businessStage || undefined,
    });

    if (error) {
      setSaveMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
    } else {
      setSaveMessage({ type: 'success', text: 'Profile updated!' });
    }

    setIsLoading(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handlePhotoUpload = async (file: File) => {
    const { error } = await uploadProfilePhoto(file);
    if (error) {
      setSaveMessage({ type: 'error', text: 'Failed to upload photo. Please try again.' });
    } else {
      setSaveMessage({ type: 'success', text: 'Photo updated!' });
    }
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-text-primary">Profile Settings</h1>
        <p className="text-text-secondary mt-2">Manage your personal and business information</p>
      </div>

      {saveMessage && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm ${
            saveMessage.type === 'success'
              ? 'bg-success/10 text-success'
              : 'bg-error/10 text-error'
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Profile Photo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-headline text-lg font-semibold text-text-primary mb-4">
            Profile Photo
          </h2>
          <div className="flex items-center gap-6">
            <PhotoUpload
              currentUrl={user?.profilePhotoUrl || undefined}
              onUpload={handlePhotoUpload}
              size="lg"
            />
            <div>
              <p className="text-text-primary font-medium">
                {user?.displayName || user?.email}
              </p>
              <p className="text-text-secondary text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* About You Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-headline text-lg font-semibold text-text-primary mb-6">
            About You
          </h2>

          <div className="space-y-4">
            <Input
              label="Display name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="Sarah"
            />

            <Input
              label="Full name (optional)"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Sarah Chen"
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Timezone
              </label>
              <select
                className="input"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Business Info Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-headline text-lg font-semibold text-text-primary mb-6">
            Your Business
          </h2>

          <div className="space-y-4">
            <Input
              label="Business name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Bloom Coaching"
            />

            <Textarea
              label="What do you do?"
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              placeholder="I help busy moms build sustainable self-care habits"
              rows={3}
            />

            <Input
              label="Website (optional)"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourbusiness.com"
            />
          </div>
        </div>

        {/* Business Type & Stage */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-headline text-lg font-semibold text-text-primary mb-6">
            Business Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
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
                  { value: 'mixed', label: 'Mix of the above', description: 'Multiple business types' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
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
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
