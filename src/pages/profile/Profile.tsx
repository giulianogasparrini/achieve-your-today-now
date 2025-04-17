
import React, { useEffect } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ProfileContent from "../../components/profile/ProfileContent";
import { getCurrentUser } from "@/services/auth";
import { getUserProfile, updateUserProfile } from "@/services/user";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bio, setBio] = React.useState('Fitness enthusiast and software developer');
  const [avatarUrl, setAvatarUrl] = React.useState(localStorage.getItem('userAvatar') || 'https://i.pravatar.cc/300');

  // Load user data from auth service
  useEffect(() => {
    const user = getUserProfile();
    if (user) {
      setFirstName(user.firstName || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setAvatarUrl(url);
        localStorage.setItem('userAvatar', url);
        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (data: any) => {
    updateUserProfile({ firstName });
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="grid gap-4">
          <ProfileContent
            firstName={firstName}
            lastName={lastName}
            email={email}
            bio={bio}
            avatarUrl={avatarUrl}
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange}
            onAvatarChange={handleAvatarChange}
            onBioChange={handleBioChange}
            onSave={handleProfileUpdate}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
