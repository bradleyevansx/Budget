import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  getWhere(query: Partial<Transaction>): Observable<Transaction[]> {
    const req = {};
    if (query.id) {
      req['id'] = query.id;
    }
    if (query.userId) {
      req['userId'] = query.userId;
    }
    if (query.location) {
      req['location'] = query.location;
    }
    if (query.price) {
      req['price'] = query.price;
    }
    if (query.date) {
      req['date'] = query.date.toISOString();
    }
    return this.http.get<Transaction[]>('/api/transaction', {
      params: req,
    });
  }

  create(t: Omit<Omit<Transaction, 'id'>, 'userId'>): Observable<Transaction> {
    return this.http.post<Transaction>('/api/transaction', t);
  }

  delete(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(`/api/transaction/${id}`);
  }

  update(t: Transaction): Observable<Partial<Transaction> & { id: number }> {
    return this.http.put<Partial<Transaction> & { id: number }>(
      `/api/transaction/${t.id}`,
      t
    );
  }
}
