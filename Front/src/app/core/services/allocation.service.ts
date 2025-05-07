import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { Allocation } from '../models/allocation.model';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AllocationService {
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setLoading<T>(obs$: Observable<T>): Observable<T> {
    this.isLoading.next(true);
    return obs$.pipe(finalize(() => this.isLoading.next(false)));
  }

  getWhere(query?: QueryLayer<Allocation>): Observable<Allocation[]> {
    return this.setLoading(
      this.http.post<Allocation[]>('/api/allocation/get', { query })
    );
  }

  create(t: Omit<Omit<Allocation, 'id'>, 'userId'>): Observable<Allocation> {
    return this.setLoading(this.http.post<Allocation>('/api/allocation', t));
  }

  delete(id: number): Observable<Allocation> {
    return this.setLoading(
      this.http.delete<Allocation>(`/api/allocation/${id}`)
    );
  }

  update(t: Allocation): Observable<Partial<Allocation> & { id: number }> {
    return this.setLoading(
      this.http.put<Partial<Allocation> & { id: number }>(`/api/allocation`, t)
    );
  }
}
