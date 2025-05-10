import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../../../../core/models/transaction.model';
import { toUsdString } from '../../../../../core/sdk/moneyHelpers';

@Component({
  selector: 'app-allocations-transactions-table',
  imports: [TableModule],
  templateUrl: './allocations-transactions-table.component.html',
  styleUrl: './allocations-transactions-table.component.css',
})
export class AllocationsTransactionsTableComponent {
  @Input() transactions: Transaction[] = [];

  formatDate(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }
}
