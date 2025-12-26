import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, userData?: { name?: string; businessName?: string; industry?: string; mainGoal?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database type definitions (you can expand these as needed)
export type Activity = {
  id: string;
  user_id: string;
  date: string;
  title: string;
  content: string | null;
  funnel_stage: 'awareness' | 'consideration' | 'conversion' | 'retention';
  platform: 'linkedin' | 'email' | 'instagram' | 'facebook' | 'tiktok' | 'blog' | 'other';
  content_pillar: string | null;
  status: 'idea' | 'draft' | 'ready' | 'scheduled' | 'complete';
  linked_weekly_goal_id: string | null;
  priority_quadrant: string | null;
  created_at: string;
  updated_at: string;
};

export type WeeklyGoal = {
  id: string;
  user_id: string;
  week_start_date: string;
  category: 'content' | 'engagement' | 'email' | 'business';
  goal_text: string;
  complete: boolean;
  created_at: string;
  updated_at: string;
};

export type AnnualGoal = {
  id: string;
  user_id: string;
  year: number;
  category: string;
  target_value: number;
  current_value: number;
  unit: string;
  created_at: string;
  updated_at: string;
};

export type QuarterlyGoal = {
  id: string;
  user_id: string;
  year: number;
  quarter: number;
  theme: string | null;
  key_initiatives: any;
  created_at: string;
  updated_at: string;
};

// Database helpers
export const db = {
  // Activities
  activities: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Activity[];
    },

    create: async (activity: Omit<Activity, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('activities')
        .insert([activity])
        .select()
        .single();

      if (error) throw error;
      return data as Activity;
    },

    update: async (id: string, updates: Partial<Activity>) => {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Activity;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  },

  // Weekly Goals
  weeklyGoals: {
    getAll: async (weekStartDate?: string) => {
      let query = supabase
        .from('weekly_goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (weekStartDate) {
        query = query.eq('week_start_date', weekStartDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as WeeklyGoal[];
    },

    create: async (goal: Omit<WeeklyGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('weekly_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      return data as WeeklyGoal;
    },

    update: async (id: string, updates: Partial<WeeklyGoal>) => {
      const { data, error } = await supabase
        .from('weekly_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as WeeklyGoal;
    }
  },

  // Annual Goals
  annualGoals: {
    getAll: async (year?: number) => {
      let query = supabase
        .from('annual_goals')
        .select('*')
        .order('year', { ascending: false });

      if (year) {
        query = query.eq('year', year);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AnnualGoal[];
    },

    upsert: async (goal: Omit<AnnualGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('annual_goals')
        .upsert([goal], {
          onConflict: 'user_id,year,category'
        })
        .select()
        .single();

      if (error) throw error;
      return data as AnnualGoal;
    }
  },

  // Quarterly Goals
  quarterlyGoals: {
    getAll: async (year?: number, quarter?: number) => {
      let query = supabase
        .from('quarterly_goals')
        .select('*')
        .order('year', { ascending: false })
        .order('quarter', { ascending: false });

      if (year) {
        query = query.eq('year', year);
      }
      if (quarter) {
        query = query.eq('quarter', quarter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as QuarterlyGoal[];
    },

    upsert: async (goal: Omit<QuarterlyGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quarterly_goals')
        .upsert([goal], {
          onConflict: 'user_id,year,quarter'
        })
        .select()
        .single();

      if (error) throw error;
      return data as QuarterlyGoal;
    }
  }
};
