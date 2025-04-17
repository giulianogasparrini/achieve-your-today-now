
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import HabitHistoryModal from './HabitHistoryModal';

interface HabitStreakProps {
  name?: string;
  streak?: number;
  lastWeek?: boolean[];
  onToggleToday?: () => void;
  completedDates?: Date[];
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HabitStreakDisplay = ({ 
  name = "New Habit", 
  streak = 0, 
  lastWeek = [false, false, false, false, false, false, false], 
  onToggleToday,
  completedDates = []
}: HabitStreakProps) => {
  const [showHistory, setShowHistory] = useState(false);

  // Get today's index (0-6, Monday-Sunday)
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday

  const handleToggle = () => {
    if (onToggleToday) {
      onToggleToday();
    }
  };

  return (
    <div className="habit-card p-4 bg-card rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center gap-1 text-xs font-semibold bg-theme-purple/10 text-theme-purple px-2 py-1 rounded-full">
          <span>🔥</span>
          <span>{streak} day streak</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        {days.map((day, index) => {
          let status;
          if (index < adjustedToday) {
            status = lastWeek[index] ? 'completed' : 'missed';
          } else if (index === adjustedToday) {
            status = lastWeek[index] ? 'completed' : 'future';
          } else {
            status = 'future';
          }
          
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs mb-1 text-muted-foreground">{day}</span>
              <div 
                className={`streak-circle ${status} ${index === adjustedToday ? 'cursor-pointer' : ''}`}
                onClick={index === adjustedToday ? handleToggle : undefined}
              >
                {status === 'completed' && '✓'}
                {status === 'future' && index === adjustedToday && '·'}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <button 
          className="text-sm px-3 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20"
          onClick={handleToggle}
        >
          {lastWeek[adjustedToday] ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button 
          className="text-xs flex items-center text-muted-foreground hover:text-foreground"
          onClick={() => setShowHistory(true)}
        >
          <Calendar size={14} className="mr-1" />
          <span>View history</span>
        </button>
      </div>

      <HabitHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        habitName={name}
        selectedDates={completedDates}
      />
    </div>
  );
};

export default HabitStreakDisplay;
