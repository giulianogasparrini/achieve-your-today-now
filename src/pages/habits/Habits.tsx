import React, { useState } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import HabitStreakDisplay from "../../components/habits/HabitStreakDisplay";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";

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

  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Wellness'
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Wellness', 'Fitness', 'Learning', 'Productivity', 'Self-care'];

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
    
    toast.success('Habit status updated!');
  };

  const handleAddHabit = () => {
    if (!newHabit.name) {
      toast.error('Please provide a name for your habit');
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      streak: 0,
      lastWeek: [false, false, false, false, false, false, false],
      category: newHabit.category,
      completedDates: []
    };

    setHabits([...habits, habit]);
    setNewHabit({
      name: '',
      category: 'Wellness'
    });
    
    setIsOpen(false);
    toast.success('Habit added successfully!');
  };

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Habits</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1 bg-accent">
                <Plus size={16} />
                <span>Add Habit</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Habit Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter habit name" 
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newHabit.category}
                    onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <Button onClick={handleAddHabit} className="w-full">Create Habit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs>
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map(habit => (
              <HabitStreakDisplay
                key={habit.id}
                name={habit.name}
                streak={habit.streak}
                lastWeek={habit.lastWeek}
                onToggleToday={() => handleToggleHabit(habit.id)}
                completedDates={habit.completedDates}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Habits;
