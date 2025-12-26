import { useState } from 'react';
import { useSupabaseHealth } from '../hooks/useSupabaseHealth';

export function SupabaseHealthIndicator() {
  const { health, checkHealth } = useSupabaseHealth();
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = () => {
    switch (health.status) {
      case 'connected':
        return 'bg-green-500';
      case 'checking':
        return 'bg-yellow-500 animate-pulse';
      case 'disconnected':
        return 'bg-red-500';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (health.status) {
      case 'connected':
        return '✓';
      case 'checking':
        return '⋯';
      case 'disconnected':
        return '✕';
      case 'error':
        return '!';
      default:
        return '?';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {expanded && (
        <div className="mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Database Status</h3>
            <button
              onClick={() => setExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              <span className="font-medium">{health.message}</span>
            </div>

            {health.lastChecked && (
              <p className="text-xs text-gray-500">
                Last checked: {health.lastChecked.toLocaleTimeString()}
              </p>
            )}

            {health.error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
                <p className="text-red-800 font-medium mb-1">Error:</p>
                <p className="text-red-700">{health.error}</p>
              </div>
            )}

            <button
              onClick={checkHealth}
              className="w-full mt-2 px-3 py-1.5 bg-teal-dark text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors"
            >
              Check Now
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          ${getStatusColor()}
          w-12 h-12 rounded-full shadow-lg
          flex items-center justify-center
          text-white font-bold text-lg
          hover:scale-110 transition-transform
          border-2 border-white
        `}
        title={health.message}
      >
        {getStatusIcon()}
      </button>
    </div>
  );
}
