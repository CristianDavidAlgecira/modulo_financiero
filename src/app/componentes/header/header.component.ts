import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() user: any = [];
  menuVisible = false;

  constructor(private authService: AuthService) {
  }

  onFocus() {
    this.menuVisible = true;
  }

  onFocusOut() {
    setTimeout(() => {
      this.menuVisible = false;
    }, 100);
  }

  logout() {
    console.log("cerrar sesion");
    this.authService.logout();
  }

}
