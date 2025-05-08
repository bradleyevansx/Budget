// user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { User } from '../models/user.model';
import {
  LoadingState,
  switchMapWithLoading,
} from '../sdk/switchMapWithLoading';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getWhere(query?: QueryLayer<User>): Observable<LoadingState<User[]>> {
    return of(query).pipe(
      switchMapWithLoading((q) =>
        this.http.post<User[]>('/api/user/get', { query: q })
      )
    );
  }

  create(t: Omit<Omit<User, 'id'>, 'userId'>): Observable<LoadingState<User>> {
    return of(t).pipe(
      switchMapWithLoading((data) => this.http.post<User>('/api/user', data))
    );
  }

  delete(id: number): Observable<LoadingState<User>> {
    return of(id).pipe(
      switchMapWithLoading((userId) =>
        this.http.delete<User>(`/api/user/${userId}`)
      )
    );
  }

  update(t: User): Observable<LoadingState<Partial<User> & { id: number }>> {
    return of(t).pipe(
      switchMapWithLoading((data) =>
        this.http.put<Partial<User> & { id: number }>(`/api/user`, data)
      )
    );
  }
}
