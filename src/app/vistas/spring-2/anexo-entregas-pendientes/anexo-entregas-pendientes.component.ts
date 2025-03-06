import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

import {
  TableAnexoEntregasPendientesComponent
} from "../../../componentes/table-anexo-entregas-pendientes/table-anexo-entregas-pendientes.component";
import {ApiService} from "../../../services/api/api.service";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {BehaviorSubject} from "rxjs";
import {AlertComponent} from "../../../componentes/alert/alert.component";
import {UploadFileComponent} from "../../../componentes/upload-file/upload-file.component";
import {environment} from "../../../../environments/environment";
import {AzureBlobService} from "../../../services/azure-blob/azure-blob.service";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {AuthService} from "../../../services/auth/auth.service";
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-anexo-entregas-pendientes',
  standalone: true,
  imports: [PrimaryButtonComponent, NgIf, PaginatorModule, NgClass, NgForOf, TableAnexoEntregasPendientesComponent, AlertComponent, UploadFileComponent],
  templateUrl: './anexo-entregas-pendientes.component.html',
  styleUrl: './anexo-entregas-pendientes.component.css'
})
export class AnexoEntregasPendientesComponent implements OnInit {

  @ViewChild(UploadFileComponent) fileUploadComponent!: UploadFileComponent;


  constructor(private router: Router, private authService: AuthService, private apiService: ApiService, private ApiMuvService: ApiMuvService, private apiMFService: ApiMFService, private azureBlobService: AzureBlobService) {
    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {info: any};

    if(state && state.info) {
      this.setId(state.info); // Establecer nuevo ID
    } else {
      const storedId = sessionStorage.getItem('info');
      if(storedId) {
        const parsedInfo = JSON.parse(storedId); // Deserializar el objeto
        this.setId(parsedInfo);
      }
    }
  }

  //Capturar objetos del navigation
  private infoSubject = new BehaviorSubject<any>('0'); // Inicializa con '0'
  info$ = this.infoSubject.asObservable(); // Observable para observar cambios

  //datos requqerimiento
  datosState: any;
  //datos maestros estado entrega
  estadoEntrega: any;
  //grupo NIF
  infoExcel: any;
  responseFinal: string = '';

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: any): void {
    this.infoSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  // Método para cambiar el ID desde cualquier parte del componente
  updateId(newId: any) {
    this.setId(newId); // Actualiza el ID usando el método setId
  }

  // Variables
  //grupo NIF
  grupoNif:number = 0;
  anexo: string = '';
  archivoCargado: boolean = false;
  fileSaved: File | null = null;
  isAdicionarDisabled: boolean = true;
  isGuardarDisabled: boolean = true;

  //MODALS
  showErrorModal: boolean = false;
  showLoadingModal: boolean = false;
  showSuccessModal: boolean = false;

  //para comprobar si ya se ha creado el registro y es para edit
  isDataAnexos: boolean = false;

  //ANEXOS
  archivos: {[key: string]: File | null} = {
    estadoSituacionFinanciera: null,
    estadoResultados: null,
    estadoResultadosIntegral: null,
    flujoEfectivo: null,
    estadoCambiosPatrimonio: null,
    dictamenFiscal: null,
    revelacionesEstadosFinancieros: null,
    notasEstadosFinancieros: null,
    certificacionCumplimientoEEFF: null,
    politicasContables: null,
    informeGestion: null,
    proyectoDistribucionUtilidadesEmpresas: null,
    declaracionRenta: null,
    composicionAccionaria: null,
    actaAsambleaAprobacionEF: null,
  };

  //AnexosSaved filtro
  AnexoSavedFiltro: [number] = [0];

  touchedFields = {
    anexo: false,
  };

  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  errorStates: {[key: number]: boolean} = {};

  nombreAnexoDatos = [
    {id: 1, descripcion: 'Estado de Situación Financiera'},
    {id: 2, descripcion: 'Estado de Resultados'},
    {id: 3, descripcion: 'Estado de Resultados Integral'},
    {id: 4, descripcion: 'Estado de flujo de Efectivo'},
    {id: 5, descripcion: 'Estado de Cambios en el Patrimonio'},
    {id: 6, descripcion: 'Dictamen del Revisor Fiscal'},
    {id: 7, descripcion: 'Revelaciones a los estados financieros'},
    {id: 8, descripcion: 'Notas a los estados financieros'},
    {id: 9, descripcion: 'Certificación de cumplimiento EEFF'},
    {id: 10, descripcion: 'Políticas contables'},
    {id: 11, descripcion: 'Informe de gestión'},
    {id: 12, descripcion: 'Proyecto de distribución de utilidades para empresas o de excedentes para cooperativas'},
    {id: 13, descripcion: 'Declaración de renta correspondiente al año de la información reportada'},
    {id: 14, descripcion: 'Composición accionaria'},
    {id: 15, descripcion: 'Acta de asamblea de aprobación de estados financieros'}
  ];

  anexosObligatorios: {[key: number]: number[]} = {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Grupo NIF 1
    2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Grupo NIF 2
    3: [1, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],          // Grupo NIF 3
    4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // Grupo NIF 4
    5: [6, 11, 12, 13, 14, 15],                             // Grupo NIF 5
  };

  ngOnInit() {
    // Suscribirse a los cambios de id para almacenar en localStorage
    this.info$.subscribe((info: any) => {
      sessionStorage.setItem('info', JSON.stringify(info));
      this.loadOptions();
    });
  }

  loadOptions(): void {
    this.datosState = this.infoSubject.getValue();

    this.apiService.getEstadoEntrega().subscribe(response => {
      this.estadoEntrega = response.detalle;
    });

    console.log(this.datosState.idHeredado);

    //LLAMAR INFO EXCEL API
    this.apiMFService.getIdentificacionVigilado(this.datosState.nit, this.datosState.idHeredado).subscribe(response => {
      this.infoExcel = response[0];
      console.log(response);
    });

    this.ApiMuvService.getDetallesByNIT(this.authService.getUserInfo().documento).subscribe((response: any) => {
      console.log(response.idClasificacionGrupoNiif);
      if(response.idClasificacionGrupoNiif === 136) {
        this.grupoNif = 1;
      } else if(response.idClasificacionGrupoNiif === 137) {
        this.grupoNif = 2;
      } else if(response.idClasificacionGrupoNiif === 138) {
        this.grupoNif = 3;
      } else if(response.idClasificacionGrupoNiif === 139) {
        this.grupoNif = 4;
      } else if(response.idClasificacionGrupoNiif === 140) {
        this.grupoNif = 5;
      } else if(response.idClasificacionGrupoNiif === 141) {
        this.grupoNif = 6;
      }

      console.log(this.grupoNif);

    });
    this.grupoNif = 3;


    //LLAMAR INFO ANEXOS
    this.apiMFService.getAnexosVigilado(this.datosState.idHeredado).subscribe(response => {
      console.log(response);
      this.isDataAnexos = true;

      if(response.length > 0) {
        this.archivos = {
          estadoSituacionFinanciera: response[0].estadoSituacionFinanciera,
          estadoResultados: response[0].estadoResultados,
          estadoResultadosIntegral: response[0].estadoResultadosIntegral,
          flujoEfectivo: response[0].flujoEfectivo,
          estadoCambiosPatrimonio: response[0].estadoCambiosPatrimonio,
          dictamenFiscal: response[0].dictamenFiscal,
          revelacionesEstadosFinancieros: response[0].revelacionesEstadosFinancieros,
          notasEstadosFinancieros: response[0].notasEstadosFinancieros,
          certificacionCumplimientoEEFF: response[0].certificacionCumplimientoEEFF,
          politicasContables: response[0].politicasContables,
          informeGestion: response[0].informeGestion,
          proyectoDistribucionUtilidadesEmpresas: response[0].proyectoDistribucionUtilidadesEmpresas,
          declaracionRenta: response[0].declaracionRenta,
          composicionAccionaria: response[0].composicionAccionaria,
          actaAsambleaAprobacionEF: response[0].actaAsambleaAprobacionEF
        };
      }
    });
  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {
    if(this.estadoEntrega) {
      if(idEstado == 289) {
        return 'Pendiente por aprobación';
      }
      return this.estadoEntrega.find((estado: any) => estado.id === idEstado).descripcion;
    }
    return 'No contiene';
  }



  // Validar campo
  validateField(field: string): void {
    (this.touchedFields as any)[field] = true;
  }

  //LLamar cuando se carga azure
  handleFileSelected(event: any) {
    console.log('Archivo recibido:', event.files[0]);
    this.archivoCargado = event.files.length > 0;
    if(this.archivoCargado) {
      this.fileSaved = event.files[0]; // Guarda el archivo seleccionado
    }
    this.checkAdicionarButtonState();
  }

  // Validar si el botón "Adicionar" debe habilitarse
  checkAdicionarButtonState(): void {
    this.isAdicionarDisabled = !(this.anexo && this.archivoCargado);
  }

  btnAdicionar(): void {
    if(this.archivoCargado && this.fileSaved) {
      switch(parseInt(this.anexo)) {
        case 1:
          this.archivos['estadoSituacionFinanciera'] = this.fileSaved;
          break;
        case 2:
          this.archivos['estadoResultados'] = this.fileSaved;
          break;
        case 3:
          this.archivos['estadoResultadosIntegral'] = this.fileSaved;
          break;
        case 4:
          this.archivos['flujoEfectivo'] = this.fileSaved;
          break;
        case 5:
          this.archivos['estadoCambiosPatrimonio'] = this.fileSaved;
          break;
        case 6:
          this.archivos['dictamenFiscal'] = this.fileSaved;
          break;
        case 7:
          this.archivos['revelacionesEstadosFinancieros'] = this.fileSaved;
          break;
        case 8:
          this.archivos['notasEstadosFinancieros'] = this.fileSaved;
          break;
        case 9:
          this.archivos['certificacionCumplimientoEEFF'] = this.fileSaved;
          break;
        case 10:
          this.archivos['politicasContables'] = this.fileSaved;
          break;
        case 11:
          this.archivos['informeGestion'] = this.fileSaved;
          break;
        case 12:
          this.archivos['proyectoDistribucionUtilidadesEmpresas'] = this.fileSaved;
          break;
        case 13:
          this.archivos['declaracionRenta'] = this.fileSaved;
          break;
        case 14:
          this.archivos['composicionAccionaria'] = this.fileSaved;
          break;
        case 15:
          this.archivos['actaAsambleaAprobacionEF'] = this.fileSaved;
          break;
      }

      // Guardar el ID en AnexoSavedFiltro si no está ya presente
      if(!this.AnexoSavedFiltro.includes(parseInt(this.anexo))) {
        this.AnexoSavedFiltro.push(parseInt(this.anexo));
      }

      // Filtrar los anexos disponibles eliminando los que ya están en AnexoSavedFiltro
      this.nombreAnexoDatos = this.nombreAnexoDatos.filter(nombre => !this.AnexoSavedFiltro.includes(nombre.id));

      // Limpiar la selección después de adicionar
      this.anexo = '';
      if(this.fileUploadComponent) {
        if(this.fileSaved) {
          this.fileUploadComponent.removeFile('planilla', this.fileSaved);
        }
      }
      this.fileSaved = null;
      this.checkGuardarButtonState();
    }
  }

  checkGuardarButtonState(): void {
    // Obtener los anexos obligatorios según el grupo NIF
    const anexosObligatorios = this.anexosObligatorios[this.grupoNif] || [];
    // Verificar si todos los anexos obligatorios están cargados
    const archivosRequeridos = anexosObligatorios.every(id => this.archivos[this.getAnexoKeyById(id)] !== null);
    this.isGuardarDisabled = !archivosRequeridos;
  }

  getAnexoKeyById(id: number): string {
    switch(id) {
      case 1: return 'estadoSituacionFinanciera';
      case 2: return 'estadoResultados';
      case 3: return 'estadoResultadosIntegral';
      case 4: return 'flujoEfectivo';
      case 5: return 'estadoCambiosPatrimonio';
      case 6: return 'dictamenFiscal';
      case 7: return 'revelacionesEstadosFinancieros';
      case 8: return 'notasEstadosFinancieros';
      case 9: return 'certificacionCumplimientoEEFF';
      case 10: return 'politicasContables';
      case 11: return 'informeGestion';
      case 12: return 'proyectoDistribucionUtilidadesEmpresas';
      case 13: return 'declaracionRenta';
      case 14: return 'composicionAccionaria';
      case 15: return 'actaAsambleaAprobacionEF';
      default: return '';
    }
  }

  getAnexoDescripcionByKey(key: string): string {
    const anexo = this.nombreAnexoDatos.find(anexo => this.getAnexoKeyById(anexo.id) === key);
    return anexo ? anexo.descripcion : key;
  }

  // Acciones al hacer clic en "Guardar"
  btnGuardar(): void {
    this.submitForm();
    console.log('Formulario enviado');
  }

  // Simula el envío del formulario
  submitForm(): void {
    this.showLoadingModal = true;
    this.touchedFields.anexo = true;

    const path = `${environment.storage_folder}/anexos-vigilado/grupoNif${this.grupoNif}/${this.datosState.nit}-programacion${this.datosState.idHeredado}`;

    this.azureBlobService.getSasToken().subscribe({
      next: (response) => {
        console.log('SAS Token obtenido:', response);
        const sasToken = response.urlSasToken;

        const archivosKeys = [
          'estadoSituacionFinanciera', 'estadoResultados', 'estadoResultadosIntegral', 'flujoEfectivo',
          'estadoCambiosPatrimonio', 'dictamenFiscal', 'revelacionesEstadosFinancieros',
          'notasEstadosFinancieros', 'certificacionCumplimientoEEFF', 'politicasContables', 'informeGestion',
          'proyectoDistribucionUtilidadesEmpresas', 'declaracionRenta', 'composicionAccionaria', 'actaAsambleaAprobacionEF'
        ];

        const uploadPromises = archivosKeys.map(key => {
          const file = this.archivos[key];

          if (file) {
            return this.azureBlobService.uploadFile(file, path, sasToken)
            .then(url => ({ key, path })) // Si se sube correctamente
              .catch(error => {
                console.error(`Error al subir ${key}:`, error);
                throw new Error(`Error en el archivo: ${key}`); // Lanzar error para detener todo
              });
          } else {
            return Promise.resolve({ key, path: null });
          }
        });

        // Esperar a que todos los archivos se suban
        Promise.allSettled(uploadPromises).then(results => {
          const hasError = results.some(result => result.status === 'rejected');

          if (hasError) {
            console.error('Error al subir archivos. Deteniendo proceso.');
            this.showErrorModal = true;
            this.showLoadingModal = false;
            return; // Detener ejecución si hubo errores
          }

          console.log(results);
          // Si todos se subieron correctamente, construir objeto para la API
          const data: any = { idHeredado: this.datosState.idHeredado };

          results.forEach(result => {
            if (result.status === 'fulfilled' && result.value.path) {
              data[result.value.key] = result.value.path;
            }
          });

          // Enviar datos a la API
          this.apiMFService.guardarAnexo(data).subscribe({
            next: (response) => {
              this.responseFinal = this.datosState.estadoEntrega == 285 ? 'Estado actualizado a En proceso. pasada la fecha limite su reporte se actualizará a Entregado' : 'Estado actualizado a extemporaneo, ya que entregue fuera del tiempo establecido'
              this.showLoadingModal = false;
              this.showSuccessModal = true;
              console.log('Datos enviados con éxito:', response);
            },
            error: (err) => {
              console.error('Error al enviar los datos:', err);
              this.showErrorModal = true;
              this.showLoadingModal = false;
            }
          });

        }).catch(err => {
          console.error('Error inesperado al procesar archivos:', err);
          this.showErrorModal = true;
          this.showLoadingModal = false;
        });

      },
      error: (err) => {
        console.error('Error al obtener el SAS Token:', err);
        this.showLoadingModal = false;
        this.showErrorModal = true;
      }
    });
  }


  onCloseModal(): void {
    this.showSuccessModal = false;
    this.showLoadingModal = false;
    this.showErrorModal = false;
  }

  goBack() {
    window.history.back();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  protected readonly Object = Object;
}
