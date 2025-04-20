import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Transaction } from '../core/models/transaction.model';
import { TransactionService } from '../core/services/transaction.service';

@Component({
  selector: 'app-transactions-graphs',
  imports: [ChartModule],
  templateUrl: './transactions-graphs.component.html',
  styleUrl: './transactions-graphs.component.css',
})
export class TransactionsGraphsComponent {
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getWhere().subscribe((res) => {
      this.transactions = res.map((x) => ({
        ...x,
        date: new Date(x.date),
      }));
    });
  }

  get chartData() {
    const reducedData = this.transactions.reduce((acc, transaction) => {
      acc[transaction.userId] =
        (acc[transaction.userId] || 0) + transaction.price;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(reducedData);
    const data = Object.values(reducedData);

    return {
      labels,
      datasets: [
        {
          label: 'User Totals',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
