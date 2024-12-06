import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ApiMFService} from "../../services/api/api-mf.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {PaginatorComponent} from "../paginator/paginator.component";

@Component({
  selector: 'app-table-otros-anexos',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PaginatorComponent
  ],
  templateUrl: './table-otros-anexos.component.html',
  styleUrl: './table-otros-anexos.component.css'
})
export class TableOtrosAnexosComponent implements OnInit, OnChanges {

  @Input() filtro: string = '';
  @Output() requerimientoDetalle: EventEmitter<number> =
    new EventEmitter<number>();
  data: any = [];
  headers: any = [];
  paginatedData: any = [];
  pageLength: number = 0;

  constructor(
    private router: Router,
    private apiMFService: ApiMFService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {

    this.loadInitialData();

    this.headers = [
      {
        id: 1,
        title: 'Archivo',
      },
      {
        id: 2,
        title: 'Fecha Carga',
      },
      {
        id: 3,
        title: 'Usuario',
      },
      {
        id: 4,
        title: 'Tipo de requerimiento',
      },
      {
        id: 5,
        title: 'Descripción',
      },
      {
        id: 6,
        title: 'Ver detalle',
      },
    ];

  }

  ngOnChanges() {

    this.applyFilter();

  }

  loadInitialData(): void {

    this.getRequerimientos();

  }

  getRequerimientos(): void {

    this.data = [
      {
        archivo: "Caratula",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "Caratula",
        idRequerimiento: 1,
      },
      {
        archivo: "NIFF Generico",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "NIFF Generico",
        idRequerimiento: 2,
      },
      {
        archivo: "Certificado de los estados financieros",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Certificado de los estados financieros",
        idRequerimiento: 3,
      },
      {
        archivo: "Informacion complementaria financiera",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Informacion complementaria financiera",
        idRequerimiento: 4,
      },
      {
        archivo: "Informacion financiera del patrimonio autonomo",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "Informacion financiera del patrimonio autonomo",
        idRequerimiento: 5,
      },
      {
        archivo: "Informacion general estados financieros",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Informacion general estados financieros",
        idRequerimiento: 6,
      },
      {
        archivo: "Estado de situación financiera",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Estado de situación financiera",
        idRequerimiento: 7,
      },
      {
        archivo: "Estado de resultados",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Estado de resultados",
        idRequerimiento: 8,
      },
      {
        archivo: "Estado de resultados integral",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Estado de resultados integral",
        idRequerimiento: 9,
      },
      {
        archivo: "Flujo de efectivo método directo o indirecto",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Flujo de efectivo método directo o indirecto",
        idRequerimiento: 10,
      },
      {
        archivo: "Cambios en el patrimonio",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Cambios en el patrimonio",
        idRequerimiento: 11,
      },
      {
        archivo: "Revelaciones complementarias",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "Revelaciones complementarias",
        idRequerimiento: 12,
      },
      {
        archivo: "Declaración de cumplimiento",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Declaración de cumplimiento",
        idRequerimiento: 13,
      },
      {
        archivo: "Políticas contables",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Políticas contables",
        idRequerimiento: 14,
      },
      {
        archivo: "Dictamen del revisor fiscal",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Dictamen del revisor fiscal",
        idRequerimiento: 15,
      },
      {
        archivo: "Informe de gestión",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Informe de gestión",
        idRequerimiento: 16,
      },
      {
        archivo: "Proyecto de distribución de utilidades para empresas o de excedentes",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Proyecto de distribución de utilidades para empresas o de excedentes",
        idRequerimiento: 17,
      },
      {
        archivo: "Procesos judiciales en contra",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Procesos judiciales en contra",
        idRequerimiento: 18,
      },
      {
        archivo: "Declaración de renta correspondiente al año de la información reportada",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Declaración de renta correspondiente al año de la información reportada",
        idRequerimiento: 19,
      },
      {
        archivo: "Composición accionaria",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Composición accionaria",
        idRequerimiento: 20,
      },
      {
        archivo: "Acta de asamblea de aprobación de estados financieros",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OBLIGATORIO",
        descripcion: "Acta de asamblea de aprobación de estados financieros",
        idRequerimiento: 21,
      }
    ];

    this.applyFilter()
    this.cdRef.detectChanges();

  }

  get info(): string[] {

    return this.data.length > 0
      ? Object.keys(this.data[0])
      : [];

  }

  isDateTime(value: any): boolean {

    const dateRegex = /^\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}$/;

    if (typeof value === 'string' && !dateRegex.test(value)) {
      return false;
    }

    return !isNaN(Date.parse(value));

  }

  formatField(value: any): string {

    if (this.isDateTime(value)) {
      return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');
    }
    return value;

  }

  onPageChanged(event: PageEvent) {

    this.paginatorFilter(event.pageIndex, event.pageSize);

  }

  applyFilter() {

    let datos = this.data;

    if (this.filtro) {
      const [nombre, numero, anio] = this.filtro.split('|');

      datos = datos.filter((item: any) => {

        const matchNombre = nombre ? item.tipoRequerimientoDescripcion.toLowerCase().includes(nombre.toLowerCase()) : true;
        const matchNumero = numero ? item.actoAdministrativo ? item.actoAdministrativo.toString().includes(numero) : false : true;
        const matchAnio = anio ? item.annio ? item.annio.toString().includes(anio) : false : true;

        return matchNombre && matchNumero && matchAnio;

      });

    }

    this.pageLength = datos.length;
    this.paginatorFilter(0, 5, datos);

  }

  paginatorFilter(pageIndex: number, pageSize: number, datos?: any) {

    if (!datos) {
      datos = this.data;
    }
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedData = datos.slice(startIndex, endIndex);

  }

  onButtonClick(id: number) {

    this.router.navigate([''], {
      state: {
        id: id,
      },
    });

  }

}
