// Income.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { Income } from '../models/income.model';
import {
  LoadingState,
  switchMapWithLoading,
} from '../sdk/switchMapWithLoading';
import { RecruiterService } from './recruiter.service';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  constructor(private http: HttpClient, private rs: RecruiterService) {}

  getWhere(query?: QueryLayer<Income>): Observable<LoadingState<Income[]>> {
    return of(query).pipe(
      switchMapWithLoading(
        (q) => this.http.post<Income[]>('/api/income/get', { query: q }),
        this.rs
      )
    );
  }

  create(
    t: Omit<Omit<Income, 'id'>, 'userId'>
  ): Observable<LoadingState<Income>> {
    return of(t).pipe(
      switchMapWithLoading(
        (data) => this.http.post<Income>('/api/income', data),
        this.rs
      )
    );
  }

  delete(id: number): Observable<LoadingState<Income>> {
    return of(id).pipe(
      switchMapWithLoading(
        (IncomeId) => this.http.delete<Income>(`/api/income/${IncomeId}`),
        this.rs
      )
    );
  }

  update(
    t: Income
  ): Observable<LoadingState<Partial<Income> & { id: number }>> {
    return of(t).pipe(
      switchMapWithLoading(
        (data) =>
          this.http.patch<Partial<Income> & { id: number }>(
            `/api/income`,
            data
          ),
        this.rs
      )
    );
  }
}
