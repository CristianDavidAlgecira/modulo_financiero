import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {environment} from "../../../environments/environment";
import {Tooltip, TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  token: string | null;
  constructor(private authService: AuthService) {
    this.token = this.authService.getTestToken();
  }



  userInfo: any;
  apiUrl = environment.LOGOUT;

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
  }

  menuVisible = false;

  onFocus() {
    this.menuVisible = true;
  }

  onFocusOut() {
    setTimeout(() => {
      this.menuVisible = false;
    }, 100);
  }

  cerrarsesion(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.classList.add("pointer-events-none");
    event.preventDefault();

    this.authService.clearToken();
  }


  volverInicio(event: MouseEvent){
    const target = event.target as HTMLElement;
    target.classList.add("pointer-events-none");
    event.preventDefault();

    window.location.href = this.apiUrl+'/transversales/usuarios/inicio/gateway?authtoken='+this.token;
  }
}
