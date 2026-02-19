import { createContext } from 'react';
import type { Wallet, Transaction } from './DataTypes';

export interface DataContextType {
  wallets: Wallet[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);
