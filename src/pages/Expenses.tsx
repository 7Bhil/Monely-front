import React from 'react';
import { useAuth } from '../context/useAuth';
import { useData } from '../context/useData';
import StatCard from '../components/ui/StatCard';
import { CategoryPieChart } from '../components/ui/Charts';
import type { PieItem } from '../components/ui/Charts';

const CATEGORY_COLORS = ['#1919e6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

const Expenses: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading } = useData();

  const expenseTransactions = transactions.filter(tx => tx.type === 'expense');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenseTransactions
    .filter(tx => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpenses = expenseTransactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: user?.currency || 'XOF',
      maximumFractionDigits: 0,
    }).format(amount).replace('XOF', 'F CFA');

  // Category breakdown
  const categoryMap = expenseTransactions.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const pieData: PieItem[] = Object.entries(categoryMap).map(([name, value], i) => ({
    name,
    value: totalExpenses > 0 ? Math.round(((value as number) / totalExpenses) * 100) : 0,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));

  const monthlyIncome = user?.monthly_income || 0;
  const budgetUsedPct = monthlyIncome > 0 ? Math.min(100, Math.round((monthlyExpenses / monthlyIncome) * 100)) : 0;

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dépenses</h1>
          <p className="text-sm text-slate-500">Suivez et contrôlez vos dépenses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total ce mois" value={formatCurrency(monthlyExpenses)} change="-8%" changeType="positive">
          <div className="flex items-end gap-1 h-6 opacity-20">
            {[50, 80, 60, 40, 70, 90].map((h, i) => <div key={i} className="flex-1 bg-red-500 rounded-t-sm" style={{ height: `${h}%` }}></div>)}
          </div>
        </StatCard>
        <StatCard label="Budget utilisé" value={`${budgetUsedPct}%`} change="" changeType="neutral">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
            <div className="bg-orange-500 h-full" style={{ width: `${budgetUsedPct}%` }}></div>
          </div>
        </StatCard>
        <StatCard label="Total des dépenses" value={formatCurrency(totalExpenses)} change="" changeType="neutral">
          <div className="flex items-end gap-1 h-6 opacity-20">
            {[30, 40, 60, 50, 70, 85].map((h, i) => <div key={i} className="flex-1 bg-red-500 rounded-t-sm" style={{ height: `${h}%` }}></div>)}
          </div>
        </StatCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Répartition</h3>
          <CategoryPieChart data={pieData} totalValue={formatCurrency(totalExpenses)} />
          <div className="mt-6 space-y-3">
            {pieData.map((item) => (
              <CategoryLegend
                key={item.name}
                color={item.color}
                label={item.name}
                amount={formatCurrency(categoryMap[item.name] || 0)}
                percent={`${item.value}%`}
              />
            ))}
            {pieData.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Aucune dépense enregistrée.</p>}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Principales Catégories</h3>
            <div className="space-y-3">
              {Object.entries(categoryMap)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([label, amount], i) => (
                  <CategoryBar
                    key={label}
                    label={label}
                    amount={formatCurrency(amount as number)}
                    percentage={totalExpenses > 0 ? ((amount as number) / totalExpenses) * 100 : 0}
                    color={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                  />
                ))}
            </div>
          </div>

          {budgetUsedPct >= 60 && (
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-3xl text-white shadow-xl shadow-orange-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Alerte Budget</h4>
                  <p className="text-sm text-orange-100 leading-relaxed font-medium">
                    Vous avez dépensé {budgetUsedPct}% de votre budget mensuel. Faites attention aux dépenses non essentielles.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50">
          <h3 className="font-bold text-slate-800">Toutes les Dépenses</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {expenseTransactions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">Aucune dépense trouvée.</p>
          ) : (
            expenseTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.category} • {new Date(tx.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className="font-bold text-red-500">-{formatCurrency(Number(tx.amount))}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryLegend: React.FC<{ color: string; label: string; amount: string; percent: string }> = ({ color, label, amount, percent }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-slate-600 font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-xs font-medium">{amount}</span>
      <span className="font-bold text-slate-800">{percent}</span>
    </div>
  </div>
);

const CategoryBar: React.FC<{ label: string; amount: string; percentage: number; color: string }> = ({ label, amount, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-700 font-semibold">{label}</span>
      <span className="font-bold text-slate-900">{amount}</span>
    </div>
    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

export default Expenses;
