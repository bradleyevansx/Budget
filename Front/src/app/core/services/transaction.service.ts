import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { QueryLayer } from '../models/query.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  getWhere(query?: QueryLayer<Transaction>): Observable<Transaction[]> {
    return this.http.post<Transaction[]>('/api/transaction/get', {
      query: query,
    });
  }

  create(t: Omit<Omit<Transaction, 'id'>, 'userId'>): Observable<Transaction> {
    return this.http.post<Transaction>('/api/transaction', t);
  }

  delete(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(`/api/transaction/${id}`);
  }

  update(t: Transaction): Observable<Partial<Transaction> & { id: number }> {
    return this.http.patch<Partial<Transaction> & { id: number }>(
      `/api/transaction`,
      t
    );
  }
}
