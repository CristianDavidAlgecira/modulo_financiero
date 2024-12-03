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
import {catchError, of, timeout} from "rxjs";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-nuevo-requerimiento',
  standalone: true,
  imports: [PrimaryButtonComponent, FileUploadComponent, FormsModule, NgForOf, NgIf, NgClass, TableProgramacionesComponent, DialogModule, CommonModule, AlertComponent],
  templateUrl: './nuevo-requerimiento.component.html',
  styleUrl: './nuevo-requerimiento.component.css'
})
export class NuevoRequerimientoComponent implements OnInit {

  // Seleccionable de nombre requerimientos
  filtroNombreRequerimiento: string = '';

  // Seleccionable de periodos
  filtroPeriodo: string = '';

  // Seleccionable de estado vigilado
  filtroEstados: string = '';

  // Seleccionable de tipo de programación
  filtroProgramaciones: string = '';

  // Seleccionable de delegatura
  filtroDelegaturas: string = '';

  // Seleccionable de tipo de vigilado
  vigilados: any = [];
  filtroVigilados: string = '';

  // Seleccionable de programación por dígitos NIT
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
  showLoadingModal: boolean = false;
  showFinalModal: boolean = false;
  showErrorModal: boolean = false;


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
  constructor(private errorService: ErrorService, private router: Router, private cdr: ChangeDetectorRef, private apiMFService: ApiMFService, private apiService: ApiService, private apiMUVService: ApiMuvService,) {
  }

  ngOnInit() {

    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear().toString();

    this.fechaActual = `${dia}-${mes}-${anio}`;

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

    this.datosMaestros()

  }

  datosMaestros(): void {

    // Respuesta nombre requerimiento
    this.apiService.getTipoRequerimiento().subscribe((response1: any) => {
      const opcionesPermitidas = [
        "Administrativa",
        "Financiero",
        "General Anualizada (administrativa,societaria y financiera)",
        "Modelo Negocios Especiales",
        "Reporte intermedio de información y medición de indicadores",
        "Societario"
      ];
      this.nombreRequerimientoDatos = response1 ? response1.detalle.filter((registro: any) =>
        opcionesPermitidas.includes(registro.descripcion)
      ) : [];
    });


    // Respuesta periodo entrega
    this.apiService.getPeriodoEntrega().subscribe((response1: any) => {
      this.periodoEntregaDatos = response1 ? response1.detalle : [];
    });

    // Respuesta tipo programacion
    this.apiService.getTipoProgramacion().subscribe((response1: any) => {
      this.tipoProgramacionDatos = response1 ? response1.detalle.filter((registro: any) => registro.descripcion !== "Todos los Vigilados") : [];
    });

    // Respuesta estado vigilado
    this.apiService.getEstadoVigilado().subscribe((response1: any) => {
      this.estadoVigiladosDatos = response1 ? response1.detalle : [];
    });

    // Respuesta delgatura
    this.apiService.getDelegaturas().subscribe((response1: any) => {
      this.delegaturasDatos = response1 ? response1.detalle.filter((registro: any) => registro.descripcion !== "Delegatura de protección a usuarios") : [];
    });

    // Respuesta programacion digitos
    this.apiService.getTipoDigitoNIT().subscribe((response1: any) => {
      this.programacionDigitosDatos = response1 ? response1.detalle : [];
    });

    // obtener tipo vigilado
    this.apiMUVService.getTipoVigilados(0).subscribe((response1: any) => {
      this.tipoVigiladosDatos = response1 ? response1 : [];
    });


  }


  OnUploadButton(file: File[]) {

    if (file[0]) {

      this.convertFilesToBase64(file).then((base64Array) => {

        this.cargarActoAdmin = base64Array[0]

      }).catch((error) => {

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
          reject(new Error(`Error al convertir el archivo ${file.name} a base64.`));
        };
        reader.readAsDataURL(file);
      });
    });
  }

  onDelegaturaChange() {
    let num = 0;
    this.vigilados = [];


    this.vigilados.push({
      id: 49, value: 'Todos'
    });

    if (this.filtroDelegaturas && this.filtroDelegaturas !== 'Todos') {

      num = this.delegaturasDatos.find((item: any) => item.descripcion == this.filtroDelegaturas).detalle


      // Agregar los datos obtenidos al array de vigilados
      this.vigilados.push(...this.tipoVigiladosDatos
        .filter((data: any) => data.idDelegatura == num)
        .map((data: any) => ({
          id: data.id, value: data.descripcion
        }))
      );

    }

    // Resetear el filtro de vigilados
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

      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 14);

      this.programacionNIT = input.value;

    } else if (this.programacionNIT) {

      this.razonSocial = '';
      console.log(this.programacionNIT.length >= 8)
      if (this.programacionNIT && this.programacionNIT.length >= 8) {
        this.apiMUVService.getEmpresasByNIT(this.programacionNIT).pipe(timeout(5000), catchError((error) => {
          console.error('Error al enviar los datos:', error);
          return of(null);
        })).subscribe((response: any) => {
          if (response && response.length > 0) {
            console.log(response)
            this.razonSocial = response[0].razonSocial;
            this.habilitarGuardar = this.razonSocial.trim().length > 0;
          } else {
            this.razonSocial = '';
            //alertar de que no existe
          }
        });
      } else {
        this.razonSocial = ''; // Reinicia razonSocial si el valor es inválido
      }


    }

  }

  validateDigitInputRange(event: Event, type: 'inicial' | 'final'): void {
    const input = event.target as HTMLInputElement;
    const maxLength = this.filtroDigitos === 'Dos últimos dígitos' ? 2 : 3;

    // Limpia el valor para que solo acepte números y limita la longitud
    const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, maxLength);

    // Actualiza el valor correspondiente según el tipo de input
    if (type === 'inicial') {
      this.digitoInicial = cleanValue;
    } else if (type === 'final') {
      this.digitoFinal = cleanValue;
    }

    // Actualiza el valor del input con el valor limpio
    input.value = cleanValue;
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

    if (this.filtroProgramaciones === "232") {

      return (!!this.filtroNombreRequerimiento && !!this.fechaInicio && !!this.filtroPeriodo && !!this.filtroProgramaciones && !!this.fechaFin && !!this.filtroDelegaturas && !!this.filtroVigilados);

    } else if (this.filtroProgramaciones === "234") {

      if (this.filtroDigitos === "Último dígito") {

        return (!!this.filtroNombreRequerimiento && !!this.fechaInicio && !!this.filtroPeriodo && !!this.filtroProgramaciones && !!this.fechaFin && !!this.filtroDigitos && !!this.digitoUnico);

      } else {

        return (!!this.filtroNombreRequerimiento && !!this.fechaInicio && !!this.filtroPeriodo && !!this.filtroProgramaciones && !!this.fechaFin && !!this.filtroDigitos && !!this.digitoInicial && !!this.digitoFinal);

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
          rango: (this.digitoInicial && this.digitoFinal) ? `${this.digitoInicial}-${this.digitoFinal}` : (this.digitoUnico || 'Sin dato'),
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

  obtenerIdNombreDelegatura(nombreReq: any): any {
    let num = 0;
    if (nombreReq === 'Todos') {

      return 49;
    } else {
      if (this.delegaturasDatos) {

        const idReq = this.delegaturasDatos.find((element: any) => {
          return element.descripcion === nombreReq;
        });

        if (idReq) {

          return idReq.id;

        } else {

          console.log('No se encontró el id:', nombreReq);
          return;

        }

      } else {

        return;

      }
    }

  }

  obtenerIdNombreDigitoNit(nombreReq: any): any {

    if (this.programacionDigitosDatos) {

      const idReq = this.programacionDigitosDatos.find((element: any) => {
        return element.descripcion === nombreReq;
      });

      if (idReq) {

        return idReq.id;

      } else {

        console.log('No se encontró el id:', nombreReq);
        return;

      }

    } else {

      return;

    }

  }

  obtenerTipoVigilado(nombreReq: any): any {

    if (nombreReq === 'Todos') {

      return 49;
    } else {
      if (this.tipoVigiladosDatos) {

        const idReq = this.tipoVigiladosDatos.find((element: any) => {
          return element.descripcion === nombreReq;
        });

        if (idReq) {

          return idReq.id;

        } else {

          console.log('No se encontró el id:', nombreReq);
          return;

        }

      } else {

        return;

      }
    }

  }

  openEditModal(data: any) {

    let num = 0;
    this.vigilados = [];

    if (data.Delegatura) {

      num = this.delegaturasDatos.find((item: any) => item.descripcion == data.Delegatura).detalle

      // Agregar los datos obtenidos al array de vigilados
      this.vigilados.push(...this.tipoVigiladosDatos
        .filter((data: any) => data.idDelegatura == num)
        .map((data: any) => ({
          id: data.id, value: data.descripcion
        }))
      );

    }

    // Resetear el filtro de vigilados
    this.filtroVigilados = '';

    this.datosEditar = data;
    this.fechaFin = data.fechaFin || '';
    this.fechaInicio = data.fechaInicio || '';
    this.diasRequerimiento = data.diasRequerimiento || 0;
    this.filtroDelegaturas = data.Delegatura || '';
    this.filtroVigilados = data.vigilado || '';
    const [digitoInicial, digitoFinal] = data.rango ? data.rango.split("-") : '';
    this.digitoInicial = digitoInicial;
    this.digitoFinal = digitoFinal;
    this.digitoUnico = digitoInicial;
    this.filtroDigitos = data.programacionNIT || '';
    this.showEditModal = true;

  }

  closeModal(isEdit: boolean = true) {

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
      rango: (this.digitoInicial && this.digitoFinal) ? `${this.digitoInicial}-${this.digitoFinal}` : (this.digitoUnico || 'Sin dato'),
      fechaInicio: this.fechaInicio || 'Sin dato',
      fechaFin: this.fechaFin || 'Sin dato',
      diasRequerimiento: this.diasRequerimiento || '0',
      acciones: 'Acciones'

    };

    if (index !== -1) {

      const updatedData = this.filtroProgramaciones === '232' ? datosDelegatura : datosDigitoNit;
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

    this.showLoadingModal = true;

    let fechaFinal = new Date();

    let delegatura: Array<{
      idDelegatura: number, idTipoVigilado: number, fechaFin: any, estado: boolean, estadoRequerimiento: number
    }> = [];

    let digitosNit: Array<{
      idNumeroDigitos: number,
      inicioRango: string,
      finRango: string,
      fechaFin: any,
      estado: boolean,
      estadoRequerimiento: number,
      digitoUnico: string,
    }> = [];

    if (this.filtroProgramaciones === '232') {

      this.datosTable.forEach((dato: any) => {
        delegatura.push({

          idDelegatura: this.obtenerIdNombreDelegatura(dato.Delegatura),
          idTipoVigilado: this.obtenerTipoVigilado(dato.vigilado),
          fechaFin: dato.fechaFin,
          estado: true,
          estadoRequerimiento: new Date() >= new Date(dato.fechaFin) ? 290 : 289

        });

        const fechaActual = new Date(dato.fechaFin);
        fechaFinal = fechaFinal >= fechaActual ? fechaFinal : fechaActual;

      });

    } else if (this.filtroProgramaciones === '234') {

      this.datosTable.forEach((dato: any) => {

        const rango = dato.rango.split('-');

        digitosNit.push({

          idNumeroDigitos: this.obtenerIdNombreDigitoNit(dato.programacionNIT),
          inicioRango: rango[0],
          finRango: rango[1],
          fechaFin: dato.fechaFin,
          estado: true,
          estadoRequerimiento: new Date() >= new Date(dato.fechaFin) ? 290 : 289,
          digitoUnico: rango[0],

        });

        const fechaActual = new Date(dato.fechaFin);
        fechaFinal = fechaFinal >= fechaActual ? fechaFinal : fechaActual;

      });

    }

    let data = {
      "nombreRequerimiento": parseInt(this.filtroNombreRequerimiento),
      "fechaInicio": this.fechaInicio,
      "fechaFin": fechaFinal,
      "fechaCreacion": new Date(),
      "periodoEntrega": parseInt(this.filtroPeriodo),
      "tipoProgramacion": parseInt(this.filtroProgramaciones),
      "actoAdministrativo": this.numeroActoAdministrativo || '',
      "fechaPublicacion": this.fechaPublicacion || '',
      "annioVigencia": this.annioVigencia || '',
      "documentoActo": this.cargarActoAdmin || '',
      "estadoVigilado": parseInt(this.filtroEstados) || '',
      "estadoRequerimiento": new Date() >= new Date(fechaFinal) ? 290 : 289,
      "estado": true,
      "delegaturas": delegatura,
      "digitoNIT": digitosNit
    };


    this.apiMFService.createRequerimientoAPI(data).subscribe((response) => {
      // Aquí puedes manejar la respuesta, por ejemplo:
      this.showLoadingModal = false;
      this.showFinalModal = true;

    }, (error) => {
      this.showLoadingModal = false;
      this.showErrorModal = true;
      // Manejo del error
      console.error('Error al enviar los datos:', error);
    });

  }

  navigateToAdministracion() {
    this.showFinalModal = false;
    this.router.navigate(['/administracion']);

  }

}
