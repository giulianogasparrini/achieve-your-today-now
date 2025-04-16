import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, ChevronUp, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [firstName, setFirstName] = React.useState(localStorage.getItem('userFirstName') || '');
  const [avatarUrl, setAvatarUrl] = React.useState(localStorage.getItem('userAvatar') || '');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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

  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <label 
            htmlFor="avatar-upload" 
            className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90"
          >
            <Camera className="w-4 h-4" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit">
            Update Profile
          </Button>
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <MainLayout>
      {isMobile ? (
        <div className="container max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                <ChevronUp className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <ProfileContent />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div className="container max-w-2xl mx-auto p-4 space-y-8">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <ProfileContent />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
