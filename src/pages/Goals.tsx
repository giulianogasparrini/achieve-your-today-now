
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import GoalCard from '@/components/goals/GoalCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Goal interface
interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: string;
}

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Run a half marathon',
      description: 'Train to complete a half marathon in under 2 hours',
      deadline: '2023-09-15',
      progress: 65,
      category: 'Fitness'
    },
    {
      id: '2',
      title: 'Learn Spanish basics',
      description: 'Complete beginner Spanish course and be able to hold a basic conversation',
      deadline: '2023-08-30',
      progress: 40,
      category: 'Learning'
    },
    {
      id: '3',
      title: 'Read 20 books',
      description: 'Expand knowledge by reading 20 books this year across various genres',
      deadline: '2023-12-31',
      progress: 25,
      category: 'Personal'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'Personal'
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Personal', 'Fitness', 'Learning', 'Career', 'Financial', 'Health'];

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.deadline) {
      toast.error('Please fill in all the required fields');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      deadline: newGoal.deadline,
      progress: 0,
      category: newGoal.category
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      deadline: '',
      category: 'Personal'
    });
    
    setIsOpen(false);
    toast.success('Goal added successfully!');
  };

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: newProgress } : goal
    ));
    toast.success('Progress updated!');
  };

  return (
    <MainLayout>
      <div className="page-container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Goals</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1 bg-accent">
                <Plus size={16} />
                <span>Add Goal</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a new goal with a deadline to track your progress.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter goal title" 
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your goal" 
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleAddGoal} className="w-full">Create Goal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                deadline={goal.deadline}
                progress={goal.progress}
                category={goal.category}
                onUpdateProgress={(progress) => handleUpdateProgress(goal.id, progress)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="in-progress" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.filter(goal => goal.progress < 100).map(goal => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                deadline={goal.deadline}
                progress={goal.progress}
                category={goal.category}
                onUpdateProgress={(progress) => handleUpdateProgress(goal.id, progress)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.filter(goal => goal.progress === 100).map(goal => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                deadline={goal.deadline}
                progress={goal.progress}
                category={goal.category}
                onUpdateProgress={(progress) => handleUpdateProgress(goal.id, progress)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GoalsPage;
