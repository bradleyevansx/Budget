import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManagerComponent } from './transaction-manager.component';

describe('NewTransactionComponent', () => {
  let component: TransactionManagerComponent;
  let fixture: ComponentFixture<TransactionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
