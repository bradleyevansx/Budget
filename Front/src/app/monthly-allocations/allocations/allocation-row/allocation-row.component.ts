import { Component, Input } from '@angular/core';
import { Allocation } from '../../../core/models/allocation.model';
import { Transaction } from '../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AllocationComponent } from './allocation/allocation.component';
import { toUsdString } from '../../../core/sdk/moneyHelpers';

@Component({
  selector: 'app-allocation-row',
  imports: [CommonModule, DialogModule, AllocationComponent],
  templateUrl: './allocation-row.component.html',
  styleUrl: './allocation-row.component.css',
})
export class AllocationRowComponent {
  @Input() allocation: Allocation & { transactions: Transaction[] };
  @Input() index: number;
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
      mostRecentTransaction.userId
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
