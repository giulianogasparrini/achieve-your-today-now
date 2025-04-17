
import React, { useState } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import HabitStreakDisplay from "../../components/habits/HabitStreakDisplay";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Define the Habit interface
interface Habit {
  id: string;
  name: string;
  streak: number;
  lastWeek: boolean[];
  category?: string;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      streak: 12,
      lastWeek: [true, true, true, true, true, false, true],
      category: 'Wellness'
    },
    {
      id: '2',
      name: 'Daily Exercise',
      streak: 5,
      lastWeek: [false, true, true, true, true, false, true],
      category: 'Fitness'
    },
    {
      id: '3',
      name: 'Read 30 Minutes',
      streak: 8,
      lastWeek: [true, true, false, true, true, true, true],
      category: 'Learning'
    }
  ]);

  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Wellness'
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Wellness', 'Fitness', 'Learning', 'Productivity', 'Self-care'];

  const handleToggleHabit = (id: string) => {
    // Get today's index (0-6, Monday-Sunday)
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newLastWeek = [...habit.lastWeek];
        newLastWeek[adjustedToday] = !newLastWeek[adjustedToday];
        
        // Update streak based on the last consecutive completed days
        let newStreak = 0;
        if (newLastWeek[adjustedToday]) {
          // If marked as done, count streak
          newStreak = habit.streak + 1;
        } else {
          // If marked as undone, reset streak
          newStreak = 0;
          for (let i = adjustedToday - 1; i >= 0; i--) {
            if (newLastWeek[i]) newStreak++;
            else break;
          }
        }
        
        return { ...habit, lastWeek: newLastWeek, streak: newStreak };
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
      category: newHabit.category
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
