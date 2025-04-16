import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Mood = 'great' | 'good' | 'okay' | 'bad';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
}

const JournalPage = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [entry, setEntry] = React.useState<string>('');
  const [mood, setMood] = React.useState<Mood>('okay');
  const [entries, setEntries] = React.useState<JournalEntry[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date.",
      });
      return;
    }

    const newEntry = {
      id: Math.random().toString(36).substring(7),
      date: format(date, 'yyyy-MM-dd'),
      content: entry,
      mood: mood,
    };

    setEntries([...entries, newEntry]);
    setEntry('');
    toast({
      title: "Success",
      description: "Journal entry saved.",
    });
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Journal</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="mood">Mood</Label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className={`p-2 rounded-full ${mood === 'great' ? 'bg-green-200' : 'hover:bg-green-100'}`}
                onClick={() => setMood('great')}
              >
                Great
              </button>
              <button
                type="button"
                className={`p-2 rounded-full ${mood === 'good' ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                onClick={() => setMood('good')}
              >
                Good
              </button>
              <button
                type="button"
                className={`p-2 rounded-full ${mood === 'okay' ? 'bg-yellow-200' : 'hover:bg-yellow-100'}`}
                onClick={() => setMood('okay')}
              >
                Okay
              </button>
              <button
                type="button"
                className={`p-2 rounded-full ${mood === 'bad' ? 'bg-red-200' : 'hover:bg-red-100'}`}
                onClick={() => setMood('bad')}
              >
                Bad
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="entry">Entry</Label>
            <Textarea
              id="entry"
              placeholder="Write your thoughts here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <Button type="submit">Save Entry</Button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Previous Entries</h2>
          {entries.length === 0 ? (
            <p>No entries yet.</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li key={entry.id} className="border p-4 rounded-md">
                  <h3 className="font-semibold">{entry.date} - {entry.mood}</h3>
                  <p>{entry.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
