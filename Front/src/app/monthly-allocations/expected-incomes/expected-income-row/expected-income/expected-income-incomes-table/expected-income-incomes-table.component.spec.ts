import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomeIncomesTableComponent } from './expected-income-incomes-table.component';

describe('ExpectedIncomeIncomesTableComponent', () => {
  let component: ExpectedIncomeIncomesTableComponent;
  let fixture: ComponentFixture<ExpectedIncomeIncomesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedIncomeIncomesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpectedIncomeIncomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
