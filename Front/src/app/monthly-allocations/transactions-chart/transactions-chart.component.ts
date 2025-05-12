import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { Transaction } from '../../core/models/transaction.model';
import { MonthlyService } from '../../core/services/monthly.service';
import { Allocation } from '../../core/models/allocation.model';
import { User } from '../../core/models/user.model';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-transactions-chart',
  imports: [
    ChartModule,
    CardModule,
    CommonModule,
    ButtonModule,
    SkeletonModule,
  ],
  templateUrl: './transactions-chart.component.html',
  styleUrl: './transactions-chart.component.css',
})
export class TransactionsChartComponent {
  timeFraming: 'Weekly' | 'Daily' = 'Weekly';
  loading: boolean = false;

  grouping: 'User' | 'Allocation' = 'User';

  chartData: any;
  transactions: Transaction[] = [];
  allocations: Allocation[] = [];
  users: User[] = [];
  join: (Transaction & { allocation: Allocation; user: User })[] = [];

  chartOptions: any;

  constructor(private ms: MonthlyService) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.ms.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
      this.performJoin();
    });
    this.ms.allocations$.subscribe((allocations) => {
      this.allocations = allocations;
      this.performJoin();
    });
    this.ms.users$.subscribe((users) => {
      this.users = users;
      this.performJoin();
    });
  }

  toggleTimeFrame() {
    this.timeFraming = this.timeFraming === 'Weekly' ? 'Daily' : 'Weekly';
    this.initChart();
  }

  toggleGrouping() {
    this.grouping = this.grouping === 'User' ? 'Allocation' : 'User';
    this.initChart();
  }

  performJoin() {
    this.join = this.transactions.map((transaction) => {
      const allocation = this.allocations.find(
        (allocation) => allocation.id === transaction.allocationId
      );
      const user = this.users.find((user) => user.id === transaction.userId);
      return { ...transaction, allocation, user };
    });
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );

    const bgColors = Object.values({
      blue: 'oklch(62.3% .214 259.815)',
      green: 'oklch(72.3% .219 149.579)',
      red: 'oklch(63.7% .237 25.331)',
      yellow: 'oklch(79.5% .184 86.047)',
      purple: 'oklch(62.7% .265 303.9)',
      pink: 'oklch(65.6% .241 354.308)',
      teal: 'oklch(70.4% .14 182.503)',
      orange: 'oklch(70.5% .213 47.604)',
      indigo: 'oklch(70.5% .213 47.604)',
      lime: 'oklch(76.8% .233 130.85)',
    });

    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const daysSoFar = Array.from(
      { length: currentDate.getDate() },
      (_, i) => i + 1
    );

    const groupedData =
      this.grouping === 'User'
        ? this.users.map((user, index) => ({
            label: user.firstName + ' ' + user.lastName,
            data:
              this.timeFraming === 'Daily'
                ? daysSoFar.map((day) =>
                    this.join
                      .filter(
                        (j) =>
                          j.user.id === user.id &&
                          new Date(j.date).getDate() === day
                      )
                      .reduce((sum, j) => sum + j.price, 0)
                  )
                : Array.from({ length: 4 }, (_, i) =>
                    this.join
                      .filter(
                        (j) =>
                          j.user.id === user.id &&
                          Math.floor(new Date(j.date).getDate() / 7) === i
                      )
                      .reduce((sum, j) => sum + j.price, 0)
                  ),
            backgroundColor: bgColors[index % bgColors.length],
            barThickness: 32,
          }))
        : this.allocations.map((allocation, index) => ({
            label: allocation.name,
            data:
              this.timeFraming === 'Daily'
                ? daysSoFar.map((day) =>
                    this.join
                      .filter(
                        (j) =>
                          j.allocation.id === allocation.id &&
                          new Date(j.date).getDate() === day
                      )
                      .reduce((sum, j) => sum + j.price, 0)
                  )
                : Array.from({ length: 4 }, (_, i) =>
                    this.join
                      .filter(
                        (j) =>
                          j.allocation.id === allocation.id &&
                          Math.floor(new Date(j.date).getDate() / 7) === i
                      )
                      .reduce((sum, j) => sum + j.price, 0)
                  ),
            backgroundColor: bgColors[index % bgColors.length],
            barThickness: 32,
          }));

    this.chartData = {
      labels:
        this.timeFraming === 'Daily'
          ? daysSoFar.map((day) => day.toString())
          : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: groupedData,
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textMutedColor,
          },
          grid: {
            borderColor: 'transparent',
          },
        },
        y: {
          stacked: true,
          type: 'logarithmic',
          ticks: {
            color: textMutedColor,
            callback: (value) => `$${value.toLocaleString()}`,
          },
          grid: {
            borderDash: [2, 2],
            borderColor: 'transparent',
            drawTicks: true,
          },
        },
      },
    };
  }
}
