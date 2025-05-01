import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationsTransactionsTableComponent } from './allocations-transactions-table.component';

describe('AllocationsTransactionsTableComponent', () => {
  let component: AllocationsTransactionsTableComponent;
  let fixture: ComponentFixture<AllocationsTransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationsTransactionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationsTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
