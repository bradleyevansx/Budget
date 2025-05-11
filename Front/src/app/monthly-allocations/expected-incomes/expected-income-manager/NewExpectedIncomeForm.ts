import { FormControl } from '@angular/forms';

export type NewExpectedIncomeForm = {
  name: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date>;
};
