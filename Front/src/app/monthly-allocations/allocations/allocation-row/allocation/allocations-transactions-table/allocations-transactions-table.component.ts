import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../../../../core/models/transaction.model';
import { toUsdString } from '../../../../../core/sdk/moneyHelpers';
import { DialogModule } from 'primeng/dialog';
import { TransactionManagerComponent } from '../../../../../transaction-manager/transaction-manager.component';

@Component({
  selector: 'app-allocations-transactions-table',
  imports: [TableModule, DialogModule, TransactionManagerComponent],
  templateUrl: './allocations-transactions-table.component.html',
  styleUrl: './allocations-transactions-table.component.css',
})
export class AllocationsTransactionsTableComponent {
  @Input() transactions: Transaction[] = [];

  selectedTransaction: Transaction | null = null;

  dialogVisible: boolean = false;

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }

  handleRowSelect(transaction: Transaction) {
    this.selectedTransaction = { ...transaction };
    this.dialogVisible = true;
    console.log('Selected transaction:', transaction);
  }
}
