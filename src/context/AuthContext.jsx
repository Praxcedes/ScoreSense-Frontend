import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Juma', role: 'analyst', points: 12500 });

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);