import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Allocation } from '../core/models/allocation.model';
import { AllocationService } from '../core/services/allocation.service';
import { NewAllocationComponent } from './new-allocation/new-allocation.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AllocationComponent } from './allocation/allocation.component';
import { MonthSelectComponent } from '../core/components/month-select/month-select.component';
import { Comparator, Operator } from '../core/models/query.model';
@Component({
  selector: 'app-monthly-allocations',
  imports: [
    DataViewModule,
    NewAllocationComponent,
    CardModule,
    CommonModule,
    AllocationComponent,
    MonthSelectComponent,
  ],
  templateUrl: './monthly-allocations.component.html',
  styleUrl: './monthly-allocations.component.css',
})
export class MonthlyAllocationsComponent {
  selectedMonth: Date = new Date();
  allocations: Allocation[] = [];
  loading: boolean = false;
  constructor(private allocationService: AllocationService) {}

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
        this.allocations = res.map((x) => ({
          ...x,
          date: new Date(x.date),
        }));
        this.loading = false;
      });
  }

  ngOnInit() {
    this.initAllocations();
  }

  handleSubmit(newAllocation: Allocation) {
    this.initAllocations();
  }

  handleSelectedMonthChange(newDate: Date) {
    this.selectedMonth = newDate;
    this.initAllocations();
  }

  handleDelete() {
    this.initAllocations();
  }
}
