import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-visualizar-archivo',
  standalone: true, imports: [FileUploadComponent, PrimaryButtonComponent, AlertComponent],
  templateUrl: './visualizar-archivo.component.html',
  styleUrl: './visualizar-archivo.component.css'
})

export class VisualizarArchivoComponent implements OnInit {

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo Excel',
  };

  // Propiedad de guardar temporalmente el archivo seleccionado
  // @ts-ignore
  selectedFile: File = [];

  //modales
  showErrorModal: boolean = false;
  showLoadingModal: boolean = false;
  showValidado: boolean = false;
  showError: boolean = false;

  //mensaje error
  messageNoValidado: string = '';

  // Ejemplo de validationRanges
  validationRanges = {
    "validationRanges": [
      {
        "sheetName": "INDICE",
        "keywords": {}
      },
      {
        "sheetName": "Identificación del Vigilado",
        "keywords": {
          "DATOS BÁSICOS": 1
        }
      },
      {
        "sheetName": "ESF",
        "keywords": {
          "CORRECTO": 18
        }
      },
      {
        "sheetName": "ER",
        "keywords": {
          "CORRECTO": 2,
          "ESTADO DE RESULTADOS": 1,
        }
      },
      {
        "sheetName": "ORI",
        "keywords": {
          "CORRECTO": 2,
          "ESTADO DE RESULTADO INTEGRAL componentes ORI - OTRO RESULTADO INTEGRAL": 1,
        }
      },
      {
        "sheetName": "EFE-indirecto",
        "keywords": {
          "CORRECTO": 2,
          "ESTADO DE FLUJO DE EFECTIVO (método indirecto)": 1,
        }
      },
      {
        "sheetName": "EFE-directo",
        "keywords": {
          "CORRECTO": 2,
          "ESTADO DE FLUJO DE EFECTIVO(método directo)": 1,
        }
      },
      {
        "sheetName": "ECP",
        "keywords": {
          "CORRECTO": 4,
          "ESTADO DE CAMBIOS EN EL PATRIMONIO": 1
        }
      },
      {
        "sheetName": "Dictamen",
        "keywords": {
          "CORRECTO": 1,
          "DICTAMEN DEL REVISOR FISCAL": 1,
        }
      },
      {
        "sheetName": "Listas desplegables(ocultar)",
        "keywords": {}
      }
    ]
  };

  // Constructor
  constructor(
    private errorService: ErrorService,
    private ApiMFService: ApiMFService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

  }

  onFileSelected(files: File[]): void {

    this.selectedFile = files[0];

  }

  OnUploadButton(file: File[]) {
    if (file[0]) {

      this.showLoadingModal = true;
      this.ApiMFService.uploadFileAPI(file[0], this.validationRanges).subscribe({
        next: (response) => {
          this.showLoadingModal = false;
          if(response.message == 'Archivo procesado y validado correctamente'){
            this.showValidado = true;
          } else {
            this.messageNoValidado = response.message;
            this.showError = true;
          }

          console.log('Archivo subido con éxito:', response);
        },
        error: (err) => {
          this.showErrorModal = true;
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }

  onCloseModal() {
    this.showError = false;
    this.showValidado = false;
    this.showErrorModal = false;
    this.showLoadingModal = false;

    location.reload();

  }

  ValidSaveExcel() {
    this.showLoadingModal = true;
    console.log("entrooooooo")
    this.ApiMFService.saveExcel(this.selectedFile).subscribe({
      next: (response) => {
        this.showLoadingModal = false;
        if(response.message == 'Archivo guardado en BD'){
          this.showValidado = true;
        } else {
          this.messageNoValidado = response.message;
          this.showError = true;
        }

        console.log('Archivo subido con éxito:', response);
      },
      error: (err) => {
        this.showLoadingModal = false;
        this.showErrorModal = true;
        console.error('Error al subir el archivo:', err);
      }
    });
  }

  navigateToAdministracion() {

    this.router.navigate(['/administracion']);

  }

}
