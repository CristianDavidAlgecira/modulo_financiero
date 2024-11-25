import {Component, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {NgForOf, NgIf} from "@angular/common";
import * as XLSX from 'xlsx';
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-visualizar-archivo',
  standalone: true,
  imports: [FileUploadComponent, NgIf, NgForOf, PaginatorModule],
  templateUrl: './visualizar-archivo.component.html',
  styleUrl: './visualizar-archivo.component.css'
})
export class VisualizarArchivoComponent implements OnInit {

  // Propiedad de objeto para manejar errores
  errorStates: {[key: number]: boolean} = {};

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo Excel',
  };

  // Propiedad para almacenar los datos de todas las hojas
  sheetsData: {name: string, data: any[]}[] = [];

  // Propiedad de guardar temporalmente el archivo seleccionado
  selectedFile: File | null = null;

  // Índice de la hoja seleccionada para mostrar (paginador)
  selectedSheetIndex: number = 0;

  // Constructor
  constructor(private errorService: ErrorService) {
  }

  ngOnInit() {

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

  }

  onFileSelected(file: File[]) {

    this.selectedFile = file[0];

  }

  OnUploadButton(file: File[]) {

    if(file[0]) {

      console.log("hay archivo", file[0]);
      this.loadExcelFile();

    } else {

      console.log("no hay");
      this.sheetsData = [];

    }

  }

  loadExcelFile() {

    if(this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array', cellStyles: true});

        // Limpiar los datos previos
        this.sheetsData = [];

        // Recorrer todas las hojas del archivo Excel
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});

          const dataWithStyles = this.readSheetWithStyles(sheet);


          // Almacenar los datos de la hoja con su nombre
          this.sheetsData.push({name: sheetName, data: dataWithStyles});
          console.log(this.sheetsData)
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

  private readSheetWithStyles(sheet: XLSX.WorkSheet): any {
    const range = XLSX.utils.decode_range(sheet["!ref"] || "");

    const styledData: any[] = [];
    for (let row = range.s.r; row <= range.e.r; ++row) {
      const rowData: any[] = [];
      for (let col = range.s.c; col <= range.e.c; ++col) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = sheet[cellAddress];

        if (cell) {
          const style = cell.s || {};


          // Crear un objeto con el valor de la celda y los estilos
          const cellData = {
            value: cell.v || "", // El valor de la celda
            color: style.fgColor?.rgb || null, // Color de fondo (fgColor)
            fontColor: style.font?.color?.rgb || null, // Color de texto
          };

          // Agregar la celda con su estilo a la fila
          rowData.push(cellData);
        } else {
          rowData.push(null);
        }
      }
      styledData.push(rowData);
    }
    return styledData;
  }



  // Procesa la fila sin cambiar la posición de las celdas con texto
  processRow(row: any[]): { value: string; colspan: number; visible: boolean; color: string | null; fontColor: string | null }[] {
    const processedRow: { value: string; colspan: number; visible: boolean; color: string | null; fontColor: string | null }[] = [];

    let currentSpan = 1;

    // Itera sobre cada celda de la fila
    for (let i = 0; i < row.length; i++) {
      const cell = row[i];

      if (cell) {
        // Si hay texto, guarda el anterior y empieza uno nuevo

        console.log(cell)

        processedRow.push({
          value: cell.value,
          colspan: 1,
          visible: true,
          color: cell.color || '',  // Background color from Excel cell style
          fontColor: cell.fontColor || '' // Font color from Excel cell style
        });
      } else {
        // Si es vacío y estamos en el final de la fila, combinamos las celdas
        if (i === row.length - 1 || row[i + 1] === '') {
          if (processedRow.length > 0 && processedRow[processedRow.length - 1].value === '') {
            currentSpan++;
          } else {
            processedRow.push({
              value: '',
              colspan: 1,
              visible: false,
              color: null,
              fontColor: null
            });
          }
        } else {
          processedRow.push({
            value: '',
            colspan: 1,
            visible: true,
            color: null,  // Background color from Excel cell style
            fontColor: null // Font color from Excel cell style
          });
        }
      }
    }

    // Ajusta la última celda vacía si es necesario
    if (processedRow.length > 0 && currentSpan > 1) {
      processedRow[processedRow.length - 1].colspan = currentSpan;
    }

    return processedRow;
  }

  // Obtener clases personalizadas
  getCellClass(cellValue: string): string {

    return cellValue ? (this.areAllWordsUpperCase(cellValue) ? 'header' : '') : 'empty';
  }

  areAllWordsUpperCase(str: string): boolean {

    if(typeof str !== 'string') {
      return false;
    }
    const words = str.trim().split(' ');
    return words.every(word => word === word.toUpperCase());
  }


}
