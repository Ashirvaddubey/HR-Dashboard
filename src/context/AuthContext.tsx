
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import users from "../data/users.json";

interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check for saved a   auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay--
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));
      toast.success(`Welcome, ${userWithoutPassword.name}!`);
      return true;
    }
    
    toast.error("Invalid username or password");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    navigate("/login");
    toast.info("You have been logged out");
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
