
/**
 * Utility functions for managing form data caching across the application
 */

// Get cached form data from localStorage
export const getCachedFormData = () => {
  try {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const companyName = localStorage.getItem('companyName');
    const companySize = localStorage.getItem('companySize');
    
    return {
      email: userEmail || '',
      userName: userName || '',
      companyName: companyName || '',
      companySize: companySize || ''
    };
  } catch (error) {
    console.error('Error retrieving cached form data:', error);
    return {
      email: '',
      userName: '',
      companyName: '',
      companySize: ''
    };
  }
};

// Save form data to localStorage cache
export const saveCachedFormData = (data: {
  email?: string;
  userName?: string;
  companyName?: string;
  companySize?: string;
}) => {
  try {
    if (data.email) localStorage.setItem('userEmail', data.email);
    if (data.userName) localStorage.setItem('userName', data.userName);
    if (data.companyName) localStorage.setItem('companyName', data.companyName);
    if (data.companySize) localStorage.setItem('companySize', data.companySize);
  } catch (error) {
    console.error('Error saving form data to cache:', error);
  }
};
