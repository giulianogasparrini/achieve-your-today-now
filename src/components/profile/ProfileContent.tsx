
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';

interface ProfileContentProps {
  firstName: string;
  avatarUrl: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
}

const ProfileContent = ({
  firstName,
  avatarUrl,
  onFirstNameChange,
  onAvatarChange,
  onSubmit,
  onLogout,
}: ProfileContentProps) => {
  return (
    <div className="space-y-6">
      <ProfileAvatar 
        avatarUrl={avatarUrl} 
        onAvatarChange={onAvatarChange} 
      />
      <ProfileForm
        firstName={firstName}
        onFirstNameChange={onFirstNameChange}
        onSubmit={onSubmit}
        onLogout={onLogout}
      />
    </div>
  );
};

export default ProfileContent;
