import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);

    // Optionally save to localStorage or sessionStorage
    if (newToken) localStorage.setItem('authToken', newToken);
    if (newUserId) localStorage.setItem('userId', newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    // Clear from localStorage or sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
