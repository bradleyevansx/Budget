import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAllocationsComponent } from './monthly-allocations.component';

describe('MonthlyAllocationsComponent', () => {
  let component: MonthlyAllocationsComponent;
  let fixture: ComponentFixture<MonthlyAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyAllocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
