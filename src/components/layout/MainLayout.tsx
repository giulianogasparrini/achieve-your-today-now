
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Calendar, Award, Users, BookOpen, UserCircle2, ChevronUp } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
        active 
          ? 'text-accent bg-accent/10' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/goals', icon: <Target size={20} />, label: 'Goals' },
    { path: '/habits', icon: <Calendar size={20} />, label: 'Habits' },
    { path: '/challenges', icon: <Award size={20} />, label: 'Challenges' },
    { path: '/community', icon: <Users size={20} />, label: 'Community' },
    { path: '/journal', icon: <BookOpen size={20} />, label: 'Journal' },
    { path: '/profile', icon: <UserCircle2 size={20} />, label: 'Profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSheetOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Mobile navigation - Slidable sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-center items-center p-2 z-50 shadow-sm">
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-xl px-1">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-center text-sm">Navigation</SheetTitle>
          </SheetHeader>
          <nav className="grid grid-cols-4 gap-2 pb-6">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Fixed navigation bar - Always visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center p-1 z-40 shadow-sm">
        {navItems.slice(0, 5).map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
