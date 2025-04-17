
// Basic authentication service

export interface User {
  firstName: string;
  email: string;
}

/**
 * Get the current user from local storage
 */
export const getCurrentUser = (): User | null => {
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
 * Log in a user
 */
export const login = (firstName: string, email: string): boolean => {
  if (!firstName || !email) {
    return false;
  }
  
  localStorage.setItem('userFirstName', firstName);
  localStorage.setItem('userEmail', email);
  return true;
};

/**
 * Log out the current user
 */
export const logout = (): void => {
  localStorage.removeItem('userFirstName');
  localStorage.removeItem('userEmail');
};

/**
 * Check if a user is logged in
 */
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};
