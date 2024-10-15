import {Component} from '@angular/core';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";
import {AdministracionComponent} from "../spring-1/administracion/administracion.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    AdministracionComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

}
