-- ====================================
-- Heartie Database Schema for Supabase
-- ====================================

-- NOTE: Supabase provides auth.users table automatically
-- We'll extend it with a public profiles table

-- ====================================
-- USER PROFILES
-- ====================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  business_name TEXT,
  industry TEXT,
  main_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies: Users can only see and edit their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ====================================
-- ACTIVITIES
-- ====================================

CREATE TYPE activity_status AS ENUM ('idea', 'draft', 'ready', 'scheduled', 'complete');
CREATE TYPE funnel_stage AS ENUM ('awareness', 'consideration', 'conversion', 'retention');
CREATE TYPE platform AS ENUM ('linkedin', 'email', 'instagram', 'facebook', 'tiktok', 'blog', 'other');

CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  funnel_stage funnel_stage NOT NULL,
  platform platform NOT NULL,
  content_pillar TEXT,
  status activity_status DEFAULT 'idea',
  linked_weekly_goal_id UUID,
  priority_quadrant TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Activities policies: Users can only see and edit their own activities
CREATE POLICY "Users can view their own activities"
  ON public.activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON public.activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
  ON public.activities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
  ON public.activities FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- GOALS
-- ====================================

CREATE TABLE public.annual_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'revenue', 'linkedin', 'email', 'launches'
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  unit TEXT, -- 'dollars', 'followers', 'subscribers', 'count'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, year, category)
);

-- Enable Row Level Security
ALTER TABLE public.annual_goals ENABLE ROW LEVEL SECURITY;

-- Annual goals policies
CREATE POLICY "Users can view their own annual goals"
  ON public.annual_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own annual goals"
  ON public.annual_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own annual goals"
  ON public.annual_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annual goals"
  ON public.annual_goals FOR DELETE
  USING (auth.uid() = user_id);

CREATE TABLE public.quarterly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL CHECK (quarter >= 1 AND quarter <= 4),
  theme TEXT,
  key_initiatives JSONB, -- Array of {title, description, progress, complete}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, year, quarter)
);

-- Enable Row Level Security
ALTER TABLE public.quarterly_goals ENABLE ROW LEVEL SECURITY;

-- Quarterly goals policies
CREATE POLICY "Users can view their own quarterly goals"
  ON public.quarterly_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quarterly goals"
  ON public.quarterly_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quarterly goals"
  ON public.quarterly_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quarterly goals"
  ON public.quarterly_goals FOR DELETE
  USING (auth.uid() = user_id);

CREATE TABLE public.weekly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_start_date DATE NOT NULL,
  category TEXT NOT NULL, -- 'content', 'engagement', 'email', 'business'
  goal_text TEXT NOT NULL,
  complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.weekly_goals ENABLE ROW LEVEL SECURITY;

-- Weekly goals policies
CREATE POLICY "Users can view their own weekly goals"
  ON public.weekly_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly goals"
  ON public.weekly_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly goals"
  ON public.weekly_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weekly goals"
  ON public.weekly_goals FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- STRATEGY
-- ====================================

CREATE TABLE public.strategy_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id TEXT NOT NULL, -- 'your-customer', 'your-position', etc.
  layer INTEGER NOT NULL CHECK (layer >= 1 AND layer <= 3),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  answers JSONB, -- Stores question/answer pairs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, category_id)
);

-- Enable Row Level Security
ALTER TABLE public.strategy_categories ENABLE ROW LEVEL SECURITY;

-- Strategy categories policies
CREATE POLICY "Users can view their own strategy categories"
  ON public.strategy_categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own strategy categories"
  ON public.strategy_categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own strategy categories"
  ON public.strategy_categories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own strategy categories"
  ON public.strategy_categories FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- METRICS LOGGING
-- ====================================

CREATE TABLE public.metric_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  metric_type TEXT NOT NULL, -- 'engagement', 'reach', 'conversions', 'followers'
  value NUMERIC NOT NULL,
  platform platform,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.metric_logs ENABLE ROW LEVEL SECURITY;

-- Metric logs policies
CREATE POLICY "Users can view their own metric logs"
  ON public.metric_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metric logs"
  ON public.metric_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metric logs"
  ON public.metric_logs FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

CREATE INDEX idx_activities_user_date ON public.activities(user_id, date);
CREATE INDEX idx_activities_user_stage ON public.activities(user_id, funnel_stage);
CREATE INDEX idx_weekly_goals_user_week ON public.weekly_goals(user_id, week_start_date);
CREATE INDEX idx_metric_logs_user_date ON public.metric_logs(user_id, date);

-- ====================================
-- FUNCTIONS
-- ====================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_annual_goals_updated_at BEFORE UPDATE ON public.annual_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quarterly_goals_updated_at BEFORE UPDATE ON public.quarterly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_goals_updated_at BEFORE UPDATE ON public.weekly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategy_categories_updated_at BEFORE UPDATE ON public.strategy_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- FUNCTION TO AUTO-CREATE PROFILE ON SIGNUP
-- ====================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
