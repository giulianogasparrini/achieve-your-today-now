
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ChallengeCard from "../../components/challenges/ChallengeCard";

const Challenges = () => {
  const challenges = [
    {
      id: '1',
      title: "30-Day Fitness Challenge",
      description: "Exercise for at least 30 minutes every day for 30 days.",
      participants: 243,
      timeLeft: "18 days left",
      joined: true
    },
    {
      id: '2',
      title: "Mindfulness Meditation",
      description: "Practice mindfulness meditation for 10 minutes daily. Develop a calmer mind and better focus.",
      participants: 156,
      timeLeft: "26 days left",
      joined: false
    },
    {
      id: '3',
      title: "Water Challenge",
      description: "Drink at least 8 glasses of water every day for better hydration and health.",
      participants: 412,
      timeLeft: "12 days left",
      joined: false
    }
  ];

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Challenges</h1>
        <div className="grid gap-4">
          {challenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              participants={challenge.participants}
              timeLeft={challenge.timeLeft}
              joined={challenge.joined}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
