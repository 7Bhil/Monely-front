import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Plus } from 'lucide-react';
import { AddWalletModal } from '@/components/modals/AddWalletModal';
import { useData } from '../context/useData';

export default function WalletsPage() {
  const { wallets, loading, refreshData } = useData();
  const [showAddModal, setShowAddModal] = useState(false);

  const colorMap: Record<string, string> = {
    blue: '#3b82f6', green: '#10b981', red: '#ef4444',
    yellow: '#f59e0b', purple: '#8b5cf6', pink: '#ec4899',
    indigo: '#6366f1', orange: '#f97316', teal: '#14b8a6',
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Icons.spinner className="animate-spin h-8 w-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mes Portefeuilles</h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Portefeuille
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: colorMap[wallet.color] || colorMap.blue }} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {wallet.name}
              </CardTitle>
              <Icons.creditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: wallet.currency }).format(Number(wallet.balance))}
              </div>
              <p className="text-xs text-muted-foreground capitalize mt-1">
                {wallet.type === 'checking' ? 'Compte Courant' : wallet.type === 'savings' ? 'Épargne' : wallet.type}
              </p>
            </CardContent>
          </Card>
        ))}
        
      </div>
      <AddWalletModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
        onSuccess={refreshData} 
      />
    </div>
  );
}
