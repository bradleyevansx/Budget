import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  imports: [
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.css',
})
export class NewTransactionComponent {
  transactionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ts: TransactionService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      price: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction = {
        price: this.transactionForm.value.price,
        location: this.transactionForm.value.location,
        date: this.transactionForm.value.date,
      };
      this.ts.create(transaction).subscribe((response) => {
        this.router.navigate(['/']);
      });
    }
  }
}
