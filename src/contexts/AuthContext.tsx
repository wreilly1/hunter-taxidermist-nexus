
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, UserRole, LoginCredentials } from '../types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'hunter@demo.com',
    firstName: 'John',
    lastName: 'Hunter',
    role: 'hunter',
    businessName: 'Hunter Outfitters',
    phone: '(555) 123-4567',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date()
  },
  {
    id: '2',
    email: 'taxidermist@demo.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'taxidermist',
    businessName: 'Wildlife Artistry',
    phone: '(555) 987-6543',
    address: '123 Main St, Outdoorsville, TX 75001',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date()
  },
  {
    id: '3',
    email: 'admin@demo.com',
    firstName: 'Mike',
    lastName: 'Admin',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date()
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('taxidermy_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('taxidermy_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => 
      u.email === email && u.role === role
    );

    if (foundUser && password === 'demo123') {
      const updatedUser = { ...foundUser, lastLoginAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem('taxidermy_user', JSON.stringify(updatedUser));
      toast({
        title: "Welcome back!",
        description: `Logged in as ${updatedUser.firstName} ${updatedUser.lastName}`,
      });
    } else {
      throw new Error('Invalid credentials or role mismatch');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taxidermy_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user,
      hasRole
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
