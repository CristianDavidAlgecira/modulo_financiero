import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-ver-detalle-entregas-pendientes',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    FileUploadComponent,
    NgIf,
    PaginatorModule,
    NgClass
  ],
  templateUrl: './ver-detalle-entregas-pendientes.component.html',
  styleUrl: './ver-detalle-entregas-pendientes.component.css'
})
export class VerDetalleEntregasPendientesComponent implements OnInit {

  //Variable de NIFF
  niffOtros: string = '';

  //Variables de email
  emailRespuesta: string = '';
  emailConfirmar: string = '';

  // Variables para ver si selecciono las casillas
  touchedFields = {

    niffOtros: false,
    emailRespuesta: false,
    emailConfirmar: false,

  };

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  validateField(field: string) {

    (this.touchedFields as any)[field] = true;

  }

  submitForm() {

    this.touchedFields = {

      niffOtros: true,
      emailRespuesta: true,
      emailConfirmar: true,

    };

  }

  btnGuardar() {

    this.submitForm()

  }

  OnUploadButton(file: File[]) {

    if (file[0]) {

      console.log('Archivo Cargado', file[0]);

    } else {

      console.log('Archivo con error');

    }

  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
