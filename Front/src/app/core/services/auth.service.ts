import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'node:http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RecruiterService } from './recruiter.service';

type AuthStatus = 'authenticated' | 'unauthenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private statusSubject: BehaviorSubject<AuthStatus> =
    new BehaviorSubject<AuthStatus>('unauthenticated');
  status$ = this.statusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: RecruiterService
  ) {}

  isAuthed(): Observable<boolean> {
    if (typeof window === 'undefined') {
      return of(false);
    }
    if (!this.getToken()) {
      const urlParams = new URLSearchParams(window.location.search);
      const jwt = urlParams.get('jwt');
      if (jwt) {
        localStorage.setItem('auth_token', jwt);
        this.rs.triggerWelcome();
      }
    }
    return this.http
      .get<{ token: string }>('/api/auth/try-auth', { observe: 'response' })
      .pipe(
        map((res) => {
          if (res.status === 200) {
            this.statusSubject.next('authenticated');
            return true;
          } else {
            this.statusSubject.next('unauthenticated');
            return false;
          }
        }),
        catchError(() => {
          this.statusSubject.next('unauthenticated');
          return of(false);
        })
      );
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.statusSubject.next('unauthenticated');
  }

  login(firstLastName: string, password: string) {
    const [firstName, lastName] = firstLastName.split(' ');
    return this.http
      .post<{ token: string }>('/api/auth/login', {
        firstName,
        lastName,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.token);
          this.statusSubject.next('authenticated');
          this.router.navigate(['/']);
        })
      );
  }
}
