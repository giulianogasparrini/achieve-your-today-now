
import React from 'react';
import { Calendar, CheckCircle2, ChevronRight, Target } from 'lucide-react';

interface GoalProps {
  title: string;
  deadline: string;
  description: string;
  progress: number;
  category: string;
}

const GoalCard = ({ title, deadline, description, progress, category }: GoalProps) => {
  // Function to determine progress color
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-progress-low';
    if (progress < 70) return 'bg-progress-medium';
    return 'bg-progress-high';
  };
  
  // Format deadline
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="goal-card">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-theme-purple/10 p-1.5 rounded-md">
            <Target size={18} className="text-theme-purple" />
          </div>
          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar size={14} className="mr-1" />
          <span>{formattedDeadline}</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        {progress === 100 ? (
          <div className="flex items-center text-xs text-theme-teal">
            <CheckCircle2 size={14} className="mr-1" />
            <span>Completed!</span>
          </div>
        ) : (
          <button className="text-xs text-accent">Update progress</button>
        )}
        <button className="flex items-center text-xs text-muted-foreground hover:text-foreground">
          <span>Details</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
