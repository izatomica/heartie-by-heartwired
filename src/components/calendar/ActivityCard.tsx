import type { Activity } from '../../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const stageInfo = FUNNEL_STAGES[activity.funnelStage];
  const platformInfo = PLATFORM_INFO[activity.platform];

  const statusConfig = {
    idea: { bg: '#F5F5F5', text: '#9B9B9B', dot: '○' },
    draft: { bg: 'var(--color-warning-light)', text: 'var(--color-warning)', dot: '●' },
    ready: { bg: 'var(--color-success-light)', text: 'var(--color-success)', dot: '●' },
    scheduled: { bg: 'var(--color-info-light)', text: 'var(--color-info)', dot: '●' },
    complete: { bg: 'var(--color-success-light)', text: 'var(--color-success)', dot: '✓' },
  };

  const config = statusConfig[activity.status];

  return (
    <div
      className="bg-white rounded-md border-l-4 p-3 shadow-xs hover:shadow-sm transition-shadow cursor-pointer"
      style={{ borderColor: stageInfo.color }}
      onClick={onClick}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-base">{platformInfo.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">
            {activity.title}
          </h4>
          {activity.contentPillar && (
            <p className="text-xs text-text-muted truncate">
              {activity.contentPillar}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: config.bg,
            color: config.text,
          }}
        >
          {config.dot} {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
        </span>
      </div>
    </div>
  );
}
