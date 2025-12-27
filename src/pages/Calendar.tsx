import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  format,
  startOfWeek,
  startOfMonth,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  getDay,
} from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Activity, FunnelStage, Platform, ActivityStatus, Campaign } from '../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../types';
import { mockActivities, mockCampaigns } from '../lib/mockData';
import { ActivityDetailPanel } from '../components/calendar/ActivityDetailPanel';
import { AddActivityModal } from '../components/calendar/AddActivityModal';
import './Calendar.css';

type LayoutView = 'calendar' | 'list' | 'funnel';
type PeriodView = 'day' | 'week' | 'month';

const ACTIVITIES_STORAGE_KEY = 'heartie_activities';

// Sortable Activity Card wrapper - supports both reordering within column and moving between columns
function SortableActivityCard({ activity, dayKey, children }: { activity: Activity; dayKey: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: { activity, dayKey, type: 'activity' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="sortable-activity-wrapper">
      {children}
    </div>
  );
}

// Droppable Day Column wrapper - the entire column is droppable
function DroppableDayColumn({ dayKey, children, isEmpty }: { dayKey: string; children?: React.ReactNode; isEmpty?: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-column-${dayKey}`,
    data: { dayKey, type: 'day-column' },
  });

  return (
    <div
      ref={setNodeRef}
      className={`day-column ${isOver ? 'day-column-over' : ''}`}
    >
      {children}
      {/* Empty drop zone at the bottom */}
      {isEmpty && (
        <div className={`day-cell empty-drop-zone ${isOver ? 'day-cell-over' : ''}`}>
          <span className="empty-drop-hint">Drop here</span>
        </div>
      )}
    </div>
  );
}

// Droppable Month Cell wrapper - each day cell in month view is droppable
function DroppableMonthCell({ dayKey, children, className }: { dayKey: string; children?: React.ReactNode; className?: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `month-cell-${dayKey}`,
    data: { dayKey, type: 'month-cell' },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className || ''} ${isOver ? 'month-cell-over' : ''}`}
    >
      {children}
    </div>
  );
}

// Sortable Month Activity Card wrapper - smaller version for month view
function SortableMonthActivityCard({ activity, dayKey, children }: { activity: Activity; dayKey: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: { activity, dayKey, type: 'activity' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="sortable-month-activity-wrapper">
      {children}
    </div>
  );
}

// Channel icons mapping (formerly platformIcons)
const channelIcons: Record<Platform, string> = {
  instagram: 'lucide:instagram',
  facebook: 'lucide:facebook',
  tiktok: 'lucide:music',
  x: 'lucide:twitter',
  linkedin: 'lucide:linkedin',
  email: 'lucide:mail',
  blog: 'lucide:file-text',
  meta_ads: 'lucide:megaphone',
  google_ads: 'lucide:search',
  tiktok_ads: 'lucide:target',
  x_ads: 'lucide:radio',
  other: 'lucide:file',
};

// Keep platformIcons as alias for backwards compatibility
const platformIcons = channelIcons;

// Status labels mapping
const statusLabels: Record<ActivityStatus, string> = {
  idea: 'Idea',
  draft: 'In progress',
  ready: 'In progress',
  scheduled: 'Scheduled',
  running: 'Running',
  complete: 'Done',
};

// List view column definitions
type ListColumn = {
  id: string;
  label: string;
  color: string;
  statuses: ActivityStatus[]; // Which statuses belong to this column
};

const listColumns: ListColumn[] = [
  { id: 'idea', label: 'Idea', color: '#B3B3B0', statuses: ['idea'] },
  { id: 'in_progress', label: 'In progress', color: '#FBCB6E', statuses: ['draft', 'ready'] },
  { id: 'scheduled', label: 'Scheduled', color: '#B1D1A0', statuses: ['scheduled'] },
  { id: 'running', label: 'Running', color: '#B6BBFB', statuses: ['running'] },
  { id: 'done', label: 'Done', color: '#6E213B', statuses: ['complete'] },
];

// Activity Card Component
function ActivityCard({ activity, onClick }: { activity: Activity; onClick?: () => void }) {
  const stageInfo = FUNNEL_STAGES[activity.funnelStage];
  const platformInfo = PLATFORM_INFO[activity.platform];

  return (
    <div
      className="activity-card"
      data-stage={activity.funnelStage}
      onClick={onClick}
      draggable
    >
      <div className="activity-header-row">
        <div className="funnel-badge">
          <div
            className="funnel-dot"
            style={{ background: stageInfo.color }}
          />
        </div>
        <div className="activity-title">
          {activity.title}
        </div>
      </div>
      <div className="activity-meta">
        <iconify-icon icon={platformIcons[activity.platform]} style={{ fontSize: '12px' }} />
        <span>{platformInfo.name}</span>
        <span className="separator">·</span>
        <span className={`status-square status-${activity.status}`} />
        <span>{statusLabels[activity.status]}</span>
      </div>
    </div>
  );
}

// Suggestion Card Component
function SuggestionCard({
  stage,
  title,
  reason,
}: {
  stage: FunnelStage;
  title: string;
  reason: string;
}) {
  const stageInfo = FUNNEL_STAGES[stage];
  const stageLabels: Record<FunnelStage, string> = {
    awareness: 'Awareness',
    consideration: 'Trust',
    conversion: 'Decision',
    retention: 'Loyalty',
  };

  return (
    <div className="suggestion-card" draggable>
      <div className="suggestion-stage">
        <div className="funnel-dot" style={{ background: stageInfo.color }} />
        <span>{stageLabels[stage]}</span>
      </div>
      <div className="suggestion-title">{title}</div>
      <div className="suggestion-reason">Based on: {reason}</div>
      <div className="suggestion-drag-handle">
        <iconify-icon icon="lucide:grip-vertical" style={{ fontSize: '12px' }} />
        <span>Drag to your week</span>
      </div>
    </div>
  );
}

export function Calendar() {
  const [layoutView, setLayoutView] = useState<LayoutView>('calendar');
  const [periodView, setPeriodView] = useState<PeriodView>('week');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        return parsed.map((a: Activity) => ({
          ...a,
          date: new Date(a.date),
          createdAt: new Date(a.createdAt),
          updatedAt: new Date(a.updatedAt),
        }));
      } catch {
        return mockActivities;
      }
    }
    return mockActivities;
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialDate, setAddModalInitialDate] = useState<Date | undefined>(undefined);

  // Filter states
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<FunnelStage | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | 'all'>('all');
  const [selectedContentPillar, setSelectedContentPillar] = useState<string | 'all'>('all');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Campaigns state
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  // Persist activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown-wrapper')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

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
      if (selectedContentPillar !== 'all' && activity.contentPillar !== selectedContentPillar) return false;
      return true;
    });
  }, [activities, selectedFunnelStage, selectedPlatform, selectedStatus, selectedContentPillar]);

  const getActivitiesForDay = useCallback((day: Date) => {
    return filteredActivities.filter((activity) => isSameDay(new Date(activity.date), day));
  }, [filteredActivities]);

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

    const activeIdStr = active.id.toString();
    const overId = over.id.toString();

    // Find the dragged activity
    const draggedActivity = activities.find(a => a.id === activeIdStr);
    if (!draggedActivity) return;

    // Get the source day from the dragged activity's data
    const activeDayKey = active.data.current?.dayKey;

    // Check if dropping on a day column (empty column or column drop zone) - week view
    if (overId.startsWith('day-column-')) {
      const targetDayKey = overId.replace('day-column-', '');
      const newDate = new Date(targetDayKey);

      if (!isNaN(newDate.getTime())) {
        // Move to the end of the target day
        setActivities((prev) => {
          const updated = prev.map((activity) =>
            activity.id === activeIdStr
              ? { ...activity, date: newDate }
              : activity
          );
          return updated;
        });
      }
      return;
    }

    // Check if dropping on a month cell (day cell in month view)
    if (overId.startsWith('month-cell-')) {
      const targetDayKey = overId.replace('month-cell-', '');
      const newDate = new Date(targetDayKey);

      if (!isNaN(newDate.getTime())) {
        // Move to the target day
        setActivities((prev) => {
          const updated = prev.map((activity) =>
            activity.id === activeIdStr
              ? { ...activity, date: newDate }
              : activity
          );
          return updated;
        });
      }
      return;
    }

    // Check if dropping on another activity (reorder or move)
    const overActivity = activities.find(a => a.id === overId);
    if (overActivity) {
      const draggedDayKey = activeDayKey || format(new Date(draggedActivity.date), 'yyyy-MM-dd');
      const overDayKey = over.data.current?.dayKey || format(new Date(overActivity.date), 'yyyy-MM-dd');

      if (draggedDayKey === overDayKey) {
        // Same day - reorder within column
        const dayActivities = activities.filter(a =>
          format(new Date(a.date), 'yyyy-MM-dd') === draggedDayKey
        );
        const oldIndex = dayActivities.findIndex(a => a.id === activeIdStr);
        const newIndex = dayActivities.findIndex(a => a.id === overId);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reordered = arrayMove(dayActivities, oldIndex, newIndex);

          // Update the main activities array with new order
          setActivities((prev) => {
            const otherActivities = prev.filter(a =>
              format(new Date(a.date), 'yyyy-MM-dd') !== draggedDayKey
            );
            return [...otherActivities, ...reordered];
          });
        }
      } else {
        // Different day - move to the target day at the position of the over activity
        const newDate = new Date(overActivity.date);

        setActivities((prev) => {
          // First, update the date of the dragged activity
          const withUpdatedDate = prev.map((activity) =>
            activity.id === activeIdStr
              ? { ...activity, date: newDate }
              : activity
          );

          // Then reorder within the target day to place it at the correct position
          const targetDayActivities = withUpdatedDate.filter(a =>
            format(new Date(a.date), 'yyyy-MM-dd') === overDayKey
          );
          const otherActivities = withUpdatedDate.filter(a =>
            format(new Date(a.date), 'yyyy-MM-dd') !== overDayKey
          );

          // Find the new positions
          const draggedIdx = targetDayActivities.findIndex(a => a.id === activeIdStr);
          const overIdx = targetDayActivities.findIndex(a => a.id === overId);

          if (draggedIdx !== -1 && overIdx !== -1 && draggedIdx !== overIdx) {
            const reordered = arrayMove(targetDayActivities, draggedIdx, overIdx);
            return [...otherActivities, ...reordered];
          }

          return withUpdatedDate;
        });
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
    if (periodView === 'month') {
      setCurrentDate((prev) => subMonths(prev, 1));
    } else if (periodView === 'day') {
      setCurrentDate((prev) => subDays(prev, 1));
    } else {
      setCurrentDate((prev) => subWeeks(prev, 1));
    }
  };

  const navigateNext = () => {
    if (periodView === 'month') {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else if (periodView === 'day') {
      setCurrentDate((prev) => addDays(prev, 1));
    } else {
      setCurrentDate((prev) => addWeeks(prev, 1));
    }
  };

  const getDateRangeLabel = () => {
    if (periodView === 'month') {
      return format(currentDate, 'MMMM yyyy');
    }
    if (periodView === 'day') {
      return format(currentDate, 'EEEE, MMM d');
    }
    const endDate = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} – ${format(endDate, 'd, yyyy')}`;
  };

  // Get all days for month view (6 weeks = 42 days)
  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);

    // Get the Monday before or on the first day of the month
    const startDay = getDay(monthStart);
    // Convert Sunday (0) to 7 for Monday-based week calculation
    const daysFromMonday = startDay === 0 ? 6 : startDay - 1;
    const calendarStart = addDays(monthStart, -daysFromMonday);

    // Generate 42 days (6 weeks)
    return Array.from({ length: 42 }, (_, i) => {
      const day = addDays(calendarStart, i);
      return {
        date: day,
        isCurrentMonth: isSameMonth(day, currentDate),
        isToday: isSameDay(day, new Date()),
      };
    });
  }, [currentDate]);

  // Compute activities visible in the current period (before filtering)
  const visiblePeriodActivities = useMemo(() => {
    if (periodView === 'day') {
      return activities.filter(a => isSameDay(new Date(a.date), currentDate));
    } else if (periodView === 'week') {
      return activities.filter(a =>
        weekDays.some(day => isSameDay(new Date(a.date), day))
      );
    } else {
      // Month view - get all activities in the visible month days
      return activities.filter(a =>
        monthDays.some(dayInfo => isSameDay(new Date(a.date), dayInfo.date))
      );
    }
  }, [activities, periodView, currentDate, weekDays, monthDays]);

  // Extract unique channels from visible activities for dynamic dropdown
  const visibleChannels = useMemo(() => {
    const channels = new Set<Platform>();
    visiblePeriodActivities.forEach(a => channels.add(a.platform));
    return Array.from(channels);
  }, [visiblePeriodActivities]);

  // Extract unique activity types from visible activities for dynamic dropdown
  const visibleActivityTypes = useMemo(() => {
    const types = new Set<string>();
    visiblePeriodActivities.forEach(a => {
      if (a.contentPillar) types.add(a.contentPillar);
    });
    return Array.from(types);
  }, [visiblePeriodActivities]);

  // Get activities for a specific day (used in month view)
  const getActivitiesForDate = useCallback((date: Date) => {
    return filteredActivities.filter((activity) => isSameDay(new Date(activity.date), date));
  }, [filteredActivities]);

  // Compute campaign segments for each row in the month view
  // Each row is 7 days, and campaigns span across days
  type CampaignSegment = {
    campaign: Campaign;
    startCol: number; // 0-6 column index within the row
    endCol: number;   // 0-6 column index within the row
    isStart: boolean; // Is this the start of the campaign?
    isEnd: boolean;   // Is this the end of the campaign?
    showName: boolean; // Should we show the name in this segment?
  };

  const getRowCampaignSegments = useCallback((rowIndex: number): CampaignSegment[] => {
    const rowStart = monthDays[rowIndex * 7].date;
    const rowEnd = monthDays[rowIndex * 7 + 6].date;
    const segments: CampaignSegment[] = [];

    campaigns.forEach((campaign) => {
      const campaignStart = new Date(campaign.startDate);
      const campaignEnd = new Date(campaign.endDate);
      campaignStart.setHours(0, 0, 0, 0);
      campaignEnd.setHours(0, 0, 0, 0);

      // Check if campaign overlaps with this row
      const rowStartTime = rowStart.getTime();
      const rowEndTime = rowEnd.getTime();
      const campaignStartTime = campaignStart.getTime();
      const campaignEndTime = campaignEnd.getTime();

      if (campaignEndTime < rowStartTime || campaignStartTime > rowEndTime) {
        return; // No overlap
      }

      // Calculate which columns the campaign spans in this row
      let startCol = 0;
      let endCol = 6;
      let isStart = false;
      let isEnd = false;

      // Find start column
      if (campaignStartTime >= rowStartTime && campaignStartTime <= rowEndTime) {
        // Campaign starts in this row
        for (let i = 0; i < 7; i++) {
          if (isSameDay(monthDays[rowIndex * 7 + i].date, campaignStart)) {
            startCol = i;
            isStart = true;
            break;
          }
        }
      }

      // Find end column
      if (campaignEndTime >= rowStartTime && campaignEndTime <= rowEndTime) {
        // Campaign ends in this row
        for (let i = 0; i < 7; i++) {
          if (isSameDay(monthDays[rowIndex * 7 + i].date, campaignEnd)) {
            endCol = i;
            isEnd = true;
            break;
          }
        }
      }

      // Show name in the middle of the segment, or at start if it's small
      const segmentWidth = endCol - startCol + 1;
      const showName = segmentWidth >= 2; // Only show name if segment spans at least 2 days

      segments.push({
        campaign,
        startCol,
        endCol,
        isStart,
        isEnd,
        showName,
      });
    });

    return segments;
  }, [monthDays, campaigns]);

  // Get campaign segments for the week view (single row of 7 days)
  const getWeekCampaignSegments = useCallback((): CampaignSegment[] => {
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];
    const segments: CampaignSegment[] = [];

    campaigns.forEach((campaign) => {
      const campaignStart = new Date(campaign.startDate);
      const campaignEnd = new Date(campaign.endDate);
      campaignStart.setHours(0, 0, 0, 0);
      campaignEnd.setHours(0, 0, 0, 0);

      const weekStartTime = weekStart.getTime();
      const weekEndTime = weekEnd.getTime();
      const campaignStartTime = campaignStart.getTime();
      const campaignEndTime = campaignEnd.getTime();

      // Check if campaign overlaps with this week
      if (campaignEndTime < weekStartTime || campaignStartTime > weekEndTime) {
        return; // No overlap
      }

      let startCol = 0;
      let endCol = 6;
      let isStart = false;
      let isEnd = false;

      // Find start column
      if (campaignStartTime >= weekStartTime && campaignStartTime <= weekEndTime) {
        for (let i = 0; i < 7; i++) {
          if (isSameDay(weekDays[i], campaignStart)) {
            startCol = i;
            isStart = true;
            break;
          }
        }
      }

      // Find end column
      if (campaignEndTime >= weekStartTime && campaignEndTime <= weekEndTime) {
        for (let i = 0; i < 7; i++) {
          if (isSameDay(weekDays[i], campaignEnd)) {
            endCol = i;
            isEnd = true;
            break;
          }
        }
      }

      const segmentWidth = endCol - startCol + 1;
      const showName = segmentWidth >= 2;

      segments.push({
        campaign,
        startCol,
        endCol,
        isStart,
        isEnd,
        showName,
      });
    });

    return segments;
  }, [weekDays, campaigns]);

  // Get campaigns active on the current day (for day view)
  const getDayCampaigns = useCallback((): Campaign[] => {
    const dayStart = new Date(currentDate);
    dayStart.setHours(0, 0, 0, 0);

    return campaigns.filter((campaign) => {
      const campaignStart = new Date(campaign.startDate);
      const campaignEnd = new Date(campaign.endDate);
      campaignStart.setHours(0, 0, 0, 0);
      campaignEnd.setHours(0, 0, 0, 0);

      return dayStart >= campaignStart && dayStart <= campaignEnd;
    });
  }, [currentDate, campaigns]);

  const activeActivity = activeId ? activities.find((a) => a.id === activeId) : null;

  const suggestedActions = [
    { stage: 'consideration' as FunnelStage, title: 'Customer success story', reason: 'Consideration gap in your funnel.' },
    { stage: 'conversion' as FunnelStage, title: 'FAQ email sequence', reason: 'Upcoming January offer.' },
    { stage: 'awareness' as FunnelStage, title: 'Tips thread remix', reason: 'High saves on last story-led post.' },
  ];

  return (
    <div className="calendar-page">
      {/* Header */}
      <header className="surface-header">
        <div className="surface-title-block">
          <h1>Calendar & rhythm</h1>
          <p>Plan your week across calendar, list, and funnel views.</p>
        </div>
        <div className="surface-header-meta">
          <span>{format(new Date(), 'MMM d, yyyy')}</span>
          <iconify-icon icon="lucide:bell" style={{ fontSize: '18px' }} />
          <div className="avatar-chip">O</div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="calendar-header-bar">
        <div className="header-controls-group">
          {/* Layout Toggle */}
          <div className="layout-toggle">
            <button
              className={`layout-toggle-btn ${layoutView === 'calendar' ? 'active' : ''}`}
              onClick={() => setLayoutView('calendar')}
            >
              <iconify-icon icon="lucide:calendar" style={{ fontSize: '16px' }} />
              Calendar
            </button>
            <button
              className={`layout-toggle-btn ${layoutView === 'list' ? 'active' : ''}`}
              onClick={() => setLayoutView('list')}
            >
              <iconify-icon icon="lucide:list-tree" style={{ fontSize: '16px' }} />
              List
            </button>
            <button
              className={`layout-toggle-btn ${layoutView === 'funnel' ? 'active' : ''}`}
              onClick={() => setLayoutView('funnel')}
            >
              <iconify-icon icon="lucide:beaker" style={{ fontSize: '16px' }} />
              Funnel
            </button>
          </div>

          {/* Period Tabs */}
          <div className="period-tabs">
            <button
              className={`period-tab ${periodView === 'day' ? 'active' : ''}`}
              onClick={() => setPeriodView('day')}
            >
              Day
            </button>
            <button
              className={`period-tab ${periodView === 'week' ? 'active' : ''}`}
              onClick={() => setPeriodView('week')}
            >
              Week
            </button>
            <button
              className={`period-tab ${periodView === 'month' ? 'active' : ''}`}
              onClick={() => setPeriodView('month')}
            >
              Month
            </button>
          </div>
        </div>

        {/* Date Navigator */}
        <div className="date-navigator">
          <button className="date-nav-btn" onClick={navigatePrev}>
            <iconify-icon icon="lucide:chevron-left" style={{ fontSize: '18px' }} />
          </button>
          <div className="date-display">{getDateRangeLabel()}</div>
          <button className="date-nav-btn" onClick={navigateNext}>
            <iconify-icon icon="lucide:chevron-right" style={{ fontSize: '18px' }} />
          </button>
        </div>

        {/* New Activity Button */}
        <button className="btn-new-activity" onClick={() => handleAddActivity()}>
          <iconify-icon icon="lucide:plus" style={{ fontSize: '18px' }} />
          New activity
        </button>
      </div>

      {/* Filter Row */}
      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-label">Filters:</span>

          {/* Activity Type filter - FIRST (dynamic - shows only types in current period) */}
          <div className="filter-dropdown-wrapper">
            <div
              className={`select-filter ${openDropdown === 'activityType' ? 'open' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'activityType' ? null : 'activityType')}
            >
              <span>{selectedContentPillar === 'all' ? 'All activity types' : selectedContentPillar}</span>
              <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
            </div>
            {openDropdown === 'activityType' && (
              <div className="filter-dropdown-menu">
                <div
                  className={`filter-dropdown-item ${selectedContentPillar === 'all' ? 'selected' : ''}`}
                  onClick={() => { setSelectedContentPillar('all'); setOpenDropdown(null); }}
                >
                  All activity types
                </div>
                {visibleActivityTypes.length > 0 ? (
                  visibleActivityTypes.map((type) => (
                    <div
                      key={type}
                      className={`filter-dropdown-item ${selectedContentPillar === type ? 'selected' : ''}`}
                      onClick={() => { setSelectedContentPillar(type); setOpenDropdown(null); }}
                    >
                      {type}
                    </div>
                  ))
                ) : (
                  <div className="filter-dropdown-item disabled">
                    No activity types in this period
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hide funnel stage filter in funnel view since all stages are visible as columns */}
          {layoutView !== 'funnel' && (
            <div className="filter-dropdown-wrapper">
              <div
                className={`select-filter ${openDropdown === 'funnel' ? 'open' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'funnel' ? null : 'funnel')}
              >
                <span>{selectedFunnelStage === 'all' ? 'All funnel stages' : FUNNEL_STAGES[selectedFunnelStage].name}</span>
                <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
              </div>
              {openDropdown === 'funnel' && (
                <div className="filter-dropdown-menu">
                  <div
                    className={`filter-dropdown-item ${selectedFunnelStage === 'all' ? 'selected' : ''}`}
                    onClick={() => { setSelectedFunnelStage('all'); setOpenDropdown(null); }}
                  >
                    All funnel stages
                  </div>
                  {(Object.keys(FUNNEL_STAGES) as FunnelStage[]).map((stage) => (
                    <div
                      key={stage}
                      className={`filter-dropdown-item ${selectedFunnelStage === stage ? 'selected' : ''}`}
                      onClick={() => { setSelectedFunnelStage(stage); setOpenDropdown(null); }}
                    >
                      <span className="filter-dot" style={{ background: FUNNEL_STAGES[stage].color }} />
                      {FUNNEL_STAGES[stage].name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Channel filter (dynamic - shows only channels in current period) */}
          <div className="filter-dropdown-wrapper">
            <div
              className={`select-filter ${openDropdown === 'platform' ? 'open' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'platform' ? null : 'platform')}
            >
              <span>{selectedPlatform === 'all' ? 'All channels' : PLATFORM_INFO[selectedPlatform].name}</span>
              <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
            </div>
            {openDropdown === 'platform' && (
              <div className="filter-dropdown-menu">
                <div
                  className={`filter-dropdown-item ${selectedPlatform === 'all' ? 'selected' : ''}`}
                  onClick={() => { setSelectedPlatform('all'); setOpenDropdown(null); }}
                >
                  All channels
                </div>
                {visibleChannels.length > 0 ? (
                  visibleChannels.map((platform) => (
                    <div
                      key={platform}
                      className={`filter-dropdown-item ${selectedPlatform === platform ? 'selected' : ''}`}
                      onClick={() => { setSelectedPlatform(platform); setOpenDropdown(null); }}
                    >
                      <iconify-icon icon={platformIcons[platform]} style={{ fontSize: '14px' }} />
                      {PLATFORM_INFO[platform].name}
                    </div>
                  ))
                ) : (
                  <div className="filter-dropdown-item disabled">
                    No channels in this period
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hide status filter in list view since all statuses are visible as columns */}
          {layoutView !== 'list' && (
            <div className="filter-dropdown-wrapper">
              <div
                className={`select-filter ${openDropdown === 'status' ? 'open' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
              >
                <span>{selectedStatus === 'all' ? 'All statuses' : statusLabels[selectedStatus]}</span>
                <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
              </div>
              {openDropdown === 'status' && (
                <div className="filter-dropdown-menu">
                  <div
                    className={`filter-dropdown-item ${selectedStatus === 'all' ? 'selected' : ''}`}
                    onClick={() => { setSelectedStatus('all'); setOpenDropdown(null); }}
                  >
                    All statuses
                  </div>
                  {/* Show unique status options - draft/ready both map to 'In progress' */}
                  {[
                    { status: 'idea' as ActivityStatus, label: 'Idea', color: 'idea' },
                    { status: 'draft' as ActivityStatus, label: 'In progress', color: 'draft' },
                    { status: 'scheduled' as ActivityStatus, label: 'Scheduled', color: 'scheduled' },
                    { status: 'running' as ActivityStatus, label: 'Running', color: 'running' },
                    { status: 'complete' as ActivityStatus, label: 'Done', color: 'complete' },
                  ].map((item) => (
                    <div
                      key={item.status}
                      className={`filter-dropdown-item ${selectedStatus === item.status ? 'selected' : ''}`}
                      onClick={() => { setSelectedStatus(item.status); setOpenDropdown(null); }}
                    >
                      <span className={`status-square status-${item.color}`} />
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Calendar Body */}
      <div className="calendar-body">
        <div className="main-calendar-area">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Week Grid - shown when layoutView is 'calendar' and periodView is 'week' */}
            {layoutView === 'calendar' && periodView === 'week' && (() => {
              const weekCampaigns = getWeekCampaignSegments();
              const hasWeekCampaigns = weekCampaigns.length > 0;

              return (
                <div className="week-grid-container">
                  {/* Header */}
                  <div className="week-grid-header">
                    {weekDays.map((day) => {
                      const isToday = isSameDay(day, new Date());
                      return (
                        <div key={day.toISOString()} className={`day-header ${isToday ? 'today' : ''}`}>
                          <div className="day-header-name">{format(day, 'EEE')}</div>
                          <div className="day-header-date">{format(day, 'd')}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Campaign bar row */}
                  {hasWeekCampaigns && (
                    <div className="week-campaign-row">
                      {weekCampaigns.map((seg) => {
                        const leftPercent = (seg.startCol / 7) * 100;
                        const widthPercent = ((seg.endCol - seg.startCol + 1) / 7) * 100;

                        const barClasses = [
                          'campaign-bar',
                          seg.isStart && 'is-start',
                          seg.isEnd && 'is-end',
                        ].filter(Boolean).join(' ');

                        return (
                          <div
                            key={seg.campaign.id}
                            className={barClasses}
                            style={{
                              backgroundColor: seg.campaign.color,
                              left: `calc(${leftPercent}% + 6px)`,
                              width: `calc(${widthPercent}% - 12px)`,
                            }}
                          >
                            {/* Always show name in week view - more space available */}
                            <span className="campaign-bar-name">{seg.campaign.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Body */}
                  <div className="week-grid-body">
                    {weekDays.map((day) => {
                      const dayKey = format(day, 'yyyy-MM-dd');
                      const dayActivities = getActivitiesForDay(day);
                      const activityIds = dayActivities.map(a => a.id);

                      return (
                        <DroppableDayColumn key={dayKey} dayKey={dayKey} isEmpty={dayActivities.length === 0}>
                          <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
                            {/* Render activities */}
                            {dayActivities.map((activity) => (
                              <div key={activity.id} className="day-cell">
                                <SortableActivityCard activity={activity} dayKey={dayKey}>
                                  <ActivityCard
                                    activity={activity}
                                    onClick={() => handleActivityClick(activity)}
                                  />
                                </SortableActivityCard>
                              </div>
                            ))}
                          </SortableContext>
                        </DroppableDayColumn>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Month Grid - shown when layoutView is 'calendar' and periodView is 'month' */}
            {layoutView === 'calendar' && periodView === 'month' && (
              <div className="month-grid-container">
                {/* Header */}
                <div className="month-grid-header">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName) => (
                    <div key={dayName} className="day-header">
                      <div className="day-header-name">{dayName}</div>
                    </div>
                  ))}
                </div>

                {/* Body - 6 rows x 7 columns = 42 cells */}
                <div className="month-grid-body">
                  {/* Render 6 rows */}
                  {Array.from({ length: 6 }, (_, rowIndex) => {
                    const rowCampaigns = getRowCampaignSegments(rowIndex);
                    const rowDays = monthDays.slice(rowIndex * 7, rowIndex * 7 + 7);
                    const hasCampaigns = rowCampaigns.length > 0;

                    return (
                      <div key={`row-${rowIndex}`} className="month-grid-row">
                        {/* Campaign bars rendered at row level */}
                        {hasCampaigns && (
                          <div className="row-campaign-bars">
                            {rowCampaigns.map((seg) => {
                              // Calculate left position and width as percentages
                              const leftPercent = (seg.startCol / 7) * 100;
                              const widthPercent = ((seg.endCol - seg.startCol + 1) / 7) * 100;

                              const barClasses = [
                                'campaign-bar',
                                seg.isStart && 'is-start',
                                seg.isEnd && 'is-end',
                              ].filter(Boolean).join(' ');

                              return (
                                <div
                                  key={seg.campaign.id}
                                  className={barClasses}
                                  style={{
                                    backgroundColor: seg.campaign.color,
                                    left: `calc(${leftPercent}% + 6px)`,
                                    width: `calc(${widthPercent}% - 12px)`,
                                  }}
                                >
                                  {seg.showName && (
                                    <span className="campaign-bar-name">{seg.campaign.name}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {/* Day cells with drag and drop */}
                        {rowDays.map((dayInfo) => {
                          const dayKey = format(dayInfo.date, 'yyyy-MM-dd');
                          const dayActivities = getActivitiesForDate(dayInfo.date);
                          const activityIds = dayActivities.map(a => a.id);
                          const cellClasses = [
                            'month-day-cell',
                            !dayInfo.isCurrentMonth && 'other-month',
                            dayInfo.isToday && 'today',
                          ].filter(Boolean).join(' ');

                          return (
                            <DroppableMonthCell key={dayInfo.date.toISOString()} dayKey={dayKey} className={cellClasses}>
                              <div className="month-day-number">{format(dayInfo.date, 'd')}</div>
                              <div className="month-day-cell-content">
                                {/* Spacer for campaign bar */}
                                {hasCampaigns && <div className="campaign-spacer" />}
                                {/* Activities with drag and drop */}
                                <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
                                  <div className="month-activities">
                                    {dayActivities.map((activity) => {
                                      const stageClass = activity.funnelStage;
                                      return (
                                        <SortableMonthActivityCard key={activity.id} activity={activity} dayKey={dayKey}>
                                          <div
                                            className="month-activity-card"
                                            onClick={() => handleActivityClick(activity)}
                                          >
                                            <span className={`month-funnel-dot ${stageClass}`} />
                                            <iconify-icon icon={platformIcons[activity.platform]} style={{ fontSize: '10px', flexShrink: 0 }} />
                                            <span className="month-activity-title">{activity.title}</span>
                                            <span className={`status-square status-${activity.status}`} />
                                          </div>
                                        </SortableMonthActivityCard>
                                      );
                                    })}
                                  </div>
                                </SortableContext>
                              </div>
                            </DroppableMonthCell>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Day View - shown when layoutView is 'calendar' and periodView is 'day' */}
            {layoutView === 'calendar' && periodView === 'day' && (() => {
              const dayCampaigns = getDayCampaigns();
              const hasDayCampaigns = dayCampaigns.length > 0;
              const dayKey = format(currentDate, 'yyyy-MM-dd');
              const dayActivities = getActivitiesForDay(currentDate);
              const activityIds = dayActivities.map(a => a.id);

              return (
                <div className="day-grid-container">
                  {/* Header */}
                  <div className="day-grid-header">
                    <div className={`day-view-header ${isSameDay(currentDate, new Date()) ? 'today' : ''}`}>
                      <div className="day-header-name">{format(currentDate, 'EEE').toUpperCase()}</div>
                      <div className="day-header-date">{format(currentDate, 'd')}</div>
                    </div>
                  </div>

                  {/* Body - Single column with activities */}
                  <div className="day-grid-body">
                    <DroppableDayColumn dayKey={dayKey} isEmpty={dayActivities.length === 0}>
                      <div className="day-view-column-inner">
                        {/* Campaign bars for the day */}
                        {hasDayCampaigns && (
                          <div className="day-campaigns">
                            {dayCampaigns.map((campaign) => {
                              // Determine if this is start/end of campaign
                              const isStart = isSameDay(currentDate, new Date(campaign.startDate));
                              const isEnd = isSameDay(currentDate, new Date(campaign.endDate));

                              const barClasses = [
                                'day-campaign-bar',
                                isStart && 'is-start',
                                isEnd && 'is-end',
                              ].filter(Boolean).join(' ');

                              return (
                                <div
                                  key={campaign.id}
                                  className={barClasses}
                                  style={{ backgroundColor: campaign.color }}
                                >
                                  <span className="campaign-bar-name">{campaign.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {/* Activities with drag and drop */}
                        <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
                          {dayActivities.map((activity) => {
                            const stageInfo = FUNNEL_STAGES[activity.funnelStage];
                            const platformInfo = PLATFORM_INFO[activity.platform];

                            return (
                              <SortableActivityCard key={activity.id} activity={activity} dayKey={dayKey}>
                                <div
                                  className="day-activity-card"
                                  data-stage={activity.funnelStage}
                                  onClick={() => handleActivityClick(activity)}
                                >
                                  <div className="day-activity-header-row">
                                    <div className="funnel-badge">
                                      <div
                                        className="funnel-dot"
                                        style={{ background: stageInfo.color }}
                                      />
                                    </div>
                                    <div className="day-activity-title">{activity.title}</div>
                                  </div>
                                  <div className="day-activity-meta-group">
                                    <iconify-icon icon={platformIcons[activity.platform]} />
                                    <span>{platformInfo.name}</span>
                                    <span className="separator">·</span>
                                    <span className={`status-square status-${activity.status}`} />
                                    <span>{statusLabels[activity.status]}</span>
                                  </div>
                                </div>
                              </SortableActivityCard>
                            );
                          })}
                        </SortableContext>
                        {dayActivities.length === 0 && !hasDayCampaigns && (
                          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '32px', fontSize: '14px' }}>
                            No activities scheduled for this day
                          </div>
                        )}
                      </div>
                    </DroppableDayColumn>
                  </div>
                </div>
              );
            })()}

            {/* Drag Overlay */}
            <DragOverlay>
              {activeActivity && (
                <div style={{ opacity: 0.8, width: '140px' }}>
                  <ActivityCard activity={activeActivity} />
                </div>
              )}
            </DragOverlay>
          </DndContext>

          {/* List View (Kanban) - shown when layoutView is 'list' */}
          {layoutView === 'list' && (() => {
            // Get activities based on selected period
            const getActivitiesForPeriod = () => {
              if (periodView === 'day') {
                return filteredActivities.filter(a => isSameDay(new Date(a.date), currentDate));
              } else if (periodView === 'week') {
                return filteredActivities.filter(a =>
                  weekDays.some(day => isSameDay(new Date(a.date), day))
                );
              } else {
                // Month view - get all activities in the visible month days
                return filteredActivities.filter(a =>
                  monthDays.some(dayInfo => isSameDay(new Date(a.date), dayInfo.date))
                );
              }
            };

            const periodActivities = getActivitiesForPeriod();

            // Get running campaigns for the selected period
            const getRunningCampaigns = () => {
              const now = new Date();
              now.setHours(0, 0, 0, 0);
              return campaigns.filter(campaign => {
                const start = new Date(campaign.startDate);
                const end = new Date(campaign.endDate);
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);
                return now >= start && now <= end;
              });
            };

            const runningCampaigns = getRunningCampaigns();

            return (
              <div className="list-view-container">
                {listColumns.map((column) => {
                  const columnActivities = periodActivities.filter(a =>
                    column.statuses.includes(a.status)
                  );
                  const isRunningColumn = column.id === 'running';
                  const totalCount = columnActivities.length + (isRunningColumn ? runningCampaigns.length : 0);

                  return (
                    <div key={column.id} className="list-column">
                      <div className="list-column-header">
                        <div className="list-column-title">
                          <span
                            className="list-column-dot"
                            style={{ backgroundColor: column.color }}
                          />
                          <span>{column.label}</span>
                        </div>
                        {totalCount > 0 && (
                          <span className="list-column-count">{totalCount}</span>
                        )}
                      </div>
                      <div className="list-column-body">
                        {/* Running campaigns in the Running column */}
                        {isRunningColumn && runningCampaigns.map((campaign) => (
                          <div
                            key={campaign.id}
                            className="list-campaign-card"
                            style={{ borderColor: campaign.color }}
                          >
                            <div className="list-campaign-header">
                              <div
                                className="list-campaign-icon"
                                style={{ backgroundColor: campaign.color }}
                              >
                                <iconify-icon icon="lucide:megaphone" />
                              </div>
                              <span className="list-campaign-label">Campaign</span>
                            </div>
                            <div className="list-campaign-title">{campaign.name}</div>
                            <div className="list-campaign-dates">
                              {format(new Date(campaign.startDate), 'MMM d')} – {format(new Date(campaign.endDate), 'MMM d')}
                            </div>
                          </div>
                        ))}
                        {/* Activities */}
                        {columnActivities.map((activity) => {
                          const stageInfo = FUNNEL_STAGES[activity.funnelStage];
                          const platformInfo = PLATFORM_INFO[activity.platform];
                          return (
                            <div
                              key={activity.id}
                              className="list-activity-card"
                              onClick={() => handleActivityClick(activity)}
                            >
                              <div className="list-activity-title">{activity.title}</div>
                              <div className="list-activity-meta">
                                <iconify-icon icon={platformIcons[activity.platform]} />
                                <span>{platformInfo.name}</span>
                                <span className="separator">·</span>
                                <span className="list-activity-funnel">
                                  <span
                                    className="funnel-dot"
                                    style={{ backgroundColor: stageInfo.color }}
                                  />
                                  {stageInfo.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Funnel View - shown when layoutView is 'funnel' */}
          {layoutView === 'funnel' && (() => {
            // Get activities based on selected period
            const getActivitiesForPeriod = () => {
              if (periodView === 'day') {
                return filteredActivities.filter(a => isSameDay(new Date(a.date), currentDate));
              } else if (periodView === 'week') {
                return filteredActivities.filter(a =>
                  weekDays.some(day => isSameDay(new Date(a.date), day))
                );
              } else {
                // Month view - get all activities in the visible month days
                return filteredActivities.filter(a =>
                  monthDays.some(dayInfo => isSameDay(new Date(a.date), dayInfo.date))
                );
              }
            };

            const periodActivities = getActivitiesForPeriod();

            // Define funnel columns
            const funnelColumns: { id: FunnelStage; label: string; color: string }[] = [
              { id: 'awareness', label: 'Getting Seen', color: FUNNEL_STAGES.awareness.color },
              { id: 'consideration', label: 'Building Trust', color: FUNNEL_STAGES.consideration.color },
              { id: 'conversion', label: 'Making the Ask', color: FUNNEL_STAGES.conversion.color },
              { id: 'retention', label: 'Keeping Connected', color: FUNNEL_STAGES.retention.color },
            ];

            return (
              <div className="funnel-view-container">
                {funnelColumns.map((column) => {
                  const columnActivities = periodActivities.filter(a => a.funnelStage === column.id);

                  return (
                    <div key={column.id} className="funnel-column">
                      <div className="funnel-column-header" style={{ borderBottomColor: column.color }}>
                        <div className="funnel-column-title">
                          <span
                            className="funnel-column-dot"
                            style={{ backgroundColor: column.color }}
                          />
                          <span>{column.label}</span>
                        </div>
                        {columnActivities.length > 0 && (
                          <span className="funnel-column-count">{columnActivities.length} {columnActivities.length === 1 ? 'activity' : 'activities'}</span>
                        )}
                      </div>
                      <div className="funnel-column-body">
                        {columnActivities.map((activity) => {
                          const platformInfo = PLATFORM_INFO[activity.platform];
                          return (
                            <div
                              key={activity.id}
                              className="funnel-activity-card"
                              style={{ borderLeftColor: column.color }}
                              onClick={() => handleActivityClick(activity)}
                            >
                              <div className="funnel-activity-title">{activity.title}</div>
                              <div className="funnel-activity-meta">
                                <iconify-icon icon={platformIcons[activity.platform]} />
                                <span>{platformInfo.name}</span>
                                <span className="separator">·</span>
                                <span>{format(new Date(activity.date), 'EEE')}</span>
                                <span className={`status-badge status-${activity.status}`}>
                                  {statusLabels[activity.status]}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {columnActivities.length === 0 && (
                          <div className="funnel-empty-state">
                            No activities in this stage
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Heartie Sidebar */}
        <aside className="heartie-sidebar">
          {/* Funnel Health Check Section */}
          <div className="heartie-section">
            <div className="heartie-section-header">
              <iconify-icon icon="lucide:bar-chart-2" style={{ fontSize: '16px' }} />
              <span className="heartie-section-title">Funnel Health Check</span>
            </div>

            {/* Funnel Bars */}
            <div className="funnel-health-bars">
              {[
                { key: 'awareness', label: 'Awareness' },
                { key: 'consideration', label: 'Consideration' },
                { key: 'conversion', label: 'Conversion' },
                { key: 'retention', label: 'Retention' },
              ].map(({ key, label }) => (
                <div key={key} className="funnel-health-row">
                  <span className="funnel-health-label">{label}</span>
                  <div className="funnel-health-bar">
                    <div
                      className="funnel-health-fill"
                      style={{
                        width: `${funnelHealth[key as FunnelStage]}%`,
                        backgroundColor: FUNNEL_STAGES[key as FunnelStage].color,
                      }}
                    />
                  </div>
                  <span className="health-percentage">{funnelHealth[key as FunnelStage]}%</span>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="funnel-health-summary">
              Overall: Your top-of-funnel is thriving. This week, Heartie suggests layering in more proof and gentle invitations.
            </div>

            {/* Key Priority */}
            <div className="weekly-focus-priority">
              <div className="priority-label">Key Priority</div>
              <div className="priority-text">Create 2 client stories and 1 simple FAQ email.</div>
            </div>
          </div>

          {/* Suggested Actions Section */}
          <div className="heartie-section" style={{ borderBottom: 'none' }}>
            <div className="heartie-section-header">
              <iconify-icon icon="lucide:sparkles" style={{ fontSize: '14px' }} />
              <span className="heartie-section-title">Suggested Actions</span>
            </div>

            <div className="suggestion-cards">
              {suggestedActions.map((action, index) => (
                <SuggestionCard
                  key={index}
                  stage={action.stage}
                  title={action.title}
                  reason={action.reason}
                />
              ))}
            </div>

            <button className="btn-refresh">Refresh suggestions</button>
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

