import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { QueryLayer } from '../models/query.model';
import { Allocation } from '../models/allocation.model';

@Injectable({ providedIn: 'root' })
export class AllocationService {
  constructor(private http: HttpClient) {}

  getWhere(query?: QueryLayer<Allocation>): Observable<Allocation[]> {
    return this.http.post<Allocation[]>('/api/allocation/get', {
      query: query,
    });
  }

  create(t: Omit<Omit<Allocation, 'id'>, 'userId'>): Observable<Allocation> {
    return this.http.post<Allocation>('/api/allocation', t);
  }

  delete(id: number): Observable<Allocation> {
    return this.http.delete<Allocation>(`/api/allocation/${id}`);
  }

  update(t: Allocation): Observable<Partial<Allocation> & { id: number }> {
    return this.http.put<Partial<Allocation> & { id: number }>(
      `/api/allocation/${t.id}`,
      t
    );
  }
}
