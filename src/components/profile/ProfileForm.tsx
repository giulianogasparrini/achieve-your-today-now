
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogout?: () => void;
}

const ProfileForm = ({ 
  firstName, 
  lastName,
  email,
  bio,
  onFirstNameChange, 
  onLastNameChange,
  onBioChange,
  onSubmit, 
  onLogout 
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={onFirstNameChange}
          placeholder="Your first name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={onLastNameChange}
          placeholder="Your last name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          readOnly
          placeholder="Your email"
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={onBioChange}
          placeholder="Tell us about yourself"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit">
          Update Profile
        </Button>
        {onLogout && (
          <Button 
            type="button" 
            variant="destructive"
            onClick={onLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
