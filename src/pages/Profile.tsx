
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCurrentUser, signOut } from '@/services/auth';
import { getUserProfile, updateUserProfile } from '@/services/user';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileContent from '@/components/profile/ProfileContent';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Load user data from auth service and localStorage
  useEffect(() => {
    const user = getUserProfile();
    if (user) {
      setFirstName(user.firstName || '');
      setEmail(user.email || '');
      
      // Load lastName and bio from localStorage if available
      const savedLastName = localStorage.getItem('userLastName') || '';
      const savedBio = localStorage.getItem('userBio') || 'Fitness enthusiast and software developer';
      setLastName(savedLastName);
      setBio(savedBio);
    }
    
    // Only set avatar URL from localStorage if available, don't use a default URL
    const savedAvatarUrl = localStorage.getItem('userAvatar');
    if (savedAvatarUrl) {
      setAvatarUrl(savedAvatarUrl);
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setAvatarUrl(dataUrl);
        localStorage.setItem('userAvatar', dataUrl);
        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save all profile data to localStorage
    updateUserProfile({ firstName, email });
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userBio', bio);
    
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleLogout = () => {
    signOut();
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userBio');
    localStorage.removeItem('hasVisited');
    toast({
      title: "Goodbye!",
      description: "You've been logged out successfully",
    });
    navigate('/login');
  };

  return (
    <MainLayout>
      {isMobile ? (
        <div className="container max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <ChevronUp className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85%] rounded-t-xl">
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
              </SheetHeader>
              <div className="px-2 py-4 overflow-y-auto">
                <ProfileContent
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  bio={bio}
                  avatarUrl={avatarUrl}
                  onFirstNameChange={(e) => setFirstName(e.target.value)}
                  onLastNameChange={(e) => setLastName(e.target.value)}
                  onBioChange={(e) => setBio(e.target.value)}
                  onAvatarChange={handleAvatarChange}
                  onSubmit={handleUpdateProfile}
                  onSave={handleUpdateProfile}
                  onLogout={handleLogout}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="container max-w-2xl mx-auto p-4 space-y-8">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <ProfileContent
            firstName={firstName}
            lastName={lastName}
            email={email}
            bio={bio}
            avatarUrl={avatarUrl}
            onFirstNameChange={(e) => setFirstName(e.target.value)}
            onLastNameChange={(e) => setLastName(e.target.value)}
            onBioChange={(e) => setBio(e.target.value)}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleUpdateProfile}
            onSave={handleUpdateProfile}
            onLogout={handleLogout}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
