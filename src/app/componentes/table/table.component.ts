import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule, formatDate, NgForOf, NgIf} from '@angular/common';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit() {

    this.data = {
      totalElements: 0,
      totalPages: 0,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 0,
        offset: 0,
        sort: [
          {
            direction: 'string',
            nullHandling: 'string',
            ascending: true,
            property: 'string',
            ignoreCase: true,
          },
        ],
        unpaged: true,
      },
      size: 0,
      content: [
        {
          nombreRequerimiento: 'General anualizada',
          numeroRequerimiento: '413',
          anio: '2024',
          fechaInicio: '2024-10-15T12:42:49.226Z',
          fechaFin: '2024-10-15T12:42:49.226Z',
          diasFaltantes: '0',
          estado: 'cancelado',
          detalle: '413',
        },
        {
          nombreRequerimiento: 'Modelo de negocios especiales',
          numeroRequerimiento: '398',
          anio: '2023',
          fechaInicio: '2023-10-15T12:42:49.226Z',
          fechaFin: '2023-10-15T12:42:49.226Z',
          diasFaltantes: '10',
          estado: 'proceso',
          detalle: '398',
        },
        {
          nombreRequerimiento: 'Periodos intermedios',
          numeroRequerimiento: '390',
          anio: '2022',
          fechaInicio: '2022-10-15T12:42:49.226Z',
          fechaFin: '2022-10-15T12:42:49.226Z',
          diasFaltantes: '0',
          estado: 'finalizado',
          detalle: '390',
        },
        {
          nombreRequerimiento: 'Periodos intermedios',
          numeroRequerimiento: '390',
          anio: '2022',
          fechaInicio: '2022-10-15T12:42:49.226Z',
          fechaFin: '2022-10-15T12:42:49.226Z',
          diasFaltantes: '0',
          estado: 'finalizado',
          detalle: '390',
        },
        {
          nombreRequerimiento: 'Periodos intermedios',
          numeroRequerimiento: '390',
          anio: '2022',
          fechaInicio: '2022-10-15T12:42:49.226Z',
          fechaFin: '2022-10-15T12:42:49.226Z',
          diasFaltantes: '0',
          estado: 'finalizado',
          detalle: '390',
        },
        {
          nombreRequerimiento: 'Modelo de negocios especiales',
          numeroRequerimiento: '398',
          anio: '2023',
          fechaInicio: '2023-10-15T12:42:49.226Z',
          fechaFin: '2023-10-15T12:42:49.226Z',
          diasFaltantes: '10',
          estado: 'proceso',
          detalle: '398',
        },
      ],
      number: 0,
      sort: [
        {
          direction: 'string',
          nullHandling: 'string',
          ascending: true,
          property: 'string',
          ignoreCase: true,
        },
      ],
      numberOfElements: 0,
      first: true,
      last: true,
      empty: true,
    };

    this.headers = [
      {
        id: 1,
        title: 'Nombre del requerimiento',
      },
      {
        id: 2,
        title: 'Número del requerimiento',
      },
      {
        id: 3,
        title: 'Año',
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

    this.applyFilter();

  }

  ngOnChanges() {

    this.applyFilter();

  }

  get info(): string[] {

    return this.data.content.length > 0
      ? Object.keys(this.data.content[0])
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

    let datos;

    if (this.filtro) {
      const filterLower = this.filtro.toLowerCase();
      datos = this.data.content.filter((item: any) =>
        item.nombreRequerimiento.toLowerCase().includes(filterLower) ||
        item.numeroRequerimiento.toString().toLowerCase().includes(filterLower) ||
        item.anio.toString().includes(filterLower)
      );
      this.pageLength = datos.length;
    } else {
      datos = this.data.content;
      this.pageLength = this.data.content.length;
    }

    this.paginatorFilter(0, 5, datos)

  }

  paginatorFilter(pageIndex: number, pageSize: number, datos?: any) {

    if (!datos) {
      datos = this.data.content;
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

}
