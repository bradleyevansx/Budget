import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      firstLastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      const { firstLastName, password } = this.loginForm.value;
      this.authService.login(firstLastName, password).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }
}
