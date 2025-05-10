import { FormControl } from '@angular/forms';

export type AllocationForm = {
  name: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date>;
};
