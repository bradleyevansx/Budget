// ExpectedIncome.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { ExpectedIncome } from '../models/expected-income.model';
import {
  LoadingState,
  switchMapWithLoading,
} from '../sdk/switchMapWithLoading';

@Injectable({ providedIn: 'root' })
export class ExpectedIncomeService {
  constructor(private http: HttpClient) {}

  getWhere(
    query?: QueryLayer<ExpectedIncome>
  ): Observable<LoadingState<ExpectedIncome[]>> {
    return of(query).pipe(
      switchMapWithLoading((q) =>
        this.http.post<ExpectedIncome[]>('/api/expectedincome/get', {
          query: q,
        })
      )
    );
  }

  create(
    t: Omit<Omit<ExpectedIncome, 'id'>, 'userId'>
  ): Observable<LoadingState<ExpectedIncome>> {
    return of(t).pipe(
      switchMapWithLoading((data) =>
        this.http.post<ExpectedIncome>('/api/expectedincome', data)
      )
    );
  }

  delete(id: number): Observable<LoadingState<ExpectedIncome>> {
    return of(id).pipe(
      switchMapWithLoading((ExpectedIncomeId) =>
        this.http.delete<ExpectedIncome>(
          `/api/expectedincome/${ExpectedIncomeId}`
        )
      )
    );
  }

  update(
    t: ExpectedIncome
  ): Observable<LoadingState<Partial<ExpectedIncome> & { id: number }>> {
    return of(t).pipe(
      switchMapWithLoading((data) =>
        this.http.patch<Partial<ExpectedIncome> & { id: number }>(
          `/api/expectedincome`,
          data
        )
      )
    );
  }
}
