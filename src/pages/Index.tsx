
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import DailyOverview from '@/components/dashboard/DailyOverview';
import GoalCard from '@/components/goals/GoalCard';
import HabitStreakDisplay from '@/components/habits/HabitStreakDisplay';
import ProgressChart from '@/components/stats/ProgressChart';
import UserStats from '@/components/gamification/UserStats';
import JournalPrompt from '@/components/journal/JournalPrompt';
import ChallengeCard from '@/components/challenges/ChallengeCard';
import { Dumbbell, PencilLine, Plus, Target } from 'lucide-react';

const Index = () => {
  // Mock data for weekly progress
  const weeklyProgressData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 45 },
    { name: 'Thu', value: 90 },
    { name: 'Fri', value: 75 },
    { name: 'Sat', value: 50 },
    { name: 'Sun', value: 60 },
  ];

  // Mock journal prompt
  const todaysPrompt = "What are three things that went well today, and what's one thing you'd like to improve tomorrow?";

  return (
    <MainLayout>
      <div className="page-container space-y-6">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyOverview />
          <UserStats level={5} points={375} badges={8} streak={12} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Current Goals</h2>
            <button className="flex items-center gap-1 text-sm text-accent font-medium">
              <Plus size={16} />
              <span>Add Goal</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoalCard
              title="Run a half marathon"
              description="Train to complete a half marathon in under 2 hours"
              deadline="2023-09-15"
              progress={65}
              category="Fitness"
            />
            <GoalCard
              title="Learn Spanish basics"
              description="Complete beginner Spanish course and be able to hold a basic conversation"
              deadline="2023-08-30"
              progress={40}
              category="Learning"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Habit Streaks</h2>
            <button className="flex items-center gap-1 text-sm text-accent font-medium">
              <Plus size={16} />
              <span>Add Habit</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HabitStreakDisplay
              name="Morning Meditation"
              streak={12}
              lastWeek={[true, true, true, true, true, false, true]}
            />
            <HabitStreakDisplay
              name="Daily Exercise"
              streak={5}
              lastWeek={[false, true, true, true, true, false, true]}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Weekly Progress</h2>
            </div>
            <ProgressChart 
              data={weeklyProgressData} 
              title="Completion Rate" 
              subtitle="Percentage of daily tasks completed"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Today's Journal</h2>
              <button className="flex items-center gap-1 text-sm text-accent font-medium">
                <PencilLine size={16} />
                <span>Write</span>
              </button>
            </div>
            <JournalPrompt prompt={todaysPrompt} />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Featured Challenges</h2>
            <button className="text-sm text-accent font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChallengeCard
              title="30-Day Fitness Challenge"
              description="Exercise for at least 30 minutes every day for 30 days."
              participants={243}
              timeLeft="18 days left"
              joined={true}
            />
            <ChallengeCard
              title="Mindfulness Meditation"
              description="Practice mindfulness meditation for 10 minutes daily. Develop a calmer mind and better focus."
              participants={156}
              timeLeft="26 days left"
              joined={false}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
