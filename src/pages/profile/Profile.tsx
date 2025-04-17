
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileContent from "../../components/profile/ProfileContent";

const Profile = () => {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Fitness enthusiast and software developer",
    avatarUrl: "https://i.pravatar.cc/300"
  };

  // Update the function signature to match what ProfileAvatar expects
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        console.log("Avatar changed:", url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (data: any) => {
    console.log("Profile updated:", data);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("First name changed:", e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Last name changed:", e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Bio changed:", e.target.value);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="grid gap-4">
          <ProfileContent
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            bio={userData.bio}
            avatarUrl={userData.avatarUrl}
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
