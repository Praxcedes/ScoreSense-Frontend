import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // MOCK USER (replace with API later)
  const [user, setUser] = useState({
    id: 1,
    name: "Admin User",
    role: "admin", // "user" | "admin"
    token: "fake-jwt-token",
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
