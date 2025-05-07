import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { QueryLayer } from '../models/query.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setLoading<T>(obs$: Observable<T>): Observable<T> {
    this.isLoading.next(true);
    return obs$.pipe(finalize(() => this.isLoading.next(false)));
  }
  getWhere(query?: QueryLayer<Transaction>): Observable<Transaction[]> {
    return this.setLoading(
      this.http.post<Transaction[]>('/api/transaction/get', {
        query,
      })
    );
  }

  create(t: Omit<Omit<Transaction, 'id'>, 'userId'>): Observable<Transaction> {
    return this.setLoading(this.http.post<Transaction>('/api/transaction', t));
  }

  delete(id: number): Observable<Transaction> {
    return this.setLoading(
      this.http.delete<Transaction>(`/api/transaction/${id}`)
    );
  }

  update(t: Transaction): Observable<Partial<Transaction> & { id: number }> {
    return this.setLoading(
      this.http.patch<Partial<Transaction> & { id: number }>(
        `/api/transaction`,
        t
      )
    );
  }
}
