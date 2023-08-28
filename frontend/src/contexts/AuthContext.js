import React, { createContext, useContext, useEffect, useState } from 'react';

// Context to hold authentication-related data and functions
const AuthContext = createContext();

// This component provides authentication state and functions to its children
export const AuthProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);

  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Load user data from localStorage when isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, [isAuthenticated]);

  // Function to log in a user
  const login = (userData) => {
    setUser(userData); // Set the user data
    setIsAuthenticated(true); // Set authentication status to true
    // Store authentication status and user data in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out a user
  const logout = () => {
    setUser(null); // Clear user data
    setIsAuthenticated(false); // Set authentication status to false
    // Remove authentication status and user data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  // Provide authentication state and functions to its children through context
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication context data
export const useAuth = () => {
  return useContext(AuthContext);
};
