import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Allocation } from '../models/allocation.model';
import { Transaction } from '../models/transaction.model';
import { AllocationService } from './allocation.service';
import { TransactionService } from './transaction.service';
import { SelectedMonthService } from './selectedMonth.service';
import { Comparator, Operator } from '../models/query.model';

@Injectable({ providedIn: 'root' })
export class MonthlyService {
  private allocationsSubject = new BehaviorSubject<Allocation[]>([]);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  selectedMonth: Date = new Date();

  allocations$ = this.allocationsSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();

  constructor(
    private as: AllocationService,
    private ts: TransactionService,
    private sms: SelectedMonthService
  ) {
    this.init();
  }

  init() {
    this.sms.selectedMonth$.subscribe((month) => {
      this.selectedMonth = month;
      this.initAllocations();
    });
  }

  initAllocations() {
    this.as
      .getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.GreaterThanOrEqualTo,
            propertyName: 'date',
            value: new Date(
              Date.UTC(
                this.selectedMonth.getFullYear(),
                this.selectedMonth.getMonth(),
                1
              )
            ),
          },
          {
            comparator: Comparator.LessThanOrEqualTo,
            propertyName: 'date',
            value: new Date(
              Date.UTC(
                this.selectedMonth.getFullYear(),
                this.selectedMonth.getMonth() + 1,
                0
              )
            ),
          },
        ],
      })
      .subscribe((res) => {
        if (res.loading) return;
        const allocations = res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
        allocations.sort((a, b) => a.date.getTime() - b.date.getTime());
        this.allocationsSubject.next(allocations);
        this.initTransactions();
      });
  }

  initTransactions() {
    const allocations = this.allocationsSubject.getValue();
    const transactionRequests = allocations.map((allocation) =>
      this.ts.getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.Equals,
            propertyName: 'allocationId',
            value: allocation.id,
          },
        ],
      })
    );

    forkJoin(transactionRequests).subscribe((responses) => {
      const transactions = responses.flatMap((res) =>
        res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }))
      );
      transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
      this.transactionsSubject.next(transactions);
    });
  }
}
