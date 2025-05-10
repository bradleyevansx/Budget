import { Component, Input } from '@angular/core';
import { Allocation } from '../../../core/models/allocation.model';
import { Transaction } from '../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AllocationComponent } from './allocation/allocation.component';

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

  get percentUsedString(): string {
    return this.percentUsed.toFixed(2) + '%';
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
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    teal: 'text-teal-500',
    orange: 'text-orange-500',
    indigo: 'text-indigo-500',
    lime: 'text-lime-500',
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
