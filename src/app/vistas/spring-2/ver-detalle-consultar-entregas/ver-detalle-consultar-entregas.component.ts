import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ver-detalle-consultar-entregas',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    PrimaryButtonComponent
  ],
  templateUrl: './ver-detalle-consultar-entregas.component.html',
  styleUrl: './ver-detalle-consultar-entregas.component.css'
})
export class VerDetalleConsultarEntregasComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
