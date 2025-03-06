import {Component, OnInit} from '@angular/core';
import {TableOtrosAnexosComponent} from "../../../componentes/table-otros-anexos/table-otros-anexos.component";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api/api.service";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {BehaviorSubject, interval, switchMap} from "rxjs";
import {AlertComponent} from "../../../componentes/alert/alert.component";
import {UploadFileComponent} from "../../../componentes/upload-file/upload-file.component";
import {environment} from "../../../../environments/environment";
import {AzureBlobService} from "../../../services/azure-blob/azure-blob.service";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {AuthService} from "../../../services/auth/auth.service";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-otros-anexos',
  standalone: true, imports: [TableOtrosAnexosComponent, NgForOf, NgIf],
  templateUrl: './otros-anexos.component.html',
  styleUrl: './otros-anexos.component.css'
})
export class OtrosAnexosComponent implements OnInit {

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

  private sasToken: string | null = null;
  private tokenExpirationTime: number = 0; // Tiempo de expiración del token en timestamp

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
  isDataAnexos: boolean = false;

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

  nombreAnexoDatos = [
    {id: 1, descripcion: 'Estado de Situación Financiera', code:'estadoSituacionFinanciera'},
    {id: 2, descripcion: 'Estado de Resultados', code: 'estadoResultados'},
    {id: 3, descripcion: 'Estado de Resultados Integral', code:'estadoResultadosIntegral'},
    {id: 4, descripcion: 'Estado de flujo de Efectivo', code: 'flujoEfectivo'},
    {id: 5, descripcion: 'Estado de Cambios en el Patrimonio', code: 'estadoCambiosPatrimonio'},
    {id: 6, descripcion: 'Dictamen del Revisor Fiscal', code: 'dictamenFiscal'},
    {id: 7, descripcion: 'Revelaciones a los estados financieros', code: 'revelacionesEstadosFinancieros'},
    {id: 8, descripcion: 'Notas a los estados financieros', code: 'notasEstadosFinancieros'},
    {id: 9, descripcion: 'Certificación de cumplimiento EEFF', code: 'certificacionCumplimientoEEFF'},
    {id: 10, descripcion: 'Políticas contables', code: 'politicasContables'},
    {id: 11, descripcion: 'Informe de gestión', code: 'informeGestion'},
    {id: 12, descripcion: 'Proyecto de distribución de utilidades para empresas o de excedentes para cooperativas', code: 'proyectoDistribucionUtilidadesEmpresas'},
    {id: 13, descripcion: 'Declaración de renta correspondiente al año de la información reportada', code: 'declaracionRenta'},
    {id: 14, descripcion: 'Composición accionaria', code: 'composicionAccionaria'},
    {id: 15, descripcion: 'Acta de asamblea de aprobación de estados financieros', code: 'actaAsambleaAprobacionEF'},
  ];

  ngOnInit() {
    // Suscribirse a los cambios de id para almacenar en localStorage
    this.info$.subscribe((info: any) => {
      sessionStorage.setItem('info', JSON.stringify(info));
      this.loadOptions();
    });

    this.refreshSasToken(); // Obtener el token al iniciar el componente

    // Refrescar el token cada hora (3600000 ms)
    interval(3600000)
    .pipe(switchMap(() => this.azureBlobService.getSasToken()))
    .subscribe(response => {
      console.log('SAS Token actualizado automáticamente:', response);
      this.sasToken = response.urlSasToken;
      this.tokenExpirationTime = Date.now() + 3600000; // Actualiza el tiempo de expiración
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

  onButtonClick(path: any) {

    let fullPath = '';

    if (!this.sasToken || Date.now() >= this.tokenExpirationTime) {
      this.refreshSasToken(() => {
        console.log("refreshSasToken");
      });
    }

    console.log(this.useToken(path))


  }

  private refreshSasToken(callback?: () => void) {
    this.azureBlobService.getSasToken().subscribe({
      next: (response) => {
        console.log('SAS Token obtenido:', response);
        this.sasToken = response.urlSasToken;
        this.tokenExpirationTime = Date.now() + 3600000; // Expira en 1 hora
        if (callback) callback();
      },
      error: (err) => console.error('Error al obtener SAS Token:', err)
    });
  }

    useToken(path: any) {
    const [baseUrl, queryParams] = this.sasToken!.split('?'); // Divide en URL base y parámetros
    let fullPath = `${baseUrl}?${path}${queryParams}`;

    return fullPath;
    // Aquí puedes utilizar el fullPath según sea necesario
  }



  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  goBack() {
    window.history.back();
  }

}
