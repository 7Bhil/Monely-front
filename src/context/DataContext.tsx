import { useState, useEffect, useCallback, type ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';
import type { Wallet, Transaction } from './DataTypes';
import { DataContext } from './DataContextCore';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token || !user) return;
    
    setLoading(true);
    setError(null);
    try {
      const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
      const [walletsRes, transactionsRes] = await Promise.all([
        axios.get(`${apiBase}/wallets/wallets/`),
        axios.get(`${apiBase}/transactions/transactions/`)
      ]);
      
      setWallets(walletsRes.data.results || walletsRes.data);
      setTransactions(transactionsRes.data.results || transactionsRes.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError("Erreur lors du chargement des données financière.");
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ wallets, transactions, loading, error, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
