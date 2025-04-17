import React, { useState } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HabitForm from '../../components/habits/HabitForm';
import HabitList from '../../components/habits/HabitList';

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastWeek: boolean[];
  category?: string;
  completedDates: Date[];
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      streak: 12,
      lastWeek: [true, true, true, true, true, false, true],
      category: 'Wellness',
      completedDates: [
        new Date(2025, 3, 1),
        new Date(2025, 3, 2),
        new Date(2025, 3, 3),
        new Date(2025, 3, 4),
        new Date(2025, 3, 5),
        new Date(2025, 3, 7),
      ]
    },
    {
      id: '2',
      name: 'Daily Exercise',
      streak: 5,
      lastWeek: [false, true, true, true, true, false, true],
      category: 'Fitness',
      completedDates: [
        new Date(2025, 3, 2),
        new Date(2025, 3, 3),
        new Date(2025, 3, 4),
        new Date(2025, 3, 5),
        new Date(2025, 3, 7),
      ]
    },
    {
      id: '3',
      name: 'Read 30 Minutes',
      streak: 8,
      lastWeek: [true, true, false, true, true, true, true],
      category: 'Learning',
      completedDates: [
        new Date(2025, 3, 1),
        new Date(2025, 3, 2),
        new Date(2025, 3, 4),
        new Date(2025, 3, 5),
        new Date(2025, 3, 6),
        new Date(2025, 3, 7),
      ]
    }
  ]);

  const handleToggleHabit = (id: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const adjustedToday = today.getDay() === 0 ? 6 : today.getDay() - 1;
        const newLastWeek = [...habit.lastWeek];
        newLastWeek[adjustedToday] = !newLastWeek[adjustedToday];
        
        let newCompletedDates = [...habit.completedDates];
        if (newLastWeek[adjustedToday]) {
          newCompletedDates.push(today);
        } else {
          newCompletedDates = newCompletedDates.filter(
            date => date.getTime() !== today.getTime()
          );
        }
        
        let newStreak = 0;
        if (newLastWeek[adjustedToday]) {
          newStreak = habit.streak + 1;
        } else {
          newStreak = 0;
          for (let i = adjustedToday - 1; i >= 0; i--) {
            if (newLastWeek[i]) newStreak++;
            else break;
          }
        }
        
        return { 
          ...habit, 
          lastWeek: newLastWeek, 
          streak: newStreak,
          completedDates: newCompletedDates 
        };
      }
      return habit;
    }));
  };

  const handleAddHabit = (newHabit: { name: string; category: string }) => {
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      streak: 0,
      lastWeek: [false, false, false, false, false, false, false],
      category: newHabit.category,
      completedDates: []
    };

    setHabits([...habits, habit]);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Habits</h1>
          <HabitForm onAddHabit={handleAddHabit} />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Habits</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="fitness">Fitness</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>

          <HabitList habits={habits} onToggleHabit={handleToggleHabit} category="all" />
          <HabitList habits={habits} onToggleHabit={handleToggleHabit} category="wellness" />
          <HabitList habits={habits} onToggleHabit={handleToggleHabit} category="fitness" />
          <HabitList habits={habits} onToggleHabit={handleToggleHabit} category="learning" />
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Habits;
