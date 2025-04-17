import { Component } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { Transaction } from '../core/models/transaction.model';
import { TableModule } from 'primeng/table';
import { toUsdString } from '../core/sdk/moneyHelpers';
@Component({
  selector: 'app-home',
  imports: [TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US');
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }

  ngOnInit() {
    this.transactionService.getWhere({}).subscribe((res) => {
      this.transactions = res.map((x) => ({
        ...x,
        date: new Date(x.date),
      }));
    });
  }
}
