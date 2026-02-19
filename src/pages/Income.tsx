import React from 'react';
import { useAuth } from '../context/useAuth';
import { useData } from '../context/useData';
import StatCard from '../components/ui/StatCard';
import { IncomeExpensesChart } from '../components/ui/Charts';
import type { ChartItem } from '../components/ui/Charts';

const Income: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading } = useData();

  const incomeTransactions = transactions.filter(tx => tx.type === 'income');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = incomeTransactions
    .filter(tx => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const allMonthsIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const monthCount = 6;
  const avgMonthly = allMonthsIncome / monthCount;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: user?.currency || 'XOF',
      maximumFractionDigits: 0,
    }).format(amount).replace('XOF', 'F CFA');

  // Build bar chart data for last 6 months
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const barData: ChartItem[] = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const mIdx = d.getMonth();
    const yr = d.getFullYear();
    const monthTx = transactions.filter(tx => {
      const td = new Date(tx.date);
      return td.getMonth() === mIdx && td.getFullYear() === yr;
    });
    return {
      name: months[mIdx],
      income: monthTx.filter(tx => tx.type === 'income').reduce((s, tx) => s + Number(tx.amount), 0),
      expense: monthTx.filter(tx => tx.type === 'expense').reduce((s, tx) => s + Number(tx.amount), 0),
    };
  });

  // Group income by category
  const categoryMap = incomeTransactions.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});
  const totalIncome = Object.values(categoryMap).reduce((s, v) => s + v, 0);
  const categoryColors = ['#1919e6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Revenus</h1>
          <p className="text-sm text-slate-500">Gérez vos sources de revenus</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total ce mois" value={formatCurrency(monthlyIncome)} change="+12%" changeType="positive">
          <div className="flex items-end gap-1 h-6 opacity-20">
            {[30, 50, 70, 80, 60, 90].map((h, i) => <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>)}
          </div>
        </StatCard>
        <StatCard label="Moyenne mensuelle" value={formatCurrency(avgMonthly)} change="+5%" changeType="positive">
          <div className="flex items-end gap-1 h-6 opacity-20">
            {[40, 60, 55, 70, 65, 80].map((h, i) => <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>)}
          </div>
        </StatCard>
        <StatCard label="Total des revenus" value={formatCurrency(totalIncome)} change="" changeType="neutral">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
            <div className="bg-emerald-500 h-full" style={{ width: '100%' }}></div>
          </div>
        </StatCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Évolution des Revenus</h3>
          </div>
          <IncomeExpensesChart data={barData} />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Sources de Revenus</h3>
          <div className="space-y-4">
            {Object.entries(categoryMap).map(([label, amount], i) => (
              <SourceItem
                key={label}
                label={label}
                amount={formatCurrency(amount as number)}
                percentage={totalIncome > 0 ? Math.round(((amount as number) / totalIncome) * 100) : 0}
                color={categoryColors[i % categoryColors.length]}
              />
            ))}
            {Object.keys(categoryMap).length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Aucun revenu enregistré.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Tous les Revenus</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {incomeTransactions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">Aucun revenu trouvé.</p>
          ) : (
            incomeTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.category} • {new Date(tx.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className="font-bold text-emerald-600">+{formatCurrency(Number(tx.amount))}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SourceItem: React.FC<{ label: string; amount: string; percentage: number; color: string }> = ({ label, amount, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="font-bold text-slate-900">{amount}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
    </div>
    <span className="text-xs text-slate-400 font-medium">{percentage}% du total</span>
  </div>
);

export default Income;
