
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import JournalPrompt from '@/components/journal/JournalPrompt';
import { PencilLine, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format, addDays, subDays } from 'date-fns';

// Journal Entry interface
interface JournalEntry {
  id: string;
  date: string;
  content: string;
  prompt: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
}

const JournalPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: format(new Date(), 'yyyy-MM-dd'),
      content: "Today was quite productive. I managed to complete my workout routine in the morning and finish two major tasks at work. I'm feeling good about my progress on the half-marathon training, but I need to be more consistent with my Spanish learning.",
      prompt: "What are three things that went well today, and what's one thing you'd like to improve tomorrow?",
      mood: 'good'
    },
    {
      id: '2',
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      content: "Feeling a bit overwhelmed today with all the deadlines. I skipped my morning workout which made me feel guilty. On the positive side, I had a great call with my mentor who gave me excellent advice on my career path.",
      prompt: "How did you handle challenges today? What would you do differently?",
      mood: 'okay'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    content: '',
    mood: 'good' as const
  });

  // Today's prompt options
  const prompts = [
    "What are three things that went well today, and what's one thing you'd like to improve tomorrow?",
    "How did you handle challenges today? What would you do differently?",
    "What are you grateful for today?",
    "What progress did you make towards your goals today?",
    "How did you take care of your physical and mental wellbeing today?"
  ];

  const todaysPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  // Check if there's an entry for the selected date
  const currentDateStr = format(selectedDate, 'yyyy-MM-dd');
  const currentEntry = entries.find(entry => entry.date === currentDateStr);

  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const handleNextDay = () => {
    const tomorrow = addDays(new Date(), 1);
    // Don't allow selecting future dates
    if (selectedDate < tomorrow) {
      setSelectedDate(prev => addDays(prev, 1));
    }
  };

  const handleSaveEntry = () => {
    if (!newEntry.content.trim()) {
      toast.error('Please write something in your journal entry');
      return;
    }

    const entryData: JournalEntry = {
      id: Date.now().toString(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      content: newEntry.content,
      prompt: todaysPrompt,
      mood: newEntry.mood
    };

    // Check if we're updating an existing entry or creating a new one
    if (currentEntry) {
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? entryData : entry
      ));
    } else {
      setEntries([...entries, entryData]);
    }

    setNewEntry({
      content: '',
      mood: 'good'
    });
    
    setIsOpen(false);
    toast.success('Journal entry saved!');
  };

  // Format date for display
  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <MainLayout>
      <div className="page-container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Journal</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Search size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Calendar size={16} />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handlePreviousDay}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-lg font-medium">{formattedDate}</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNextDay}
            disabled={format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        
        {isToday && !currentEntry && (
          <div className="mb-4">
            <JournalPrompt prompt={todaysPrompt} onStartWriting={() => setIsOpen(true)} />
          </div>
        )}
        
        {currentEntry ? (
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-secondary/50 text-sm px-3 py-1 rounded-full">
                {currentEntry.mood === 'great' && '😄 Great day'}
                {currentEntry.mood === 'good' && '🙂 Good day'}
                {currentEntry.mood === 'okay' && '😐 Okay day'}
                {currentEntry.mood === 'bad' && '😞 Tough day'}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => {
                  setNewEntry({
                    content: currentEntry.content,
                    mood: currentEntry.mood
                  });
                  setIsOpen(true);
                }}
              >
                <PencilLine size={14} />
                <span>Edit</span>
              </Button>
            </div>
            
            {currentEntry.prompt && (
              <div className="bg-secondary/30 p-3 rounded-lg mb-4">
                <p className="text-sm italic">{currentEntry.prompt}</p>
              </div>
            )}
            
            <p className="whitespace-pre-wrap">{currentEntry.content}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-muted-foreground mb-4">
              {isToday 
                ? "You haven't written in your journal today." 
                : "No journal entry for this date."}
            </p>
            <Button 
              onClick={() => setIsOpen(true)} 
              className="flex items-center gap-1"
            >
              <PencilLine size={16} />
              <span>{isToday ? "Write Today's Entry" : "Add Entry for This Date"}</span>
            </Button>
          </div>
        )}
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {currentEntry ? "Edit Journal Entry" : "New Journal Entry"}
              </DialogTitle>
              <DialogDescription>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              {isToday && (
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <p className="text-sm italic">{todaysPrompt}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>How was your day?</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newEntry.mood === 'great' ? 'default' : 'outline'}
                    onClick={() => setNewEntry({...newEntry, mood: 'great'})}
                    className="flex-1"
                  >
                    😄 Great
                  </Button>
                  <Button
                    type="button"
                    variant={newEntry.mood === 'good' ? 'default' : 'outline'}
                    onClick={() => setNewEntry({...newEntry, mood: 'good'})}
                    className="flex-1"
                  >
                    🙂 Good
                  </Button>
                  <Button
                    type="button"
                    variant={newEntry.mood === 'okay' ? 'default' : 'outline'}
                    onClick={() => setNewEntry({...newEntry, mood: 'okay'})}
                    className="flex-1"
                  >
                    😐 Okay
                  </Button>
                  <Button
                    type="button"
                    variant={newEntry.mood === 'bad' ? 'default' : 'outline'}
                    onClick={() => setNewEntry({...newEntry, mood: 'bad'})}
                    className="flex-1"
                  >
                    😞 Tough
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Your thoughts</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your journal entry here..." 
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  className="min-h-[200px]"
                />
              </div>
              
              <Button onClick={handleSaveEntry} className="w-full">Save Entry</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
