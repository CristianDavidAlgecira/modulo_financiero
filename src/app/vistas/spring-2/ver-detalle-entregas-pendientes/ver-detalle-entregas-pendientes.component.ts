import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-ver-detalle-entregas-pendientes',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    FileUploadComponent,
    NgIf,
    PaginatorModule,
    NgClass,
    AlertComponent
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

  // Propiedad para cambiar el boton guardar
  isDisabled: boolean = true;

  // Propiedad de los modales
  showLoadingModal: boolean = false;
  showFinalModal: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  submitForm() {

    this.touchedFields = {

      niffOtros: true,
      emailRespuesta: true,
      emailConfirmar: true,

    };

    this.actualizarInputs();

  }

  isValidEmail(email: string): boolean {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

  }

  isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  validateForm(field: string): void {

    (this.touchedFields as any) [field] = true;
    this.actualizarInputs();

  }

  actualizarInputs(): void {

    this.isDisabled =
      !this.isNotEmpty(this.niffOtros) ||
      !this.isValidEmail(this.emailRespuesta) ||
      !this.isValidEmail(this.emailConfirmar) ||
      this.emailRespuesta.trim().length === 0 ||
      this.emailConfirmar.trim().length === 0;

  }

  btnGuardar(): void {

    this.submitForm();

    if (!this.isDisabled) {

      this.showLoadingModal = true;

      setTimeout(() => {
        this.showLoadingModal = false;
        this.showFinalModal = true;
      }, 4000);

      console.log('Formulario enviado con éxito');

    } else {

      console.log('Por favor corrige los errores antes de enviar');

    }

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
