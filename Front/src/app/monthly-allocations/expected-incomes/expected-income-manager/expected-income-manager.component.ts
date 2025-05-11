import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { SelectedMonthService } from '../../../core/services/selectedMonth.service';
import { MonthlyService } from '../../../core/services/monthly.service';
import { DialogModule } from 'primeng/dialog';
import { ExpectedIncome } from '../../../core/models/expected-income.model';
import { ExpectedIncomeService } from '../../../core/services/expected-income.service';
import { NewExpectedIncomeForm } from './NewExpectedIncomeForm';

@Component({
  selector: 'app-expected-income-manager',
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
  templateUrl: './expected-income-manager.component.html',
  styleUrl: './expected-income-manager.component.css',
})
export class ExpectedIncomeManagerComponent implements OnInit {
  @Input() expectedIncome: ExpectedIncome;
  @Output() finish: EventEmitter<void> = new EventEmitter<void>();

  newExpectedIncome: FormGroup<NewExpectedIncomeForm>;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eis: ExpectedIncomeService,
    private selectedMonthService: SelectedMonthService,
    private ms: MonthlyService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.expectedIncome) {
      this.newExpectedIncome.patchValue({
        name: this.expectedIncome.name,
        amount: this.expectedIncome.amount,
        date: new Date(this.expectedIncome.date),
      });
    } else {
      this.selectedMonthService.selectedMonth$.subscribe(
        (selectedMonth: Date) => {
          this.newExpectedIncome.patchValue({
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
    this.newExpectedIncome = this.fb.group<NewExpectedIncomeForm>({
      name: this.fb.control(
        this.expectedIncome?.name || '',
        Validators.required
      ),
      amount: this.fb.control(
        this.expectedIncome?.amount || 0,
        Validators.required
      ),
      date: this.fb.control(
        this.expectedIncome
          ? new Date(this.expectedIncome.date)
          : this.selectedMonthService.getSelectedMonth(),
        Validators.required
      ),
    });
  }

  handleSubmit() {
    if (this.newExpectedIncome.valid) {
      const ei = {
        name: this.newExpectedIncome.value.name,
        amount: this.newExpectedIncome.value.amount,
        date: this.newExpectedIncome.value.date,
      };
      this.loading = true;

      if (this.expectedIncome && this.expectedIncome.id) {
        this.eis
          .update({ ...ei, id: this.expectedIncome.id })
          .subscribe((response) => {
            this.loading = response.loading;
            this.initForm();
            this.ms.init();
            this.finish.emit();
          });
      } else {
        this.eis.create(ei).subscribe((response) => {
          this.loading = response.loading;
          this.initForm();
          this.ms.init();
          this.finish.emit();
        });
      }
    }
  }

  get date() {
    return this.newExpectedIncome.get('date').value;
  }

  onDateChange($event: any) {
    this.newExpectedIncome.patchValue({
      date: new Date($event.getFullYear(), $event.getMonth(), 1),
    });
  }
}
