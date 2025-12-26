-- ====================================
-- Migration: Extend profiles table for full auth system
-- Run this on existing databases that have the base schema
-- ====================================

-- Add new columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
  ADD COLUMN IF NOT EXISTS business_description TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IN ('service', 'product', 'digital', 'mixed')),
  ADD COLUMN IF NOT EXISTS business_stage TEXT CHECK (business_stage IN ('starting', 'growing', 'established')),
  ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York',
  ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'starter' CHECK (tier IN ('starter', 'growth', 'partner')),
  ADD COLUMN IF NOT EXISTS notify_weekly_reminder BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_heartie_tips BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_product_updates BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS notify_community BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW();

-- Migrate existing name column to display_name if display_name is null
UPDATE public.profiles
SET display_name = name
WHERE display_name IS NULL AND name IS NOT NULL;

-- Update the handle_new_user function to include display_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================================
-- Storage bucket for profile photos
-- ====================================

-- Create storage bucket for profile photos (run in Supabase SQL editor)
-- Note: This may need to be run separately as storage operations
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('profile-photos', 'profile-photos', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile photos
-- Users can upload their own photos (folder structure: user_id/filename)
-- CREATE POLICY "Users can upload own photo"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'profile-photos'
--   AND auth.uid()::text = (storage.foldername(name))[1]
-- );

-- Public read access to profile photos
-- CREATE POLICY "Public can view profile photos"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'profile-photos');

-- Users can update their own photos
-- CREATE POLICY "Users can update own photo"
-- ON storage.objects FOR UPDATE
-- USING (
--   bucket_id = 'profile-photos'
--   AND auth.uid()::text = (storage.foldername(name))[1]
-- );

-- Users can delete their own photos
-- CREATE POLICY "Users can delete own photo"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'profile-photos'
--   AND auth.uid()::text = (storage.foldername(name))[1]
-- );
