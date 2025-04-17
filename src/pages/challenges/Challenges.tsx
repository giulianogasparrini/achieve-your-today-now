
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ChallengeCard from "../../components/challenges/ChallengeCard";

const Challenges = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Challenges</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
