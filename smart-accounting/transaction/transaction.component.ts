import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

interface Budget {
  budget_id: number;
  user_id: number;
  category_id: number;
  limit_amount: number;
  from_date: string;
  to_date: string;
  category_name?: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [
    {
      id: 1,
      date: new Date(),
      description: 'Salary Deposit',
      category: 'Income',
      type: 'income',
      amount: 3500.00
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000),
      description: 'Grocery Shopping',
      category: 'Food',
      type: 'expense',
      amount: 125.50
    },
    {
      id: 3,
      date: new Date(Date.now() - 172800000),
      description: 'Freelance Payment',
      category: 'Income',
      type: 'income',
      amount: 800.00
    },
    {
      id: 4,
      date: new Date(Date.now() - 259200000),
      description: 'Electricity Bill',
      category: 'Utilities',
      type: 'expense',
      amount: 85.20
    }
  ];

  budgets: Budget[] = [];
  selectedBudget: Budget | null = null;
  filteredTransactions: Transaction[] = [];

  newTransaction: Transaction = {
    id: 0,
    date: new Date(),
    description: '',
    category: '',
    type: 'expense',
    amount: 0
  };

  categories: string[] = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Income', 'Healthcare', 'Education', 'Other'];

  isEditing: boolean = false;
  editingId: number | null = null;

  ngOnInit() {
    this.loadBudgets();
    this.filteredTransactions = [...this.transactions];
  }

  addTransaction() {
    if (this.newTransaction.description && this.newTransaction.category && this.newTransaction.amount > 0) {
      this.newTransaction.id = Date.now();
      this.transactions.unshift({ ...this.newTransaction });
      this.resetForm();

      // Refresh filtered transactions if a budget is selected
      if (this.selectedBudget) {
        this.filterTransactionsByBudget(this.selectedBudget);
      }
    }
  }

  editTransaction(transaction: Transaction) {
    this.isEditing = true;
    this.editingId = transaction.id;
    this.newTransaction = { ...transaction };
  }

  updateTransaction() {
    if (this.editingId !== null) {
      const index = this.transactions.findIndex(t => t.id === this.editingId);
      if (index !== -1) {
        this.transactions[index] = { ...this.newTransaction };
        this.resetForm();
        this.isEditing = false;
        this.editingId = null;
      }
    }
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactions = this.transactions.filter(t => t.id !== id);
    }
  }

  cancelEdit() {
    this.resetForm();
    this.isEditing = false;
    this.editingId = null;
  }

  private resetForm() {
    this.newTransaction = {
      id: 0,
      date: new Date(),
      description: '',
      category: '',
      type: 'expense',
      amount: 0
    };
  }

  getTotalIncome(): number {
    return this.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  }

  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  loadBudgets() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedBudgets = localStorage.getItem('budgets');
      if (savedBudgets) {
        this.budgets = JSON.parse(savedBudgets);
      } else {
        // Sample budgets for demonstration
        this.budgets = [
          {
            budget_id: 1,
            user_id: 1,
            category_id: 1,
            limit_amount: 300,
            from_date: '2025-01-01',
            to_date: '2025-01-31',
            category_name: 'Food'
          },
          {
            budget_id: 2,
            user_id: 1,
            category_id: 2,
            limit_amount: 200,
            from_date: '2025-01-01',
            to_date: '2025-01-31',
            category_name: 'Transportation'
          }
        ];
        this.saveBudgets();
      }
    }
  }

  saveBudgets() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('budgets', JSON.stringify(this.budgets));
    }
  }

  selectBudget(budget: Budget) {
    this.selectedBudget = budget;
    this.filterTransactionsByBudget(budget);
  }

  clearBudgetSelection() {
    this.selectedBudget = null;
    this.filteredTransactions = [...this.transactions];
  }

  filterTransactionsByBudget(budget: Budget) {
    this.filteredTransactions = this.transactions.filter(transaction =>
      transaction.category.toLowerCase() === budget.category_name?.toLowerCase() &&
      transaction.type === 'expense'
    );
  }

  getBudgetSpent(budget: Budget): number {
    return this.filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  getBudgetRemaining(budget: Budget): number {
    return budget.limit_amount - this.getBudgetSpent(budget);
  }

  getBudgetProgress(budget: Budget): number {
    const spent = this.getBudgetSpent(budget);
    return (spent / budget.limit_amount) * 100;
  }

  getCategoryIcon(categoryId: number): string {
    const iconMap: { [key: number]: string } = {
      1: 'fas fa-utensils',
      2: 'fas fa-car',
      3: 'fas fa-film',
      4: 'fas fa-bolt',
      5: 'fas fa-heartbeat',
      6: 'fas fa-shopping-bag',
      7: 'fas fa-graduation-cap',
      8: 'fas fa-plane'
    };
    return iconMap[categoryId] || 'fas fa-tag';
  }
}
