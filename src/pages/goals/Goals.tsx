
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import GoalCard from "../../components/goals/GoalCard";

const Goals = () => {
  const goals = [
    {
      id: '1',
      title: "Run a half marathon",
      description: "Train to complete a half marathon in under 2 hours",
      deadline: "2023-09-15",
      progress: 65,
      category: "Fitness"
    },
    {
      id: '2',
      title: "Learn Spanish basics",
      description: "Complete beginner Spanish course and be able to hold a basic conversation",
      deadline: "2023-08-30",
      progress: 40,
      category: "Learning"
    },
    {
      id: '3',
      title: "Develop a mobile app",
      description: "Create and publish a simple productivity app",
      deadline: "2023-10-20",
      progress: 25,
      category: "Development"
    },
    {
      id: '4',
      title: "Read 12 books this year",
      description: "Read one book per month to expand knowledge",
      deadline: "2023-12-31",
      progress: 50,
      category: "Learning"
    }
  ];

  const handleGoalUpdate = (progress: number) => {
    console.log("Goal progress updated:", progress);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
        <div className="grid gap-4">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id}
              title={goal.title}
              description={goal.description}
              deadline={goal.deadline}
              progress={goal.progress}
              category={goal.category}
              onUpdateProgress={handleGoalUpdate}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Goals;
