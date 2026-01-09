import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

interface Transaction {
  id: number;
  user: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

interface Category {
  name: string;
  description: string;
  userCount: number;
}

interface Budget {
  user: string;
  category: string;
  limit: number;
  spent: number;
  period: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeSection: string = 'dashboard';
  currentAdmin: string = 'Admin User';
  
  // Modal State
  isModalOpen: boolean = false;
  isViewMode: boolean = false;
  modalTitle: string = '';
  modalType: 'user' | 'transaction' | 'category' | 'budget' | 'none' = 'none';
  currentItem: any = {};

  // Mock Data
  users: User[] = [
    { id: 101, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2023-01-15' },
    { id: 102, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', joinDate: '2023-02-20' },
    { id: 103, name: 'Mike Johnson', email: 'mike@example.com', status: 'pending', joinDate: '2023-03-10' }
  ];

  allTransactions: Transaction[] = [
    { id: 5001, user: 'John Doe', description: 'Freelance Project', category: 'Salary', type: 'income', amount: 1500, date: '2023-04-01' },
    { id: 5002, user: 'Jane Smith', description: 'Grocery Shopping', category: 'Food', type: 'expense', amount: 200, date: '2023-04-02' },
    { id: 5003, user: 'John Doe', description: 'Monthly Rent', category: 'Rent', type: 'expense', amount: 800, date: '2023-04-03' },
    { id: 5004, user: 'Mike Johnson', description: 'Utility Bill', category: 'Utilities', type: 'expense', amount: 150, date: '2023-04-05' },
    { id: 5005, user: 'Jane Smith', description: 'Consulting Fee', category: 'Salary', type: 'income', amount: 3000, date: '2023-04-06' }
  ];

  categories: Category[] = [
    { name: 'Salary', description: 'Monthly income from employment', userCount: 150 },
    { name: 'Food', description: 'Groceries and dining out', userCount: 320 },
    { name: 'Rent', description: 'Monthly housing costs', userCount: 200 },
    { name: 'Utilities', description: 'Electricity, water, internet', userCount: 280 }
  ];

  budgets: Budget[] = [
    { user: 'John Doe', category: 'Food', limit: 500, spent: 350, period: 'Monthly' },
    { user: 'Jane Smith', category: 'Rent', limit: 1000, spent: 1000, period: 'Monthly' },
    { user: 'Mike Johnson', category: 'Utilities', limit: 200, spent: 250, period: 'Monthly' }
  ];

  // Chart Data
  userChartData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 15 },
    { month: 'Mar', value: 12 },
    { month: 'Apr', value: 20 },
    { month: 'May', value: 25 },
    { month: 'Jun', value: 30 },
  ];
  maxUserChartValue = 40;

  transactionChartData = [
    { type: 'Income', value: 4500 },
    { type: 'Expense', value: 1150 },
  ];
  maxTransactionChartValue = 5000;

  categoryChartData = [
    { name: 'Salary', color: '#3498db' },
    { name: 'Food', color: '#9b59b6' },
    { name: 'Rent', color: '#f1c40f' },
    { name: 'Utilities', color: '#2ecc71' },
  ];

  // Getters for Dashboard Stats
  get totalUsers(): number { return this.users.length; }
  get totalTransactions(): number { return this.allTransactions.length; }
  get totalCategories(): number { return this.categories.length; }
  get totalBudgets(): number { return this.budgets.length; }

  // Navigation
  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  logout(): void {
    alert('Logging out...');
    // Implement actual logout logic here (e.g., router.navigate(['/login']))
  }

  // User Management
  openUserModal(user?: User): void {
    this.isModalOpen = true;
    this.isViewMode = false;
    this.modalType = 'user';
    this.modalTitle = user ? 'Edit User' : 'Add New User';
    this.currentItem = user 
      ? { ...user } 
      : { id: 0, name: '', email: '', status: 'active', joinDate: '' };
  }

  viewUserDetails(user: User): void {
    this.isModalOpen = true;
    this.isViewMode = true;
    this.modalType = 'user';
    this.modalTitle = 'View User Details';
    this.currentItem = { ...user };
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  // Transaction Management
  openTransactionModal(transaction?: Transaction): void {
    this.isModalOpen = true;
    this.isViewMode = false;
    this.modalType = 'transaction';
    this.modalTitle = transaction ? 'Edit Transaction' : 'Add Transaction';
    this.currentItem = transaction 
      ? { ...transaction } 
      : { id: 0, user: this.currentAdmin, description: '', category: 'General', type: 'expense', amount: 0, date: '' };
  }

  viewTransactionDetails(t: Transaction): void {
    this.isModalOpen = true;
    this.isViewMode = true;
    this.modalType = 'transaction';
    this.modalTitle = 'View Transaction Details';
    this.currentItem = { ...t };
  }

  deleteTransaction(t: Transaction): void {
    if (confirm('Delete this transaction?')) {
      this.allTransactions = this.allTransactions.filter(trans => trans.id !== t.id);
    }
  }

  // Category Management
  openCategoryModal(category?: Category): void {
    this.isModalOpen = true;
    this.isViewMode = false;
    this.modalType = 'category';
    this.modalTitle = category ? 'Edit Category' : 'Add Category';
    this.currentItem = category 
      ? { ...category } 
      : { name: '', description: '', userCount: 0 };
  }

  deleteCategory(c: Category): void {
    if (confirm(`Delete category ${c.name}?`)) {
      this.categories = this.categories.filter(cat => cat.name !== c.name);
    }
  }

  // Budget Management
  viewBudgetDetails(b: Budget): void {
    this.isModalOpen = true;
    this.isViewMode = true;
    this.modalType = 'budget';
    this.modalTitle = 'View Budget Details';
    this.currentItem = { ...b };
  }

  editBudget(b: Budget): void {
    const newLimit = prompt('Set New Limit:', b.limit.toString());
    if (newLimit) b.limit = parseFloat(newLimit);
  }

  deleteBudget(b: Budget): void {
    this.budgets = this.budgets.filter(budget => budget !== b);
  }

  // Reports
  generateUserReport(): void { alert('Generating User Report...'); }
  generateTransactionReport(): void { alert('Generating Transaction Report...'); }
  generateSystemReport(): void { alert('Generating System Report...'); }

  // Modal Actions
  closeModal(): void {
    this.isModalOpen = false;
    this.currentItem = {};
  }

  saveData(): void {
    if (this.modalType === 'user') {
      if (this.currentItem.id === 0) {
        // Add
        this.currentItem.id = Math.floor(Math.random() * 1000) + 100;
        this.currentItem.joinDate = new Date().toISOString();
        this.users.push(this.currentItem);
      } else {
        // Edit
        const index = this.users.findIndex(u => u.id === this.currentItem.id);
        if (index !== -1) this.users[index] = { ...this.currentItem };
      }
    } else if (this.modalType === 'transaction') {
      if (this.currentItem.id === 0) {
        this.currentItem.id = Math.floor(Math.random() * 10000) + 5000;
        this.currentItem.date = new Date().toISOString();
        this.allTransactions.unshift(this.currentItem);
      } else {
        const index = this.allTransactions.findIndex(t => t.id === this.currentItem.id);
        if (index !== -1) this.allTransactions[index] = { ...this.currentItem };
      }
    } else if (this.modalType === 'category') {
      // Simple check if exists for edit vs add
      const index = this.categories.findIndex(c => c.name === this.currentItem.name);
      if (index !== -1) {
        this.categories[index] = { ...this.currentItem };
      } else {
        this.categories.push(this.currentItem);
      }
    }
    
    this.closeModal();
  }
}