import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { toUsdString } from '../../../../core/sdk/moneyHelpers';
import { MonthlyService } from '../../../../core/services/monthly.service';
import { ExpectedIncomeService } from '../../../../core/services/expected-income.service';
import { Income } from '../../../../core/models/income.model';
import { ExpectedIncome } from '../../../../core/models/expected-income.model';
import { IncomeManagerComponent } from '../../../../income-manager/income-manager.component';
import { ExpectedIncomeIncomesTableComponent } from './expected-income-incomes-table/expected-income-incomes-table.component';
import { ExpectedIncomeManagerComponent } from '../../expected-income-manager/expected-income-manager.component';

@Component({
  selector: 'app-expected-income',
  imports: [
    CardModule,
    ButtonModule,
    MenuModule,
    CommonModule,
    DialogModule,
    IncomeManagerComponent,
    ExpectedIncomeIncomesTableComponent,
    ExpectedIncomeManagerComponent,
  ],
  templateUrl: './expected-income.component.html',
  styleUrl: './expected-income.component.css',
})
export class ExpectedIncomeComponent {
  constructor(private eis: ExpectedIncomeService, private ms: MonthlyService) {}

  @Input() expectedIncome: ExpectedIncome & { incomes: Income[] };
  private _visible: boolean = false;
  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  items: MenuItem[] = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => {
        this.eis.delete(this.expectedIncome.id).subscribe(() => {
          this.ms.init();
        });
      },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command: () => {
        this.showExpectedIncomeDialog();
      },
    },
  ];

  get totalIncomesAmount() {
    return this.expectedIncome.incomes.reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);
  }

  expectedIncomeDialog: boolean = false;

  showExpectedIncomeDialog() {
    this.expectedIncomeDialog = true;
  }

  incomeDialog: boolean = false;
  handleNewIncomeCreated() {}

  formatMoney(value: number) {
    return toUsdString(value);
  }

  showDialog() {
    this.incomeDialog = true;
  }
}
