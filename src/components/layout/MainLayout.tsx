
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Calendar, Award, Users, BookOpen, UserCircle2, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = 100;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || !scrollRef.current) return;
    
    const touchDiff = touchStartX - e.touches[0].clientX;
    scrollRef.current.scrollLeft += touchDiff;
    setScrollPosition(scrollRef.current.scrollLeft);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };
  
  // Update scroll position when scrollRef changes
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };
    
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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

      {/* Fixed navigation bar - Always visible and horizontally scrollable */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-40 shadow-sm">
        <div className="flex items-center justify-between px-1 py-1 h-16 overflow-hidden">
          <button 
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft size={18} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide flex-grow"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-2 px-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </div>
          </div>
          
          <button 
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
