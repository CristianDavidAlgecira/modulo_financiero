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
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "NIFF Generico",
        idRequerimiento: 2,
      },
      {
        archivo: "Certificado de los estados financieros",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "Certificado de los estados financieros",
        idRequerimiento: 3,
      },
      {
        archivo: "Informacion complementaria financiera",
        fechaCarga: "2024-11-08",
        usuario: "Cristian",
        tipoRequerimientoOpcional: "OPCIONAL",
        descripcion: "Informacion complementaria financiera",
        idRequerimiento: 2,
      },

    ]
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
