// transaction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { QueryLayer } from '../models/query.model';
import {
  LoadingState,
  switchMapWithLoading,
} from '../sdk/switchMapWithLoading';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  getWhere(
    query?: QueryLayer<Transaction>
  ): Observable<LoadingState<Transaction[]>> {
    return of(query).pipe(
      switchMapWithLoading((q) =>
        this.http.post<Transaction[]>('/api/transaction/get', { query: q })
      )
    );
  }

  create(
    t: Omit<Omit<Transaction, 'id'>, 'userId'>
  ): Observable<LoadingState<Transaction>> {
    return of(t).pipe(
      switchMapWithLoading((data) =>
        this.http.post<Transaction>('/api/transaction', data)
      )
    );
  }

  delete(id: number): Observable<LoadingState<Transaction>> {
    return of(id).pipe(
      switchMapWithLoading((transactionId) =>
        this.http.delete<Transaction>(`/api/transaction/${transactionId}`)
      )
    );
  }

  update(
    t: Transaction
  ): Observable<LoadingState<Partial<Transaction> & { id: number }>> {
    return of(t).pipe(
      switchMapWithLoading((data) =>
        this.http.patch<Partial<Transaction> & { id: number }>(
          `/api/transaction`,
          data
        )
      )
    );
  }
}
