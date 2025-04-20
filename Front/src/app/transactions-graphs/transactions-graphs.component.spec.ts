import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsGraphsComponent } from './transactions-graphs.component';

describe('TransactionsGraphsComponent', () => {
  let component: TransactionsGraphsComponent;
  let fixture: ComponentFixture<TransactionsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsGraphsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
