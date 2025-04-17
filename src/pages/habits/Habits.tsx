
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import HabitStreakDisplay from "../../components/habits/HabitStreakDisplay";

const Habits = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
        <div className="grid gap-4">
          <HabitStreakDisplay />
          <HabitStreakDisplay />
          <HabitStreakDisplay />
        </div>
      </div>
    </MainLayout>
  );
};

export default Habits;
