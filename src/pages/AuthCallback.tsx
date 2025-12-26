import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash (Supabase handles this automatically)
        const { error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          setError('There was a problem signing you in. Please try again.');
        }
      } catch (err) {
        console.error('Auth callback exception:', err);
        setError('There was a problem signing you in. Please try again.');
      }
    };

    handleCallback();
  }, []);

  // Once user is loaded, redirect appropriately
  useEffect(() => {
    if (!isLoading && user) {
      if (!user.onboardingComplete) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="text-4xl">🌸</span>
            <div>
              <h1 className="text-xl font-headline font-bold text-text-primary">Heartie</h1>
              <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">😕</span>
            </div>

            <h1 className="font-headline text-xl font-semibold text-text-primary mb-3">
              Something went wrong
            </h1>

            <p className="text-text-secondary mb-6">{error}</p>

            <Link
              to="/login"
              className="inline-block bg-burgundy text-white px-6 py-3 rounded-lg font-medium hover:bg-burgundy-dark transition-colors"
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="text-4xl">🌸</span>
          <div>
            <h1 className="text-xl font-headline font-bold text-text-primary">Heartie</h1>
            <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-burgundy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Signing you in...</p>
        </div>
      </div>
    </div>
  );
}
