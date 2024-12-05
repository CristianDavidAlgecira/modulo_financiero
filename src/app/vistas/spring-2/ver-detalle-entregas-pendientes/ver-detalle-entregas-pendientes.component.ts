import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-ver-detalle-entregas-pendientes',
  standalone: true,
  imports: [
    PaginatorModule
  ],
  templateUrl: './ver-detalle-entregas-pendientes.component.html',
  styleUrl: './ver-detalle-entregas-pendientes.component.css'
})
export class VerDetalleEntregasPendientesComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

}
