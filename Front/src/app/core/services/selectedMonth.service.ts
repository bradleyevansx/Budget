import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectedMonthService {
  private selectedMonthSubject: BehaviorSubject<Date> =
    new BehaviorSubject<Date>(new Date());
  public selectedMonth$: Observable<Date> =
    this.selectedMonthSubject.asObservable();

  constructor() {}

  getSelectedMonth(): Date {
    return this.selectedMonthSubject.value;
  }

  setSelectedMonth(month: Date): void {
    this.selectedMonthSubject.next(month);
  }
}
