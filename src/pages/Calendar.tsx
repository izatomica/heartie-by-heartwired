import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { Activity, FunnelStage } from '../types';
import { FUNNEL_STAGES } from '../types';
import { mockActivities } from '../lib/mockData';
import { ActivityCard } from '../components/calendar/ActivityCard';
import { ActivityDetailPanel } from '../components/calendar/ActivityDetailPanel';
import { AddActivityModal } from '../components/calendar/AddActivityModal';
import { Card } from '../components/ui';

export function Calendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [selectedFunnelStages, setSelectedFunnelStages] = useState<Set<FunnelStage>>(
    new Set(['awareness', 'consideration', 'conversion', 'retention'])
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialDate, setAddModalInitialDate] = useState<Date | undefined>(undefined);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-bold text-text-primary mb-2">
          Calendar
        </h1>
        <p className="text-text-secondary">
          Plan your marketing activities week by week.
        </p>
      </div>

      {/* Navigation & Filters */}
      <Card padding="md">
        <div className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentWeekStart((prev) => subWeeks(prev, 1))}
              className="btn-ghost flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>
            <h2 className="font-headline font-semibold text-lg text-text-primary">
              {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentWeekStart((prev) => addWeeks(prev, 1))}
              className="btn-ghost flex items-center gap-1"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Today Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
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

      {/* Weekly Calendar Grid */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const isToday = isSameDay(day, new Date());
            const dayActivities = getActivitiesForDay(day);
            const dateStr = day.toISOString();

            return (
              <div
                key={dateStr}
                className={`min-h-[200px] rounded-lg border-2 p-3 ${
                  isToday ? 'bg-dusty-pink-light border-dusty-pink' : 'bg-white border-border'
                }`}
              >
                {/* Day Header */}
                <div className="mb-3">
                  <div className="text-xs font-medium text-text-muted uppercase">
                    {format(day, 'EEE')}
                  </div>
                  <div
                    className={`text-2xl font-headline font-bold ${
                      isToday ? 'text-burgundy' : 'text-text-primary'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-2">
                  {dayActivities.map((activity) => (
                    <div
                      key={activity.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('activityId', activity.id);
                      }}
                    >
                      <ActivityCard
                        activity={activity}
                        onClick={() => handleActivityClick(activity)}
                      />
                    </div>
                  ))}

                  {/* Add Activity Button */}
                  <button
                    className="w-full py-2 text-text-muted hover:text-burgundy hover:bg-cream-dark rounded-md transition-colors text-sm font-medium"
                    onClick={() => handleAddActivity(day)}
                  >
                    + Add
                  </button>
                </div>

                {/* Drop Zone (invisible) */}
                <div
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
                  className="absolute inset-0 pointer-events-auto"
                  style={{ zIndex: -1 }}
                />
              </div>
            );
          })}
        </div>

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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-semibold text-text-primary">
              This Week Summary
            </h3>
            <p className="text-sm text-text-muted">
              {filteredActivities.length} activities planned
            </p>
          </div>
          <div className="flex gap-4">
            {Object.entries(FUNNEL_STAGES).map(([stage, info]) => {
              const count = filteredActivities.filter((a) => a.funnelStage === stage).length;
              return (
                <div key={stage} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-1"
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
