
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import JournalPrompt from "../../components/journal/JournalPrompt";

const Journal = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Journal</h1>
        <JournalPrompt />
      </div>
    </MainLayout>
  );
};

export default Journal;
