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
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Income } from '../models/income.model';
import { ExpectedIncome } from '../models/expected-income.model';
import { ExpectedIncomeService } from './expected-income.service';
import { IncomeService } from './income.service';

@Injectable({ providedIn: 'root' })
export class MonthlyService {
  private allocationsSubject = new BehaviorSubject<Allocation[]>([]);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private usersSubject = new BehaviorSubject<User[]>([]);
  private incomesSubject = new BehaviorSubject<Income[]>([]);
  private expectedIncomesSubject = new BehaviorSubject<ExpectedIncome[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false); // New loading subject

  selectedMonth: Date = new Date();

  allocations$ = this.allocationsSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  incomes$ = this.incomesSubject.asObservable();
  expectedIncomes$ = this.expectedIncomesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable(); // Expose loading observable

  constructor(
    private as: AllocationService,
    private ts: TransactionService,
    private sms: SelectedMonthService,
    private us: UserService,
    private is: IncomeService,
    private eis: ExpectedIncomeService
  ) {
    this.init();
  }

  init() {
    this.us.getWhere().subscribe((res) => {
      if (res.loading) return;
      const users = res.data.map((x) => ({
        ...x,
      }));
      this.usersSubject.next(users);
    });
    this.sms.selectedMonth$.subscribe((month) => {
      this.selectedMonth = month;
      this.initAllocations();
      this.initExpectedIncomes();
    });
  }

  initExpectedIncomes() {
    this.setLoading(true);
    this.eis
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
        const expectedIncomes = res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
        expectedIncomes.sort((a, b) => a.date.getTime() - b.date.getTime());
        this.expectedIncomesSubject.next(expectedIncomes);
        this.initIncomes();
      });
  }

  initIncomes() {
    const expectedIncomes = this.expectedIncomesSubject.getValue();
    const incomeRequests = expectedIncomes.map((expectedIncome) =>
      this.is.getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.Equals,
            propertyName: 'expectedIncomeId',
            value: expectedIncome.id,
          },
        ],
      })
    );
    forkJoin(incomeRequests).subscribe((responses) => {
      const incomes = responses.flatMap((res) =>
        res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }))
      );
      incomes.sort((a, b) => a.date.getTime() - b.date.getTime());
      this.incomesSubject.next(incomes);
      this.setLoading(false);
    });
  }

  initAllocations() {
    this.setLoading(true);
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
      this.setLoading(false);
    });
  }

  private setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
