import type { Session } from '@supabase/supabase-js';

// Business types matching database constraints
export type BusinessType = 'service' | 'product' | 'digital' | 'mixed';
export type BusinessStage = 'starting' | 'growing' | 'established';
export type SubscriptionTier = 'starter' | 'growth' | 'partner';

// User profile as stored in the profiles table (transformed to camelCase)
export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  fullName: string | null;
  profilePhotoUrl: string | null;

  // Business info
  businessName: string | null;
  businessDescription: string | null;
  website: string | null;
  businessType: BusinessType | null;
  businessStage: BusinessStage | null;

  // Settings
  timezone: string;
  tier: SubscriptionTier;

  // Notifications
  notifyWeeklyReminder: boolean;
  notifyHeartieTips: boolean;
  notifyProductUpdates: boolean;
  notifyCommunity: boolean;

  // Lifecycle
  onboardingComplete: boolean;
  onboardingStep: number;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

// Auth state for the context
export interface AuthState {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Data for signing up (optional fields collected during onboarding)
export interface SignUpData {
  email: string;
  displayName?: string;
  businessName?: string;
}

// Data for updating profile
export interface ProfileUpdateData {
  displayName?: string;
  fullName?: string;
  profilePhotoUrl?: string;
  businessName?: string;
  businessDescription?: string;
  website?: string;
  businessType?: BusinessType;
  businessStage?: BusinessStage;
  timezone?: string;
  notifyWeeklyReminder?: boolean;
  notifyHeartieTips?: boolean;
  notifyProductUpdates?: boolean;
  notifyCommunity?: boolean;
  onboardingComplete?: boolean;
  onboardingStep?: number;
}

// Database row type (snake_case as stored in Supabase)
export interface ProfileRow {
  id: string;
  email: string;
  name: string | null;
  display_name: string | null;
  full_name: string | null;
  profile_photo_url: string | null;
  business_name: string | null;
  business_description: string | null;
  website: string | null;
  business_type: BusinessType | null;
  business_stage: BusinessStage | null;
  industry: string | null;
  main_goal: string | null;
  timezone: string;
  tier: SubscriptionTier;
  notify_weekly_reminder: boolean;
  notify_heartie_tips: boolean;
  notify_product_updates: boolean;
  notify_community: boolean;
  onboarding_complete: boolean;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
  last_active_at: string;
}

// Transform database row to frontend profile
export function transformProfileRow(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    fullName: row.full_name,
    profilePhotoUrl: row.profile_photo_url,
    businessName: row.business_name,
    businessDescription: row.business_description,
    website: row.website,
    businessType: row.business_type,
    businessStage: row.business_stage,
    timezone: row.timezone || 'America/New_York',
    tier: row.tier || 'starter',
    notifyWeeklyReminder: row.notify_weekly_reminder ?? true,
    notifyHeartieTips: row.notify_heartie_tips ?? true,
    notifyProductUpdates: row.notify_product_updates ?? false,
    notifyCommunity: row.notify_community ?? false,
    onboardingComplete: row.onboarding_complete ?? false,
    onboardingStep: row.onboarding_step ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastActiveAt: row.last_active_at,
  };
}

// Transform profile update data to database format
export function transformProfileUpdate(data: ProfileUpdateData): Record<string, unknown> {
  const dbData: Record<string, unknown> = {};

  if (data.displayName !== undefined) dbData.display_name = data.displayName;
  if (data.fullName !== undefined) dbData.full_name = data.fullName;
  if (data.profilePhotoUrl !== undefined) dbData.profile_photo_url = data.profilePhotoUrl;
  if (data.businessName !== undefined) dbData.business_name = data.businessName;
  if (data.businessDescription !== undefined) dbData.business_description = data.businessDescription;
  if (data.website !== undefined) dbData.website = data.website;
  if (data.businessType !== undefined) dbData.business_type = data.businessType;
  if (data.businessStage !== undefined) dbData.business_stage = data.businessStage;
  if (data.timezone !== undefined) dbData.timezone = data.timezone;
  if (data.notifyWeeklyReminder !== undefined) dbData.notify_weekly_reminder = data.notifyWeeklyReminder;
  if (data.notifyHeartieTips !== undefined) dbData.notify_heartie_tips = data.notifyHeartieTips;
  if (data.notifyProductUpdates !== undefined) dbData.notify_product_updates = data.notifyProductUpdates;
  if (data.notifyCommunity !== undefined) dbData.notify_community = data.notifyCommunity;
  if (data.onboardingComplete !== undefined) dbData.onboarding_complete = data.onboardingComplete;
  if (data.onboardingStep !== undefined) dbData.onboarding_step = data.onboardingStep;

  return dbData;
}
