import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  UserProfile,
  AuthState,
  ProfileUpdateData,
  ProfileRow,
} from '@/types/auth';
import { transformProfileRow, transformProfileUpdate } from '@/types/auth';

interface AuthContextType extends AuthState {
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<{ error: Error | null }>;
  uploadProfilePhoto: (file: File) => Promise<{ url: string | null; error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Fetch user profile from profiles table
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return transformProfileRow(data as ProfileRow);
  }, []);

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setState({
            user: profile,
            session,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchProfile(session.user.id);
          setState({
            user: profile,
            session,
            isLoading: false,
            isAuthenticated: true,
          });
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setState(prev => ({ ...prev, session }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // Sign in with magic link
  const signInWithMagicLink = async (email: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Unknown error') };
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Unknown error') };
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  // Update profile
  const updateProfile = async (data: ProfileUpdateData): Promise<{ error: Error | null }> => {
    if (!state.user?.id) {
      return { error: new Error('No user logged in') };
    }

    try {
      const dbData = transformProfileUpdate(data);

      const { error } = await supabase
        .from('profiles')
        .update(dbData)
        .eq('id', state.user.id);

      if (error) {
        return { error: new Error(error.message) };
      }

      // Update local state optimistically
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
      }));

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Unknown error') };
    }
  };

  // Upload profile photo
  const uploadProfilePhoto = async (file: File): Promise<{ url: string | null; error: Error | null }> => {
    if (!state.user?.id) {
      return { url: null, error: new Error('No user logged in') };
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${state.user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        return { url: null, error: new Error(uploadError.message) };
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      // Update profile with new photo URL
      await updateProfile({ profilePhotoUrl: publicUrl });

      return { url: publicUrl, error: null };
    } catch (err) {
      return { url: null, error: err instanceof Error ? err : new Error('Unknown error') };
    }
  };

  // Refresh profile from database
  const refreshProfile = async (): Promise<void> => {
    if (!state.user?.id) return;

    const profile = await fetchProfile(state.user.id);
    if (profile) {
      setState(prev => ({ ...prev, user: profile }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signInWithMagicLink,
        signInWithGoogle,
        signOut,
        updateProfile,
        uploadProfilePhoto,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
