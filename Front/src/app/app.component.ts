import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from './core/services/auth.service';
import { MonthSelectComponent } from './core/components/month-select/month-select.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, MonthSelectComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.status$.subscribe((status) => {
      this.isAuthed = status === 'authenticated';
      this.initItems();
    });
  }

  title = 'Front';
  items: MenuItem[] = [];
  isAuthed: boolean;

  getItems(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        icon: PrimeIcons.PENCIL,
        routerLink: ['/dashboard'],
        visible: this.isAuthed,
      },
      {
        label: 'Logout',
        icon: PrimeIcons.SIGN_OUT,
        routerLink: ['/login'],
        command: () => {
          console.log('Logout clicked');
          this.authService.logout();
        },
        visible: this.isAuthed,
      },
    ];
  }

  initItems(): void {
    this.items = this.getItems();
  }

  ngOnInit(): void {
    this.initItems();
  }
}
