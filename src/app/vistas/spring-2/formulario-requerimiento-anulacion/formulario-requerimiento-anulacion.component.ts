import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-formulario-requerimiento-anulacion',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    PaginatorModule,
    NgClass,
    NgForOf,
    NgIf,
    FileUploadComponent,
    AlertComponent
  ],
  templateUrl: './formulario-requerimiento-anulacion.component.html',
  styleUrl: './formulario-requerimiento-anulacion.component.css'
})
export class FormularioRequerimientoAnulacionComponent implements OnInit {

  nombreVigilado: string = '';
  tipoIdentifiacionVigilado: string = '';
  titularTramite: string = '';
  nombres: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  numeroIdentificacion: string = '';
  medioRespuesta: string = '';
  email: string = '';
  emailConfirma: string = '';
  emailAlternativo: string = '';
  direccion: string = '';
  telefono: string = '';
  paises: string = '';
  departamentos: string = '';
  municipios: string = '';
  tipoPQR: string = '';
  tipoSolicitud: string = '';
  showModalInicial: boolean = false;

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  titularTramiteDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  medioRespuestaDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  paisesDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  departamentosDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  municipiosDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  tipoPQRDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  tipoSolicitudDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  touchedFields = {

    titularTramite: false,
    nombres: false,
    primerApellido: false,
    segundoApellido: false,
    numeroIdentificacion: false,
    medioRespuesta: false,
    email: false,
    emailConfirma: false,
    telefono: false,
    paises: false,
    departamentos: false,
    municipios: false,
    tipoPQR: false,
    tipoSolicitud: false

  };

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.showModalInicial = true;
  }

  preventClose(): void {
    this.showModalInicial = true;
  }

  onAccept(): void {
    console.log('Modal aceptado');
    this.showModalInicial = false;
  }

  onDecline(): void {
    console.log('Modal rechazado');
    window.history.back();
  }

  validateField(field: string): void {

    (this.touchedFields as any)[field] = true;

  }

  // Simula el envío del formulario
  submitForm(): void {

    this.touchedFields.titularTramite = true;
    this.touchedFields.nombres = true;
    this.touchedFields.primerApellido = true;
    this.touchedFields.segundoApellido = true;
    this.touchedFields.numeroIdentificacion = true;
    this.touchedFields.medioRespuesta = true;
    this.touchedFields.email = true;
    this.touchedFields.telefono = true;
    this.touchedFields.paises = true;
    this.touchedFields.departamentos = true;
    this.touchedFields.municipios = true;
    this.touchedFields.tipoPQR = true;
    this.touchedFields.tipoSolicitud = true;

  }

  OnUploadButton(file: File[]) {

    if (file[0]) {

      console.log('Archivo Cargado', file[0]);

    } else {

      console.log('Archivo con error');

    }

  }

  btnGuardar(): void {

    this.submitForm();
    console.log('Formulario enviado');

  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
