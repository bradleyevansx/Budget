import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MonthlyService } from '../../core/services/monthly.service';
import { DialogModule } from 'primeng/dialog';
import { ExpectedIncome } from '../../core/models/expected-income.model';
import { Income } from '../../core/models/income.model';
import { ExpectedIncomeManagerComponent } from './expected-income-manager/expected-income-manager.component';
import { ExpectedIncomeRowComponent } from './expected-income-row/expected-income-row.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-expected-incomes',
  imports: [
    SkeletonModule,
    DialogModule,
    CommonModule,
    ButtonModule,
    MenuModule,
    CardModule,
    ExpectedIncomeManagerComponent,
    ExpectedIncomeRowComponent,
  ],
  templateUrl: './expected-incomes.component.html',
  styleUrl: './expected-incomes.component.css',
})
export class ExpectedIncomesComponent {
  expectedIncomes: ExpectedIncome[] = [];
  incomes: Income[] = [];
  expectedIncomeJoin: (ExpectedIncome & { incomes: Income[] })[] = [];
  loading: boolean = false;
  constructor(private ms: MonthlyService) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.ms.expectedIncomes$.subscribe((expectedIncomes) => {
      this.expectedIncomes = expectedIncomes;
      this.joinExpectedIncomesAndIncomes();
    });
    this.ms.incomes$.subscribe((incomes) => {
      this.incomes = incomes;
      this.joinExpectedIncomesAndIncomes();
    });
  }

  joinExpectedIncomesAndIncomes() {
    this.expectedIncomeJoin = this.expectedIncomes.map((expectedIncome) => {
      const incomes = this.incomes.filter(
        (income) => income.expectedIncomeId === expectedIncome.id
      );
      return { ...expectedIncome, incomes };
    });
  }

  menu = null;

  addNewOpen: boolean = false;

  items = [
    {
      label: 'Add New',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.addNewOpen = true;
      },
    },
  ];

  handleNewExpectedIncome() {
    this.addNewOpen = false;
  }
}
