import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {VisualizarArchivoComponent} from "../visualizar-archivo/visualizar-archivo.component";

@Component({
  selector: 'app-iniciar-reporte',
  standalone: true,
  imports: [
    PaginatorModule,
    PrimaryButtonComponent,
    VisualizarArchivoComponent
  ],
  templateUrl: './iniciar-reporte.component.html',
  styleUrl: './iniciar-reporte.component.css'
})
export class IniciarReporteComponent implements OnInit {

  //Variable de NIFF
  niffOtros: string = '';

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  // Propiedad para cambiar el boton guardar
  isDisabled: boolean = true;

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
