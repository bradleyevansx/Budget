import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AllocationService } from '../../core/services/allocation.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MonthSelectComponent } from '../../core/components/month-select/month-select.component';
import { NewAllocationForm } from './NewAllocationForm';
import { Allocation } from '../../core/models/allocation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-allocation',
  imports: [
    DrawerModule,
    FloatLabelModule,
    ButtonModule,
    DatePickerModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    MonthSelectComponent,
    CommonModule,
  ],
  templateUrl: './new-allocation.component.html',
  styleUrl: './new-allocation.component.css',
})
export class NewAllocationComponent {
  @Output() onSubmit = new EventEmitter<Allocation>();

  visible: boolean = false;
  newAllocation: FormGroup<NewAllocationForm>;
  constructor(
    private fb: FormBuilder,
    private allocationService: AllocationService
  ) {
    this.newAllocation = this.fb.group<NewAllocationForm>({
      name: this.fb.control('', Validators.required),
      amount: this.fb.control(0, Validators.required),
      date: this.fb.control(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        Validators.required
      ),
    });
  }

  show() {
    this.visible = true;
  }

  handleSubmit() {
    if (this.newAllocation.valid) {
      const allocation = {
        name: this.newAllocation.value.name,
        amount: this.newAllocation.value.amount,
        date: this.newAllocation.value.date,
      };
      console.log(allocation);
      this.allocationService.create(allocation).subscribe((response) => {
        this.onSubmit.emit(response);
        this.visible = false;
      });
    }
  }

  get date() {
    return this.newAllocation.get('date').value;
  }

  onDateChange($event: any) {
    this.newAllocation.patchValue({
      date: new Date($event.getFullYear(), $event.getMonth(), 1),
    });
  }
}
