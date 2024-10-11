import {Component} from '@angular/core';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";
import {Grupo1Component} from "../grupos/grupo1/grupo1.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    Grupo1Component
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

}
