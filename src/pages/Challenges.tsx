
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import ChallengeCard from '@/components/challenges/ChallengeCard';
import { Plus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Challenge interface
interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  joined: boolean;
  category: string;
  durationDays: number;
}

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '30-Day Fitness Challenge',
      description: 'Exercise for at least 30 minutes every day for 30 days.',
      participants: 243,
      timeLeft: '18 days left',
      joined: true,
      category: 'Fitness',
      durationDays: 30
    },
    {
      id: '2',
      title: 'Mindfulness Meditation',
      description: 'Practice mindfulness meditation for 10 minutes daily. Develop a calmer mind and better focus.',
      participants: 156,
      timeLeft: '26 days left',
      joined: false,
      category: 'Wellness',
      durationDays: 30
    },
    {
      id: '3',
      title: 'Reading Marathon',
      description: 'Read at least 20 pages every day for 21 days to build a reading habit.',
      participants: 98,
      timeLeft: '15 days left',
      joined: false,
      category: 'Learning',
      durationDays: 21
    }
  ]);

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: 'Fitness',
    durationDays: 30
  });

  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Fitness', 'Wellness', 'Learning', 'Productivity', 'Creativity', 'Social'];

  const handleAddChallenge = () => {
    if (!newChallenge.title || !newChallenge.description) {
      toast.error('Please fill in all the required fields');
      return;
    }

    const challenge: Challenge = {
      id: Date.now().toString(),
      title: newChallenge.title,
      description: newChallenge.description,
      participants: 1,
      timeLeft: `${newChallenge.durationDays} days left`,
      joined: true,
      category: newChallenge.category,
      durationDays: newChallenge.durationDays
    };

    setChallenges([...challenges, challenge]);
    setNewChallenge({
      title: '',
      description: '',
      category: 'Fitness',
      durationDays: 30
    });
    
    setIsOpen(false);
    toast.success('Challenge created successfully!');
  };

  const handleJoinChallenge = (id: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id 
        ? { ...challenge, joined: true, participants: challenge.participants + 1 } 
        : challenge
    ));
    toast.success('You joined the challenge!');
  };

  const handleLeaveChallenge = (id: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id 
        ? { ...challenge, joined: false, participants: Math.max(0, challenge.participants - 1) } 
        : challenge
    ));
    toast.info('You left the challenge');
  };

  return (
    <MainLayout>
      <div className="page-container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Challenges</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1 bg-accent">
                <Plus size={16} />
                <span>Create Challenge</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
                <DialogDescription>
                  Create a challenge for yourself or invite others to join.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter challenge title" 
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your challenge" 
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newChallenge.category}
                    onChange={(e) => setNewChallenge({...newChallenge, category: e.target.value})}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min={1}
                    max={365}
                    value={newChallenge.durationDays}
                    onChange={(e) => setNewChallenge({...newChallenge, durationDays: parseInt(e.target.value) || 30})}
                  />
                </div>
                
                <Button onClick={handleAddChallenge} className="w-full">Create Challenge</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="joined">Joined</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={14} />
              <span>Filter</span>
            </Button>
          </div>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                participants={challenge.participants}
                timeLeft={challenge.timeLeft}
                joined={challenge.joined}
                onJoin={() => handleJoinChallenge(challenge.id)}
                onLeave={() => handleLeaveChallenge(challenge.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="joined" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.filter(challenge => challenge.joined).map(challenge => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                participants={challenge.participants}
                timeLeft={challenge.timeLeft}
                joined={challenge.joined}
                onJoin={() => handleJoinChallenge(challenge.id)}
                onLeave={() => handleLeaveChallenge(challenge.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="available" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.filter(challenge => !challenge.joined).map(challenge => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                participants={challenge.participants}
                timeLeft={challenge.timeLeft}
                joined={challenge.joined}
                onJoin={() => handleJoinChallenge(challenge.id)}
                onLeave={() => handleLeaveChallenge(challenge.id)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChallengesPage;
