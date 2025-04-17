
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

interface HabitHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitName: string;
  // Add selected dates to show completion history
  selectedDates: Date[];
}

const HabitHistoryModal = ({ isOpen, onClose, habitName, selectedDates }: HabitHistoryModalProps) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{habitName} - 30 Day History</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            defaultMonth={thirtyDaysAgo}
            numberOfMonths={2}
            className="rounded-md border"
            disabled={(date) => date > new Date()}
            fixedWeeks
            showOutsideDays={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HabitHistoryModal;
