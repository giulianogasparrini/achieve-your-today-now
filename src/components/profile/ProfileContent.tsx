
import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProfileContentProps {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarUrl: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: (data: any) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onLogout: () => void;  // Changed from optional to required
}

const ProfileContent = ({
  firstName,
  lastName,
  email,
  bio,
  avatarUrl,
  onFirstNameChange,
  onLastNameChange,
  onAvatarChange,
  onBioChange,
  onSave,
  onSubmit,
  onLogout,
}: ProfileContentProps) => {
  return (
    <ScrollArea className="h-full pr-2">
      <div className="space-y-6">
        <ProfileAvatar 
          avatarUrl={avatarUrl} 
          onAvatarChange={onAvatarChange} 
        />
        <ProfileForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          bio={bio}
          onFirstNameChange={onFirstNameChange}
          onLastNameChange={onLastNameChange}
          onBioChange={onBioChange}
          onSubmit={onSubmit || onSave}
          onLogout={onLogout}
        />
      </div>
    </ScrollArea>
  );
};

export default ProfileContent;
