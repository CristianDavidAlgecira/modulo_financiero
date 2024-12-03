import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-ver-detalle-consultar-entregas',
  standalone: true,
  imports: [
    ProgressSpinnerModule
  ],
  templateUrl: './ver-detalle-consultar-entregas.component.html',
  styleUrl: './ver-detalle-consultar-entregas.component.css'
})
export class VerDetalleConsultarEntregasComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
