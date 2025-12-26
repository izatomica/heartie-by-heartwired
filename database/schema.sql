-- ====================================
-- Heartie Database Schema for PostgreSQL (Railway)
-- ====================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- USERS & AUTHENTICATION
-- ====================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  business_name TEXT,
  industry TEXT,
  main_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- ACTIVITIES
-- ====================================

CREATE TYPE activity_status AS ENUM ('idea', 'draft', 'ready', 'scheduled', 'complete');
CREATE TYPE funnel_stage AS ENUM ('awareness', 'consideration', 'conversion', 'retention');
CREATE TYPE platform AS ENUM ('linkedin', 'email', 'instagram', 'facebook', 'tiktok', 'blog', 'other');

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
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

-- ====================================
-- GOALS
-- ====================================

CREATE TABLE annual_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'revenue', 'linkedin', 'email', 'launches'
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  unit TEXT, -- 'dollars', 'followers', 'subscribers', 'count'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, year, category)
);

CREATE TABLE quarterly_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL CHECK (quarter >= 1 AND quarter <= 4),
  theme TEXT,
  key_initiatives JSONB, -- Array of {title, description, progress, complete}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, year, quarter)
);

CREATE TABLE weekly_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  week_start_date DATE NOT NULL,
  category TEXT NOT NULL, -- 'content', 'engagement', 'email', 'business'
  goal_text TEXT NOT NULL,
  complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- STRATEGY
-- ====================================

CREATE TABLE strategy_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_id TEXT NOT NULL, -- 'your-customer', 'your-position', etc.
  layer INTEGER NOT NULL CHECK (layer >= 1 AND layer <= 3),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  answers JSONB, -- Stores question/answer pairs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, category_id)
);

-- ====================================
-- METRICS LOGGING
-- ====================================

CREATE TABLE metric_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  metric_type TEXT NOT NULL, -- 'engagement', 'reach', 'conversions', 'followers'
  value NUMERIC NOT NULL,
  platform platform,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_activities_user_date ON activities(user_id, date);
CREATE INDEX idx_activities_user_stage ON activities(user_id, funnel_stage);
CREATE INDEX idx_weekly_goals_user_week ON weekly_goals(user_id, week_start_date);
CREATE INDEX idx_metric_logs_user_date ON metric_logs(user_id, date);

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
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_annual_goals_updated_at BEFORE UPDATE ON annual_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quarterly_goals_updated_at BEFORE UPDATE ON quarterly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weekly_goals_updated_at BEFORE UPDATE ON weekly_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategy_categories_updated_at BEFORE UPDATE ON strategy_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
