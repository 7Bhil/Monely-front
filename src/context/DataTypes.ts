export interface Wallet {
  id: number;
  name: string;
  balance: number;
  currency: string;
  type: string;
  color: string;
}

export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  date: string;
  name: string;
  status?: string;
}
