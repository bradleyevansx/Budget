import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { finalize } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setLoading<T>(obs$: Observable<T>): Observable<T> {
    this.isLoading.next(true);
    return obs$.pipe(finalize(() => this.isLoading.next(false)));
  }

  getWhere(query?: QueryLayer<User>): Observable<User[]> {
    return this.setLoading(this.http.post<User[]>('/api/user/get', { query }));
  }

  create(t: Omit<Omit<User, 'id'>, 'userId'>): Observable<User> {
    return this.setLoading(this.http.post<User>('/api/user', t));
  }

  delete(id: number): Observable<User> {
    return this.setLoading(this.http.delete<User>(`/api/user/${id}`));
  }

  update(t: User): Observable<Partial<User> & { id: number }> {
    return this.setLoading(
      this.http.put<Partial<User> & { id: number }>(`/api/user`, t)
    );
  }
}
