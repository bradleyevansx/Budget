// allocation.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { Allocation } from '../models/allocation.model';
import {
  LoadingState,
  switchMapWithLoading,
} from '../sdk/switchMapWithLoading';
import { RecruiterService } from './recruiter.service';

@Injectable({ providedIn: 'root' })
export class AllocationService {
  constructor(private http: HttpClient, private rs: RecruiterService) {}

  getWhere(
    query?: QueryLayer<Allocation>
  ): Observable<LoadingState<Allocation[]>> {
    return of(query).pipe(
      switchMapWithLoading(
        (q) =>
          this.http.post<Allocation[]>('/api/allocation/get', { query: q }),
        this.rs
      )
    );
  }

  create(
    t: Omit<Omit<Allocation, 'id'>, 'userId'>
  ): Observable<LoadingState<Allocation>> {
    return of(t).pipe(
      switchMapWithLoading(
        (data) => this.http.post<Allocation>('/api/allocation', data),
        this.rs
      )
    );
  }

  delete(id: number): Observable<LoadingState<Allocation>> {
    return of(id).pipe(
      switchMapWithLoading(
        (allocationId) =>
          this.http.delete<Allocation>(`/api/allocation/${allocationId}`),
        this.rs
      )
    );
  }

  update(
    t: Allocation
  ): Observable<LoadingState<Partial<Allocation> & { id: number }>> {
    return of(t).pipe(
      switchMapWithLoading(
        (data) =>
          this.http.patch<Partial<Allocation> & { id: number }>(
            `/api/allocation`,
            data
          ),
        this.rs
      )
    );
  }
}
