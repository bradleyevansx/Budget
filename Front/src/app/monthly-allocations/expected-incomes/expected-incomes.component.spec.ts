import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedIncomesComponent } from './expected-incomes.component';

describe('ExpectedIncomesComponent', () => {
  let component: ExpectedIncomesComponent;
  let fixture: ComponentFixture<ExpectedIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpectedIncomesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpectedIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
