import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from '../../vistas/login/login.component';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [LoginComponent, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css'
})
export class AuthLoginComponent {

}
