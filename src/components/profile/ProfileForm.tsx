
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileFormProps {
  firstName: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
}

const ProfileForm = ({ firstName, onFirstNameChange, onSubmit, onLogout }: ProfileFormProps) => {
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

      <div className="flex flex-col gap-4">
        <Button type="submit">
          Update Profile
        </Button>
        <Button 
          type="button" 
          variant="destructive"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
