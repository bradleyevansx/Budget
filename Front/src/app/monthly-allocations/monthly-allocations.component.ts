import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Allocation } from '../core/models/allocation.model';
import { AllocationService } from '../core/services/allocation.service';
import { NewAllocationComponent } from './new-allocation/new-allocation.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AllocationComponent } from './allocation/allocation.component';
import { Comparator, Operator } from '../core/models/query.model';
import { SelectedMonthService } from '../core/services/selectedMonth.service';

@Component({
  selector: 'app-monthly-allocations',
  imports: [
    DataViewModule,
    NewAllocationComponent,
    CardModule,
    CommonModule,
    AllocationComponent,
  ],
  templateUrl: './monthly-allocations.component.html',
  styleUrl: './monthly-allocations.component.css',
})
export class MonthlyAllocationsComponent implements OnInit {
  selectedMonth: Date = new Date();
  allocations: Allocation[] = [];
  loading: boolean = false;

  constructor(
    private allocationService: AllocationService,
    private selectedMonthService: SelectedMonthService
  ) {}

  ngOnInit(): void {
    this.selectedMonthService.selectedMonth$.subscribe((month: Date) => {
      this.selectedMonth = month;
      this.initAllocations();
    });
  }

  initAllocations() {
    this.loading = true;
    this.allocationService
      .getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.GreaterThanOrEqualTo,
            propertyName: 'date',
            value: new Date(
              Date.UTC(
                this.selectedMonth.getFullYear(),
                this.selectedMonth.getMonth(),
                1
              )
            ),
          },
          {
            comparator: Comparator.LessThanOrEqualTo,
            propertyName: 'date',
            value: new Date(
              Date.UTC(
                this.selectedMonth.getFullYear(),
                this.selectedMonth.getMonth() + 1,
                0
              )
            ),
          },
        ],
      })
      .subscribe((res) => {
        this.allocations = res.data.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
        this.loading = false;
      });
  }

  handleSubmit() {
    this.initAllocations();
  }

  handleDelete() {
    this.initAllocations();
  }
}
