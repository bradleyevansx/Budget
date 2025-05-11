import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MonthlyAllocationsComponent } from './monthly-allocations/monthly-allocations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: MonthlyAllocationsComponent,
    canActivate: [AuthGuard],
  },
];
