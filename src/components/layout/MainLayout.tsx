
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Calendar, Award, Users, BookOpen, UserCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/goals', icon: <Target size={20} />, label: 'Goals' },
    { path: '/habits', icon: <Calendar size={20} />, label: 'Habits' },
    { path: '/challenges', icon: <Award size={20} />, label: 'Challenges' },
    { path: '/community', icon: <Users size={20} />, label: 'Community' },
    { path: '/journal', icon: <BookOpen size={20} />, label: 'Journal' },
    { path: '/profile', icon: <UserCircle2 size={20} />, label: 'Profile' },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    // Initialize scroll indicators on component mount
    handleScroll();
    // Add resize event listener to update arrows on window resize
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-16 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex flex-col p-1 z-50 shadow-sm">
        <div className="relative max-w-6xl mx-auto w-full">
          {isMobile && showLeftArrow && (
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth" 
            onScroll={handleScroll}
          >
            {navItems.map((item) => (
              <div key={item.path} className="flex-shrink-0 snap-center">
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
              </div>
            ))}
          </div>
          
          {isMobile && showRightArrow && (
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
