// src/pages/proprietaire/Transactions.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  name: string;
  category: string;
  date: string;
  time: string;
  amount: number;
}

const Transactions = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'income' | 'expense'>('all');

  const transactions: Transaction[] = [
    {
      id: '4',
      type: 'expense',
      name: 'Réparation Climatiseur',
      category: 'Maintenance',
      date: '25 Jan',
      time: '09:00 AM',
      amount: 150,
    },
    {
      id: '5',
      type: 'expense',
      name: 'Facture STEG',
      category: 'Factures',
      date: '15 Jan',
      time: '02:30 PM',
      amount: 80,
    },
    {
      id: '1',
      type: 'income',
      name: 'Loyer Dar El Menzah',
      category: 'Loyer',
      date: '28 Jan',
      time: '10:40 PM',
      amount: 750,
    },
    {
      id: '2',
      type: 'income',
      name: 'Loyer Dar El Anbar',
      category: 'Loyer',
      date: '18 Jan',
      time: '10:40 PM',
      amount: 800,
    },
    {
      id: '3',
      type: 'income',
      name: 'Loyer Dar Trad',
      category: 'Loyer',
      date: '8 Jan',
      time: '10:40 PM',
      amount: 500,
    },
  ];

  const filteredTransactions = transactions.filter(t =>
    selectedFilter === 'all' || t.type === selectedFilter
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const [showTotals, setShowTotals] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Transactions</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectedFilter('all');
              setShowTotals(false);
            }}
            className="rounded-full flex-1"
          >
            Toutes les transactions
          </Button>
          <Button
            variant={selectedFilter === 'income' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectedFilter('income');
              setShowTotals(true);
            }}
            className="rounded-full"
          >
            Revenu
          </Button>
        </div>

        {/* Total Stats */}
	        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
	          {showTotals ? (
	            <div className="space-y-3">
	              <div className="flex justify-between items-center">
	                <p className="text-sm opacity-90">Revenu total</p>
	                <h3 className="text-2xl font-bold text-green-300">+{totalIncome} DT</h3>
	              </div>
	              <div className="flex justify-between items-center">
	                <p className="text-sm opacity-90">Dépense totale</p>
	                <h3 className="text-2xl font-bold text-red-300">-{totalExpense} DT</h3>
	              </div>
	              <div className="h-px bg-primary-foreground/50 my-2" />
	              <div className="flex justify-between items-center">
	                <p className="text-sm opacity-90">Solde net</p>
	                <h2 className="text-3xl font-bold">{totalBalance} DT</h2>
	              </div>
	            </div>
	          ) : (
	            <>
	              <p className="text-sm opacity-90 mb-2">Revenu total</p>
	              <h2 className="text-4xl font-bold mb-4">{totalIncome} DT</h2>
	            </>
	          )}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        {/* Transactions List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Historique des transactions</h3>
            <button className="text-sm text-primary hover:underline">
              Voir tout
            </button>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-card rounded-xl p-4 border shadow-sm flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{transaction.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}, {transaction.time}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount} DT
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;