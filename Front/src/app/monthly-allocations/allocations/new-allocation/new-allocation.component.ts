import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { NewAllocationForm } from './NewAllocationForm';
import { CommonModule } from '@angular/common';
import { AllocationService } from '../../../core/services/allocation.service';
import { SelectedMonthService } from '../../../core/services/selectedMonth.service';
import { Allocation } from '../../../core/models/allocation.model';
import { MonthlyService } from '../../../core/services/monthly.service';

@Component({
  selector: 'app-new-allocation',
  imports: [
    DrawerModule,
    FloatLabelModule,
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './new-allocation.component.html',
  styleUrl: './new-allocation.component.css',
})
export class NewAllocationComponent implements OnInit {
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

  newAllocation: FormGroup<NewAllocationForm>;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private allocationService: AllocationService,
    private selectedMonthService: SelectedMonthService,
    private ms: MonthlyService
  ) {}

  ngOnInit(): void {
    this.initForm();

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

  initForm() {
    this.newAllocation = this.fb.group<NewAllocationForm>({
      name: this.fb.control('', Validators.required),
      amount: this.fb.control(0, Validators.required),
      date: this.fb.control(
        this.selectedMonthService.getSelectedMonth(),
        Validators.required
      ),
    });
  }

  show() {
    this.visible = true;
  }

  handleSubmit() {
    if (this.newAllocation.valid) {
      const allocation = {
        name: this.newAllocation.value.name,
        amount: this.newAllocation.value.amount,
        date: this.newAllocation.value.date,
      };
      this.loading = true;
      this.allocationService.create(allocation).subscribe((response) => {
        this.loading = response.loading;
        this.initForm();
        this.ms.init();
        this.visible = false;
      });
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
