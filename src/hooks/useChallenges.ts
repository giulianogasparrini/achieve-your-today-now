
import { useState } from 'react';
import { toast } from 'sonner';

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

export const useChallenges = () => {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '30-Day Fitness Challenge',
      description: 'Exercise for at least 30 minutes every day for 30 days.',
      participants: 243,
      timeLeft: '18 days left',
      joined: false,
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

  const handleJoinChallenge = (id: string) => {
    toast.success('Successfully joined the challenge!');
  };

  const handleLeaveChallenge = (id: string) => {
    toast.info('Left the challenge');
  };

  return {
    challenges,
    handleJoinChallenge,
    handleLeaveChallenge
  };
};
