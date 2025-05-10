import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Allocation } from '../core/models/allocation.model';
import { AllocationService } from '../core/services/allocation.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Comparator, Operator } from '../core/models/query.model';
import { SelectedMonthService } from '../core/services/selectedMonth.service';
import { StatsComponent } from './stats/stats.component';
import { MonthlyService } from '../core/services/monthly.service';
import { AllocationsComponent } from './allocations/allocations.component';

@Component({
  selector: 'app-monthly-allocations',
  imports: [
    DataViewModule,
    CardModule,
    CommonModule,
    StatsComponent,
    AllocationsComponent,
  ],
  templateUrl: './monthly-allocations.component.html',
  styleUrl: './monthly-allocations.component.css',
})
export class MonthlyAllocationsComponent {
  constructor() {}
}
