import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.onStatusChangeHandlers.push((status) => {
      this.initItems();
      this.isAuthed = status === 'authenticated';
    });
  }

  title = 'Front';
  items: MenuItem[] = [];
  isAuthed: boolean;

  getItems(): MenuItem[] {
    return [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        routerLink: ['/'],
        visible: this.isAuthed,
      },
      {
        label: 'New',
        icon: PrimeIcons.PLUS,
        routerLink: ['/new-transaction'],
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
    this.isAuthed = this.authService.isAuthenticated();
  }
}
