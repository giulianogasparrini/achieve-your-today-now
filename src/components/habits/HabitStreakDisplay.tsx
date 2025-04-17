
import React from 'react';
import { Calendar } from 'lucide-react';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface HabitStreakProps {
  name?: string;
  streak?: number;
  lastWeek?: boolean[];
  onToggleToday?: () => void;
}

const HabitStreakDisplay = ({ 
  name = "New Habit", 
  streak = 0, 
  lastWeek = [false, false, false, false, false, false, false], 
  onToggleToday 
}: HabitStreakProps) => {
  // Get today's index (0-6, Monday-Sunday)
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday

  return (
    <div className="habit-card">
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
          // For days in the past
          if (index < adjustedToday) {
            status = lastWeek[index] ? 'completed' : 'missed';
          }
          // For today
          else if (index === adjustedToday) {
            status = lastWeek[index] ? 'completed' : 'future'; // If already completed today
          }
          // For future days
          else {
            status = 'future';
          }
          
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs mb-1 text-muted-foreground">{day}</span>
              <div 
                className={`streak-circle ${status} ${index === adjustedToday ? 'cursor-pointer' : ''}`}
                onClick={index === adjustedToday ? onToggleToday : undefined}
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
          onClick={onToggleToday}
        >
          {lastWeek[adjustedToday] ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button className="text-xs flex items-center text-muted-foreground hover:text-foreground">
          <Calendar size={14} className="mr-1" />
          <span>View history</span>
        </button>
      </div>
    </div>
  );
};

export default HabitStreakDisplay;
