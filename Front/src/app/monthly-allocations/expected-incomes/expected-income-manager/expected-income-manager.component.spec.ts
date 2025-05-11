import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomeManagerComponent } from './expected-income-manager.component';

describe('ExpectedIncomeManagerComponent', () => {
  let component: ExpectedIncomeManagerComponent;
  let fixture: ComponentFixture<ExpectedIncomeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedIncomeManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpectedIncomeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
