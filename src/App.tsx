import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Onboarding } from './components/Onboarding';
import { SupabaseHealthIndicator } from './components/SupabaseHealthIndicator';

// Auth pages
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { AuthCallback } from './pages/AuthCallback';

// App pages
import { Dashboard } from './pages/Dashboard';
import { Calendar } from './pages/Calendar';
import { Goals } from './pages/Goals';
import { Strategy } from './pages/Strategy';
import { Templates } from './pages/Templates';
import { Insights } from './pages/Insights';
import { ProfileSettings } from './pages/settings/ProfileSettings';
import { ActivityEditor } from './pages/ActivityEditor';

// Loading spinner component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-4xl">🌸</span>
          <div>
            <h1 className="text-xl font-headline font-bold text-text-primary">Heartie</h1>
            <p className="text-xs text-text-muted">Marketing Planner by Heartwired</p>
          </div>
        </div>
        <div className="w-10 h-10 border-4 border-burgundy border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Auth route wrapper (redirects to app if already authenticated)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    // If user hasn't completed onboarding, redirect to onboarding
    if (user && !user.onboardingComplete) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Allow resetting onboarding in dev mode
  useEffect(() => {
    // @ts-expect-error - dev helper
    window.resetOnboarding = () => {
      console.log('To reset onboarding, call updateProfile({ onboardingComplete: false, onboardingStep: 0 })');
    };
  }, []);

  if (isLoading) {
    return (
      <BrowserRouter>
        <LoadingScreen />
        <SupabaseHealthIndicator />
      </BrowserRouter>
    );
  }

  // Not authenticated - show auth pages
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <SupabaseHealthIndicator />
      </BrowserRouter>
    );
  }

  // Authenticated but onboarding not complete - show onboarding
  if (user && !user.onboardingComplete) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
        <SupabaseHealthIndicator />
      </BrowserRouter>
    );
  }

  // Authenticated and onboarding complete - show app
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-page editor - outside Layout for focused editing */}
        <Route path="/activity/:id" element={<ProtectedRoute><ActivityEditor /></ProtectedRoute>} />

        {/* All other routes inside Layout */}
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/strategy" element={<ProtectedRoute><Strategy /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/settings/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/onboarding" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <SupabaseHealthIndicator />
    </BrowserRouter>
  );
}

export default App;
