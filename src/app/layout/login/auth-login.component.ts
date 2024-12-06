import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";
import MenuNavegacionComponent from "../../componentes/menu-navegacion/menu-navegacion.component";

@Component({
  selector: 'app-auth-login',
  standalone: true, imports: [RouterOutlet, FooterComponent, HeaderComponent, MenuNavegacionComponent],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css'
})
export class AuthLoginComponent {



}
