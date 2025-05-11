import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { AllocationRowComponent } from './allocation-row/allocation-row.component';
import { MonthlyService } from '../../core/services/monthly.service';
import { Allocation } from '../../core/models/allocation.model';
import { Transaction } from '../../core/models/transaction.model';
import { NewAllocationComponent } from './allocation-manager/allocation-manager.component';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-allocations',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    MenuModule,
    CardModule,
    AllocationRowComponent,
    NewAllocationComponent,
    SkeletonModule,
  ],
  templateUrl: './allocations.component.html',
  styleUrl: './allocations.component.css',
})
export class AllocationsComponent {
  loading: boolean = false;
  allocations: Allocation[] = [];
  transactions: Transaction[] = [];
  allocationTransactionJoin: (Allocation & { transactions: Transaction[] })[] =
    [];
  constructor(private ms: MonthlyService) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.ms.allocations$.subscribe((allocations) => {
      this.allocations = allocations;
      this.joinAllocationsAndTransactions();
    });
    this.ms.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
      this.joinAllocationsAndTransactions();
    });
  }

  joinAllocationsAndTransactions() {
    this.allocationTransactionJoin = this.allocations.map((allocation) => {
      const transactions = this.transactions.filter(
        (transaction) => transaction.allocationId === allocation.id
      );
      return { ...allocation, transactions };
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
  handleNewAllocation() {
    this.addNewOpen = false;
  }
}
