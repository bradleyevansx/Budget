import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TransactionManagerComponent } from '../../transaction-manager/transaction-manager.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MonthlyService } from '../../core/services/monthly.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [
    CardModule,
    MenuModule,
    TransactionsTableComponent,
    ButtonModule,
    DialogModule,
    TransactionManagerComponent,
    SkeletonModule,
    CommonModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  loading: boolean = false;
  constructor(private ms: MonthlyService) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
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
}
