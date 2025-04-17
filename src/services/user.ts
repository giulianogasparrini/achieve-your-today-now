
import { User } from './auth';

// Mock user data service

/**
 * Get user profile data
 */
export const getUserProfile = (): User | null => {
  const firstName = localStorage.getItem('userFirstName');
  const email = localStorage.getItem('userEmail');
  
  if (!firstName || !email) {
    return null;
  }
  
  return {
    firstName,
    email,
  };
};

/**
 * Update user profile
 */
export const updateUserProfile = (updatedUser: Partial<User>): boolean => {
  const currentUser = getUserProfile();
  
  if (!currentUser) {
    return false;
  }
  
  if (updatedUser.firstName) {
    localStorage.setItem('userFirstName', updatedUser.firstName);
  }
  
  if (updatedUser.email) {
    localStorage.setItem('userEmail', updatedUser.email);
  }
  
  return true;
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
