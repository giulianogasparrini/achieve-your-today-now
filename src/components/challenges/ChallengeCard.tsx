
import React from 'react';
import { Trophy, Users } from 'lucide-react';
import { toast } from 'sonner';

interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  joined: boolean;
  image?: string;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
}

const ChallengeCard = ({ 
  id,
  title, 
  description, 
  participants, 
  timeLeft,
  joined,
  image,
  onJoin,
  onLeave
}: ChallengeProps) => {
  const handleToggleJoin = () => {
    if (joined && onLeave) {
      onLeave(id);
      toast.success('Left the challenge');
    } else if (!joined && onJoin) {
      onJoin(id);
      toast.success('Joined the challenge');
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border transition-all hover:shadow-md">
      <div className="relative">
        <div className="h-28 bg-gradient-to-r from-theme-blue to-theme-purple overflow-hidden">
          {image && <img src={image} alt={title} className="w-full h-full object-cover mix-blend-overlay" />}
        </div>
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {timeLeft}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="bg-theme-orange/10 p-1.5 rounded-md mr-2">
            <Trophy size={18} className="text-theme-orange" />
          </div>
          <h3 className="font-semibold line-clamp-1">{title}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-xs text-muted-foreground">
            <Users size={14} className="mr-1" />
            <span>{participants} participants</span>
          </div>
          
          <button 
            className={`text-sm px-3 py-1 rounded-lg transition ${
              joined 
                ? 'bg-theme-teal/10 text-theme-teal'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
            onClick={handleToggleJoin}
          >
            {joined ? 'Joined' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
