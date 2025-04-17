import { User } from './auth';

// Mock user data service
export const getUserProfile = (): User | null => {
  const firstName = localStorage.getItem('userFirstName');
  const email = localStorage.getItem('userEmail');
  const id = localStorage.getItem('userId');
  
  if (!firstName || !email || !id) {
    return null;
  }
  
  return {
    id,
    firstName,
    email,
  };
};

export const updateUserProfile = (userData: {
  firstName: string;
  email: string;
  id?: string;
}) => {
  const user = {
    ...userData,
    id: userData.id || localStorage.getItem('userId') || 'default-id'
  };
  
  localStorage.setItem('userFirstName', user.firstName);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userId', user.id);
  
  return user;
};

/**
 * Get user statistics
 */
export const getUserStats = () => {
  return {
    completedGoals: 12,
    streak: 7,
    level: 5,
    experience: 350,
    nextLevelAt: 500
  };
};
