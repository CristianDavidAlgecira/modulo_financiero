import { Component, OnInit } from '@angular/core';
import { FileUploadComponent } from "../../../componentes/file-upload/file-upload.component";
import { ErrorService } from "../../../componentes/servicios/error/error.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import * as XLSX from 'xlsx';
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-grupo1',
  standalone: true,
  imports: [
    FileUploadComponent,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    PaginatorModule
  ],
  templateUrl: './grupo1.component.html',
  styleUrl: './grupo1.component.css'
})
export class Grupo1Component implements OnInit {

  // Constructor
  constructor(
    private errorService: ErrorService,
    private fb: FormBuilder,
  ) { }

  // Formulario
  formGroup1!: FormGroup;

  // Porpiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs',
    textInfo: 'Archivo Excel',
  };

  // Propiedad para almacenar los datos de todas las hojas
  sheetsData: { name: string, data: any[] }[] = [];

  // Propiedad de guardar temporalmente el archivo seleccionado
  selectedFile: File | null = null;

  // Índice de la hoja seleccionada para mostrar (paginador)
  selectedSheetIndex: number = 0;

  ngOnInit() {
    this.formGroup1 = this.fb.group({
      1: [null, Validators.required],
    });

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });
  }

  onFileSelected(file: File[]) {
    this.selectedFile = file[0];
    this.loadExcelFile();
  }

  loadExcelFile() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Limpiar los datos previos
        this.sheetsData = [];

        // Recorrer todas las hojas del archivo Excel
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Almacenar los datos de la hoja con su nombre
          this.sheetsData.push({ name: sheetName, data: sheetData });
        });

        // Seleccionar la primera hoja por defecto
        this.selectedSheetIndex = 0;
      };

      reader.readAsArrayBuffer(this.selectedFile);
    }
  }

  // Cambiar la hoja seleccionada
  selectSheet(index: number) {
    this.selectedSheetIndex = index;
  }
}
