import { Component, OnInit } from '@angular/core';
import { SelectedMonthService } from '../../services/selectedMonth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-month-select',
  imports: [ButtonModule],
  templateUrl: './month-select.component.html',
  styleUrl: './month-select.component.css',
})
export class MonthSelectComponent implements OnInit {
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

  selectedMonth: Date;

  constructor(private selectedMonthService: SelectedMonthService) {}

  ngOnInit(): void {
    this.selectedMonthService.selectedMonth$.subscribe((month: Date) => {
      this.selectedMonth = month;
    });
  }

  increaseMonth(): void {
    const newDate = new Date(this.selectedMonth);
    if (newDate.getMonth() === 11) {
      newDate.setMonth(0);
      newDate.setFullYear(newDate.getFullYear() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    this.selectedMonthService.setSelectedMonth(newDate);
  }

  decreaseMonth(): void {
    const newDate = new Date(this.selectedMonth);
    if (newDate.getMonth() === 0) {
      newDate.setMonth(11);
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    this.selectedMonthService.setSelectedMonth(newDate);
  }

  getSelectedMonth(): string {
    const name = this.months.find(
      (x) => x.month === this.selectedMonth.getMonth()
    )?.name;
    return name || '';
  }

  getSelectedYear(): number {
    return this.selectedMonth.getFullYear();
  }
}
