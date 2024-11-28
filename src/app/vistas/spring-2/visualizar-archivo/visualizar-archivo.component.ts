import {Component, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {ApiMFService} from "../../../services/api/api-mf.service";

@Component({
  selector: 'app-visualizar-archivo',
  standalone: true,
  imports: [FileUploadComponent],
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
  selectedFile: File | null = null;

  // Ejemplo de validationRanges
  validationRanges = {
    "validationRanges": [
      {
        "sheetName": "INDICE",
        "ranges": {
          "INDICE": []
        }
      },
      {
        "sheetName": "Identificación del Vigilado",
        "ranges": {
          "Identificación del Vigilado": ["F9:F29"]
        }
      },
      {
        "sheetName": "ESF",
        "ranges": {
          "ESF": []
        }
      },
      {
        "sheetName": "ER",
        "ranges": {
          "ER": []
        }
      },
      {
        "sheetName": "ORI",
        "ranges": {
          "ORI": []
        }
      },
      {
        "sheetName": "EFE-indirecto",
        "ranges": {
          "EFE-indirecto": []
        }
      },
      {
        "sheetName": "EFE-directo",
        "ranges": {
          "EFE-directo": []
        }
      },
      {
        "sheetName": "ECP",
        "ranges": {
          "ECP": []
        }
      },
      {
        "sheetName": "Dictamen",
        "ranges": {
          "Dictamen": []
        }
      },
      {
        "sheetName": "Listas desplegables(ocultar)",
        "ranges": {
          "Listas desplegables(ocultar)": []
        }
      }
    ]
  };

  // Constructor
  constructor(
    private errorService: ErrorService,
    private ApiMFService: ApiMFService
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
      this.ApiMFService.uploadFileAPI(file[0], this.validationRanges).subscribe({
        next: (response) => {
          console.log('Archivo subido con éxito:', response);
        },
        error: (err) => {
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }

}
