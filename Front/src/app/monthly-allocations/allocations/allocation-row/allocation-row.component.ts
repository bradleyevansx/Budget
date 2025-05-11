import { Component, HostListener, Input } from '@angular/core';
import { Allocation } from '../../../core/models/allocation.model';
import { Transaction } from '../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AllocationComponent } from './allocation/allocation.component';
import { toUsdString } from '../../../core/sdk/moneyHelpers';
import { User } from '../../../core/models/user.model';
import { MonthlyService } from '../../../core/services/monthly.service';

@Component({
  selector: 'app-allocation-row',
  imports: [CommonModule, DialogModule, AllocationComponent],
  templateUrl: './allocation-row.component.html',
  styleUrl: './allocation-row.component.css',
})
export class AllocationRowComponent {
  @Input() allocation: Allocation & { transactions: Transaction[] };
  @Input() index: number;
  users: User[];

  constructor(private ms: MonthlyService) {
    this.updateScreenSize();
    this.setStats();
    this.ms.users$.subscribe((users) => {
      this.users = users;
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateScreenSize();
    this.setStats();
  }
  screenSize: string = '';

  private updateScreenSize() {
    if (window.matchMedia('(min-width: 1536px)').matches) {
      this.screenSize = '2xl';
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
      this.screenSize = 'xl';
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
      this.screenSize = 'lg';
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      this.screenSize = 'md';
    } else if (window.matchMedia('(min-width: 640px)').matches) {
      this.screenSize = 'sm';
    } else {
      this.screenSize = 'xs';
    }
  }

  statsOptions = [
    'Average Transaction Amount',
    'Largest Transaction',
    'Oldest Transaction',
    'Days Since Last Transaction',
    'User With Most Transactions',
    'Transaction Count',
    'Remaining Budget',
  ];
  currStats = [];
  statsQueue = [];

  setStats() {
    if (this.screenSize === '2xl') {
      this.currStats = this.statsOptions.slice(0, 2);
      this.statsQueue = this.statsOptions.slice(2);
    } else if (this.screenSize === 'xl') {
      this.currStats = this.statsOptions.slice(0, 2);
      this.statsQueue = this.statsOptions.slice(2);
    } else if (this.screenSize === 'lg') {
      this.currStats = this.statsOptions.slice(0, 2);
      this.statsQueue = this.statsOptions.slice(2);
    } else if (this.screenSize === 'md') {
      this.currStats = this.statsOptions.slice(0, 2);
      this.statsQueue = this.statsOptions.slice(2);
    } else if (this.screenSize === 'sm') {
      this.currStats = [];
      this.statsQueue = [...this.statsOptions];
    } else {
      this.currStats = [];
      this.statsQueue = [...this.statsOptions];
    }
  }

  getClass(stat: string) {
    if (!this.currStats.includes(stat)) {
      return 'hidden';
    }
    return 'whitespace-nowrap w-full';
  }

  handleStatClick(event: Event, stat: string) {
    event.stopPropagation();
    const frontOfQueue = this.statsQueue.shift();
    const newCurr = [...this.currStats.filter((s) => s !== stat), frontOfQueue];
    this.currStats = newCurr;
    this.statsQueue.push(stat);
  }

  get allocationName(): string {
    return this.allocation.name;
  }

  get mostRecentTransactionDisplay(): string {
    const mostRecentTransaction = this.allocation.transactions.reduce(
      (prev, current) => {
        return prev.date > current.date ? prev : current;
      },
      this.allocation.transactions[0]
    );
    if (!mostRecentTransaction) {
      return 'No transactions';
    }

    return `${mostRecentTransaction.date.toLocaleDateString()} - ${
      this.users.find((x) => x.id === mostRecentTransaction.userId)?.firstName
    } spent $${mostRecentTransaction.price} at ${
      mostRecentTransaction.location
    }`;
  }

  get percentUsed(): number {
    const totalSpent = this.allocation.transactions.reduce(
      (acc, transaction) => {
        return acc + (transaction.price || 0);
      },
      0
    );

    const allocationAmount = this.allocation?.amount || 1;
    return (totalSpent / allocationAmount) * 100;
  }

  percentOrTotals: 'percent' | 'totals' = 'percent';

  togglePercentOrTotals(event: Event) {
    event.stopPropagation();
    this.percentOrTotals =
      this.percentOrTotals === 'percent' ? 'totals' : 'percent';
  }

  get percentUsedString(): string {
    return this.percentUsed.toFixed(2) + '%';
  }

  get totalsString(): string {
    const totalSpent = this.allocation.transactions.reduce(
      (acc, transaction) => {
        return acc + (transaction.price || 0);
      },
      0
    );
    const allocationAmount = this.allocation?.amount || 1;
    return `$${totalSpent.toFixed(2)} / $${allocationAmount.toFixed(2)}`;
  }

  get displayString(): string {
    if (this.percentOrTotals === 'percent') {
      return this.percentUsedString;
    } else {
      return this.totalsString;
    }
  }

  get allocationAmount(): string {
    return toUsdString(this.allocation.amount);
  }

  get remainingBudget(): string {
    const totalSpent = this.allocation.transactions.reduce(
      (acc, transaction) => acc + (transaction.price || 0),
      0
    );
    const remaining = this.allocation.amount - totalSpent;
    return toUsdString(remaining);
  }

  get transactionCount(): number {
    return this.allocation.transactions.length;
  }

  get averageTransactionAmount(): string {
    const totalSpent = this.allocation.transactions.reduce(
      (acc, transaction) => acc + (transaction.price || 0),
      0
    );
    const average =
      this.allocation.transactions.length > 0
        ? totalSpent / this.allocation.transactions.length
        : 0;
    return toUsdString(average);
  }

  get largestTransaction(): string {
    const largest = this.allocation.transactions.reduce(
      (prev, current) => (prev.price > current.price ? prev : current),
      this.allocation.transactions[0]
    );
    return largest
      ? `${this.users.find((x) => x.id === largest.userId)?.firstName} spent $${
          largest.price
        } at ${largest.location}`
      : 'No transactions';
  }

  get oldestTransaction(): string {
    const oldest = this.allocation.transactions.reduce(
      (prev, current) => (prev.date < current.date ? prev : current),
      this.allocation.transactions[0]
    );
    return oldest
      ? `${oldest.date.toLocaleDateString()} - ${
          this.users.find((x) => x.id === oldest.userId).firstName
        } spent $${oldest.price} at ${oldest.location}`
      : 'No transactions';
  }

  get daysSinceLastTransaction(): number {
    const mostRecentTransaction = this.allocation.transactions.reduce(
      (prev, current) => (prev.date > current.date ? prev : current),
      this.allocation.transactions[0]
    );
    return mostRecentTransaction
      ? Math.floor(
          (new Date().getTime() -
            new Date(mostRecentTransaction.date).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  }

  get userWithMostTransactions(): string {
    const userTransactionCounts = this.allocation.transactions.reduce(
      (acc, transaction) => {
        acc[transaction.userId] = (acc[transaction.userId] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    );
    const maxUserId = Object.keys(userTransactionCounts).reduce(
      (a, b) => (userTransactionCounts[a] > userTransactionCounts[b] ? a : b),
      0
    );
    if (!maxUserId) {
      return 'No transactions';
    }

    return `User ${
      this.users.find((x) => x.id === Number(maxUserId))?.firstName
    } (${userTransactionCounts[maxUserId]} transactions)`;
  }

  colors = [
    'blue',
    'green',
    'red',
    'yellow',
    'purple',
    'pink',
    'teal',
    'orange',
    'indigo',
    'lime',
  ];

  bgMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
    lime: 'bg-lime-500',
  };

  tMap = {
    blue: 'text-blue-500 bg-blue-100',
    green: 'text-green-500 bg-green-100',
    red: 'text-red-500 bg-red-100',
    yellow: 'text-yellow-500 bg-yellow-100',
    purple: 'text-purple-500 bg-purple-100',
    pink: 'text-pink-500 bg-pink-100',
    teal: 'text-teal-500 bg-teal-100',
    orange: 'text-orange-500 bg-orange-100',
    indigo: 'text-indigo-500 bg-indigo-100',
    lime: 'text-lime-500 bg-lime-100',
  };

  get bgColor(): string {
    return this.bgMap[this.colors[this.index % this.colors.length]];
  }
  get textColor(): string {
    return this.tMap[this.colors[this.index % this.colors.length]];
  }

  visible = false;
  showDialog() {
    this.visible = true;
  }
}
