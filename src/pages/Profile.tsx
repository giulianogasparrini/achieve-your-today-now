
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const [firstName, setFirstName] = React.useState(localStorage.getItem('userFirstName') || '');
  const [avatarUrl, setAvatarUrl] = React.useState(localStorage.getItem('userAvatar') || '');
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

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
    localStorage.setItem('userFirstName', firstName);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userAvatar');
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
                  avatarUrl={avatarUrl}
                  onFirstNameChange={(e) => setFirstName(e.target.value)}
                  onAvatarChange={handleAvatarChange}
                  onSubmit={handleUpdateProfile}
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
            avatarUrl={avatarUrl}
            onFirstNameChange={(e) => setFirstName(e.target.value)}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleUpdateProfile}
            onLogout={handleLogout}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
