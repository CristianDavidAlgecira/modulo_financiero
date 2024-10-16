import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
