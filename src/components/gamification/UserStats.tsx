
import React from 'react';
import { BadgeCheck, Star, TrendingUp } from 'lucide-react';

interface UserStatsProps {
  level: number;
  points: number;
  badges: number;
  streak: number;
}

const UserStats = ({ level, points, badges, streak }: UserStatsProps) => {
  // Calculate progress to next level (0-100)
  const nextLevelPoints = level * 100;
  const progress = Math.min(Math.round((points / nextLevelPoints) * 100), 100);
  
  const statItems = [
    { icon: <Star size={20} className="text-theme-orange" />, value: points, label: 'Points' },
    { icon: <BadgeCheck size={20} className="text-theme-purple" />, value: badges, label: 'Badges' },
    { icon: <TrendingUp size={20} className="text-theme-teal" />, value: streak, label: 'Day Streak' },
  ];

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Level {level}</h3>
          <p className="text-xs text-muted-foreground">Keep going!</p>
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-theme-purple bg-theme-purple/10 flex items-center justify-center text-lg font-bold text-theme-purple">
          {level}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span>{points} points</span>
          <span>{nextLevelPoints} points</span>
        </div>
        <div className="progress-bar">
          <div 
            className="h-full bg-theme-purple transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-center text-muted-foreground">
          {nextLevelPoints - points} points to level {level + 1}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {statItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-secondary rounded-lg p-2">
            <div className="mb-1">{item.icon}</div>
            <div className="font-semibold">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
