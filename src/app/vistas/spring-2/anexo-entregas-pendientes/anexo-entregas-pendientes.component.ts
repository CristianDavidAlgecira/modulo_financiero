import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {
  TableAnexoEntregasPendientesComponent
} from "../../../componentes/table-anexo-entregas-pendientes/table-anexo-entregas-pendientes.component";

@Component({
  selector: 'app-anexo-entregas-pendientes',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    NgIf,
    PaginatorModule,
    NgClass,
    FileUploadComponent,
    NgForOf,
    TableAnexoEntregasPendientesComponent
  ],
  templateUrl: './anexo-entregas-pendientes.component.html',
  styleUrl: './anexo-entregas-pendientes.component.css'
})
export class AnexoEntregasPendientesComponent implements OnInit {

  // Variables
  anexo: string = '';
  archivoCargado: boolean = false;
  isAdicionarDisabled: boolean = true;
  isGuardarDisabled: boolean = true;

  touchedFields = {
    anexo: false,
  };

  dataClass = {
    textSize: 'xs',
    textInfo: 'Archivo PDF',
  };

  errorStates: { [key: number]: boolean } = {};

  nombreAnexoDatos = [
    {id: 1, descripcion: 'Carátula'},
    {id: 2, descripcion: 'Estado de Situación Financiera'},
    {id: 3, descripcion: 'Estado de Resultados'},
    {id: 4, descripcion: 'Estado de Resultados Integral'},
    {id: 5, descripcion: 'Flujo de Efectivo Indirecto'},
    {id: 6, descripcion: 'Flujo de Efectivo Directo'},
    {id: 7, descripcion: 'Estado de Cambios en el Patrimonio'},
    {id: 8, descripcion: 'Dictamen del Revisor Fiscal'},
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  // Validar campo
  validateField(field: string): void {

    (this.touchedFields as any)[field] = true;

  }

  // Llamado cuando se carga un archivo
  OnUploadButton(file: File[]): void {
    this.archivoCargado = file.length > 0;
    this.checkAdicionarButtonState();
  }

  // Validar si el botón "Adicionar" debe habilitarse
  checkAdicionarButtonState(): void {

    this.isAdicionarDisabled = !(this.anexo && this.archivoCargado);

  }

  // Acciones al hacer clic en "Adicionar"
  btnAdicionar(): void {

    this.isGuardarDisabled = false; // Habilitar botón "Guardar"
    console.log('Anexo y archivo listos para guardar');

  }

  // Acciones al hacer clic en "Guardar"
  btnGuardar(): void {

    this.submitForm();
    console.log('Formulario enviado');

  }

  // Simula el envío del formulario
  submitForm(): void {

    this.touchedFields.anexo = true;

  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }

}
