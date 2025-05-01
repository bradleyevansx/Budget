import { FormControl } from '@angular/forms';

export type NewAllocationForm = {
  name: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date>;
};
