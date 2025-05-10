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

@Component({
  selector: 'app-new-transaction',
  imports: [
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './transaction-manager.component.html',
  styleUrl: './transaction-manager.component.css',
})
export class TransactionManagerComponent {
  @Input()
  allocationId: number;
  @Input()
  transaction: Transaction;

  @Output()
  onFinish: EventEmitter<void> = new EventEmitter();

  isLoading: boolean = false;

  transactionForm: FormGroup;

  initForm() {
    this.transactionForm = this.fb.group({
      price: [this.transaction?.price || 0, Validators.required],
      location: [this.transaction?.location || '', Validators.required],
      date: [this.transaction?.date || new Date(), Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private ts: TransactionService,
    private ms: MonthlyService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transaction'] && changes['transaction'].currentValue) {
      this.initForm();
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData: Omit<Transaction, 'id' | 'userId'> = {
        price: this.transactionForm.value.price,
        location: this.transactionForm.value.location,
        date: this.transactionForm.value.date,
        allocationId: this.allocationId,
      };

      if (this.transaction) {
        this.ts
          .update({ ...this.transaction, ...transactionData })
          .subscribe((response) => {
            this.isLoading = response.loading;
            this.onFinish.emit();
            this.ms.init();
          });
      } else {
        this.ts.create(transactionData).subscribe((response) => {
          this.isLoading = response.loading;
          this.onFinish.emit();
          this.initForm();
          this.ms.init();
        });
      }
    }
  }
}
