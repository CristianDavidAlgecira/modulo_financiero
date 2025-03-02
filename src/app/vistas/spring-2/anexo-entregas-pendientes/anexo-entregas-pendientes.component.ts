import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {
  TableAnexoEntregasPendientesComponent
} from "../../../componentes/table-anexo-entregas-pendientes/table-anexo-entregas-pendientes.component";
import {ApiService} from "../../../services/api/api.service";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {BehaviorSubject} from "rxjs";
import {EntregasPendientesComponent} from "../entregas-pendientes/entregas-pendientes.component";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-anexo-entregas-pendientes',
  standalone: true,
  imports: [PrimaryButtonComponent, NgIf, PaginatorModule, NgClass, FileUploadComponent, NgForOf, TableAnexoEntregasPendientesComponent, AlertComponent],
  templateUrl: './anexo-entregas-pendientes.component.html',
  styleUrl: './anexo-entregas-pendientes.component.css'
})
export class AnexoEntregasPendientesComponent implements OnInit {

  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  constructor(private router: Router, private apiService: ApiService, private apiMFService: ApiMFService) {
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

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: any): void {
    this.infoSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  // Método para cambiar el ID desde cualquier parte del componente
  updateId(newId: any) {
    this.setId(newId); // Actualiza el ID usando el método setId
  }

  // Variables
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
  archivos: {[key: string]: string | null} = {
    caratula: null,
    estadoSituacionFinanciera: null,
    estadoResultados: null,
    estadoResultadosIntegrales: null,
    flujoEfectivoIndirecto: null,
    flujoEfectivoDirecto: null,
    estadoCambiosPatrimonio: null,
    dictamenFiscal: null
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

  nombreAnexoDatos = [{id: 1, descripcion: 'Carátula'}, {id: 2, descripcion: 'Estado de Situación Financiera'}, {
    id: 3,
    descripcion: 'Estado de Resultados'
  }, {id: 4, descripcion: 'Estado de Resultados Integral'}, {id: 5, descripcion: 'Flujo de Efectivo Indirecto'}, {
    id: 6,
    descripcion: 'Flujo de Efectivo Directo'
  }, {id: 7, descripcion: 'Estado de Cambios en el Patrimonio'}, {id: 8, descripcion: 'Dictamen del Revisor Fiscal'},];

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

    console.log(this.datosState.idHeredado)

    //LLAMAR INFO EXCEL API
    this.apiMFService.getIdentificacionVigilado(this.datosState.nit, this.datosState.idHeredado).subscribe(response => {
      this.infoExcel = response[0];
      console.log(response);
    })

    //LLAMAR INFO ANEXOS
    this.apiMFService.getAnexosVigilado(this.datosState.idHeredado).subscribe(response => {

      console.log(response);

      this.isDataAnexos = true;

      this.archivos = {
        caratula: response[0].caratula,
        estadoSituacionFinanciera: response[0].estadoSituacionFinanciera,
        estadoResultados: response[0].estadoResultados,
        estadoResultadosIntegrales: response[0].estadoResultadosIntegral,
        flujoEfectivoIndirecto: response[0].flujoEfectivoIndirecto,
        flujoEfectivoDirecto: response[0].flujoEfectivoDirecto,
        estadoCambiosPatrimonio: response[0].estadoCambiosPatrimonio,
        dictamenFiscal: response[0].dictamenFiscal
      };


    });
  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    if(this.estadoEntrega) {
      if(idEstado == 289) {
        return 'Pendiente por aprobación';
      }
      return this.estadoEntrega.find((estado: any) => estado.id === idEstado).descripcion;
    }

    return 'No contiene'
  }

  // Validar campo
  validateField(field: string): void {

    (this.touchedFields as any)[field] = true;

  }

  // Llamado cuando se carga un archivo
  OnUploadButton(file: File[]): void {
    console.log(this.anexo);
    this.archivoCargado = file.length > 0;
    if(this.archivoCargado) {
      this.fileSaved = file[0];
    }

    this.checkAdicionarButtonState();

  }

  // Validar si el botón "Adicionar" debe habilitarse
  checkAdicionarButtonState(): void {

    this.isAdicionarDisabled = !(this.anexo && this.archivoCargado);

  }

  btnAdicionar(): void {
    if(this.archivoCargado && this.fileSaved) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileSaved);
      reader.onload = (event:any) => {
        const base64String = event.target.result.split(',')[1];

        switch(parseInt(this.anexo)) {
          case 1:
            this.archivos['caratula'] = base64String;
            break;
          case 2:
            this.archivos['estadoSituacionFinanciera'] = base64String;
            break;
          case 3:
            this.archivos['estadoResultados'] = base64String;
            break;
          case 4:
            this.archivos['estadoResultadosIntegrales'] = base64String;
            break;
          case 5:
            this.archivos['flujoEfectivoIndirecto'] = base64String;
            break;
          case 6:
            this.archivos['flujoEfectivoDirecto'] = base64String;
            break;
          case 7:
            this.archivos['estadoCambiosPatrimonio'] = base64String;
            break;
          case 8:
            this.archivos['dictamenFiscal'] = base64String;
            break;
        }

        console.log(this.archivos);

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
            this.fileUploadComponent.deleteFile(this.fileSaved);
          }
        }
        this.fileSaved = null;
        this.checkGuardarButtonState(); // Verificar si habilitar "Guardar"
      };

      reader.onerror = (error) => {
        console.error('Error al convertir el archivo a base64:', error);
      };
    }
  }

  checkGuardarButtonState(): void {
    // Excluir "caratula" de la validación
    const archivosRequeridos = Object.entries(this.archivos).filter(([key]) => key !== 'caratula') // Excluye carátula
      .every(([_, value]) => value !== null); // Todos los demás deben estar cargados

    this.isGuardarDisabled = !archivosRequeridos;
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
    const data = {
      idHeredado: this.datosState.idHeredado,
      caratula: this.archivos['caratula'],
      estadoSituacionFinanciera: this.archivos['estadoSituacionFinanciera'],
      estadoResultados: this.archivos['estadoResultados'],
      estadoResultadosIntegral: this.archivos['estadoResultadosIntegrales'],
      flujoEfectivoIndirecto: this.archivos['flujoEfectivoIndirecto'],
      flujoEfectivoDirecto: this.archivos['flujoEfectivoDirecto'],
      estadoCambiosPatrimonio: this.archivos['estadoCambiosPatrimonio'],
      dictamenFiscal: this.archivos['dictamenFiscal'],
    };
    this.apiMFService.guardarAnexo(data).subscribe({
      next: (response) => {
        this.showLoadingModal = false;
        this.showSuccessModal = true;

        console.log('Archivo subido con éxito:', response);
      }, error: (err) => {
        this.showLoadingModal = false;
        this.showErrorModal = true;
        console.error('Error al subir el archivo:', err);
      }
    });

  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }

  onCloseModal(): void {
    this.showErrorModal = false;
    this.showLoadingModal = false;
    this.showSuccessModal = false;
  }

  goBack() {
    window.history.back();
  }

  protected readonly Object = Object;
}
