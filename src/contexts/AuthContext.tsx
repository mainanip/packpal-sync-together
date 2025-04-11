
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserStatus } from '@/types/auth';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  users: User[];
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: UserRole) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load users and current user from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Failed to parse stored users:', error);
        localStorage.removeItem('users');
      }
    }

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

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Check if user exists and if the role matches
      const userMatch = users.find(u => u.email === email);
      
      if (!userMatch) {
        throw new Error('User not found');
      }
      
      if (userMatch.role !== role) {
        throw new Error(`Invalid role. You registered as a ${userMatch.role}.`);
      }

      // Check if user is approved (admin only needs to approve non-admin users)
      if (userMatch.role !== 'admin' && userMatch.status === 'rejected') {
        throw new Error('Your account has been rejected by an admin');
      }
      
      if (userMatch.role !== 'admin' && userMatch.status === 'pending') {
        throw new Error('Your account is pending approval by an admin');
      }
      
      localStorage.setItem('user', JSON.stringify(userMatch));
      setUser(userMatch);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userMatch.name}!`,
      });
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
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user with status
      const newUser: User = { 
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        status: role === 'admin' ? 'approved' : 'pending', // Admins are auto-approved
        createdAt: new Date().toISOString()
      };
      
      // Update users list
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      // For admins, automatically log them in
      if (role === 'admin') {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        toast({
          title: "Registration successful",
          description: `Welcome to PackPal, ${name}! You are now logged in as an admin.`,
        });
      } else {
        toast({
          title: "Registration pending",
          description: "Your account is pending approval by an admin.",
        });
      }
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

  const updateUser = (userId: string, updates: Partial<User>) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const updatedUser = { ...u, ...updates };
        
        // If we're updating the current user, update in localStorage too
        if (user && user.id === userId) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
        
        return updatedUser;
      }
      return u;
    });
    
    setUsers(updatedUsers);
    toast({
      title: "User updated",
      description: "User information has been updated successfully.",
    });
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    
    // If we're deleting the current user, log them out
    if (user && user.id === userId) {
      logout();
    } else {
      toast({
        title: "User deleted",
        description: "User has been removed from the system.",
      });
    }
  };

  const changeUserRole = (userId: string, newRole: UserRole) => {
    updateUser(userId, { role: newRole });
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const approveUser = (userId: string) => {
    const userToApprove = users.find(u => u.id === userId);
    if (userToApprove) {
      updateUser(userId, { status: 'approved' });
      toast({
        title: "User approved",
        description: `${userToApprove.name} has been approved.`,
      });
    }
  };

  const rejectUser = (userId: string) => {
    const userToReject = users.find(u => u.id === userId);
    if (userToReject) {
      updateUser(userId, { status: 'rejected' });
      toast({
        title: "User rejected",
        description: `${userToReject.name} has been rejected.`,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      users,
      login, 
      signup, 
      logout,
      updateUser,
      deleteUser,
      changeUserRole,
      approveUser,
      rejectUser
    }}>
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
