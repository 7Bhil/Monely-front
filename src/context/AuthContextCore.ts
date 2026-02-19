import { createContext } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  avatar_url?: string;
  currency: string;
  language: string;
  monthly_income?: number;
  income_frequency?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { User, AuthContextType };
