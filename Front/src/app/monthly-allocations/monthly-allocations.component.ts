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
  message: string = '';

  constructor(
    private ms: MonthlyService,
    private messageService: MessageService,
    private rs: RecruiterService
  ) {
    this.ms.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.rs.message$.subscribe((message) => {
      this.message = message;
      if (message) {
        this.show();
      }
    });
  }

  show() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: this.message,
      life: 3000,
    });
  }
}
