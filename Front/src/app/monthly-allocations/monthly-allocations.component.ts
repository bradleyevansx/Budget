import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { MonthlyService } from '../core/services/monthly.service';
import { AllocationsComponent } from './allocations/allocations.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ExpectedIncomesComponent } from './expected-incomes/expected-incomes.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RecruiterService } from '../core/services/recruiter.service';
@Component({
  selector: 'app-monthly-allocations',
  imports: [
    DataViewModule,
    CardModule,
    CommonModule,
    StatsComponent,
    AllocationsComponent,
    TransactionsComponent,
    ExpectedIncomesComponent,
    ToastModule,
  ],
  templateUrl: './monthly-allocations.component.html',
  styleUrl: './monthly-allocations.component.css',
})
export class MonthlyAllocationsComponent {
  loading: boolean = false;

  constructor(
    private ms: MonthlyService,
    private messageService: MessageService,
    private rs: RecruiterService
  ) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.rs.message$.subscribe((message) => {
      if (message) {
        this.show(message, 3000);
      }
    });

    this.rs.welcomeTrigger$.subscribe(() => {
      this.show(
        'Welcome to my budgeting app! You have read-only access, but any CUD operation will trigger the same behaviour as it would if you had full access.',
        10000
      );
    });
  }

  show(message: string = '', life: number = 3000): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life,
    });
  }
}
