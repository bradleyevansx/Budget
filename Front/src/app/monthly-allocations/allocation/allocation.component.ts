import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Allocation } from '../../core/models/allocation.model';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AllocationService } from '../../core/services/allocation.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionService } from '../../core/services/transaction.service';
import { Comparator, Operator } from '../../core/models/query.model';
import { DialogModule } from 'primeng/dialog';
import { NewTransactionComponent } from '../../new-transaction/new-transaction.component';
import { AllocationsTransactionsTableComponent } from './allocations-transactions-table/allocations-transactions-table.component';
import { toUsdString } from '../../core/sdk/moneyHelpers';

@Component({
  selector: 'app-allocation',
  imports: [
    CardModule,
    ButtonModule,
    MenuModule,
    CommonModule,
    DialogModule,
    AllocationsTransactionsTableComponent,
  ],
  templateUrl: './allocation.component.html',
  styleUrl: './allocation.component.css',
})
export class AllocationComponent implements OnInit {
  constructor(
    private allocationService: AllocationService,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.initTransactions();
  }
  @Input() allocation: Allocation;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  transactions: Transaction[] = [];
  visible: boolean = false;

  items: MenuItem[] = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      command: () => {
        this.allocationService.delete(this.allocation.id).subscribe(() => {
          this.onDelete.emit('');
        });
      },
    },
  ];

  initTransactions() {
    this.transactionService
      .getWhere({
        operator: Operator.And,
        children: [
          {
            comparator: Comparator.Equals,
            value: this.allocation.id,
            propertyName: 'allocationId',
          },
        ],
      })
      .subscribe((res) => {
        this.transactions = [
          ...res.data.map((transaction) => {
            return {
              ...transaction,
              date: new Date(transaction.date),
            };
          }),
        ];
      });
  }

  get totalTransactionsAmount() {
    return this.transactions.reduce((acc, curr) => {
      return (acc += curr.price);
    }, 0);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  handleNewTransactionCreated() {
    this.hideDialog();
    this.initTransactions();
  }

  formatMoney(value: number) {
    return toUsdString(value);
  }
}
