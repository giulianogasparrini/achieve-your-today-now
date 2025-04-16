
import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronRight, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface GoalProps {
  title: string;
  deadline: string;
  description: string;
  progress: number;
  category: string;
  onUpdateProgress?: (progress: number) => void;
}

const GoalCard = ({ 
  title, 
  deadline, 
  description, 
  progress, 
  category,
  onUpdateProgress
}: GoalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(progress);
  
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

  const handleUpdateProgress = () => {
    if (onUpdateProgress) {
      onUpdateProgress(newProgress);
      setIsOpen(false);
    }
  };

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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="text-xs p-0 h-auto text-accent">Update progress</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Progress</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <h3 className="font-semibold">{title}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current progress: {progress}%</span>
                    <span className="text-sm font-medium">New: {newProgress}%</span>
                  </div>
                  <Slider
                    value={[newProgress]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setNewProgress(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                <Button onClick={handleUpdateProgress} className="w-full">
                  Save Progress
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
