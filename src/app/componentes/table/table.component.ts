import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule, formatDate, NgForOf, NgIf} from '@angular/common';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ApiMFService} from "../../services/api/api-mf.service";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnChanges {

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
    private cdRef: ChangeDetectorRef, // Inyecta el ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.loadInitialData();

    this.headers = [
      {
        id: 1,
        title: 'Nombre del requerimiento',
      },
      {
        id: 2,
        title: 'Número del acto administrativo',
      },
      {
        id: 3,
        title: 'Año de vigencia',
      },
      {
        id: 4,
        title: 'Fecha inicio',
      },
      {
        id: 5,
        title: 'Fecha fin',
      },
      {
        id: 6,
        title: 'Días faltantes',
      },
      {
        id: 7,
        title: 'Estado',
      },
      {
        id: 8,
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

    this.apiMFService.getRequerimientosAPI()
      .subscribe(
        (response) => {
          console.log(response);
          this.data = response;
          this.applyFilter()
          this.cdRef.detectChanges(); // Forzar la detección de cambios
        },
        (error) => {
          this.cdRef.detectChanges(); // Forzar la detección de cambios
          console.error('Error fetching user data', error);
        }
      );

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
        const matchNombre = nombre ? item.nombreRequerimiento.toLowerCase().includes(nombre.toLowerCase()) : true;
        const matchNumero = numero ? item.numeroRequerimiento.toString().includes(numero) : true;
        const matchAnio = anio ? item.anio.toString().includes(anio) : true;

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

    this.router.navigate(['/detalle-requerimientos'], {
      state: {
        id: id,
      },
    });

  }

  calcularDias(startDate: string, endDate: string): number {

    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMs = end.getTime() - start.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return Math.round(differenceInDays);

  }

}
