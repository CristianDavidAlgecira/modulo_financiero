import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ApiMFService} from "../../services/api/api-mf.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {PaginatorComponent} from "../paginator/paginator.component";

@Component({
  selector: 'app-table-otros-aspectos',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PaginatorComponent
  ],
  templateUrl: './table-otros-aspectos.component.html',
  styleUrl: './table-otros-aspectos.component.css'
})
export class TableOtrosAspectosComponent implements OnInit, OnChanges {

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
        title: 'Estado de situación financiera',
      },
      {
        id: 2,
        title: '2022',
      },
      {
        id: 3,
        title: '2023',
      },
      {
        id: 4,
        title: 'Variación',
      },
      {
        id: 5,
        title: 'Análisis Horizontal',
      },
      {
        id: 6,
        title: 'Análisis Vertical',
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
        estadoSituacion: "TOTAL DE ACTIVOS",
        isExpanded: false,
        children: [
          {
            estadoSituacion: "ACTIVOS CORRIENTES TOTALES",
            anioMenor: "$4.164.545.964.178,00",
            anioMayor: "$4.750.844.323.548,00",
            variacion: "$586.298.359.370,00",
            analisisHorizontal: "14,08%",
            analisisVertical: "25,09%",
          },
          {
            estadoSituacion: "TOTAL DE ACTIVOS NO CORRIENTES",
            anioMenor: "$13.722.425.273.820,00",
            anioMayor: "$14.187.166.367.066,00",
            variacion: "$464.741.093.246,00",
            analisisHorizontal: "3,39%",
            analisisVertical: "74,91%",
          },
        ],
      },
      {
        estadoSituacion: "TOTAL PASIVOS",
        isExpanded: false,
        children: [
          {
            estadoSituacion: "PASIVOS CORRIENTES TOTALES",
            anioMenor: "$10.308.873.171.742,00",
            anioMayor: "$9.524.338.675.174,00",
            variacion: "($784.534.496.568,00)",
            analisisHorizontal: "-7,61%",
            analisisVertical: "47,52%",
          },
          {
            estadoSituacion: "TOTAL DE PASIVOS NO CORRIENTES",
            anioMenor: "$9.024.779.252.500,00",
            anioMayor: "$10.520.556.254.883,00",
            variacion: "$1.495.777.002.383,00",
            analisisHorizontal: "16,57%",
            analisisVertical: "52,48%",
          },
        ],
      },
      {
        estadoSituacion: "TOTAL DE PATRIMONIO Y PASIVOS",
        isExpanded: false,
        children: [
          {
            estadoSituacion: "CAPITAL EMITIDO",
            anioMenor: "$8.936.703.350,00",
            anioMayor: "$8.936.703.350,00",
            variacion: "$0,00",
            analisisHorizontal: "0%",
            analisisVertical: "0,05%",
          },
          {
            estadoSituacion: "GANANCIAS ACUMULADAS",
            anioMenor: "($4.200.745.209.000,00)",
            anioMayor: "($3.976.012.620.591,00)",
            variacion: "$224.732.588.409,00",
            analisisHorizontal: "(5,35%)",
            analisisVertical: "(20,99%)",
          },
          {
            estadoSituacion: "PRIMA DE EMISIÓN",
            anioMenor: "$2.604.329.244.406,00",
            anioMayor: "$2.604.329.244.406,00",
            variacion: "$594,00",
            analisisHorizontal: "0%",
            analisisVertical: "13,75%",
          },
          {
            estadoSituacion: "ACCIONES PROPIAS EN CARTERA",
            anioMenor: "$0,00",
            anioMayor: "$0,00",
            variacion: "$0,00",
            analisisHorizontal: "100%",
            analisisVertical: "0%",
          },
          {
            estadoSituacion: "INVERSIÓN SUPLEMENTARIA AL CAPITAL ASIGNADO",
            anioMenor: "$0,00",
            anioMayor: "$0,00",
            variacion: "$0,00",
            analisisHorizontal: "100%",
            analisisVertical: "0%",
          },
          {
            estadoSituacion: "OTRAS PARTICIPACIONES EN EL PATRIMONIO",
            anioMenor: "$0,00",
            anioMayor: "$0,00",
            variacion: "$0,00",
            analisisHorizontal: "100%",
            analisisVertical: "0%",
          },
          {
            estadoSituacion: "OTRAS RESERVAS",
            anioMenor: "$140.798.075.000,00",
            anioMayor: "$255.862.432.798,00",
            variacion: "$115.064.357.798,00",
            analisisHorizontal: "81,72%",
            analisisVertical: "1,35%",
          },
          {
            estadoSituacion: "PATRIMONIO TOTAL",
            anioMenor: "($1.446.681.186.244,00)",
            anioMayor: "($1.106.884.239.443,00)",
            variacion: "$339.796.946.801,00",
            analisisHorizontal: "(23,49%)",
            analisisVertical: "(5,84%)",
          },
        ],
      },
      {
        estadoSituacion: "ESTADO DE RESULTADOS",
        isExpanded: false,
        children: [
          {
            estadoSituacion: "INGRESOS DE ACTIVIDADES ORDINARIAS",
            anioMenor: "$0,00",
            anioMayor: "$26.766.027.180,00",
            variacion: "$26.766.027.180,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "INGRESOS DERIVADOS DE LA ACTIVIDAD DEL TRANSPORTE",
            anioMenor: "$0,00",
            anioMayor: "$15.978.773.403,00",
            variacion: "$15.978.773.403,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "INGRESOS DERIVADOS DE OTRAS ACTIVIDADES",
            anioMenor: "$0,00",
            anioMayor: "$10.787.253.777,00",
            variacion: "$10.787.253.777,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "COSTO DE VENTAS",
            anioMenor: "$0,00",
            anioMayor: "$9.293.981.078,00",
            variacion: "$9.293.981.078,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GANANCIA BRUTA",
            anioMenor: "$0,00",
            anioMayor: "$17.472.046.102,00",
            variacion: "$17.472.046.102,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "OTROS INGRESOS",
            anioMenor: "$0,00",
            anioMayor: "$699.626.625,00",
            variacion: "$699.626.625,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "COSTOS DE DISTRIBUCIÓN",
            anioMenor: "$0,00",
            anioMayor: "$913.929.644,00",
            variacion: "$913.929.644,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GASTOS DE ADMINISTRACIÓN",
            anioMenor: "$0,00",
            anioMayor: "$15.701.767.357,00",
            variacion: "$15.701.767.357,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "OTROS GASTOS",
            anioMenor: "$0,00",
            anioMayor: "$37.984.372,00",
            variacion: "$37.984.372,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "OTRAS GANANCIAS - PÉRDIDAS",
            anioMenor: "$0,00",
            anioMayor: "($15.954.054.748,00)",
            variacion: "($15.954.054.748,00)",
            analisisHorizontal: "0%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "INGRESOS FINANCIEROS",
            anioMenor: "$0,00",
            anioMayor: "$1.471.537.447,00",
            variacion: "$1.471.537.447,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "COSTOS FINANCIEROS",
            anioMenor: "$0,00",
            anioMayor: "$207.399.250,00",
            variacion: "$207.399.250,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion:
              "PARTICIPACIÓN EN LAS GANANCIAS - PÉRDIDAS - DE ASOCIADAS Y NEGOCIOS CONJUNTOS QUE SE CONTABILICEN UTILIZANDO EL MÉTODO DE LA PARTICIPACIÓN",
            anioMenor: "$0,00",
            anioMayor: "$0,00",
            variacion: "$0,00",
            analisisHorizontal: "100%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GANANCIA - PÉRDIDA - ANTES DE IMPUESTOS",
            anioMenor: "$0,00",
            anioMayor: "$2.782.129.551,00",
            variacion: "$2.782.129.551,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "INGRESO - GASTO - POR IMPUESTOS",
            anioMenor: "$0,00",
            anioMayor: "($1.086.743.113,00)",
            variacion: "($1.086.743.113,00)",
            analisisHorizontal: "0%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GANANCIA - PÉRDIDA - PROCEDENTE DE OPERACIONES CONTINUADAS",
            anioMenor: "$0,00",
            anioMayor: "$1.695.386.438,00",
            variacion: "$1.695.386.438,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GANANCIA - PÉRDIDA - PROCEDENTE DE OPERACIONES DISCONTINUADAS",
            anioMenor: "$0,00",
            anioMayor: "$0,00",
            variacion: "$0,00",
            analisisHorizontal: "100%",
            analisisVertical: "0,0%",
          },
          {
            estadoSituacion: "GANANCIA - PÉRDIDA",
            anioMenor: "$0,00",
            anioMayor: "$1.695.386.438,00",
            variacion: "$1.695.386.438,00",
            analisisHorizontal: "200%",
            analisisVertical: "0,0%",
          },
        ],
      },
    ];

    this.applyFilter();
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

}
