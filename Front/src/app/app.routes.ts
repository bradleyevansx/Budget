import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { TransactionsGraphsComponent } from './transactions-graphs/transactions-graphs.component';
import { MonthlyAllocationsComponent } from './monthly-allocations/monthly-allocations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'new-transaction',
    component: NewTransactionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'table',
    component: TransactionsTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chart',
    component: TransactionsGraphsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allocations',
    component: MonthlyAllocationsComponent,
    canActivate: [AuthGuard],
  },
];
