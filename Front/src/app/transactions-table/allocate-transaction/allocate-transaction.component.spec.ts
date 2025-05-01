import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateTransactionComponent } from './allocate-transaction.component';

describe('AllocateTransactionComponent', () => {
  let component: AllocateTransactionComponent;
  let fixture: ComponentFixture<AllocateTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocateTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
