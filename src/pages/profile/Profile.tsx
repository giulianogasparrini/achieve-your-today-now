import React, { useEffect } from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ProfileContent from "../../components/profile/ProfileContent";
import { getCurrentUser, signOut } from "@/services/auth";
import { getUserProfile, updateUserProfile } from "@/services/user";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bio, setBio] = React.useState('Fitness enthusiast and software developer');
  const [avatarUrl, setAvatarUrl] = React.useState(localStorage.getItem('userAvatar') || 'https://i.pravatar.cc/300');

  useEffect(() => {
    const user = getUserProfile();
    if (user) {
      setFirstName(user.firstName || '');
      setEmail(user.email || '');
      
      const savedLastName = localStorage.getItem('userLastName') || '';
      const savedBio = localStorage.getItem('userBio') || 'Fitness enthusiast and software developer';
      setLastName(savedLastName);
      setBio(savedBio);
    }
    
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
    updateUserProfile({ 
      firstName,
      email,
      id: localStorage.getItem('userId') || undefined
    });
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
    toast({
      title: "Goodbye!",
      description: "You've been logged out successfully",
    });
    navigate('/login');
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
            onLogout={handleLogout}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
