import { useState, useEffect, useRef, type ReactNode } from 'react';
import axios from 'axios';

import { AuthContext, type User } from './AuthContextCore';

const API_BASE = () => (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

// Safety: always resolve loading after this many ms, even if the request hangs
const MAX_LOADING_MS = 8000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
  // Prevent double-fetch when login() sets token AND the useEffect fires
  const isFetchingRef = useRef(false);
  // Safety timer ref
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafetyTimer = () => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  const startSafetyTimer = () => {
    clearSafetyTimer();
    safetyTimerRef.current = setTimeout(() => {
      // If still loading after MAX_LOADING_MS, force-stop
      setLoading(false);
      isFetchingRef.current = false;
    }, MAX_LOADING_MS);
  };

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

  // Fetch profile on mount / token change
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      // Skip if login() is already fetching the profile
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);
      startSafetyTimer();

      try {
        const response = await axios.get(`${API_BASE()}/auth/profile/`, {
          timeout: 7000, // 7s hard timeout on the request itself
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        // Token is invalid or server unreachable → logout cleanly
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        clearSafetyTimer();
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (accessToken: string, refreshToken: string) => {
    isFetchingRef.current = true;
    setLoading(true);
    startSafetyTimer();

    setToken(accessToken);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    try {
      const response = await axios.get(`${API_BASE()}/auth/profile/`, {
        timeout: 7000,
      });
      setUser(response.data);
    } catch (error) {
      console.error('Initial profile fetch failed', error);
    } finally {
      clearSafetyTimer();
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const logout = () => {
    clearSafetyTimer();
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

// useAuth hook moved to useAuth.ts
