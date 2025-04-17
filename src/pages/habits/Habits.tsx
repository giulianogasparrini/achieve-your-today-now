
import React, { useState } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import HabitStreakDisplay from "../../components/habits/HabitStreakDisplay";

const Habits = () => {
  const [habits, setHabits] = useState([
    {
      id: '1',
      name: 'Morning Meditation',
      streak: 12,
      lastWeek: [true, true, true, true, true, false, true],
    },
    {
      id: '2',
      name: 'Daily Exercise',
      streak: 5,
      lastWeek: [false, true, true, true, true, false, true],
    },
    {
      id: '3',
      name: 'Read 30 Minutes',
      streak: 8,
      lastWeek: [true, true, false, true, true, true, true],
    }
  ]);

  const handleToggleHabit = (id: string) => {
    // Function placeholder for toggling habits
    console.log(`Toggled habit: ${id}`);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
        <div className="grid gap-4">
          {habits.map(habit => (
            <HabitStreakDisplay
              key={habit.id}
              name={habit.name}
              streak={habit.streak}
              lastWeek={habit.lastWeek}
              onToggleToday={() => handleToggleHabit(habit.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Habits;
