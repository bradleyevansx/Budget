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

    // Initialize weeks array
    let currentWeekStart = new Date(startDate);
    while (currentWeekStart <= endDate) {
      weeks.push(0);
      currentWeekStart = new Date(
        currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000
      );
    }

    // Calculate spending per week
    this.transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate >= startDate && transactionDate <= endDate) {
        const weekIndex = Math.floor(
          (transactionDate.getTime() - startDate.getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        );
        weeks[weekIndex] += transaction.price;
      }
    });

    return weeks;
  }

  get increaseFromLastWeekSpent(): string {
    const weeks = this.amountSpentByWeek;
    const currentDate = new Date();
    const startDate = new Date(
      Date.UTC(
        this.ms.selectedMonth.getFullYear(),
        this.ms.selectedMonth.getMonth(),
        1
      )
    );

    const currentWeekIndex = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );

    const lastWeekSpent =
      currentWeekIndex > 0 && currentWeekIndex - 1 < weeks.length
        ? weeks[currentWeekIndex - 1]
        : 0;
    const currentWeekSpent =
      currentWeekIndex < weeks.length ? weeks[currentWeekIndex] : 0;

    const increase = currentWeekSpent - lastWeekSpent;
    return this.toUsdString(increase);
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
