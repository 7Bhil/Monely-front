import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Plus } from 'lucide-react';
import { AddTransactionModal } from '@/components/modals/AddTransactionModal';
import { useData } from '../context/useData';

export default function TransactionsPage() {
  const { transactions, loading, refreshData } = useData();
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) {
    return <div className="p-8 flex justify-center"><Icons.spinner className="animate-spin h-8 w-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent>
             {/* Simple list relying on standard HTML as Table component might be missing */}
             <div className="space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Aucune transaction trouvée.</p>
                ) : (
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nom</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Catégorie</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle">{new Date(t.date).toLocaleDateString()}</td>
                                        <td className="p-4 align-middle font-medium">{t.name}</td>
                                        <td className="p-4 align-middle">{t.category}</td>
                                        <td className={`p-4 align-middle text-right font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.type === 'income' ? '+' : '-'}{t.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
             </div>
        </CardContent>
      </Card>
      <AddTransactionModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
        onSuccess={refreshData} 
      />
    </div>
  );
}
