import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-month-select',
  imports: [ButtonModule],
  templateUrl: './month-select.component.html',
  styleUrl: './month-select.component.css',
})
export class MonthSelectComponent {
  months = [
    { month: 0, name: 'January' },
    { month: 1, name: 'February' },
    { month: 2, name: 'March' },
    { month: 3, name: 'April' },
    { month: 4, name: 'May' },
    { month: 5, name: 'June' },
    { month: 6, name: 'July' },
    { month: 7, name: 'August' },
    { month: 8, name: 'September' },
    { month: 9, name: 'October' },
    { month: 10, name: 'November' },
    { month: 11, name: 'December' },
  ];

  @Input() value: Date;
  @Output() onValueChange: EventEmitter<Date> = new EventEmitter<Date>();

  increaseMonth() {
    const newDate = new Date(this.value);
    if (newDate.getMonth() === 11) {
      newDate.setMonth(0);
      newDate.setFullYear(newDate.getFullYear() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    this.onValueChange.emit(newDate);
  }

  decreaseMonth() {
    const newDate = new Date(this.value);
    if (newDate.getMonth() === 0) {
      newDate.setMonth(11);
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    this.onValueChange.emit(newDate);
  }

  getSelectedMonth() {
    return this.months.find((x) => x.month === this.value.getMonth())?.name;
  }

  getSelectedYear() {
    return this.value.getFullYear();
  }
}
