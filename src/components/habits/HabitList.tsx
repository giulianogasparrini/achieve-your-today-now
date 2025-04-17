
import React from 'react';
import HabitStreakDisplay from './HabitStreakDisplay';
import { TabsContent } from "@/components/ui/tabs";

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastWeek: boolean[];
  category?: string;
  completedDates: Date[];
}

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  category?: string;
}

const HabitList = ({ habits, onToggleHabit, category }: HabitListProps) => {
  const filteredHabits = category && category !== 'all' 
    ? habits.filter(habit => habit.category?.toLowerCase() === category.toLowerCase())
    : habits;

  return (
    <TabsContent value={category || 'all'} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredHabits.map(habit => (
        <HabitStreakDisplay
          key={habit.id}
          name={habit.name}
          streak={habit.streak}
          lastWeek={habit.lastWeek}
          onToggleToday={() => onToggleHabit(habit.id)}
          completedDates={habit.completedDates}
        />
      ))}
    </TabsContent>
  );
};

export default HabitList;
