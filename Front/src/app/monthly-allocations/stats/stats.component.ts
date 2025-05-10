import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardClasses, CardModule } from 'primeng/card';
import { MonthlyService } from '../../core/services/monthly.service';
import { Allocation } from '../../core/models/allocation.model';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, CardModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  allocations: Allocation[] = [];
  transactions: Transaction[] = [];

  constructor(private ms: MonthlyService) {
    this.ms.allocations$.subscribe((allocations) => {
      this.allocations = allocations;
    });
    this.ms.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  get totalAllocations(): number {
    return this.allocations.length;
  }

  get totalAllocationsAmount(): string {
    return this.toUsdString(
      this.allocations.reduce((acc, allocation) => acc + allocation.amount, 0)
    );
  }

  get amountSpentByWeek(): number[] {
    const weeks: number[] = [];
    const startDate = new Date(
      Date.UTC(
        this.ms.selectedMonth.getFullYear(),
        this.ms.selectedMonth.getMonth(),
        1
      )
    );
    const endDate = new Date(
      Date.UTC(
        this.ms.selectedMonth.getFullYear(),
        this.ms.selectedMonth.getMonth() + 1,
        0
      )
    );
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    const totalWeeks = Math.ceil(totalDays / 7);
    for (let i = 0; i < totalWeeks; i++) {
      weeks[i] = 0;
    }
    this.transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate >= startDate &&
        transactionDate <= endDate &&
        transactionDate.getDay() !== 0
      ) {
        const weekIndex = Math.floor((transactionDate.getDate() - 1) / 7);
        weeks[weekIndex] += transaction.price;
      }
    });
    return weeks;
  }

  get increaseFromLastWeekSpent(): string {
    const lastWeekSpent = this.amountSpentByWeek.slice(-2, -1)[0];
    const currentWeekSpent = this.amountSpentByWeek.slice(-1)[0];
    if (lastWeekSpent === 0) {
      return 'N/A';
    }
    const increase = ((currentWeekSpent - lastWeekSpent) / lastWeekSpent) * 100;
    return `${increase.toFixed(2)}%`;
  }

  get totalSpent(): string {
    return this.toUsdString(
      this.transactions.reduce((acc, transaction) => acc + transaction.price, 0)
    );
  }

  toUsdString(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}
