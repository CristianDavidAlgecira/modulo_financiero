import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {TableProgramacionesComponent} from "../../../componentes/table-programaciones/table-programaciones.component";
import {DialogModule} from 'primeng/dialog';
import {ApiMFService} from "../../../services/api/api-mf.service";
import {ApiService} from "../../../services/api/api.service";

@Component({
  selector: 'app-nuevo-requerimiento',
  standalone: true,
  imports: [PrimaryButtonComponent, FileUploadComponent, FormsModule, NgForOf, NgIf, NgClass, TableProgramacionesComponent, DialogModule, CommonModule],
  templateUrl: './nuevo-requerimiento.component.html',
  styleUrl: './nuevo-requerimiento.component.css'
})
export class NuevoRequerimientoComponent implements OnInit {

  // Seleccionable de nombre requerimientos
  nombreRequerimientos: string[] = ['General Anualizada (administrativa, societaria y financiera)', 'Administrativa', 'Societario', 'Financiero', 'Modelo Negocios Especiales', 'Reporte intermedio de información y medición de indicadores', 'Tipo de Vigilado', 'Representante Legal', 'Sedes, Tramos y Puntos de servicio', 'Revisor Fiscal', 'Personal Administrativo', 'Personal Operativo', 'Accionista', 'Parafiscales', 'SISI/PESV Mensual', 'SISI/PESV Trimestral', 'SISI/PESV Anual', 'SISI/PECCIT Mensual', 'SISI/PECCIT Anual'];
  filtroNombreRequerimiento: string = '';

  // Seleccionable de periodos
  periodos: string[] = ['Mensual', 'Bimensual', 'Trimestral', 'Cuatrimestral', 'Semestral', 'Anual'];
  filtroPeriodo: string = '';

  // Seleccionable de estado vigilado
  estados: string[] = ['Activo', 'Inactivo'];
  filtroEstados: string = '';

  // Seleccionable de tipo de programación
  programaciones: string[] = ['Delegatura', 'Programación por dígito NIT', 'Programación individual por NIT'];
  filtroProgramaciones: string = '';

  // Seleccionable de delegatura
  delegaturas: string[] = ['Todas', 'Delegatura de Concesiones e infraestructura', 'Delegatura de puertos', 'Delegatura de Tránsito y Transporte Terrestre Automotor'];
  filtroDelegaturas: string = '';

  // Seleccionable de tipo de vigilado
  vigilados: string[] = [];
  filtroVigilados: string = '';

  // Seleccionable de programación por dígitos NIT
  digitos: string[] = ['Último Dígito', 'Dos últimos dígitos', 'Tres últimos dígitos'];
  filtroDigitos: string = '';

  // Variable para almacenar la fecha
  fechaActual: string = '';

  // Variables para dias requerimiento
  fechaInicio: string = '';
  fechaFin: string = '';
  diasRequerimiento: number = 0;
  minFechaFin: string | null = null;
  fechaFinInvalida: boolean = false;

  // Variables para digitos
  digitoUnico: string = '';
  digitoInicial: string = '';
  digitoFinal: string = '';

  // Variables para programacion individual
  programacionNIT: string = '';
  razonSocial: string = '';

  // Variables para numero Acto Administrativo
  numeroActoAdministrativo: number | null = null;

  // Variables para fecha publicacion
  fechaPublicacion: string = '';

  // Variables para annio vigencia
  annioVigencia: string = '';

  // Variables de archivo acto administrativo
  cargarActoAdmin: any;

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  // Estado para mostrar tabla
  isAdicionar: boolean = false;

  // Headers table
  headers: any = [];
  datosTable: any = [];
  contadorIDTable: number = 0;
  datosEditar: any = [];

  // Modals
  showEditModal: boolean = false;

  // Variables para ver si selecciono las casillas
  touchedFields = {

    filtroNombreRequerimiento: false,
    fechaInicio: false,
    filtroPeriodo: false,
    filtroProgramaciones: false,
    fechaFin: false,
    filtroDelegaturas: false,
    filtroVigilados: false,
    filtroDigitos: false,
    digitoUnico: false,
    digitoInicial: false,
    digitoFinal: false,

  };

  // Deshabilitar cajas seleccionables
  isDisabledDelNit: boolean = false;
  isDisabledTodos: boolean = false;

  // Deshabilitar el boton guardar
  habilitarGuardar: boolean = false;

  // Variables datos maestros
  nombreRequerimientoDatos: any;
  periodoEntregaDatos: any;
  tipoProgramacionDatos: any;
  estadoVigiladosDatos: any;
  delegaturasDatos: any;
  tipoVigiladosDatos: any;
  programacionDigitosDatos: any;


  // Constructor
  constructor(
    private errorService: ErrorService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private apiMFService: ApiMFService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {

    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear().toString();

    this.fechaActual = `${dia}/${mes}/${anio}`;

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

    this.datosMaestros()

  }

  datosMaestros(): void {
    //respuesta nombre req
    this.apiService.getTipoRequerimiento().subscribe((response1: any) => {
      this.nombreRequerimientoDatos = response1 ? response1.detalle : [];
      console.log(':::::', this.nombreRequerimientoDatos)
    });

    // Delgatura
    this.apiService.getDelegaturas().subscribe((response1: any) => {
      this.delegaturasDatos = response1 ? response1.detalle : [];
      console.log(':::::', this.delegaturasDatos)
    });

    // //respuesta nombre vigilados
    // this.apiService.getTipoVigilado().subscribe((response1: any) => {
    //   this.vigiladosDescripcion = response1 ? response1.detalle : [];
    // });
    //
    // //respuesta digitoNIT
    // this.apiService.getTipoDigitoNIT().subscribe((response1: any) => {
    //   this.TipoDigitoNITDescripcion = response1 ? response1.detalle : [];
    // });
    //
    // //respuesta nombre vigilados
    // this.apiService.getEstadoRequerimiento().subscribe((response1: any) => {
    //   this.EstadoReqHashDescripcion = response1 ? response1.detalle : [];
    // });
  }

  OnUploadButton(file: File[]) {

    if (file[0]) {

      this.convertFilesToBase64(file)

        .then((base64Array) => {

          this.cargarActoAdmin = base64Array

        })
        .catch((error) => {

          console.error('Error al convertir los archivos:', error);

        });

    }

  }

  convertFilesToBase64(files: File[]): Promise<string[]> {

    return new Promise((resolve, reject) => {

      const base64Array: string[] = [];

      files.forEach((file, index) => {

        const reader = new FileReader();

        reader.onload = (event: any) => {

          const base64String = event.target.result.split(',')[1];
          base64Array.push(base64String);

          if (base64Array.length === files.length) {
            resolve(base64Array);
          }

        };

        reader.onerror = () => {
          reject(
            new Error(`Error al convertir el archivo ${file.name} a base64.`));
        };
        reader.readAsDataURL(file);
      });
    });
  }

  onDelegaturaChange() {

    const option1 = ['OPERADORES TRANSPORTE MULTIMODAL', 'AUTORIDADES DE TRANSITO', 'EMPRESAS DE TRANSPORTE ESPECIAL', 'EMPRESAS DE TRANSPORTE DE CARGA', 'EMPRESAS DE TRANSPORTE MIXTO NACIONAL (VEHICULO TIPO CARRO)', 'EMPRESAS CARROCERAS PARA VEHÍCULOS DE SERVICIO PÚBLICO DE PASAJEROS', 'SISTEMAS DE TRANSPORTE POR CABLE', 'CENTROS INTEGRALES DE ATENCION A CONDUCTORES', 'EMPRESAS DE PASAJEROS POR CARRETERA', 'ORGANISMOS DE TRANSITO', 'CENTROS DE DIAGNOSTICO AUTOMOTOR', 'CENTROS DE RECONOCIMIENTO DE CONDUCTORES', 'CENTRO DE ENSENANZA AUTOMOVILISTICA', 'SERVICIOS CONEXOS', 'ENTIDADES DESINTEGRADORAS', 'SISTEMA INTEGRADO DE TRANSPORTE MASIVO', 'SISTEMAS INTEGRADO DE TRANSPORTE PÚBLICO', 'SISTEMA ESTRATÉGICO DE TRANSPORTE PÚBLICO', 'SERVICIO DE TRANSPORTE PÚBLICO MASIVO DE PASAJEROS POR METRO LIGERO, TREN LIGERO, TRANVÍA Y TREN-TRAM', 'TRANSPORTE TERRESTRE AUTOMOTOR CON RADIO DE ACCIÓN MUNICIPAL, DISTRITAL O METROPOLITANO', 'CONCESIONARIOS DE SERVICIOS DE LOS ORGANISMOS DE TRÁNSITO'];

    const option2 = ['INFRAESTRUCTURA PORTUARIA MARITIMA', 'INFRAESTRUCTURA PORTUARIA FLUVIAL', 'EMPRESAS DE TRANSPORTE FLUVIAL', 'EMPRESAS DE TRANSPORTE MARITIMO', 'OPERADOR PORTUARIO MARITIMO', 'OPERADOR PORTUARIO FLUVIAL', 'LINEA NAVIERA', 'AGENCIA MARÍTIMA', 'ZONAS DE ENTURNAMIENTO PORTUARIAS', 'INFRAESTRUCTURA NO CONCESIONADA'];

    const option3 = ['INFRAESTRUCTURA AEROPORTUARIA CONCESIONADA', 'INFRAESTRUCTURA AEROPORTUARIA NO CONCESIONADA', 'EMPRESAS DE TRANSPORTE AEREO', 'INFRAESTRUCTURA FERREA CONCESIONADA', 'INFRAESTRUCTURA FERREA NO CONCESIONADA', 'OPERADORES FERREOS', 'TERMINALES DE TRANSPORTE TERRESTRE AUTOMOTOR DE PASAJEROS POR CARRETERA', 'INFRAESTRUCTURA CARRETERA CONCESIONADA', 'INFRAESTRUCTURA CARRETERA NO CONCESIONADA'];

    switch (this.filtroDelegaturas) {
      case '116':
        this.vigilados = ['Todos', ...option1];
        break;
      case '115':
        this.vigilados = ['Todos', ...option2];
        break;
      case '114':
        this.vigilados = ['Todos', ...option3];
        break;
      case '117':
        this.vigilados = ['Todos', ...option1, ...option2, ...option3];
        break;
      case '118':
        this.vigilados = ['Todos'];
        break;
      default:
        this.vigilados = [];
    }

    this.filtroVigilados = '';

  }

  onProgramacionChange(): void {

    this.isAdicionar = false;
    this.setearDatosProgramacion();
    this.datosTable = [];
    this.contadorIDTable = 0;
    this.isDisabledDelNit = false;
    this.isDisabledTodos = false;
    this.habilitarGuardar = false;
    this.filtroDelegaturas = '';
    this.filtroVigilados = '';
    this.filtroDigitos = '';
    this.digitoUnico = '';
    this.digitoInicial = '';
    this.digitoFinal = '';
    this.programacionNIT = '';
    this.razonSocial = '';

  }

  onDigitosChange(): void {
    this.digitoUnico = '';
    this.digitoInicial = '';
    this.digitoFinal = '';
  }

  setearDatosProgramacion(isEdit?: boolean) {

    this.fechaFin = '';
    this.diasRequerimiento = 0;
    this.filtroVigilados = '';
    this.digitoUnico = '';
    this.digitoInicial = '';
    this.digitoFinal = '';

    if (!isEdit) {
      this.filtroDelegaturas = '';
      this.filtroDigitos = '';
    }

  }

  validarAnnio(event: Event): void {

    const input = (event.target as HTMLInputElement);

    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 4);

    this.annioVigencia = input.value;

  }

  validateDigitInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (this.digitoUnico) {

      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);

      this.digitoUnico = input.value;

    } else if (this.programacionNIT) {

      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 14);

      this.programacionNIT = input.value;

    }

  }


  calcularDias(): void {

    if (this.fechaInicio && this.fechaFin) {

      const fechaInicioDate = new Date(this.fechaInicio);
      const fechaFinDate = new Date(this.fechaFin);
      const diffTime = fechaFinDate.getTime() - fechaInicioDate.getTime();
      const diasCalculados = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.diasRequerimiento = diasCalculados > 0 ? diasCalculados : 0;

      if (new Date(this.fechaFin) <= new Date(this.fechaInicio)) {

        this.fechaFinInvalida = true;
        this.fechaFin = '';

      } else {

        this.fechaFinInvalida = false;

      }

    }


  }

  onFechaInicioChange(): void {

    if (this.fechaInicio) {

      const fechaInicioObj = new Date(this.fechaInicio);
      fechaInicioObj.setDate(fechaInicioObj.getDate() + 1);
      this.minFechaFin = fechaInicioObj.toISOString().split('T')[0];
      this.fechaFin = '';

    }

  }

  validarDigito(event: any): void {

    const valor = event.target.value;

    switch (this.filtroDigitos) {

      case 'Último Dígito':
        if (valor < 0 || valor > 9 || valor.length > 1) {
          event.target.value = '';
        }
        break;

      case 'Dos últimos dígitos':
        if (valor < 0 || valor > 99 || valor.length > 2) {
          event.target.value = '';
        }
        break;

      case 'Tres últimos dígitos':
        if (valor < 0 || valor > 999 || valor.length > 3) {
          event.target.value = '';
        }
        break;

      default:
        event.target.value = '';

    }

  }

  validateField(field: string) {

    (this.touchedFields as any)[field] = true;

  }

  submitForm() {

    this.touchedFields = {

      filtroNombreRequerimiento: true,
      fechaInicio: true,
      filtroPeriodo: true,
      filtroProgramaciones: true,
      fechaFin: true,
      filtroDelegaturas: true,
      filtroVigilados: true,
      filtroDigitos: true,
      digitoUnico: true,
      digitoInicial: true,
      digitoFinal: true,

    };

  }

  isFormValid(): boolean {

    if (this.filtroProgramaciones === "Delegatura") {

      return (
        !!this.filtroNombreRequerimiento &&
        !!this.fechaInicio &&
        !!this.filtroPeriodo &&
        !!this.filtroProgramaciones &&
        !!this.fechaFin &&
        !!this.filtroDelegaturas &&
        !!this.filtroVigilados
      );

    } else if (this.filtroProgramaciones === "Programación por dígito NIT") {

      if (this.filtroDigitos === "Último Dígito") {

        return (
          !!this.filtroNombreRequerimiento &&
          !!this.fechaInicio &&
          !!this.filtroPeriodo &&
          !!this.filtroProgramaciones &&
          !!this.fechaFin &&
          !!this.filtroDigitos &&
          !!this.digitoUnico
        );

      } else {

        return (
          !!this.filtroNombreRequerimiento &&
          !!this.fechaInicio &&
          !!this.filtroPeriodo &&
          !!this.filtroProgramaciones &&
          !!this.fechaFin &&
          !!this.filtroDigitos &&
          !!this.digitoInicial &&
          !!this.digitoFinal
        );

      }

    }

    return false;

  }

  btnAdicionar(num: number) {

    this.submitForm()
    this.isAdicionar = true;
    this.isDisabledDelNit = true;
    this.habilitarGuardar = true;
    this.contadorIDTable += 1;

    if (this.filtroVigilados === "Todos") {
      this.isDisabledTodos = true;
    }

    switch (num) {
      case 1:

        this.headers = [{
          id: 0, title: 'ID'
        }, {
          id: 1, title: 'Delegada'
        }, {
          id: 2, title: 'Tipo de Vigilado',
        }, {
          id: 3, title: 'Fecha Inicio',
        }, {
          id: 4, title: 'Fecha Fin',
        }, {
          id: 5, title: 'Días',
        }, {
          id: 6, title: 'Acciones',
        },];

        const datosDelegatura = {
          id: this.contadorIDTable,
          Delegatura: this.filtroDelegaturas || 'Sin dato',
          vigilado: this.filtroVigilados || 'Sin dato',
          fechaInicio: this.fechaInicio || 'Sin dato',
          fechaFin: this.fechaFin || 'Sin dato',
          diasRequerimiento: this.diasRequerimiento || '0',
          acciones: 'Acciones'
        };

        this.datosTable.push(datosDelegatura);
        break;

      case 2:

        this.headers = [{
          id: 0, title: 'ID'
        }, {
          id: 1, title: 'Programación por Dígitos NIT'
        }, {
          id: 2, title: 'Rango Dígitos',
        }, {
          id: 3, title: 'Fecha Inicio',
        }, {
          id: 4, title: 'Fecha Fin',
        }, {
          id: 5, title: 'Días',
        }, {
          id: 6, title: 'Acciones',
        },];

        const datosDigitoNit = {
          id: this.contadorIDTable,
          programacionNIT: this.filtroDigitos || 'Sin dato',
          rango: `${this.digitoInicial}-${this.digitoFinal}` || 'Sin dato',
          fechaInicio: this.fechaInicio || 'Sin dato',
          fechaFin: this.fechaFin || 'Sin dato',
          diasRequerimiento: this.diasRequerimiento || '0',
          acciones: 'Acciones'
        };

        this.datosTable.push(datosDigitoNit);
        break;

    }

    this.cdr.detectChanges();

    this.fechaFin = '';
    this.filtroVigilados = '';
    this.digitoUnico = '';
    this.digitoInicial = '';
    this.digitoFinal = '';

  }

  openEditModal(data: any) {

    this.datosEditar = data;
    this.fechaFin = data.fechaFin || '';
    this.fechaInicio = data.fechaInicio || '';
    this.diasRequerimiento = data.diasRequerimiento || 0;
    this.filtroDelegaturas = data.Delegatura || '';
    this.filtroVigilados = data.vigilado || '';
    const [digitoInicial, digitoFinal] = data.rango ? data.rango.split("-") : '';
    this.digitoInicial = digitoInicial;
    this.digitoFinal = digitoFinal;
    this.filtroDigitos = data.programacionNIT || '';
    this.showEditModal = true;

  }

  closeModal(isEdit: boolean = false) {

    this.setearDatosProgramacion(isEdit);
    this.showEditModal = false;

  }

  editDataTable() {

    const index = this.datosTable.findIndex((dato: any) => dato.id === this.datosEditar.id);

    const datosDelegatura = {

      id: this.datosEditar.id,
      Delegatura: this.filtroDelegaturas || 'Sin dato',
      vigilado: this.filtroVigilados || 'Sin dato',
      fechaInicio: this.fechaInicio || 'Sin dato',
      fechaFin: this.fechaFin || 'Sin dato',
      diasRequerimiento: this.diasRequerimiento || '0',
      acciones: 'Acciones'

    };

    const datosDigitoNit = {

      id: this.datosEditar.id,
      programacionNIT: this.filtroDigitos || 'Sin dato',
      rango: `${this.digitoInicial}-${this.digitoFinal}` || 'Sin dato',
      fechaInicio: this.fechaInicio || 'Sin dato',
      fechaFin: this.fechaFin || 'Sin dato',
      diasRequerimiento: this.diasRequerimiento || '0',
      acciones: 'Acciones'

    };

    if (index !== -1) {

      const updatedData = this.filtroProgramaciones === 'Delegatura' ? datosDelegatura : datosDigitoNit;
      Object.assign(this.datosTable[index], updatedData);

    }

    this.closeModal(true);
    this.cdr.detectChanges();

  }

  deleteItem(item: any) {

    this.datosTable = this.datosTable.filter((dato: any) => dato.id !== item.id);
    if (this.datosTable.length == 0) {
      this.isAdicionar = false;
      this.setearDatosProgramacion();
      this.contadorIDTable = 0;
      this.isDisabledDelNit = false;
      this.isDisabledTodos = false;
      this.habilitarGuardar = false;
      this.filtroDelegaturas = '';
      this.filtroVigilados = '';
      this.digitoUnico = '';
      this.digitoInicial = '';
      this.digitoFinal = '';
      this.programacionNIT = '';
      this.razonSocial = '';
    }

    this.cdr.detectChanges();

  }

  onGuardar() {

    let fechaFinal = new Date(0);

    let delegatura: Array<{
      idDelegatura: number,
      idTipoVigilado: number,
      fechaFin: any,
      estado: boolean,
      estadoRequerimiento: number
    }> = [];

    let digitoNit;

    if (this.filtroProgramaciones === 'Delegatura') {

      this.datosTable.forEach((dato: any) => {
        delegatura.push({

          idDelegatura: 111,
          idTipoVigilado: 222,
          fechaFin: dato.fechaFin,
          estado: true,
          estadoRequerimiento: 285

        });

        const fechaActual = new Date(dato.fechaFin);
        fechaFinal = fechaFinal >= fechaActual ? fechaFinal : fechaActual;

      });

      console.log("Fecha final mayor:", fechaFinal);

    }

    let data = {
      "nombreRequerimiento": this.filtroNombreRequerimiento,
      "fechaInicio": this.fechaInicio,
      "fechaFin": fechaFinal,
      "fechaCreacion": this.fechaActual,
      "periodoEntrega": this.filtroPeriodo,
      "tipoProgramacion": this.filtroProgramaciones,
      "actoAdministrativo": this.numeroActoAdministrativo,
      "fechaPublicacion": this.fechaPublicacion,
      "annioVigencia": this.annioVigencia,
      "documentoActo": this.cargarActoAdmin,
      "estadoVigilado": this.filtroEstados,
      "estadoRequerimiento": 285,
      "estado": true,
      "delegaturas": [
        delegatura
      ],
      "digitoNIT": [
        {
          "idNumeroDigitos": 0,
          "inicioRango": "string",
          "finRango": "string",
          "fechaFin": "2024-11-08",
          "idRequerimiento": 0,
          "estado": true,
          "estadoRequerimiento": 285
        }
      ]
    };

    console.log(data)

    this.apiMFService.createRequerimientoAPI(data).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta, por ejemplo:
        // this.ShowLoadingModal = false;
        // this.showFinalModal = true;
        this.router.navigate(['/administracion']);
      },
      (error) => {
        // this.ShowLoadingModal = false;
        // this.showErrorModal = true;
        // Manejo del error
        console.error('Error al enviar los datos:', error);
      }
    );

  }

  navigateToAdministracion() {

    this.router.navigate(['/administracion']);

  }

}
