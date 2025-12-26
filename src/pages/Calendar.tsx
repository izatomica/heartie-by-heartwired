import { useState, useMemo } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addQuarters,
  subQuarters,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  eachDayOfInterval,
  eachWeekOfInterval,
} from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, useDroppable, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Activity, FunnelStage } from '../types';
import { FUNNEL_STAGES } from '../types';
import { mockActivities } from '../lib/mockData';
import { ActivityCard } from '../components/calendar/ActivityCard';
import { ActivityDetailPanel } from '../components/calendar/ActivityDetailPanel';
import { AddActivityModal } from '../components/calendar/AddActivityModal';
import { Card } from '../components/ui';

// Draggable Activity wrapper component
function DraggableActivity({ activity, children }: { activity: Activity; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

// Droppable Day wrapper component
function DroppableDay({ day, children, isToday }: { day: Date; children: React.ReactNode; isToday: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: day.toISOString(),
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[180px] sm:min-h-[200px] rounded-lg border-2 p-2 sm:p-3 transition-colors ${
        isOver
          ? 'bg-dusty-pink-light border-dusty-pink'
          : isToday
          ? 'bg-dusty-pink-light border-dusty-pink'
          : 'bg-white border-border'
      }`}
    >
      {children}
    </div>
  );
}

type CalendarView = 'week' | 'month' | 'quarter';

export function Calendar() {
  const [calendarView, setCalendarView] = useState<CalendarView>('week');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [selectedFunnelStages, setSelectedFunnelStages] = useState<Set<FunnelStage>>(
    new Set(['awareness', 'consideration', 'conversion', 'retention'])
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialDate, setAddModalInitialDate] = useState<Date | undefined>(undefined);

  // Derived date ranges based on view
  const currentWeekStart = useMemo(() =>
    startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]
  );
  const currentMonthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const currentQuarterStart = useMemo(() => startOfQuarter(currentDate), [currentDate]);

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
    return activities.filter((activity) => selectedFunnelStages.has(activity.funnelStage));
  }, [activities, selectedFunnelStages]);

  const getActivitiesForDay = (day: Date) => {
    return filteredActivities.filter((activity) => isSameDay(new Date(activity.date), day));
  };

  const toggleFunnelStage = (stage: FunnelStage) => {
    const newStages = new Set(selectedFunnelStages);
    if (newStages.has(stage)) {
      newStages.delete(stage);
    } else {
      newStages.add(stage);
    }
    setSelectedFunnelStages(newStages);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activityId = active.id.toString();
    const newDateStr = over.id.toString();

    if (activityId && newDateStr) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? { ...activity, date: new Date(newDateStr) }
            : activity
        )
      );
    }
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDetailPanelOpen(true);
  };

  const handleAddActivity = (date: Date) => {
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

  const activeActivity = activeId ? activities.find((a) => a.id === activeId) : null;

  // Navigation handlers
  const navigatePrev = () => {
    if (calendarView === 'week') {
      setCurrentDate((prev) => subWeeks(prev, 1));
    } else if (calendarView === 'month') {
      setCurrentDate((prev) => subMonths(prev, 1));
    } else {
      setCurrentDate((prev) => subQuarters(prev, 1));
    }
  };

  const navigateNext = () => {
    if (calendarView === 'week') {
      setCurrentDate((prev) => addWeeks(prev, 1));
    } else if (calendarView === 'month') {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else {
      setCurrentDate((prev) => addQuarters(prev, 1));
    }
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  // Get date range label for navigation header
  const getDateRangeLabel = () => {
    if (calendarView === 'week') {
      return `${format(currentWeekStart, 'MMM d')} - ${format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}`;
    } else if (calendarView === 'month') {
      return format(currentMonthStart, 'MMMM yyyy');
    } else {
      const quarterNum = Math.floor(currentMonthStart.getMonth() / 3) + 1;
      return `Q${quarterNum} ${format(currentQuarterStart, 'yyyy')}`;
    }
  };

  // Get activities for date range based on view
  const getActivitiesForDateRange = () => {
    if (calendarView === 'week') {
      const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
      return filteredActivities.filter((activity) =>
        isWithinInterval(new Date(activity.date), { start: currentWeekStart, end: weekEnd })
      );
    } else if (calendarView === 'month') {
      const monthEnd = endOfMonth(currentMonthStart);
      return filteredActivities.filter((activity) =>
        isWithinInterval(new Date(activity.date), { start: currentMonthStart, end: monthEnd })
      );
    } else {
      const quarterEnd = endOfQuarter(currentQuarterStart);
      return filteredActivities.filter((activity) =>
        isWithinInterval(new Date(activity.date), { start: currentQuarterStart, end: quarterEnd })
      );
    }
  };

  // Generate month calendar grid (6 weeks x 7 days)
  const monthCalendarDays = useMemo(() => {
    const monthStart = currentMonthStart;
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonthStart]);

  // Generate quarter weeks for quarter view
  const quarterWeeks = useMemo(() => {
    const quarterEnd = endOfQuarter(currentQuarterStart);
    return eachWeekOfInterval(
      { start: currentQuarterStart, end: quarterEnd },
      { weekStartsOn: 1 }
    );
  }, [currentQuarterStart]);

  // Get activities count for a week (used in quarter view)
  const getActivitiesForWeek = (weekStart: Date) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    return filteredActivities.filter((activity) =>
      isWithinInterval(new Date(activity.date), { start: weekStart, end: weekEnd })
    );
  };

  const activitiesInRange = getActivitiesForDateRange();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-text-primary mb-2">
          Calendar
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Plan your marketing activities {calendarView === 'week' ? 'week by week' : calendarView === 'month' ? 'for the month' : 'for the quarter'}.
        </p>
      </div>

      {/* Navigation & Filters */}
      <Card padding="md">
        <div className="space-y-4">
          {/* View Toggle Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-cream-dark p-1">
              {(['week', 'month', 'quarter'] as CalendarView[]).map((view) => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    calendarView === view
                      ? 'bg-teal-dark text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={navigatePrev}
              className="btn-ghost flex items-center gap-1 text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Prev</span>
            </button>
            <h2 className="font-headline font-semibold text-sm sm:text-lg text-text-primary text-center">
              {getDateRangeLabel()}
            </h2>
            <button
              onClick={navigateNext}
              className="btn-ghost flex items-center gap-1 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Next</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Today Button */}
          <div className="flex justify-center">
            <button
              onClick={navigateToToday}
              className="btn-secondary"
            >
              Today
            </button>
          </div>

          {/* Funnel Stage Filters */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">Filter by Funnel Stage:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
                const isActive = selectedFunnelStages.has(stage as FunnelStage);
                return (
                  <button
                    key={stage}
                    onClick={() => toggleFunnelStage(stage as FunnelStage)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? info.color : 'white',
                      color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                      border: `2px solid ${info.color}`,
                    }}
                  >
                    {info.emoji} {info.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Calendar Grid - Conditional based on view */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Week View */}
        {calendarView === 'week' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-3">
            {weekDays.map((day) => {
              const isToday = isSameDay(day, new Date());
              const dayActivities = getActivitiesForDay(day);

              return (
                <DroppableDay key={day.toISOString()} day={day} isToday={isToday}>
                  {/* Day Header */}
                  <div className="mb-2 sm:mb-3 flex sm:block items-center justify-between">
                    <div className="flex items-center gap-2 sm:block">
                      <div className="text-xs font-medium text-text-muted uppercase">
                        {format(day, 'EEE')}
                      </div>
                      <div
                        className={`text-xl sm:text-2xl font-headline font-bold ${
                          isToday ? 'text-burgundy' : 'text-text-primary'
                        }`}
                      >
                        {format(day, 'd')}
                      </div>
                    </div>
                    <div className="text-xs text-text-muted sm:hidden">
                      {format(day, 'MMM')}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-2">
                    {dayActivities.map((activity) => (
                      <DraggableActivity key={activity.id} activity={activity}>
                        <ActivityCard
                          activity={activity}
                          onClick={() => handleActivityClick(activity)}
                        />
                      </DraggableActivity>
                    ))}

                    {/* Add Activity Button */}
                    <button
                      className="w-full py-2 text-text-muted hover:text-burgundy hover:bg-cream-dark rounded-md transition-colors text-sm font-medium"
                      onClick={() => handleAddActivity(day)}
                    >
                      + Add
                    </button>
                  </div>
                </DroppableDay>
              );
            })}
          </div>
        )}

        {/* Month View */}
        {calendarView === 'month' && (
          <div className="bg-white rounded-lg border-2 border-border overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-cream-dark border-b border-border">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="py-2 text-center text-xs font-medium text-text-muted uppercase">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {monthCalendarDays.map((day) => {
                const isToday = isSameDay(day, new Date());
                const isCurrentMonth = isSameMonth(day, currentMonthStart);
                const dayActivities = getActivitiesForDay(day);
                const dateStr = day.toISOString();

                return (
                  <div
                    key={dateStr}
                    className={`min-h-[100px] sm:min-h-[120px] border-b border-r border-border p-1 sm:p-2 ${
                      isToday ? 'bg-dusty-pink-light' : isCurrentMonth ? 'bg-white' : 'bg-cream'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const activityId = e.dataTransfer.getData('activityId');
                      if (activityId) {
                        setActivities((prev) =>
                          prev.map((activity) =>
                            activity.id === activityId
                              ? { ...activity, date: day }
                              : activity
                          )
                        );
                      }
                    }}
                  >
                    {/* Day Number */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isToday
                            ? 'text-burgundy font-bold'
                            : isCurrentMonth
                            ? 'text-text-primary'
                            : 'text-text-muted'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                      {isCurrentMonth && (
                        <button
                          onClick={() => handleAddActivity(day)}
                          className="w-5 h-5 rounded-full text-text-muted hover:text-burgundy hover:bg-cream-dark transition-colors text-xs"
                        >
                          +
                        </button>
                      )}
                    </div>
                    {/* Activity Pills */}
                    <div className="space-y-0.5">
                      {dayActivities.slice(0, 3).map((activity) => (
                        <div
                          key={activity.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('activityId', activity.id);
                          }}
                          onClick={() => handleActivityClick(activity)}
                          className="text-xs px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: FUNNEL_STAGES[activity.funnelStage].color,
                            color: '#FFFFFF',
                          }}
                          title={activity.title}
                        >
                          {activity.title}
                        </div>
                      ))}
                      {dayActivities.length > 3 && (
                        <div className="text-xs text-text-muted px-1.5">
                          +{dayActivities.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quarter View */}
        {calendarView === 'quarter' && (
          <div className="space-y-4">
            {/* Quarter Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((monthOffset) => {
                const monthDate = addMonths(currentQuarterStart, monthOffset);
                const monthStart = startOfMonth(monthDate);
                const monthEnd = endOfMonth(monthDate);
                const monthActivities = filteredActivities.filter((activity) =>
                  isWithinInterval(new Date(activity.date), { start: monthStart, end: monthEnd })
                );

                return (
                  <Card key={monthOffset} className="overflow-hidden">
                    <div className="bg-teal-dark text-white px-4 py-2 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-4">
                      <h4 className="font-headline font-semibold">
                        {format(monthDate, 'MMMM')}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {/* Funnel breakdown for month */}
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
                          const count = monthActivities.filter((a) => a.funnelStage === stage).length;
                          return (
                            <div
                              key={stage}
                              className="flex items-center gap-1 text-xs"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: info.color }}
                              />
                              <span className="text-text-muted">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {monthActivities.length} activities planned
                      </p>
                      {/* Week breakdown */}
                      <div className="space-y-2">
                        {quarterWeeks
                          .filter((weekStart) => isSameMonth(weekStart, monthDate))
                          .map((weekStart) => {
                            const weekActivities = getActivitiesForWeek(weekStart);
                            const weekEnd = addDays(weekStart, 6);
                            return (
                              <div
                                key={weekStart.toISOString()}
                                className="flex items-center justify-between p-2 bg-cream rounded-md hover:bg-cream-dark transition-colors cursor-pointer"
                                onClick={() => {
                                  setCurrentDate(weekStart);
                                  setCalendarView('week');
                                }}
                              >
                                <span className="text-sm text-text-secondary">
                                  {format(weekStart, 'MMM d')} - {format(weekEnd, 'd')}
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="flex -space-x-1">
                                    {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
                                      const count = weekActivities.filter(
                                        (a) => a.funnelStage === stage
                                      ).length;
                                      if (count === 0) return null;
                                      return (
                                        <div
                                          key={stage}
                                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-medium border-2 border-white"
                                          style={{ backgroundColor: info.color }}
                                        >
                                          {count}
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <span className="text-xs text-text-muted">
                                    {weekActivities.length} total
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeActivity && (
            <div className="opacity-80">
              <ActivityCard activity={activeActivity} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Summary Stats */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-semibold text-text-primary">
              {calendarView === 'week' ? 'This Week' : calendarView === 'month' ? 'This Month' : 'This Quarter'} Summary
            </h3>
            <p className="text-sm text-text-muted">
              {activitiesInRange.length} activities planned
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
            {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
              const count = activitiesInRange.filter((a) => a.funnelStage === stage).length;
              return (
                <div key={stage} className="text-center">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold mb-1"
                    style={{ backgroundColor: info.color }}
                  >
                    {count}
                  </div>
                  <p className="text-xs text-text-muted">{info.name.split(' ')[0]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

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
