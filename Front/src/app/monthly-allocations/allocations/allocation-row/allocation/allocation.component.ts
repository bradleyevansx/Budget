import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AllocationsTransactionsTableComponent } from './allocations-transactions-table/allocations-transactions-table.component';
import { Allocation } from '../../../../core/models/allocation.model';
import { Transaction } from '../../../../core/models/transaction.model';
import { toUsdString } from '../../../../core/sdk/moneyHelpers';
import { AllocationService } from '../../../../core/services/allocation.service';
import { MonthlyService } from '../../../../core/services/monthly.service';
import { NewTransactionComponent } from '../../../../new-transaction/new-transaction.component';

@Component({
  selector: 'app-allocation',
  imports: [
    CardModule,
    ButtonModule,
    MenuModule,
    NewTransactionComponent,
    CommonModule,
    DialogModule,
    AllocationsTransactionsTableComponent,
  ],
  templateUrl: './allocation.component.html',
  styleUrl: './allocation.component.css',
})
export class AllocationComponent {
  constructor(
    private allocationService: AllocationService,
    private ms: MonthlyService
  ) {}

  @Input() allocation: Allocation & { transactions: Transaction[] };
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
        this.allocationService.delete(this.allocation.id).subscribe(() => {
          this.ms.init();
        });
      },
    },
  ];

  get totalTransactionsAmount() {
    return this.allocation.transactions.reduce((acc, curr) => {
      return (acc += curr.price);
    }, 0);
  }

  dialogVisible: boolean = false;
  handleNewTransactionCreated() {
    this.dialogVisible = false;
  }

  formatMoney(value: number) {
    return toUsdString(value);
  }

  showDialog() {
    this.dialogVisible = true;
  }
}
