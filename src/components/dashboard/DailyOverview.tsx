
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const DailyOverview = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  // Mock data
  const habits = [
    { id: 1, name: 'Morning Meditation', completed: true },
    { id: 2, name: 'Drink 8 glasses of water', completed: false },
    { id: 3, name: 'Read 30 minutes', completed: true },
    { id: 4, name: 'Exercise', completed: false },
  ];

  const completedCount = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedCount / totalHabits) * 100);

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{dayName}, {date}</h2>
        <span className="text-sm font-medium bg-accent/10 text-accent px-2 py-1 rounded-lg">
          {completionRate}% Complete
        </span>
      </div>

      <div className="space-y-3">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {habit.completed ? (
                <CheckCircle className="text-theme-teal" size={20} />
              ) : (
                <Circle className="text-muted-foreground" size={20} />
              )}
              <span className={habit.completed ? 'line-through text-muted-foreground' : ''}>
                {habit.name}
              </span>
            </div>
            {!habit.completed && (
              <button className="text-xs px-2 py-1 text-accent hover:bg-accent/10 rounded-lg">
                Complete
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{completedCount}/{totalHabits} habits completed</span>
        </div>
        <div className="progress-bar">
          <div 
            className="h-full bg-theme-teal transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyOverview;
