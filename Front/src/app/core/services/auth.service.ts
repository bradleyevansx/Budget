import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

type AuthStatus = 'authenticated' | 'unauthenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  onStatusChangeHandlers: ((s: AuthStatus) => void)[] = [];

  isAuthenticated(): boolean {
    return typeof window !== 'undefined' && this.getToken() !== null;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.onStatusChangeHandlers.forEach((handler) => {
      handler('unauthenticated');
    });
  }

  login(firstLastName: string, password: string) {
    const firstName = firstLastName.split(' ')[0];
    const lastName = firstLastName.split(' ')[1];
    return this.http
      .post<{ token: string }>('/api/auth/login', {
        firstName,
        lastName,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.token);
          this.onStatusChangeHandlers.forEach((handler) => {
            handler('authenticated');
          });
          this.router.navigate(['/']);
        })
      );
  }
}
