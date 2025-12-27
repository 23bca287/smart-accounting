import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Budget {
  budget_id: number;
  user_id: number;
  category_id: number;
  limit_amount: number;
  from_date: string;
  to_date: string;
  category_name?: string; // For display purposes
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = [
    { id: 1, name: 'Food & Dining' },
    { id: 2, name: 'Transportation' },
    { id: 3, name: 'Entertainment' },
    { id: 4, name: 'Utilities' },
    { id: 5, name: 'Healthcare' },
    { id: 6, name: 'Shopping' },
    { id: 7, name: 'Education' },
    { id: 8, name: 'Travel' }
  ];

  showForm: boolean = false;
  editingBudget: Budget | null = null;
  currentUserId: number = 1; // In a real app, this would come from auth service

  newBudget: Budget = {
    budget_id: 0,
    user_id: this.currentUserId,
    category_id: 0,
    limit_amount: 0,
    from_date: '',
    to_date: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Only load budgets in browser environment
    if (typeof window !== 'undefined') {
      this.loadBudgets();
    }
  }

  loadBudgets() {
    // In a real app, this would fetch from a service/API
    // For now, we'll use localStorage or mock data
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedBudgets = localStorage.getItem('budgets');
      if (savedBudgets) {
        this.budgets = JSON.parse(savedBudgets);
        // Ensure all budgets have category_name set (migration for existing data)
        // and ensure category_id is a number
        this.budgets.forEach(budget => {
          budget.category_id = Number(budget.category_id);
          if (!budget.category_name) {
            budget.category_name = this.getCategoryName(budget.category_id);
          }
        });
      } else {
        // Sample data
        this.budgets = [
          {
            budget_id: 1,
            user_id: 1,
            category_id: 1,
            limit_amount: 500,
            from_date: '2025-01-01',
            to_date: '2025-01-31',
            category_name: 'Food & Dining'
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
      // Ensure all budgets have category_name set before saving
      // and ensure category_id is a number
      this.budgets.forEach(budget => {
        budget.category_id = Number(budget.category_id);
        if (!budget.category_name) {
          budget.category_name = this.getCategoryName(budget.category_id);
        }
      });
      localStorage.setItem('budgets', JSON.stringify(this.budgets));
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  getCategoryIcon(categoryId: number): string {
    const iconMap: { [key: number]: string } = {
      1: 'fas fa-utensils',        // Food & Dining
      2: 'fas fa-car',             // Transportation
      3: 'fas fa-film',            // Entertainment
      4: 'fas fa-bolt',            // Utilities
      5: 'fas fa-heartbeat',       // Healthcare
      6: 'fas fa-shopping-bag',    // Shopping
      7: 'fas fa-graduation-cap',  // Education
      8: 'fas fa-plane'            // Travel
    };
    return iconMap[categoryId] || 'fas fa-tag';
  }

  showAddForm() {
    this.showForm = true;
    this.editingBudget = null;
    this.resetForm();
  }

  editBudget(budget: Budget) {
    this.showForm = true;
    this.editingBudget = budget;
    this.newBudget = { ...budget };
  }

  cancelForm() {
    this.showForm = false;
    this.editingBudget = null;
    this.resetForm();
  }

  resetForm() {
    this.newBudget = {
      budget_id: 0,
      user_id: this.currentUserId,
      category_id: 0,
      limit_amount: 0,
      from_date: '',
      to_date: ''
    };
  }

  saveBudget() {
    // Ensure category_id is a number
    this.newBudget.category_id = Number(this.newBudget.category_id);
    
    if (this.editingBudget) {
      // Update existing budget
      const index = this.budgets.findIndex(b => b.budget_id === this.editingBudget!.budget_id);
      if (index !== -1) {
        this.newBudget.category_name = this.getCategoryName(this.newBudget.category_id);
        this.budgets[index] = { ...this.newBudget };
      }
    } else {
      // Add new budget
      const newId = Math.max(...this.budgets.map(b => b.budget_id), 0) + 1;
      this.newBudget.budget_id = newId;
      this.newBudget.category_name = this.getCategoryName(this.newBudget.category_id);
      this.budgets.push({ ...this.newBudget });
    }

    this.saveBudgets();
    this.cancelForm();
  }

  deleteBudget(budgetId: number) {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.budgets = this.budgets.filter(b => b.budget_id !== budgetId);
      this.saveBudgets();
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getProgressPercentage(budget: Budget): number {
    // In a real app, this would calculate based on actual spending
    // For now, return 0 to avoid change detection issues
    return 0;
  }
}
