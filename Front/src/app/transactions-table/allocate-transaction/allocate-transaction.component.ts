import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../core/models/transaction.model';
import { Allocation } from '../../core/models/allocation.model';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../core/services/transaction.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-allocate-transaction',
  imports: [SelectModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './allocate-transaction.component.html',
  styleUrl: './allocate-transaction.component.css',
})
export class AllocateTransactionComponent {
  @Input() transaction: Transaction;
  @Input() allocations: Allocation;
  @Output() onAllocate: EventEmitter<void> = new EventEmitter();

  selectedAllocation: Allocation;

  constructor(private transcationService: TransactionService) {
    this.transaction = {} as Transaction;
    this.allocations = {} as Allocation;
  }

  allocateTransaction() {
    if (this.selectedAllocation) {
      this.transaction.allocationId = this.selectedAllocation.id;
      this.transcationService.update(this.transaction).subscribe((res) => {
        this.onAllocate.emit();
      });
    }
  }
}
