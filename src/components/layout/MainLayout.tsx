
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Calendar, Award, Users, BookOpen } from 'lucide-react';

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

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/goals', icon: <Target size={20} />, label: 'Goals' },
    { path: '/habits', icon: <Calendar size={20} />, label: 'Habits' },
    { path: '/challenges', icon: <Award size={20} />, label: 'Challenges' },
    { path: '/community', icon: <Users size={20} />, label: 'Community' },
    { path: '/journal', icon: <BookOpen size={20} />, label: 'Journal' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-16">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center p-1 z-50 shadow-sm">
        {navItems.map((item) => (
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
