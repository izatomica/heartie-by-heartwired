-- ====================================
-- Migration: Create profiles table for full auth system
-- This creates the table if it doesn't exist, or adds columns if it does
-- ====================================

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  display_name TEXT,
  full_name TEXT,
  profile_photo_url TEXT,
  business_description TEXT,
  website TEXT,
  business_type TEXT CHECK (business_type IN ('service', 'product', 'digital', 'mixed')),
  business_stage TEXT CHECK (business_stage IN ('starting', 'growing', 'established')),
  timezone TEXT DEFAULT 'America/New_York',
  tier TEXT DEFAULT 'starter' CHECK (tier IN ('starter', 'growth', 'partner')),
  notify_weekly_reminder BOOLEAN DEFAULT true,
  notify_heartie_tips BOOLEAN DEFAULT true,
  notify_product_updates BOOLEAN DEFAULT false,
  notify_community BOOLEAN DEFAULT false,
  onboarding_complete BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if they don't exist (for existing databases)
-- These will silently fail if columns already exist from CREATE TABLE above
DO $$
BEGIN
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_photo_url TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_description TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York';
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'starter';
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notify_weekly_reminder BOOLEAN DEFAULT true;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notify_heartie_tips BOOLEAN DEFAULT true;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notify_product_updates BOOLEAN DEFAULT false;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notify_community BOOLEAN DEFAULT false;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW();

  -- Add columns with CHECK constraints separately (IF NOT EXISTS doesn't work with CHECK in same statement)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'business_type') THEN
    ALTER TABLE public.profiles ADD COLUMN business_type TEXT CHECK (business_type IN ('service', 'product', 'digital', 'mixed'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'business_stage') THEN
    ALTER TABLE public.profiles ADD COLUMN business_stage TEXT CHECK (business_stage IN ('starting', 'growing', 'established'));
  END IF;
END $$;

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

-- Create trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================
-- Row Level Security (RLS)
-- ====================================

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Allow the trigger to insert profiles (service role)
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;
CREATE POLICY "Service role can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

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
