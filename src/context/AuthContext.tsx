import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "admin" | "cashier";

interface User {
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<string, { password: string; role: UserRole; name: string }> = {
  admin: { password: "admin123", role: "admin", name: "Admin User" },
  cashier: { password: "cash123", role: "cashier", name: "Cashier" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("levi_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string): boolean => {
    const u = DEMO_USERS[username];
    if (u && u.password === password) {
      const userData: User = { username, role: u.role, name: u.name };
      setUser(userData);
      localStorage.setItem("levi_user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("levi_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
