import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule, DialogStyle } from 'primeng/dialog';
import { TransactionManagerComponent } from '../../transaction-manager/transaction-manager.component';

@Component({
  selector: 'app-transactions',
  imports: [
    CardModule,
    MenuModule,
    TransactionsTableComponent,
    ButtonModule,
    DialogModule,
    TransactionManagerComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
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
