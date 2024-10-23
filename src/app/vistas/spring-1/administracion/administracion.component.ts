import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {TableComponent} from "../../../componentes/table/table.component";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    TableComponent,
    FormsModule
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit {

  filtroNombre: string = '';
  filtroNumero: string = '';
  filtroAnio: string = '';
  filtroGlobal: string = '';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  limpiarFiltros() {

    this.filtroNombre = '';
    this.filtroNumero = '';
    this.filtroAnio = '';
    this.filtroGlobal = '';

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

  navigateToNuevoRequerimiento() {
    this.router.navigate(['/nuevo-requerimiento']);
  }

}
