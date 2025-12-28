import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // 🔥 MOCK LOGIN (replace with API later)
    const fakeUser =
      credentials.email === "admin@scoresense.com"
        ? {
            id: 1,
            name: "Admin User",
            role: "admin",
            token: "admin-token",
          }
        : {
            id: 2,
            name: "Regular User",
            role: "user",
            token: "user-token",
          };

    setUser(fakeUser);
    return fakeUser;
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
