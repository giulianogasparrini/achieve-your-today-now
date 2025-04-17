
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import GoalCard from "../../components/goals/GoalCard";

const Goals = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <GoalCard />
          <GoalCard />
          <GoalCard />
          <GoalCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default Goals;
