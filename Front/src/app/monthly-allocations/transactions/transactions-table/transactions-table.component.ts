import { Component, Input } from '@angular/core';
import { Transaction } from '../../../core/models/transaction.model';
import { TableModule } from 'primeng/table';
import { toUsdString } from '../../../core/sdk/moneyHelpers';
import { TransactionService } from '../../../core/services/transaction.service';
import { Comparator, Operator } from '../../../core/models/query.model';
import { SelectedMonthService } from '../../../core/services/selectedMonth.service';
import { AllocationService } from '../../../core/services/allocation.service';
import { Allocation } from '../../../core/models/allocation.model';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { MonthlyService } from '../../../core/services/monthly.service';
@Component({
  selector: 'app-transactions-table',
  imports: [TableModule, ButtonModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
  allocations: Allocation[] = [];
  transactions: Transaction[] = [];
  users: User[] = [];
  transactionsJoin: (Transaction & { allocation: Allocation; user: User })[] =
    [];
  constructor(private ms: MonthlyService) {
    this.ms.allocations$.subscribe((allocations) => {
      this.allocations = allocations;
      this.joinTransactionsAndAllocations();
    });
    this.ms.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
      this.joinTransactionsAndAllocations();
    });
    this.ms.users$.subscribe((users) => {
      this.users = users;
      this.joinTransactionsAndAllocations();
    });
  }

  joinTransactionsAndAllocations() {
    this.transactionsJoin = this.transactions.map((transaction) => {
      const allocation = this.allocations.find(
        (allocation) => allocation.id === transaction.allocationId
      );
      const user = this.users.find((user) => user.id === transaction.userId);
      return { ...transaction, allocation, user };
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }
}
