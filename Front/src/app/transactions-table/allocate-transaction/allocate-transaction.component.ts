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
  @Input() allocations: Allocation[];
  @Output() onChange: EventEmitter<{
    action: 'allocate' | 'deallocate';
    allocationId: number;
    transaction: Transaction;
  }> = new EventEmitter();

  private _selectedAllocation: Allocation;

  get selectedAllocation(): Allocation {
    return this._selectedAllocation;
  }

  set selectedAllocation(value: Allocation) {
    this.onChange.emit({
      action: value ? 'allocate' : 'deallocate',
      allocationId: value?.id ?? this._selectedAllocation.id,
      transaction: this.transaction,
    });
    this._selectedAllocation = value;
  }

  constructor(private transcationService: TransactionService) {
    this.transaction = {} as Transaction;
    this.allocations = [] as Allocation[];
  }
}
