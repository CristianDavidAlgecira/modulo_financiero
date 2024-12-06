import {Component, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";

@Component({
  selector: 'app-modificar-entrega',
  standalone: true,
  imports: [
    FileUploadComponent
  ],
  templateUrl: './modificar-entrega.component.html',
  styleUrl: './modificar-entrega.component.css'
})
export class ModificarEntregaComponent implements OnInit {

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  constructor() {
  }

  ngOnInit() {
  }

  OnUploadButton(file: File[]) {

    if (file[0]) {

      console.log('Archivo Cargado', file[0]);

    } else {

      console.log('Archivo con error');

    }

  }

}
