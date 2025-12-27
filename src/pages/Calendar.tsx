import { useState, useMemo, useCallback } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
} from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Activity, FunnelStage, Platform, ActivityStatus } from '../types';
import { FUNNEL_STAGES, PLATFORM_INFO } from '../types';
import { mockActivities } from '../lib/mockData';
import { ActivityDetailPanel } from '../components/calendar/ActivityDetailPanel';
import { AddActivityModal } from '../components/calendar/AddActivityModal';
import './Calendar.css';

type LayoutView = 'calendar' | 'list' | 'funnel';
type PeriodView = 'day' | 'week' | 'month';

// Sortable Activity Card wrapper - supports both reordering within column and moving between columns
function SortableActivityCard({ activity, children }: { activity: Activity; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: { activity },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

// Droppable Day Cell wrapper
function DroppableDayCell({ dayKey, rowIndex, children }: { dayKey: string; rowIndex: number; children?: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${dayKey}-row-${rowIndex}`,
    data: { dayKey, rowIndex },
  });

  return (
    <div
      ref={setNodeRef}
      className={`day-cell ${isOver ? 'day-cell-over' : ''}`}
    >
      {children}
    </div>
  );
}

// Activity Card Component
function ActivityCard({ activity, onClick }: { activity: Activity; onClick?: () => void }) {
  const stageInfo = FUNNEL_STAGES[activity.funnelStage];
  const platformInfo = PLATFORM_INFO[activity.platform];
  const statusLabel = activity.status.charAt(0).toUpperCase() + activity.status.slice(1);

  // Get platform icon name for lucide
  const platformIcons: Record<Platform, string> = {
    linkedin: 'lucide:linkedin',
    email: 'lucide:mail',
    instagram: 'lucide:instagram',
    facebook: 'lucide:facebook',
    tiktok: 'lucide:music',
    blog: 'lucide:file-text',
    other: 'lucide:file',
  };

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

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Find the dragged activity
    const draggedActivity = activities.find(a => a.id === activeId);
    if (!draggedActivity) return;

    // Check if dropping on a day cell (empty slot)
    const dayKeyMatch = overId.match(/^(.+)-row-\d+$/);
    if (dayKeyMatch) {
      const dayKey = dayKeyMatch[1];
      const newDate = new Date(dayKey);

      if (!isNaN(newDate.getTime())) {
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === activeId
              ? { ...activity, date: newDate }
              : activity
          )
        );
      }
      return;
    }

    // Check if dropping on another activity (reorder or move)
    const overActivity = activities.find(a => a.id === overId);
    if (overActivity) {
      const draggedDate = new Date(draggedActivity.date).toDateString();
      const overDate = new Date(overActivity.date).toDateString();

      if (draggedDate === overDate) {
        // Same day - reorder within column
        const dayActivities = activities.filter(a =>
          new Date(a.date).toDateString() === draggedDate
        );
        const oldIndex = dayActivities.findIndex(a => a.id === activeId);
        const newIndex = dayActivities.findIndex(a => a.id === overId);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reordered = arrayMove(dayActivities, oldIndex, newIndex);

          // Update the main activities array with new order
          setActivities((prev) => {
            const otherActivities = prev.filter(a =>
              new Date(a.date).toDateString() !== draggedDate
            );
            return [...otherActivities, ...reordered];
          });
        }
      } else {
        // Different day - move to the target day
        const newDate = new Date(overActivity.date);
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === activeId
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

  const navigatePrev = () => setCurrentDate((prev) => subWeeks(prev, 1));
  const navigateNext = () => setCurrentDate((prev) => addWeeks(prev, 1));

  const getDateRangeLabel = () => {
    const endDate = addDays(currentWeekStart, 6);
    return `${format(currentWeekStart, 'MMM d')} – ${format(endDate, 'd, yyyy')}`;
  };

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
          <span className="filter-label">Sorting:</span>
          <div className="select-filter" onClick={() => setSelectedFunnelStage(selectedFunnelStage === 'all' ? 'awareness' : 'all')}>
            <span>{selectedFunnelStage === 'all' ? 'All funnel stages' : FUNNEL_STAGES[selectedFunnelStage].name}</span>
            <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
          </div>
          <div className="select-filter" onClick={() => setSelectedPlatform(selectedPlatform === 'all' ? 'linkedin' : 'all')}>
            <span>{selectedPlatform === 'all' ? 'All platforms' : PLATFORM_INFO[selectedPlatform].name}</span>
            <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
          </div>
          <div className="select-filter" onClick={() => setSelectedStatus(selectedStatus === 'all' ? 'draft' : 'all')}>
            <span>{selectedStatus === 'all' ? 'All statuses' : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}</span>
            <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '14px' }} />
          </div>
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
            {/* Week Grid */}
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

              {/* Body */}
              <div className="week-grid-body">
                {weekDays.map((day) => {
                  const dayKey = day.toISOString();
                  const dayActivities = getActivitiesForDay(day);
                  const activityIds = dayActivities.map(a => a.id);

                  return (
                    <div key={dayKey} className="day-column">
                      <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
                        {/* Render activities */}
                        {dayActivities.map((activity, index) => (
                          <DroppableDayCell key={`${dayKey}-row-${index}`} dayKey={dayKey} rowIndex={index}>
                            <SortableActivityCard activity={activity}>
                              <ActivityCard
                                activity={activity}
                                onClick={() => handleActivityClick(activity)}
                              />
                            </SortableActivityCard>
                          </DroppableDayCell>
                        ))}
                        {/* Empty drop zones for remaining slots */}
                        {Array.from({ length: Math.max(0, 6 - dayActivities.length) }, (_, i) => (
                          <DroppableDayCell
                            key={`${dayKey}-row-${dayActivities.length + i}`}
                            dayKey={dayKey}
                            rowIndex={dayActivities.length + i}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeActivity && (
                <div style={{ opacity: 0.8, width: '140px' }}>
                  <ActivityCard activity={activeActivity} />
                </div>
              )}
            </DragOverlay>
          </DndContext>
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

