import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomeComponent } from './expected-income.component';

describe('ExpectedIncomeComponent', () => {
  let component: ExpectedIncomeComponent;
  let fixture: ComponentFixture<ExpectedIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedIncomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpectedIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
