import { Component, Input } from '@angular/core';
import { Transaction } from '../core/models/transaction.model';
import { TableModule } from 'primeng/table';
import { toUsdString } from '../core/sdk/moneyHelpers';
import { TransactionService } from '../core/services/transaction.service';
import { Comparator, Operator } from '../core/models/query.model';
import { SelectedMonthService } from '../core/services/selectedMonth.service';
import { AllocationService } from '../core/services/allocation.service';
import { Allocation } from '../core/models/allocation.model';
import { AllocateTransactionComponent } from './allocate-transaction/allocate-transaction.component';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
@Component({
  selector: 'app-transactions-table',
  imports: [TableModule, AllocateTransactionComponent, ButtonModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
  transactions: Transaction[] = [];
  allocations: Allocation[] = [];
  users: User[] = [];
  selectedMonth: Date = new Date();
  toBeAllocated: Map<number, Transaction[]> = new Map();

  usersLoading: boolean = true;
  transactionsLoading: boolean = true;
  allocationsLoading: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private selectedMonthService: SelectedMonthService,
    private allocationService: AllocationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.selectedMonthService.selectedMonth$.subscribe((month: Date) => {
      this.selectedMonth = month;
      this.initTransactions();
      this.initAllocations();
      this.initUsers();
    });
  }

  initUsers() {
    this.userService.getWhere().subscribe((res) => {
      this.usersLoading = res.loading;
      if (res.loading) return;
      this.users = res.data.map((x) => ({
        ...x,
      }));
    });
  }

  initAllocations() {
    this.allocationService
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
        this.allocationsLoading = res.loading;
        if (res.loading) return;
        this.allocations = res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
      });
  }

  initTransactions() {
    this.transactionService
      .getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.Equals,
            propertyName: 'allocationId',
            value: null,
          },
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
        this.transactionsLoading = res.loading;
        if (res.loading) return;
        this.transactions = res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
      });
  }

  formatDate(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }

  setAllocation(event: {
    allocationId: number;
    transaction: Transaction;
    action: 'allocate' | 'deallocate';
  }) {
    if (event.action === 'allocate') {
      const curr = this.toBeAllocated.get(event.allocationId) || [];
      this.toBeAllocated.set(event.allocationId, [...curr, event.transaction]);
    } else if (event.action === 'deallocate') {
      const curr = this.toBeAllocated.get(event.allocationId) || [];
      this.toBeAllocated.set(
        event.allocationId,
        curr.filter((t) => t.id !== event.transaction.id)
      );
    }
  }

  handleAllocate() {
    const allocations: Transaction[] = [];

    this.toBeAllocated.forEach((transactions, allocationId) => {
      transactions.forEach((transaction) => {
        allocations.push({
          ...transaction,
          allocationId: allocationId,
        });
      });
    });

    this.allocationsLoading = true;
    this.transactionService.updateMany(allocations).subscribe(async (res) => {
      this.allocationsLoading = res.loading;
      if (res.loading) return;
      this.initTransactions();
    });

    this.toBeAllocated.clear();
  }

  get hasAllocations(): boolean {
    return this.toBeAllocated.size > 0;
  }

  getUser(transaction: Transaction): string {
    const user = this.users.find((user) => user.id === transaction.userId);
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  get isLoading(): boolean {
    return (
      this.usersLoading || this.transactionsLoading || this.allocationsLoading
    );
  }

  get allocateButtonDisabled(): boolean {
    return this.isLoading || !this.hasAllocations;
  }
}
