import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ApiMFService} from "../../services/api/api-mf.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {PaginatorComponent} from "../paginator/paginator.component";
import {catchError, combineLatest, map, mergeMap, of, tap} from "rxjs";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-table-consultar-entregas',
  standalone: true,
  imports: [NgForOf, NgIf, PaginatorComponent],
  templateUrl: './table-consultar-entregas.component.html',
  styleUrl: './table-consultar-entregas.component.css'
})
export class TableConsultarEntregasComponent implements OnInit, OnChanges {

  @Input() filtro: string = '';
  @Output() requerimientoDetalle: EventEmitter<number> = new EventEmitter<number>();
  data: any = [];
  headers: any = [];
  paginatedData: any = [];
  pageLength: number = 0;
  //datos maestros estado entrega
  estadoEntrega: any;

  constructor(private router: Router, private apiService: ApiService, private apiMFService: ApiMFService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
  }

  ngOnInit() {

    this.loadInitialData();

    this.headers = [{
      id: 1, title: 'Nombre del requerimiento',
    }, {
      id: 2, title: 'Año',
    }, {
      id: 3, title: 'Fecha inicio',
    }, {
      id: 4, title: 'Fecha fin',
    }, {
      id: 5, title: 'Fecha limite',
    }, {
      id: 6, title: 'Número del acto administrativo',
    }, {
      id: 7, title: 'Fecha de publicación',
    }, {
      id: 8, title: 'Estado',
    }, {
      id: 9, title: 'Ver detalle',
    },];

  }

  ngOnChanges() {

    this.applyFilter();

  }

  loadInitialData(): void {

    combineLatest({
      estados: this.apiService.getEstadoEntrega().pipe(catchError(() => of({detalle: []}))),
      entregas: this.apiMFService.getEntregaFinalizada(this.authService.getUserInfo().documento).pipe(catchError(() => of([]))),
    }).pipe(tap(({estados, entregas}) => {
        this.estadoEntrega = estados.detalle || [];
        this.data = entregas || [];
      }), mergeMap(() => this.updateDataWithExcelInfo()) // Flujo reactivo para actualización
    ).subscribe({
      next: () => {
        this.applyFilter();
        this.cdRef.markForCheck();
      }, error: (err) => console.error('Error al cargar datos:', err),
    });
  };

  private updateDataWithExcelInfo() {
    return combineLatest(
      this.data.map((item: any) =>
        this.apiMFService
        .getIdentificacionVigilado(item.nit, item.idHeredado)
        .pipe(map((response) =>
          (item.hasExcel = response && response.length > 0)),
          catchError(() => {
            item.hasExcel = false;
            return of(null);
          }
          )
        )
      )
    );
  }

  getRequerimientos(): void {

    this.data = [{
      tipoRequerimientoDescripcion: "Financiero",
      annio: 2024,
      fechaInicio: "2024-11-08",
      fechaFin: "2024-11-22",
      fechaLimite: "2024-11-22",
      actoAdministrativo: 434,
      fechaEntrega: "2024-11-22",
      estadoRequerimientoDescripcion: "En proceso",
      idRequerimiento: 1,
    }, {
      tipoRequerimientoDescripcion: "Financiero",
      annio: 2024,
      fechaInicio: "2024-11-08",
      fechaFin: "2024-11-22",
      fechaLimite: "2024-11-22",
      actoAdministrativo: 434,
      fechaEntrega: "2024-11-22",
      estadoRequerimientoDescripcion: "En proceso",
      idRequerimiento: 2,
    }, {
      tipoRequerimientoDescripcion: "Financiero",
      annio: 2024,
      fechaInicio: "2024-11-08",
      fechaFin: "2024-11-22",
      fechaLimite: "2024-11-22",
      actoAdministrativo: 434,
      fechaEntrega: "2024-11-22",
      estadoRequerimientoDescripcion: "En proceso",
      idRequerimiento: 3,
    }, {
      tipoRequerimientoDescripcion: "Financiero",
      annio: 2024,
      fechaInicio: "2024-11-08",
      fechaFin: "2024-11-22",
      fechaLimite: "2024-11-22",
      actoAdministrativo: 434,
      fechaEntrega: "2024-11-22",
      estadoRequerimientoDescripcion: "En proceso",
      idRequerimiento: 4,
    }, {
      tipoRequerimientoDescripcion: "Financiero",
      annio: 2024,
      fechaInicio: "2024-11-08",
      fechaFin: "2024-11-22",
      fechaLimite: "2024-11-22",
      actoAdministrativo: 434,
      fechaEntrega: "2024-11-22",
      estadoRequerimientoDescripcion: "En proceso",
      idRequerimiento: 5,
    }]
    this.applyFilter()
    this.cdRef.detectChanges();

  }

  get info(): string[] {

    return this.data.length > 0 ? Object.keys(this.data[0]) : [];

  }

  isDateTime(value: any): boolean {

    const dateRegex = /^\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}$/;

    if(typeof value === 'string' && !dateRegex.test(value)) {
      return false;
    }

    return !isNaN(Date.parse(value));

  }

  formatField(value: any): string {

    if(this.isDateTime(value)) {
      return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');
    }
    return value;

  }

  onPageChanged(event: PageEvent) {

    this.paginatorFilter(event.pageIndex, event.pageSize);

  }

  applyFilter() {

    let datos = this.data;

    if(this.filtro) {
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

    if(!datos) {
      datos = this.data;
    }
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedData = datos.slice(startIndex, endIndex);

  }

  onButtonClick(id: number) {

    this.router.navigate(['/ver-detalle-consultar-entregas'], {
      state: {
        id: id,
      },
    });

  }

}
