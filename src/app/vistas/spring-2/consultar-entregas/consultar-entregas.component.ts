import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  TableConsultarEntregasComponent
} from "../../../componentes/table-consultar-entregas/table-consultar-entregas.component";

@Component({
  selector: 'app-consultar-entregas',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    TableConsultarEntregasComponent
  ],
  templateUrl: './consultar-entregas.component.html',
  styleUrl: './consultar-entregas.component.css'
})
export class ConsultarEntregasComponent implements OnInit {

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
