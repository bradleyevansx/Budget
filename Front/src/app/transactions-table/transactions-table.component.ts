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
@Component({
  selector: 'app-transactions-table',
  imports: [TableModule, AllocateTransactionComponent, ButtonModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
  transactions: Transaction[] = [];
  allocations: Allocation[] = [];
  selectedMonth: Date = new Date();
  toBeAllocated: Map<number, Transaction[]> = new Map();
  constructor(
    private transactionService: TransactionService,
    private selectedMonthService: SelectedMonthService,
    private allocationService: AllocationService
  ) {}

  ngOnInit() {
    this.selectedMonthService.selectedMonth$.subscribe((month: Date) => {
      this.selectedMonth = month;
      this.initTransactions();
      this.initAllocations();
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
        this.allocations = res.map((x) => ({
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
        this.transactions = res.map((x) => ({
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
    this.toBeAllocated.forEach((transactions, allocationId) => {
      transactions.forEach((transaction) => {
        this.transactionService
          .update({ ...transaction, allocationId })
          .subscribe(() => {
            this.initTransactions();
          });
      });
    });
    this.toBeAllocated.clear();
  }

  get hasAllocations(): boolean {
    return this.toBeAllocated.size > 0;
  }
}
