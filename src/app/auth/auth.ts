import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<boolean> {
    if (email && password) {
      const fakeToken = this.generateFakeToken(email);

      if (this.isBrowser()) {
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('email', email);
      }

      return of(true);
    }

    return of(false);
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  getUserEmail(): string | null {
    return this.isBrowser() ? localStorage.getItem('email') : null;
  }

  isAuthenticated(): boolean {
    const hasToken = !!this.getToken();
    return hasToken;
  }

  private generateFakeToken(email: string): string {
    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
    };
    return btoa(JSON.stringify(payload)); // base64 encode
  }
}