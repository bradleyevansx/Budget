import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.css',
})
export class NewTransactionComponent {
  @Input()
  allocationId: number;

  @Output()
  onFinish: EventEmitter<void> = new EventEmitter();

  isLoading: boolean = false;

  transactionForm: FormGroup;

  initForm() {
    this.transactionForm = this.fb.group({
      price: [0, Validators.required],
      location: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  constructor(private fb: FormBuilder, private ts: TransactionService) {
    this.initForm();
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction: Omit<Omit<Transaction, 'id'>, 'userId'> = {
        price: this.transactionForm.value.price,
        location: this.transactionForm.value.location,
        date: this.transactionForm.value.date,
        allocationId: this.allocationId,
      };
      this.ts.create(transaction).subscribe((response) => {
        this.isLoading = response.loading;
        this.onFinish.emit();
        this.initForm();
      });
    }
  }
}
