
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Check if user exists and if the role matches
      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
        const userMatch = users.find(u => u.email === email);
        
        if (!userMatch) {
          throw new Error('User not found');
        }
        
        if (userMatch.role !== role) {
          throw new Error(`Invalid role. You registered as a ${userMatch.role}.`);
        }
        
        localStorage.setItem('user', JSON.stringify(userMatch));
        setUser(userMatch);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userMatch.name}!`,
        });
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Store users in localStorage for persistence
      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
          throw new Error('User already exists');
        }
      }
      
      const newUser: User = { 
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Registration successful",
        description: `Welcome to PackPal, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
