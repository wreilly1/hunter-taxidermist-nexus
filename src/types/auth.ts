
export type UserRole = 'hunter' | 'taxidermist' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  businessName?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}
