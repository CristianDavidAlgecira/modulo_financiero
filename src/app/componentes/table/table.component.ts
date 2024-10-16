import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, formatDate, NgForOf, NgIf } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  constructor(private router: Router) {}

  data: any = [];
  headers: any = [];
  paginatedData: any = [];
  @Output() requerimientoDetalle: EventEmitter<number> =
    new EventEmitter<number>();

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

    this.paginatorFilter(0, 5);
  }

  get info(): string[] {
    return this.data.content.length > 0
      ? Object.keys(this.data.content[0])
      : [];
  }

  isDateTime(value: any): boolean {
    // Verifica si el valor es una cadena en un formato de fecha válido (como yyyy-mm-dd o dd/mm/yyyy)
    const dateRegex = /^\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}$/;

    // Si el valor es una cadena que no coincide con el formato de fecha, no es una fecha
    if (typeof value === 'string' && !dateRegex.test(value)) {
      return false;
    }

    // Si el valor pasa el regex o no es una cadena, intenta parsearlo como fecha
    return !isNaN(Date.parse(value));
  }

  formatField(value: any): string {
    // Si el valor es una fecha válida, formatearlo

    if (this.isDateTime(value)) {
      return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');
    }
    return value;
  }

  onPageChanged(event: PageEvent) {
    this.paginatorFilter(event.pageIndex, event.pageSize);
  }

  paginatorFilter(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedData = this.data.content.slice(startIndex, endIndex);
  }

  //Metodo para mostrar registro guardado
  onButtonClick(id: number) {
    this.router.navigate(['/detalle-requerimientos'], {
      state: {
        id: id,
      },
    });
  }
}
