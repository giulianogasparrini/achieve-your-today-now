
import React from 'react';
import { Bell } from 'lucide-react';

const WelcomeHeader = () => {
  const username = localStorage.getItem('userFirstName') || 'Guest';
  
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Good {timeOfDay()}, {username}!</h1>
        <p className="text-muted-foreground">Ready to achieve your goals today?</p>
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-muted">
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
