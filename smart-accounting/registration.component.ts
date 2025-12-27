import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: UserRegistration = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  };

  showPassword: boolean = false;
  isLoading: boolean = false;
  registrationError: string = '';
  registrationSuccess: boolean = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToLogin(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.router.navigate(['/']);
  }

  async onRegister() {
    // Reset states
    this.registrationError = '';
    this.registrationSuccess = false;

    // Additional validation
    if (this.user.password !== this.user.confirmPassword) {
      this.registrationError = 'Passwords do not match';
      return;
    }

    if (!this.user.agreeToTerms) {
      this.registrationError = 'You must agree to the terms and conditions';
      return;
    }

    // Set loading state
    this.isLoading = true;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, accept any registration
      // In a real app, you would send data to backend API
      console.log('Registration successful for user:', this.user.username);

      this.registrationSuccess = true;

      // Store user data for login (but don't auto-login)
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('registeredUser', JSON.stringify({
          username: this.user.username,
          email: this.user.email,
          fullName: `${this.user.firstName} ${this.user.lastName}`
        }));
      }

      // Redirect to login page after successful registration
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);

    } catch (error) {
      this.registrationError = 'Registration failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
