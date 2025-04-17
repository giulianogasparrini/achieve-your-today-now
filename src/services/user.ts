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
export const updateUserProfile = (userData: {
  firstName: string;
  email: string;
  id?: string; // Make id optional
}) => {
  // Generate a default id if not provided (needed for User interface compatibility)
  const user = {
    ...userData,
    id: userData.id || localStorage.getItem('userId') || 'default-id'
  };
  
  localStorage.setItem('userFirstName', user.firstName);
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
