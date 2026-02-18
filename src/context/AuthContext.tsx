import { useState, createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import axios from 'axios';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = () => (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
  // Ref to prevent double-fetch when login() sets token AND the useEffect fires
  const isFetchingRef = useRef(false);

  // Configure axios defaults whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('access_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('access_token');
    }
  }, [token]);

  // Fetch profile on mount (if token exists in localStorage)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      // Skip if login() is already fetching the profile
      if (isFetchingRef.current) return;

      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE()}/auth/profile/`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (accessToken: string, refreshToken: string) => {
    isFetchingRef.current = true;
    setLoading(true);

    // Set token and storage
    setToken(accessToken);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    // Configure axios immediately
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    try {
      const response = await axios.get(`${API_BASE()}/auth/profile/`);
      setUser(response.data);
    } catch (error) {
      console.error('Initial profile fetch failed', error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
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
