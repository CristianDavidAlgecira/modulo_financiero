import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevo-requerimiento',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    FileUploadComponent
  ],
  templateUrl: './nuevo-requerimiento.component.html',
  styleUrl: './nuevo-requerimiento.component.css'
})
export class NuevoRequerimientoComponent implements OnInit {

  constructor(
    private errorService: ErrorService,
    private router: Router
  ) {
  }

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs',
    textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  ngOnInit() {
    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });
  }

  // Metodo para saber si tiene o no archivos
  OnUploadButton(file: File[]) {

    if (file[0]) {
      console.log("hay archivo", file[0]);
    } else {
      console.log("no hay");
    }

  }

  navigateToAdministracion() {
    this.router.navigate(['/administracion']);
  }

}
