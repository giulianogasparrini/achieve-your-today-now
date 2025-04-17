
import React from 'react';
import MainLayout from "../../components/layout/MainLayout";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileContent from "../../components/profile/ProfileContent";

const Profile = () => {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <ProfileAvatar />
          </div>
          <div className="w-full md:w-2/3">
            <ProfileContent />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
