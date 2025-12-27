import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';
  loginSuccess: boolean = false;
  registrationSuccessMessage: string = '';

  constructor(private router: Router) {
    // Check if user just registered
    if (typeof window !== 'undefined' && window.localStorage) {
      const registeredUser = localStorage.getItem('registeredUser');
      if (registeredUser) {
        const userData = JSON.parse(registeredUser);
        this.username = userData.username;
        this.registrationSuccessMessage = `Welcome ${userData.fullName}! Please login with your credentials.`;
        // Clear the registration data after using it
        localStorage.removeItem('registeredUser');
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegistration(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.router.navigate(['/register']);
  }

  async onLogin() {
    // Reset states
    this.loginError = '';
    this.loginSuccess = false;

    // Basic validation
    if (!this.username.trim() || !this.password.trim()) {
      this.loginError = 'Please enter both username and password';
      return;
    }

    // Set loading state
    this.isLoading = true;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept any username/password combination
      // In a real app, you would authenticate against a backend service
      if (this.username && this.password) {
        console.log('Login successful for user:', this.username);
        this.loginSuccess = true;

        // Store login state (in a real app, you'd use proper authentication)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', this.username);
        }

        // Simulate redirect delay
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      } else {
        this.loginError = 'Invalid credentials. Please try again.';
      }
    } catch (error) {
      this.loginError = 'An error occurred during login. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
