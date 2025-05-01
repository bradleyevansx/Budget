import { Component, Input } from '@angular/core';
import { Transaction } from '../core/models/transaction.model';
import { TableModule } from 'primeng/table';
import { toUsdString } from '../core/sdk/moneyHelpers';
import { TransactionService } from '../core/services/transaction.service';
import { Comparator, Operator } from '../core/models/query.model';
@Component({
  selector: 'app-transactions-table',
  imports: [TableModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService
      .getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.Equals,
            propertyName: 'allocationId',
            value: null,
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
    return date.toLocaleDateString('en-US');
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }
}
