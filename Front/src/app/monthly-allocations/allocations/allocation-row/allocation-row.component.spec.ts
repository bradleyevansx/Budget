import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationRowComponent } from './allocation-row.component';

describe('AllocationRowComponent', () => {
  let component: AllocationRowComponent;
  let fixture: ComponentFixture<AllocationRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
