
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface HabitFormProps {
  onAddHabit: (habit: {
    name: string;
    category: string;
  }) => void;
}

const HabitForm = ({ onAddHabit }: HabitFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Wellness'
  });

  const categories = ['Wellness', 'Fitness', 'Learning', 'Productivity', 'Self-care'];

  const handleAddHabit = () => {
    if (!newHabit.name) {
      toast.error('Please provide a name for your habit');
      return;
    }

    onAddHabit(newHabit);
    setNewHabit({
      name: '',
      category: 'Wellness'
    });
    setIsOpen(false);
    toast.success('Habit added successfully!');
  };

  return (
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
  );
};

export default HabitForm;
