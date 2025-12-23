import { useState, useEffect, createContext, useContext } from "react";
import { loginUser } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser({ token });
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    localStorage.setItem("accessToken", res.data.access_token);
    setUser(res.data.user || {});
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
