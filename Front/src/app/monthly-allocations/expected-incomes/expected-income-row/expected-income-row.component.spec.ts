import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomeRowComponent } from './expected-income-row.component';

describe('ExpectedIncomeRowComponent', () => {
  let component: ExpectedIncomeRowComponent;
  let fixture: ComponentFixture<ExpectedIncomeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedIncomeRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpectedIncomeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
