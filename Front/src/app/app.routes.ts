import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TransactionManagerComponent } from './transaction-manager/transaction-manager.component';
import { TransactionsTableComponent } from './monthly-allocations/transactions/transactions-table/transactions-table.component';
import { TransactionsGraphsComponent } from './transactions-graphs/transactions-graphs.component';
import { MonthlyAllocationsComponent } from './monthly-allocations/monthly-allocations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'new-transaction',
    component: TransactionManagerComponent,
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
