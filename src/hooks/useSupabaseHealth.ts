import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type ConnectionStatus = 'checking' | 'connected' | 'disconnected' | 'error';

interface HealthStatus {
  status: ConnectionStatus;
  message: string;
  lastChecked: Date | null;
  error?: string;
}

export function useSupabaseHealth(checkInterval = 30000) {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'checking',
    message: 'Checking connection...',
    lastChecked: null,
  });

  const checkHealth = async () => {
    try {
      // Test 1: Check if Supabase client is configured
      if (!supabase) {
        setHealth({
          status: 'error',
          message: 'Supabase client not initialized',
          lastChecked: new Date(),
          error: 'Missing configuration',
        });
        return;
      }

      // Test 2: Try to query the database (this will fail gracefully if not connected)
      const { error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        // If error is about missing table, connection is OK but schema not set up
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          setHealth({
            status: 'connected',
            message: 'Connected (schema not set up)',
            lastChecked: new Date(),
            error: 'Database tables not created yet',
          });
        } else {
          setHealth({
            status: 'disconnected',
            message: 'Connection failed',
            lastChecked: new Date(),
            error: error.message,
          });
        }
      } else {
        setHealth({
          status: 'connected',
          message: 'Connected to Supabase',
          lastChecked: new Date(),
        });
      }
    } catch (error) {
      setHealth({
        status: 'error',
        message: 'Health check failed',
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    // Check immediately on mount
    checkHealth();

    // Set up periodic checks
    const interval = setInterval(checkHealth, checkInterval);

    return () => clearInterval(interval);
  }, [checkInterval]);

  return { health, checkHealth };
}
