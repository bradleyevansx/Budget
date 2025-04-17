import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'new-transaction',
    component: NewTransactionComponent,
    canActivate: [AuthGuard],
  },
];
