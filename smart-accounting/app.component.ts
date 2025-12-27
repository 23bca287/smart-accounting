import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-root">
      <router-outlet></router-outlet>
      
      <footer class="app-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Smart Accounting</h4>
            <p>Your trusted partner for financial management and budget tracking.</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" (click)="scrollToTop($event)">Back to Top</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#transactions">Transactions</a></li>
              <li><a href="#reports">Reports</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>📧 support&#64;smartaccounting.com</p>
            <p>📞 +1 (555) 123-4567</p>
          </div>
          <div class="footer-section">
            <h4>Follow Us</h4>
            <div class="social-links">
              <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Smart Accounting. All rights reserved. | Made with ❤️ for better financial management</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-footer {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      margin-top: auto;
      padding: 3rem 0 1rem 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      color: #ffffff;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .footer-section p {
      color: #e2e8f0;
      line-height: 1.6;
      margin: 0;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section ul li a {
      color: #e2e8f0;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section ul li a:hover {
      color: #60a5fa;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-links a {
      color: #e2e8f0;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    }

    .social-links a:hover {
      color: #1e3c72;
      background: white;
      transform: translateY(-2px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      text-align: center;
    }

    .footer-bottom p {
      color: #cbd5e1;
      margin: 0;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 0 1rem;
      }

      .social-links {
        justify-content: center;
      }

      .app-footer {
        padding: 2rem 0 1rem 0;
      }
    }
  `]
})
export class AppComponent {
  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
