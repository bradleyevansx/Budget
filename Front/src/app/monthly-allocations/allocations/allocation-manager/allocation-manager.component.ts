import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AllocationForm } from './NewAllocationForm';
import { CommonModule } from '@angular/common';
import { AllocationService } from '../../../core/services/allocation.service';
import { SelectedMonthService } from '../../../core/services/selectedMonth.service';
import { MonthlyService } from '../../../core/services/monthly.service';
import { DialogModule } from 'primeng/dialog';
import { Allocation } from '../../../core/models/allocation.model';

@Component({
  selector: 'app-allocation-manager',
  imports: [
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './allocation-manager.component.html',
  styleUrl: './allocation-manager.component.css',
})
export class NewAllocationComponent implements OnInit {
  @Input() allocation: Allocation;

  newAllocation: FormGroup<AllocationForm>;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private allocationService: AllocationService,
    private selectedMonthService: SelectedMonthService,
    private ms: MonthlyService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.allocation) {
      this.newAllocation.patchValue({
        name: this.allocation.name,
        amount: this.allocation.amount,
        date: new Date(this.allocation.date),
      });
    } else {
      this.selectedMonthService.selectedMonth$.subscribe(
        (selectedMonth: Date) => {
          this.newAllocation.patchValue({
            date: new Date(
              selectedMonth.getFullYear(),
              selectedMonth.getMonth(),
              1
            ),
          });
        }
      );
    }
  }

  initForm() {
    this.newAllocation = this.fb.group<AllocationForm>({
      name: this.fb.control(this.allocation?.name || '', Validators.required),
      amount: this.fb.control(
        this.allocation?.amount || 0,
        Validators.required
      ),
      date: this.fb.control(
        this.allocation
          ? new Date(this.allocation.date)
          : this.selectedMonthService.getSelectedMonth(),
        Validators.required
      ),
    });
  }

  handleSubmit() {
    if (this.newAllocation.valid) {
      const allocation = {
        name: this.newAllocation.value.name,
        amount: this.newAllocation.value.amount,
        date: this.newAllocation.value.date,
      };
      this.loading = true;

      if (this.allocation && this.allocation.id) {
        this.allocationService
          .update({ ...allocation, id: this.allocation.id })
          .subscribe((response) => {
            this.loading = response.loading;
            this.initForm();
            this.ms.init();
          });
      } else {
        this.allocationService.create(allocation).subscribe((response) => {
          this.loading = response.loading;
          this.initForm();
          this.ms.init();
        });
      }
    }
  }

  get date() {
    return this.newAllocation.get('date').value;
  }

  onDateChange($event: any) {
    this.newAllocation.patchValue({
      date: new Date($event.getFullYear(), $event.getMonth(), 1),
    });
  }
}
