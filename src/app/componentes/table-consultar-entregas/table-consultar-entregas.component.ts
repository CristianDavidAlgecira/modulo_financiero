import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ApiMFService} from "../../services/api/api-mf.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {PaginatorComponent} from "../paginator/paginator.component";
import {catchError, combineLatest, map, mergeMap, of, tap} from "rxjs";
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {TooltipModule} from "primeng/tooltip";
import { ApiMuvService } from '../../services/api/api-muv.service';

@Component({
  selector: 'app-table-consultar-entregas',
  standalone: true, imports: [NgForOf, NgIf, PaginatorComponent, TooltipModule],
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

  //ruta segun niff y prog
  rutaDetalles: string = '';
  rutaReporte: string = '';
  GrupoNif: number = 0;

  constructor(private router: Router, private apiService: ApiService, private apiMFService: ApiMFService, private cdRef: ChangeDetectorRef, private authService: AuthService, private apiMuvService: ApiMuvService) {
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
      id: 7, title: 'Fecha de entrega',
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
      estados: this.apiService.getEstadoEntrega().pipe(catchError(() => of({ detalle: [] }))),
      entregas: this.apiMFService
      .getEntregaFinalizada(this.authService.getUserInfo().documento)
      .pipe(catchError(() => of([]))),
    })
    .pipe(
      tap(({ estados, entregas }) => {
        this.estadoEntrega = estados.detalle || [];
        this.data = entregas || [];

      }),
      mergeMap(() => this.updateDataWithExcelInfo()) // Flujo reactivo para actualización
    )
    .subscribe({
      next: () => {
        this.applyFilter();
        this.cdRef.markForCheck();
      },
      error: (err) => console.error('Error al cargar datos:', err),
    });

    //detalles
    this.apiMuvService.getDetallesByNIT(this.authService.getUserInfo().documento).subscribe((response: any) => {
      if(response.idClasificacionGrupoNiif === 136) {
        this.GrupoNif = 1;
      } else if(response.idClasificacionGrupoNiif === 137) {
        this.GrupoNif = 2;
      } else if(response.idClasificacionGrupoNiif === 138) {
        this.GrupoNif = 3;
      } else if(response.idClasificacionGrupoNiif === 139) {
        // GRUPO 414
        this.GrupoNif = 4;
      } else if(response.idClasificacionGrupoNiif === 140) {
        //GRUPO 533
        this.GrupoNif = 5;
      } else if(response.idClasificacionGrupoNiif === 141) {
        //GRUPO ENCHNM
        this.GrupoNif = 6;

      }
    })

  }

  private updateDataWithExcelInfo() {
    return combineLatest(
      this.data.map((item:any) =>
        this.apiMFService
        .getIdentificacionVigilado(item.nit, item.idHeredado)
        .pipe(
          map((response) => {
            // Mantener todas las propiedades de item y actualizar solo las necesarias
            console.log(response);

            return item; // Devolver el objeto actualizado
          }),
          catchError(() => {
            item.hasExcel = false;
            return of(null);
          })
        )
      )
    );
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
    console.log(datos);
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedData = datos.slice(startIndex, endIndex);

  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    return this.estadoEntrega.find((estado: any) => estado.id === idEstado).descripcion;
  }

  obtenerRuta(data: any, ruta: number): string {

    //switch de requerimiento con link
    switch(data.nombreRequerimiento) {
      //societario
      case 261:
        return '';
        break;
      //financiero
      case 262:
        //cargue de archivo para 414 y 533
        if(this.GrupoNif === 4 || this.GrupoNif === 5) {
          return '';
        } else {
          if(ruta == 1) {
            return '/ver-detalle-consultar-entregas';
          } else if(ruta == 2) {
            return '/formulario-requerimiento-anulacion';
          }
        }


        break;
      //Modelo neg especiales
      case 263:
        return '';
        break;
      //Reporte interm de info
      case 264:
        return '';
        break;
      //Administrativa
      case 292:
        return '';
        break;
    }

    return '';

  }

  //ver detalles ruta 1
  onButtonClick(id: number) {
    const data = this.paginatedData.find((estado: any) => estado.idRequerimiento === id);
    console.log(data);

    const rutaInfo = this.obtenerRuta(data, 1);

    this.router.navigate([rutaInfo], {
      state: {
        info: data,
      },
    });

  }


  //anulacion 2
  onButtonClick1(id: number) {

    const data = this.paginatedData.find((estado: any) => estado.idRequerimiento === id);
    console.log(data);

    const rutaInfo = this.obtenerRuta(data, 2);

    this.router.navigate([rutaInfo], {
      state: {
        info: id,
      },
    });

  }


}
