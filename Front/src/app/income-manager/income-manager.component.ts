import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TransactionService } from '../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../core/models/transaction.model';
import { MonthlyService } from '../core/services/monthly.service';
import { Income } from '../core/models/income.model';
import { IncomeService } from '../core/services/income.service';

@Component({
  selector: 'app-income-manager',
  imports: [
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './income-manager.component.html',
  styleUrl: './income-manager.component.css',
})
export class IncomeManagerComponent {
  @Input()
  expectedIncomeId: number;
  @Input()
  income: Income;

  @Output()
  onFinish: EventEmitter<void> = new EventEmitter();

  isLoading: boolean = false;

  incomeForm: FormGroup;

  initForm() {
    this.incomeForm = this.fb.group({
      amount: [this.income?.amount || 0, Validators.required],
      title: [this.income?.title || '', Validators.required],
      date: [this.income?.date || new Date(), Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private is: IncomeService,
    private ms: MonthlyService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['income'] && changes['income'].currentValue) {
      this.initForm();
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const incomeData: Omit<Income, 'id'> = {
        amount: this.incomeForm.value.amount,
        title: this.incomeForm.value.title,
        date: this.incomeForm.value.date,
        expectedIncomeId: this.expectedIncomeId,
      };

      if (this.income) {
        this.is
          .update({ ...this.income, ...incomeData })
          .subscribe((response) => {
            this.isLoading = response.loading;
            this.onFinish.emit();
            this.ms.init();
          });
      } else {
        this.is.create(incomeData).subscribe((response) => {
          this.isLoading = response.loading;
          this.onFinish.emit();
          this.initForm();
          this.ms.init();
        });
      }
    }
  }
}
