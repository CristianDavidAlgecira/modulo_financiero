import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {PaginatorComponent} from "../paginator/paginator.component";
import {Router} from "@angular/router";
import {ApiMFService} from "../../services/api/api-mf.service";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../services/auth/auth.service";
import {ApiService} from "../../services/api/api.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-table-entregas-pendientes',
  standalone: true,
  imports: [NgForOf, NgIf, PaginatorComponent, TooltipModule],
  templateUrl: './table-entregas-pendientes.component.html',
  styleUrl: './table-entregas-pendientes.component.css'
})
export class TableEntregasPendientesComponent {

  @Input() filtro: string = '';
  @Output() requerimientoDetalle: EventEmitter<number> = new EventEmitter<number>();
  data: any = [];
  headers: any = [];
  paginatedData: any = [];
  pageLength: number = 0;

  //datos maestros estado entrega
  estadoEntrega: any;

  constructor(private router: Router, private apiMFService: ApiMFService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private authService: AuthService,) {
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

    this.apiService.getEstadoEntrega().subscribe(response => {
      console.log(response);
      this.estadoEntrega = response.detalle;

    })

    this.getRequerimientos();

  }

  getRequerimientos(): void {

    this.apiMFService.getEntregaPendiente(this.authService.getUserInfo().documento).subscribe(response => {
      console.log(response)
      this.data = response;
      this.paginatorFilter(0, 5, response);
    })

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

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    return this.estadoEntrega.find((estado:any) => estado.id === idEstado).descripcion;
  }


  onButtonClick(id: number) {

    const data = this.paginatedData.find((estado:any) => estado.idRequerimiento === id);
    console.log(data);
    this.router.navigate(['/ver-detalle-entregas-pendientes'], {
      state: {
        info: data,
      },
    });

  }

  onButtonClick1(id: number) {



    this.router.navigate(['/formulario-requerimiento-anulacion'], {
      state: {
        info: id,
      },
    });

  }

  onButtonClick2(id: number) {

    this.router.navigate(['/iniciar-reporte'], {
      state: {
        info: id,
      },
    });

  }

}
