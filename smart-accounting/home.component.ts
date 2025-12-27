import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

interface UserProfile {
  name: string;
  email: string;
}

interface UserPreferences {
  currency: string;
  theme: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: string = 'John Doe';
  activeSection: string = 'dashboard';

  // Financial data
  totalIncome: number = 15420.50;
  totalExpenses: number = 12350.75;
  netBalance: number = this.totalIncome - this.totalExpenses;
  monthlyTransactions: number = 47;

  // Sample transactions
  recentTransactions: Transaction[] = [
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

  allTransactions: Transaction[] = [
    ...this.recentTransactions,
    {
      id: 5,
      date: new Date(Date.now() - 345600000),
      description: 'Online Course',
      category: 'Education',
      type: 'expense',
      amount: 49.99
    },
    {
      id: 6,
      date: new Date(Date.now() - 432000000),
      description: 'Investment Return',
      category: 'Investment',
      type: 'income',
      amount: 250.00
    }
  ];

  // User settings
  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  userPreferences: UserPreferences = {
    currency: 'INR',
    theme: 'light'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is logged in (in a real app, you'd check authentication service)
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        this.router.navigate(['/']);
      } else {
        // Get the actual username from localStorage
        const username = localStorage.getItem('username');
        if (username) {
          this.currentUser = username;
        }
      }
    }
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  getTransactionIcon(type: string): string {
    return type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down';
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('isLoggedIn');
    }
    this.router.navigate(['/']);
  }

  // Action methods
  addTransaction() {
    alert('Add Transaction functionality would open a modal/form here');
  }

  generateReport() {
    alert('Generate Report functionality would create and download a PDF report');
  }

  viewAnalytics() {
    alert('View Analytics functionality would show detailed charts and graphs');
  }

  editTransaction(transaction: Transaction) {
    alert(`Edit transaction: ${transaction.description}`);
  }

  deleteTransaction(transaction: Transaction) {
    if (confirm(`Are you sure you want to delete "${transaction.description}"?`)) {
      this.allTransactions = this.allTransactions.filter(t => t.id !== transaction.id);
      this.recentTransactions = this.recentTransactions.filter(t => t.id !== transaction.id);
    }
  }

  // Report methods
  generateIncomeExpenseReport() {
    alert('Generating Income vs Expenses report...');
  }

  generateMonthlyReport() {
    alert('Generating Monthly Summary report...');
  }

  generateCategoryReport() {
    alert('Generating Category Analysis report...');
  }

  generateTrendsReport() {
    alert('Generating Trends & Insights report...');
  }

  // Settings methods
  saveProfile() {
    alert('Profile saved successfully!');
  }

  savePreferences() {
    alert('Preferences saved successfully!');
  }

  changePassword() {
    alert('Change Password functionality would open a modal');
  }

  enableTwoFactor() {
    alert('Enable 2FA functionality would guide user through setup');
  }
}
