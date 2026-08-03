import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, email: userEmail, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ email: userEmail, role }));
    setUser({ email: userEmail, role });

    return { email: userEmail, role };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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