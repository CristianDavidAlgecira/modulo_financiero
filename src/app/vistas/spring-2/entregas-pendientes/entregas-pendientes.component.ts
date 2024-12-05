import {Component, OnInit} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {
  TableEntregasPendientesComponent
} from "../../../componentes/table-entregas-pendientes/table-entregas-pendientes.component";

@Component({
  selector: 'app-entregas-pendientes',
  standalone: true,
  imports: [
    PaginatorModule,
    PrimaryButtonComponent,
    TableEntregasPendientesComponent
  ],
  templateUrl: './entregas-pendientes.component.html',
  styleUrl: './entregas-pendientes.component.css'
})
export class EntregasPendientesComponent implements OnInit {

  filtroNombre: string = '';
  filtroNumero: string = '';
  filtroAnio: string = '';
  filtroGlobal: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  onInputChange(inputName?: string, event?: Event): void {

    if (inputName && event) {

      const input = (event.target as HTMLInputElement).value;

      if (inputName === 'filtroNumero' || inputName === 'filtroAnio') {

        const sanitizedInput = input.replace(/[^0-9]/g, '');

        if (inputName === 'filtroNumero') {

          this.filtroNumero = sanitizedInput;

        } else if (inputName === 'filtroAnio') {

          this.filtroAnio = sanitizedInput;

        }

      }

    }

    this.filtroGlobal = `${this.filtroNombre}|${this.filtroNumero}|${this.filtroAnio}`;

  }


  limpiarFiltros() {

    this.filtroNombre = '';
    this.filtroNumero = '';
    this.filtroAnio = '';
    this.filtroGlobal = '';

  }

}
