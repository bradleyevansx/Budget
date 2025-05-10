import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAllocationComponent } from './allocation-manager.component';

describe('NewAllocationComponent', () => {
  let component: NewAllocationComponent;
  let fixture: ComponentFixture<NewAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAllocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
