import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { toUsdString } from '../../../../../core/sdk/moneyHelpers';
import { DialogModule } from 'primeng/dialog';
import { Income } from '../../../../../core/models/income.model';
import { IncomeManagerComponent } from '../../../../../income-manager/income-manager.component';

@Component({
  selector: 'app-expected-income-incomes-table',
  imports: [TableModule, DialogModule, IncomeManagerComponent],
  templateUrl: './expected-income-incomes-table.component.html',
  styleUrl: './expected-income-incomes-table.component.css',
})
export class ExpectedIncomeIncomesTableComponent {
  @Input() incomes: Income[] = [];

  selectedIncome: Income | null = null;

  dialogVisible: boolean = false;

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
  }

  formatMoney(money: number): string {
    return toUsdString(money);
  }

  handleRowSelect(income: Income) {
    this.selectedIncome = { ...income };
    this.dialogVisible = true;
  }
}
