
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import DailyOverview from "../../components/dashboard/DailyOverview";
import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import UserStats from "../../components/gamification/UserStats";
import { Link } from "react-router-dom";
import GoalCard from "../../components/goals/GoalCard";
import HabitStreakDisplay from "../../components/habits/HabitStreakDisplay";
import ProgressChart from "../../components/stats/ProgressChart";
import JournalPrompt from "../../components/journal/JournalPrompt";
import ChallengeCard from "../../components/challenges/ChallengeCard";
import { Plus, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

  const handleGoalUpdate = (progress: number) => {
    // This would update the goal in a real app
    console.log("Updated goal progress:", progress);
  };

  const handleToggleHabit = () => {
    // This would toggle the habit in a real app
    console.log("Habit toggled");
  };

  const handleJoinChallenge = (id: string) => {
    // This would join the challenge in a real app
    console.log("Joined challenge:", id);
  };

  const handleLeaveChallenge = (id: string) => {
    // This would leave the challenge in a real app
    console.log("Left challenge:", id);
  };

  return (
    <MainLayout>
      <div className="page-container space-y-6 p-4">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DailyOverview />
          <UserStats level={5} points={375} badges={8} streak={12} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Current Goals</h2>
            <Link to="/goals" className="flex items-center gap-1 text-sm text-accent font-medium">
              <Plus size={16} />
              <span>Add Goal</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoalCard
              title="Run a half marathon"
              description="Train to complete a half marathon in under 2 hours"
              deadline="2023-09-15"
              progress={65}
              category="Fitness"
              onUpdateProgress={handleGoalUpdate}
            />
            <GoalCard
              title="Learn Spanish basics"
              description="Complete beginner Spanish course and be able to hold a basic conversation"
              deadline="2023-08-30"
              progress={40}
              category="Learning"
              onUpdateProgress={handleGoalUpdate}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Habit Streaks</h2>
            <Link to="/habits" className="flex items-center gap-1 text-sm text-accent font-medium">
              <Plus size={16} />
              <span>Add Habit</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HabitStreakDisplay
              name="Morning Meditation"
              streak={12}
              lastWeek={[true, true, true, true, true, false, true]}
              onToggleToday={handleToggleHabit}
            />
            <HabitStreakDisplay
              name="Daily Exercise"
              streak={5}
              lastWeek={[false, true, true, true, true, false, true]}
              onToggleToday={handleToggleHabit}
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
              <Link to="/journal" className="flex items-center gap-1 text-sm text-accent font-medium">
                <PencilLine size={16} />
                <span>Write</span>
              </Link>
            </div>
            <JournalPrompt 
              prompt={todaysPrompt} 
              onStartWriting={() => navigate('/journal')}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Featured Challenges</h2>
            <Link to="/challenges" className="text-sm text-accent font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChallengeCard
              id="1"
              title="30-Day Fitness Challenge"
              description="Exercise for at least 30 minutes every day for 30 days."
              participants={243}
              timeLeft="18 days left"
              joined={true}
              onJoin={() => handleJoinChallenge("1")}
              onLeave={() => handleLeaveChallenge("1")}
            />
            <ChallengeCard
              id="2"
              title="Mindfulness Meditation"
              description="Practice mindfulness meditation for 10 minutes daily. Develop a calmer mind and better focus."
              participants={156}
              timeLeft="26 days left"
              joined={false}
              onJoin={() => handleJoinChallenge("2")}
              onLeave={() => handleLeaveChallenge("2")}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
