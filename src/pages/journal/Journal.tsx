
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import JournalPrompt from "../../components/journal/JournalPrompt";

const Journal = () => {
  const todaysPrompt = "What are three things that went well today, and what's one thing you'd like to improve tomorrow?";

  const handleStartWriting = () => {
    console.log("Started writing journal entry");
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Journal</h1>
        <JournalPrompt 
          prompt={todaysPrompt}
          onStartWriting={handleStartWriting}
        />
      </div>
    </MainLayout>
  );
};

export default Journal;
