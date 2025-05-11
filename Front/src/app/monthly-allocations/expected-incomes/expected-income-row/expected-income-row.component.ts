import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ExpectedIncomeComponent } from './expected-income/expected-income.component';
import { toUsdString } from '../../../core/sdk/moneyHelpers';
import { ExpectedIncome } from '../../../core/models/expected-income.model';
import { Income } from '../../../core/models/income.model';

@Component({
  selector: 'app-expected-income-row',
  imports: [CommonModule, DialogModule, ExpectedIncomeComponent],
  templateUrl: './expected-income-row.component.html',
  styleUrl: './expected-income-row.component.css',
})
export class ExpectedIncomeRowComponent {
  @Input() expectedIncome: ExpectedIncome & { incomes: Income[] };
  @Input() index: number;
  get expectedIncomeName(): string {
    return this.expectedIncome.name;
  }

  get percentEarned(): number {
    const totalSpent = this.expectedIncome.incomes.reduce((acc, income) => {
      return acc + (income.amount || 0);
    }, 0);

    const expectedIncomeAmount = this.expectedIncome?.amount || 1;
    return (totalSpent / expectedIncomeAmount) * 100;
  }

  percentOrTotals: 'percent' | 'totals' = 'percent';

  togglePercentOrTotals(event: Event) {
    event.stopPropagation();
    this.percentOrTotals =
      this.percentOrTotals === 'percent' ? 'totals' : 'percent';
  }

  get percentUsedString(): string {
    return this.percentEarned.toFixed(2) + '%';
  }

  get totalsString(): string {
    const totalEarned = this.expectedIncome.incomes.reduce((acc, income) => {
      return acc + (income.amount || 0);
    }, 0);
    const expectedIncomeAmount = this.expectedIncome?.amount || 1;
    return `$${totalEarned.toFixed(2)} / $${expectedIncomeAmount.toFixed(2)}`;
  }

  get displayString(): string {
    if (this.percentOrTotals === 'percent') {
      return this.percentUsedString;
    } else {
      return this.totalsString;
    }
  }
  get expectedIncomeAmount(): string {
    return toUsdString(this.expectedIncome.amount);
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
