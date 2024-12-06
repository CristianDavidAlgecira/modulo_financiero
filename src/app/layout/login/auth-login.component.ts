import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "../../componentes/footer/footer.component";

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css'
})
export class AuthLoginComponent {

}
