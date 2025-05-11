import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardClasses, CardModule } from 'primeng/card';
import { MonthlyService } from '../../core/services/monthly.service';
import { Allocation } from '../../core/models/allocation.model';
import { Transaction } from '../../core/models/transaction.model';
import { ExpectedIncome } from '../../core/models/expected-income.model';
import { Income } from '../../core/models/income.model';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, CardModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  allocations: Allocation[] = [];
  transactions: Transaction[] = [];
  expectedIncomes: ExpectedIncome[] = [];
  incomes: Income[] = [];

  constructor(private ms: MonthlyService) {
    this.ms.allocations$.subscribe((allocations) => {
      this.allocations = allocations;
    });
    this.ms.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
    });
    this.ms.expectedIncomes$.subscribe((expectedIncomes) => {
      this.expectedIncomes = expectedIncomes;
    });
    this.ms.incomes$.subscribe((incomes) => {
      this.incomes = incomes;
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

    let currentWeekStart = new Date(startDate);
    while (currentWeekStart <= endDate) {
      weeks.push(0);
      currentWeekStart = new Date(
        currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000
      );
    }

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
    if (increase === 0) {
      return this.toUsdString(increase);
    }
    return (increase > 0 ? '+' : '-') + this.toUsdString(increase);
  }

  get totalSpent(): string {
    return this.toUsdString(
      this.transactions.reduce((acc, transaction) => acc + transaction.price, 0)
    );
  }

  get amountEarnedByWeek(): number[] {
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

    let currentWeekStart = new Date(startDate);
    while (currentWeekStart <= endDate) {
      weeks.push(0);
      currentWeekStart = new Date(
        currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000
      );
    }

    this.incomes.forEach((income) => {
      const incomeDate = new Date(income.date);
      if (incomeDate >= startDate && incomeDate <= endDate) {
        const weekIndex = Math.floor(
          (incomeDate.getTime() - startDate.getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        );
        weeks[weekIndex] += income.amount;
      }
    });

    return weeks;
  }

  get increaseFromLastWeekEarned(): string {
    const weeks = this.amountEarnedByWeek;
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

    const lastWeekEarned =
      currentWeekIndex > 0 && currentWeekIndex - 1 < weeks.length
        ? weeks[currentWeekIndex - 1]
        : 0;
    const currentWeekEarned =
      currentWeekIndex < weeks.length ? weeks[currentWeekIndex] : 0;

    const increase = currentWeekEarned - lastWeekEarned;
    if (increase === 0) {
      return this.toUsdString(increase);
    }
    return (increase > 0 ? '+' : '-') + this.toUsdString(increase);
  }

  get totalFromIncomes(): string {
    return this.toUsdString(
      this.incomes.reduce((acc, income) => acc + income.amount, 0)
    );
  }

  get totalFromExpectedIncomes(): string {
    return this.toUsdString(
      this.expectedIncomes.reduce(
        (acc, expectedIncome) => acc + expectedIncome.amount,
        0
      )
    );
  }

  toUsdString(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}
