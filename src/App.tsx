import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Calendar } from './pages/Calendar';
import { Goals } from './pages/Goals';
import { Strategy } from './pages/Strategy';
import { Templates } from './pages/Templates';
import { Insights } from './pages/Insights';

const ONBOARDING_KEY = 'heartie_onboarding_completed';

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboardingComplete(true);
  };

  // Allow resetting onboarding in dev mode
  useEffect(() => {
    // @ts-ignore - dev helper
    window.resetOnboarding = () => {
      localStorage.removeItem(ONBOARDING_KEY);
      setOnboardingComplete(false);
    };
  }, []);

  if (!onboardingComplete) {
    return (
      <BrowserRouter>
        <Onboarding onComplete={handleOnboardingComplete} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
