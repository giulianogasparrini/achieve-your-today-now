
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface JournalPromptProps {
  prompt: string;
  onStartWriting?: () => void;
}

const JournalPrompt = ({ prompt, onStartWriting }: JournalPromptProps) => {
  return (
    <div className="bg-theme-blue/10 p-4 rounded-xl border border-theme-blue/30 flex gap-3">
      <div className="mt-1">
        <Lightbulb size={20} className="text-theme-blue" />
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1">Today's Reflection</h3>
        <p className="text-sm">{prompt}</p>
        <button 
          className="mt-2 text-xs text-theme-blue font-medium hover:underline"
          onClick={onStartWriting}
        >
          Start writing
        </button>
      </div>
    </div>
  );
};

export default JournalPrompt;
