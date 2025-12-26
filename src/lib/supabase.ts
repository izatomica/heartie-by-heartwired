import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client (or null if env vars missing)
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    'Missing Supabase environment variables. ' +
    'The app will run with mock data only. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable database features.'
  );
}

// Export the client (may be null if not configured)
export const supabase = supabaseClient;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => supabase !== null;

// Helper to throw if Supabase is not configured
const requireSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  }
  return supabase;
};

// Auth helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, userData?: { name?: string; businessName?: string; industry?: string; mainGoal?: string }) => {
    const client = requireSupabase();
    const { data, error } = await client.auth.signUp({
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
    const client = requireSupabase();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const client = requireSupabase();
    const { error } = await client.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getCurrentUser: async () => {
    const client = requireSupabase();
    const { data: { user }, error } = await client.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Get current session
  getSession: async () => {
    const client = requireSupabase();
    const { data: { session }, error } = await client.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const client = requireSupabase();
    return client.auth.onAuthStateChange(callback);
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
      const client = requireSupabase();
      const { data, error } = await client
        .from('activities')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Activity[];
    },

    create: async (activity: Omit<Activity, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const client = requireSupabase();
      const { data, error } = await client
        .from('activities')
        .insert([activity])
        .select()
        .single();

      if (error) throw error;
      return data as Activity;
    },

    update: async (id: string, updates: Partial<Activity>) => {
      const client = requireSupabase();
      const { data, error } = await client
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Activity;
    },

    delete: async (id: string) => {
      const client = requireSupabase();
      const { error } = await client
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  },

  // Weekly Goals
  weeklyGoals: {
    getAll: async (weekStartDate?: string) => {
      const client = requireSupabase();
      let query = client
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
      const client = requireSupabase();
      const { data, error } = await client
        .from('weekly_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      return data as WeeklyGoal;
    },

    update: async (id: string, updates: Partial<WeeklyGoal>) => {
      const client = requireSupabase();
      const { data, error } = await client
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
      const client = requireSupabase();
      let query = client
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
      const client = requireSupabase();
      const { data, error } = await client
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
      const client = requireSupabase();
      let query = client
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
      const client = requireSupabase();
      const { data, error } = await client
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
