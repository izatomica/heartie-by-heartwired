import { useState, useMemo, useCallback } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
} from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, useDroppable, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Activity, FunnelStage, Platform, ActivityStatus } from '../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../types';
import { mockActivities } from '../lib/mockData';
import { ActivityDetailPanel } from '../components/calendar/ActivityDetailPanel';
import { AddActivityModal } from '../components/calendar/AddActivityModal';

// Icons as SVG components
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const FunnelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path>
  </svg>
);

const GripIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="5" r="1"></circle>
    <circle cx="9" cy="12" r="1"></circle>
    <circle cx="9" cy="19" r="1"></circle>
    <circle cx="15" cy="5" r="1"></circle>
    <circle cx="15" cy="12" r="1"></circle>
    <circle cx="15" cy="19" r="1"></circle>
  </svg>
);

// Platform icons
const getPlatformIcon = (platform: Platform) => {
  const icons: Record<Platform, React.ReactNode> = {
    linkedin: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    email: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    instagram: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    facebook: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    tiktok: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
      </svg>
    ),
    blog: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    other: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    ),
  };
  return icons[platform];
};

type LayoutView = 'calendar' | 'list' | 'funnel';
type PeriodView = 'day' | 'week' | 'month';

// Draggable Activity Card wrapper
function DraggableActivityCard({ activity, children }: { activity: Activity; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

// Droppable Day Cell wrapper
function DroppableDayCell({ dayKey, rowIndex, children }: { dayKey: string; rowIndex: number; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${dayKey}-row-${rowIndex}`,
    data: { dayKey, rowIndex },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-[92px] border-b transition-colors ${
        isOver ? 'bg-[#FFE4D8]' : ''
      }`}
      style={{ borderColor: 'rgba(43, 43, 35, 0.5)' }}
    >
      {children}
    </div>
  );
}

// Activity Card Component matching the design
function ActivityCardNew({ activity, onClick }: { activity: Activity; onClick?: () => void }) {
  const stageInfo = FUNNEL_STAGES[activity.funnelStage];
  const platformInfo = PLATFORM_INFO[activity.platform];

  const statusLabel = activity.status.charAt(0).toUpperCase() + activity.status.slice(1);

  return (
    <div
      className="h-full rounded-2xl p-2 cursor-grab flex flex-col justify-between"
      style={{
        backgroundColor: '#F1E8D7',
        border: `1px solid ${stageInfo.color}`,
      }}
      onClick={onClick}
      draggable
    >
      <div className="flex items-start gap-1">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: stageInfo.color, border: '0.5px solid #2B2B23' }}
        />
        <div className="flex-1 min-w-0">
          <h4
            className="text-[13px] font-semibold leading-tight line-clamp-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
          >
            {activity.title}
          </h4>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] mt-1" style={{ color: '#2B2B23' }}>
        {getPlatformIcon(activity.platform)}
        <span>{statusLabel} · {platformInfo.name}</span>
      </div>
    </div>
  );
}

// Suggestion Card Component
function SuggestionCard({
  stage,
  title,
  reason,
  onDragStart
}: {
  stage: FunnelStage;
  title: string;
  reason: string;
  onDragStart?: () => void;
}) {
  const stageInfo = FUNNEL_STAGES[stage];
  const stageLabels: Record<FunnelStage, string> = {
    awareness: 'Awareness',
    consideration: 'Trust',
    conversion: 'Decision',
    retention: 'Loyalty',
  };

  return (
    <div
      className="rounded-2xl p-3 cursor-grab"
      style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex items-center gap-1 mb-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: stageInfo.color, border: '0.5px solid #2B2B23' }}
        />
        <span className="text-[11px]" style={{ color: '#2B2B23' }}>{stageLabels[stage]}</span>
      </div>
      <h4
        className="text-[13px] font-semibold mb-1"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
      >
        {title}
      </h4>
      <p className="text-[11px] mb-1" style={{ color: '#2B2B23' }}>
        Based on: {reason}
      </p>
      <div className="flex items-center gap-1 text-[11px]" style={{ color: '#2B2B23' }}>
        <GripIcon />
        <span>Drag to your week</span>
      </div>
    </div>
  );
}

export function Calendar() {
  const [layoutView, setLayoutView] = useState<LayoutView>('calendar');
  const [periodView, setPeriodView] = useState<PeriodView>('week');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialDate, setAddModalInitialDate] = useState<Date | undefined>(undefined);

  // Filter states
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<FunnelStage | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | 'all'>('all');

  const currentWeekStart = useMemo(() =>
    startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (selectedFunnelStage !== 'all' && activity.funnelStage !== selectedFunnelStage) return false;
      if (selectedPlatform !== 'all' && activity.platform !== selectedPlatform) return false;
      if (selectedStatus !== 'all' && activity.status !== selectedStatus) return false;
      return true;
    });
  }, [activities, selectedFunnelStage, selectedPlatform, selectedStatus]);

  // Group activities by day and row (for grid placement)
  const getActivitiesForDay = useCallback((day: Date) => {
    return filteredActivities.filter((activity) => isSameDay(new Date(activity.date), day));
  }, [filteredActivities]);

  // Calculate max activities per day to determine number of rows
  const maxActivitiesPerDay = useMemo(() => {
    return Math.max(6, ...weekDays.map(day => getActivitiesForDay(day).length));
  }, [weekDays, getActivitiesForDay]);

  // Calculate funnel health percentages
  const funnelHealth = useMemo(() => {
    const weekActivities = filteredActivities.filter(activity =>
      weekDays.some(day => isSameDay(new Date(activity.date), day))
    );
    const total = weekActivities.length || 1;
    const counts = {
      awareness: weekActivities.filter(a => a.funnelStage === 'awareness').length,
      consideration: weekActivities.filter(a => a.funnelStage === 'consideration').length,
      conversion: weekActivities.filter(a => a.funnelStage === 'conversion').length,
      retention: weekActivities.filter(a => a.funnelStage === 'retention').length,
    };
    return {
      awareness: Math.round((counts.awareness / total) * 100),
      consideration: Math.round((counts.consideration / total) * 100),
      conversion: Math.round((counts.conversion / total) * 100),
      retention: Math.round((counts.retention / total) * 100),
    };
  }, [filteredActivities, weekDays]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activityId = active.id.toString();
    const overIdStr = over.id.toString();

    // Parse the droppable ID to get the day
    const dayKeyMatch = overIdStr.match(/^(.+)-row-\d+$/);
    if (dayKeyMatch) {
      const dayKey = dayKeyMatch[1];
      const newDate = new Date(dayKey);

      if (!isNaN(newDate.getTime())) {
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === activityId
              ? { ...activity, date: newDate }
              : activity
          )
        );
      }
    }
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDetailPanelOpen(true);
  };

  const handleAddActivity = (date?: Date) => {
    setAddModalInitialDate(date);
    setIsAddModalOpen(true);
  };

  const handleSaveActivity = (updatedActivity: Activity) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
  };

  const handleCreateActivity = (newActivityData: Omit<Activity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newActivity: Activity = {
      ...newActivityData,
      id: `act-${Date.now()}`,
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const navigatePrev = () => {
    setCurrentDate((prev) => subWeeks(prev, 1));
  };

  const navigateNext = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
  };

  const getDateRangeLabel = () => {
    const endDate = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} – ${format(endDate, 'd, yyyy')}`;
  };

  const activeActivity = activeId ? activities.find((a) => a.id === activeId) : null;

  // Suggested actions (mock data)
  const suggestedActions = [
    { stage: 'consideration' as FunnelStage, title: 'Customer success story', reason: 'Consideration gap in your funnel.' },
    { stage: 'conversion' as FunnelStage, title: 'FAQ email sequence', reason: 'Upcoming January offer.' },
    { stage: 'awareness' as FunnelStage, title: 'Tips thread remix', reason: 'High saves on last story-led post.' },
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div
          className="rounded-2xl px-4 py-2"
          style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
        >
          <h1
            className="text-[22px] font-semibold"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
          >
            Calendar & rhythm
          </h1>
          <p className="text-[13px]" style={{ color: '#2B2B23' }}>
            Plan your week across calendar, list, and funnel views.
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: '#EECE7B', border: '2px solid #2B2B23' }}
        >
          <span className="text-[13px]" style={{ color: '#2B2B23' }}>
            {format(new Date(), 'MMM d, yyyy')}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B2B23" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ backgroundColor: '#D27089', color: '#FCF7F1', border: '1px solid #2B2B23' }}
          >
            O
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          {/* Layout Toggle */}
          <div
            className="flex rounded-full p-1 gap-1"
            style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
          >
            {[
              { key: 'calendar' as LayoutView, icon: <CalendarIcon />, label: 'Calendar' },
              { key: 'list' as LayoutView, icon: <ListIcon />, label: 'List' },
              { key: 'funnel' as LayoutView, icon: <FunnelIcon />, label: 'Funnel' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setLayoutView(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                style={{
                  backgroundColor: layoutView === key ? '#115059' : 'transparent',
                  color: layoutView === key ? '#FCF7F1' : '#2B2B23',
                  border: layoutView === key ? '1px solid #2B2B23' : '1px solid transparent',
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Period Tabs */}
          <div
            className="flex rounded-full p-1 gap-1"
            style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
          >
            {(['day', 'week', 'month'] as PeriodView[]).map((period) => (
              <button
                key={period}
                onClick={() => setPeriodView(period)}
                className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                style={{
                  backgroundColor: periodView === period ? '#115059' : 'transparent',
                  color: periodView === period ? '#FCF7F1' : '#2B2B23',
                  border: periodView === period ? '1px solid #2B2B23' : '1px solid transparent',
                }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Date Navigator */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
        >
          <button
            onClick={navigatePrev}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-[#FDE1E8]"
            style={{ border: '1px solid #2B2B23', backgroundColor: '#FFFFFF' }}
          >
            <ChevronLeft />
          </button>
          <div
            className="text-[16px] font-semibold min-w-[150px] text-center"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
          >
            {getDateRangeLabel()}
          </div>
          <button
            onClick={navigateNext}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-[#FDE1E8]"
            style={{ border: '1px solid #2B2B23', backgroundColor: '#FFFFFF' }}
          >
            <ChevronRight />
          </button>
        </div>

        {/* New Activity Button */}
        <button
          onClick={() => handleAddActivity()}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors hover:opacity-90"
          style={{ backgroundColor: '#5AAED3', color: '#FCF7F1', border: '2px solid #2B2B23' }}
        >
          <PlusIcon />
          New activity
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-semibold" style={{ color: '#2B2B23' }}>Sorting:</span>

        {/* Funnel Stage Filter */}
        <div
          className="flex items-center justify-between gap-2 min-w-[150px] px-3 py-2 rounded-full cursor-pointer"
          style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
          onClick={() => setSelectedFunnelStage(selectedFunnelStage === 'all' ? 'awareness' : 'all')}
        >
          <span className="text-[13px]" style={{ color: '#2B2B23' }}>
            {selectedFunnelStage === 'all' ? 'All funnel stages' : FUNNEL_STAGES[selectedFunnelStage].name}
          </span>
          <ChevronDown />
        </div>

        {/* Platform Filter */}
        <div
          className="flex items-center justify-between gap-2 min-w-[150px] px-3 py-2 rounded-full cursor-pointer"
          style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
          onClick={() => setSelectedPlatform(selectedPlatform === 'all' ? 'linkedin' : 'all')}
        >
          <span className="text-[13px]" style={{ color: '#2B2B23' }}>
            {selectedPlatform === 'all' ? 'All platforms' : PLATFORM_INFO[selectedPlatform].name}
          </span>
          <ChevronDown />
        </div>

        {/* Status Filter */}
        <div
          className="flex items-center justify-between gap-2 min-w-[150px] px-3 py-2 rounded-full cursor-pointer"
          style={{ backgroundColor: '#F1E8D7', border: '2px solid #2B2B23' }}
          onClick={() => setSelectedStatus(selectedStatus === 'all' ? 'draft' : 'all')}
        >
          <span className="text-[13px]" style={{ color: '#2B2B23' }}>
            {selectedStatus === 'all' ? 'All statuses' : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
          </span>
          <ChevronDown />
        </div>
      </div>

      {/* Main Calendar Body */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Calendar Grid Area */}
        <div className="flex-1 min-w-0">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div
              className="rounded-3xl overflow-hidden h-full flex flex-col"
              style={{ backgroundColor: '#F1E8D7', border: '0.5px solid #2B2B23' }}
            >
              {/* Week Grid Header */}
              <div
                className="grid grid-cols-7"
                style={{ borderBottom: '0.5px solid #2B2B23' }}
              >
                {weekDays.map((day) => {
                  const isToday = isSameDay(day, new Date());
                  return (
                    <div
                      key={day.toISOString()}
                      className="py-3 px-1.5 text-center"
                      style={{ borderRight: '0.5px solid #2B2B23' }}
                    >
                      <div
                        className="text-[11px] font-semibold uppercase tracking-wide"
                        style={{ color: '#2B2B23' }}
                      >
                        {format(day, 'EEE')}
                      </div>
                      <div
                        className={`text-[20px] font-semibold mt-1 ${isToday ? 'w-8 h-8 rounded-full flex items-center justify-center mx-auto' : ''}`}
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          color: isToday ? '#FFFFFF' : '#2B2B23',
                          backgroundColor: isToday ? '#115059' : 'transparent',
                          border: isToday ? '0.5px solid #2B2B23' : 'none',
                        }}
                      >
                        {format(day, 'd')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Week Grid Body */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 h-full min-h-[552px]">
                  {weekDays.map((day) => {
                    const dayKey = day.toISOString();
                    const dayActivities = getActivitiesForDay(day);

                    return (
                      <div
                        key={dayKey}
                        className="flex flex-col"
                        style={{
                          borderRight: '0.5px solid #2B2B23',
                          backgroundColor: '#FCF7F1',
                        }}
                      >
                        {Array.from({ length: maxActivitiesPerDay }, (_, rowIndex) => {
                          const activity = dayActivities[rowIndex];
                          return (
                            <DroppableDayCell key={`${dayKey}-row-${rowIndex}`} dayKey={dayKey} rowIndex={rowIndex}>
                              {activity && (
                                <div className="p-1 h-full">
                                  <DraggableActivityCard activity={activity}>
                                    <ActivityCardNew
                                      activity={activity}
                                      onClick={() => handleActivityClick(activity)}
                                    />
                                  </DraggableActivityCard>
                                </div>
                              )}
                            </DroppableDayCell>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeActivity && (
                <div className="opacity-80 w-[140px]">
                  <ActivityCardNew activity={activeActivity} />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Heartie Sidebar */}
        <aside
          className="w-64 rounded-3xl overflow-hidden flex flex-col flex-shrink-0"
          style={{ backgroundColor: '#FFEFD5', border: '0.5px solid #2B2B23' }}
        >
          {/* Funnel Health Check Section */}
          <div className="p-4" style={{ borderBottom: '2px solid #2B2B23' }}>
            <div className="flex items-center gap-2 mb-3">
              <ChartIcon />
              <span
                className="text-[13px] font-semibold uppercase tracking-wide"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
              >
                Funnel Health Check
              </span>
            </div>

            {/* Funnel Bars */}
            <div className="space-y-1.5">
              {[
                { key: 'awareness', label: 'Awareness', value: funnelHealth.awareness },
                { key: 'consideration', label: 'Consideration', value: funnelHealth.consideration },
                { key: 'conversion', label: 'Conversion', value: funnelHealth.conversion },
                { key: 'retention', label: 'Retention', value: funnelHealth.retention },
              ].map(({ key, label, value }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-[11px] w-[90px]" style={{ color: '#2B2B23' }}>{label}</span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#FCF7F1', border: '1px solid #2B2B23' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${value}%`,
                        backgroundColor: FUNNEL_STAGES[key as FunnelStage].color,
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-bold w-8 text-right" style={{ color: '#2B2B23' }}>
                    {value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div
              className="mt-3 p-3 rounded-2xl text-[11px]"
              style={{ backgroundColor: '#D0D480', border: '2px solid #2B2B23', color: '#2B2B23' }}
            >
              Overall: Your top-of-funnel is thriving. This week, Heartie suggests layering in more proof and gentle invitations.
            </div>

            {/* Key Priority */}
            <div className="mt-3">
              <div
                className="text-[11px] font-bold uppercase tracking-wide mb-1"
                style={{ color: '#6D2239' }}
              >
                Key Priority
              </div>
              <p className="text-[12px]" style={{ color: '#2B2B23' }}>
                Create 2 client stories and 1 simple FAQ email.
              </p>
            </div>
          </div>

          {/* Suggested Actions Section */}
          <div className="p-4 flex-1 overflow-auto">
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon />
              <span
                className="text-[13px] font-semibold uppercase tracking-wide"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2B2B23' }}
              >
                Suggested Actions
              </span>
            </div>

            <div className="space-y-2.5">
              {suggestedActions.map((action, index) => (
                <SuggestionCard
                  key={index}
                  stage={action.stage}
                  title={action.title}
                  reason={action.reason}
                />
              ))}
            </div>

            {/* Refresh Button */}
            <button
              className="w-full mt-3 py-2.5 rounded-2xl text-[12px] font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#FBCB6E', border: '2px solid #2B2B23', color: '#2B2B23' }}
            >
              Refresh suggestions
            </button>
          </div>
        </aside>
      </div>

      {/* Activity Detail Panel */}
      <ActivityDetailPanel
        activity={selectedActivity}
        isOpen={isDetailPanelOpen}
        onClose={() => {
          setIsDetailPanelOpen(false);
          setSelectedActivity(null);
        }}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
      />

      {/* Add Activity Modal */}
      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setAddModalInitialDate(undefined);
        }}
        onSave={handleCreateActivity}
        initialDate={addModalInitialDate}
      />
    </div>
  );
}
