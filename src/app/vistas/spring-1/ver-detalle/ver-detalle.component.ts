import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ApiMFService} from "../../../services/api/api-mf.service";
import {CommonModule, formatDate} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoNegativeGlobal} from "../../../validator/noNegative.validator";
import {TableProgramacionesComponent} from "../../../componentes/table-programaciones/table-programaciones.component";
import {ApiService} from "../../../services/api/api.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-ver-detalle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableProgramacionesComponent, ProgressSpinnerModule],
  templateUrl: './ver-detalle.component.html',
  styleUrl: './ver-detalle.component.css',
})
export class VerDetalleComponent {
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private apiMFService: ApiMFService, private apiService: ApiService, private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {id: string};


    if(state && state.id) {

      this.setId(state.id); // Establecer nuevo ID
    } else {
      const storedId = localStorage.getItem('id');
      if(storedId) {
        this.setId(storedId); // Establecer ID desde localStorage
      }
    }
  }

  data: any;
  anioPublicacion: string = '';
  anulado: boolean = false;
  private idSubject = new BehaviorSubject<string>('0'); // Inicializa con '0'
  id$ = this.idSubject.asObservable(); // Observable para observar cambios
  // Headers table
  headers: any = [];
  datosTable: any = [];

  //loader
  isloading: boolean = true;

  //DATOS MAESTROS
  delegaturasDescripcion: any;
  vigiladosDescripcion: any;
  TipoDigitoNITDescripcion: any;
  EstadoReqHashDescripcion: any;

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: string): void {
    this.idSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  ngOnInit() {
    this.isloading = true;
    //datos selects

    // Suscribirse a los cambios de id para almacenar en localStorage
    this.id$.subscribe((newId) => {
      localStorage.setItem('id', newId); // Actualizar localStorage cuando id cambie
      console.log('ID actualizado en localStorage:', newId);
      this.loadOptions();
    });
  }

  ngAfterViewInit() {
    this.loadOptions();

  }

  loadOptions(): void {

    this.getRequerimiento();
  }

  getRequerimiento(): void {
    // traer los datos de la consulta
    this.apiMFService.getRequerimientosByID(this.idSubject.getValue()).subscribe((response) => {

      this.datosMaestros();
      this.data = response;
      console.log(this.data);
      this.isloading = false;
      this.actuTable(response);

    }, (error) => {
      this.cdr.detectChanges(); // Forzar la detección de cambios
      console.error('Error fetching user data', error);
    });
  }

  datosMaestros(): void {
    //respuesta nombre req
    this.apiService.getDelegaturas().subscribe((response1: any) => {
      this.delegaturasDescripcion = response1 ? response1.detalle : [];
    });

    //respuesta nombre vigilados
    this.apiService.getTipoVigilado().subscribe((response1: any) => {
      this.vigiladosDescripcion = response1 ? response1.detalle : [];
    });

    //respuesta digitoNIT
    this.apiService.getTipoDigitoNIT().subscribe((response1: any) => {
      this.TipoDigitoNITDescripcion = response1 ? response1.detalle : [];
    });

    //respuesta nombre vigilados
    this.apiService.getEstadoRequerimiento().subscribe((response1: any) => {
      this.EstadoReqHashDescripcion = response1 ? response1.detalle : [];
    });
  }

  //Get nombre delegatura
  getnombreDel(idReq: number): any {
    // Busca el elemento que coincida con el id
    if(this.delegaturasDescripcion) {

      const nombreReq = this.delegaturasDescripcion.find((element: any) => {
        return parseInt(element.id) === idReq; // Compara ambos como números
      });

      // Asegúrate de que formaPago no sea undefined
      if(nombreReq) {
        return nombreReq.descripcion;
      } else {
        console.log('No se encontró el id:', idReq); // Para depurar si no encuentra coincidencia
        return; // Valor por defecto
      }

    } else {
      return;
    }

  }

  //Get nombre vigilado
  getnombreVig(idVig: number): any {
    // Busca el elemento que coincida con el id
    if(this.vigiladosDescripcion) {

      const nombreReq = this.vigiladosDescripcion.find((element: any) => {
        return parseInt(element.id) === idVig; // Compara ambos como números
      });

      // Asegúrate de que formaPago no sea undefined
      if(nombreReq) {
        return nombreReq.descripcion;
      } else {
        console.log('No se encontró el id:', idVig); // Para depurar si no encuentra coincidencia
        return; // Valor por defecto
      }

    } else {
      return;
    }

  }

  //Get nombre de tipo digito nit
  getnombreTipoDigitoNit(idNit: number): any {
    // Busca el elemento que coincida con el id
    if(this.TipoDigitoNITDescripcion) {

      const nombreReq = this.TipoDigitoNITDescripcion.find((element: any) => {
        return parseInt(element.id) === idNit; // Compara ambos como números
      });

      // Asegúrate de que formaPago no sea undefined
      if(nombreReq) {
        return nombreReq.descripcion;
      } else {
        console.log('No se encontró el id:', idNit); // Para depurar si no encuentra coincidencia
        return; // Valor por defecto
      }

    } else {
      return;
    }

  }

  //Get nombre de estado req
  getnombreEstado(idEstado: number): any {
    // Busca el elemento que coincida con el id
    if(this.EstadoReqHashDescripcion) {

      const nombreReq = this.EstadoReqHashDescripcion.find((element: any) => {
        return parseInt(element.id) === idEstado; // Compara ambos como números
      });

      // Asegúrate de que formaPago no sea undefined
      if(nombreReq) {
        return nombreReq.descripcion;
      } else {
        console.log('No se encontró el id:', idEstado); // Para depurar si no encuentra coincidencia
        return; // Valor por defecto
      }

    } else {
      return;
    }

  }

  actuTable(data: any): void {

    if(data.tipoProgramacion === 232) {

      this.headers = [{
        id: 0, title: 'ID'
      }, {
        id: 1, title: 'Delegatura'
      }, {
        id: 2, title: 'Tipo Vigilado',
      }, {
        id: 3, title: 'Fecha Inicio',
      }, {
        id: 4, title: 'Fecha Fin',
      }, {
        id: 5, title: 'Estado',
      },];

      this.datosTable = data.delegaturas.map((dato: any) => ({
        id: dato.idProgramacion, // Incrementa el contador para cada objeto
        Delegatura: this.getnombreDel(dato.idDelegatura) || 'Sin dato',
        vigilado: this.getnombreVig(dato.idTipoVigilado) || 'Sin dato',
        fechaInicio: data.fechaInicio || 'Sin dato',
        fechaFin: dato.fechaFin || 'Sin dato',
        estado: this.getnombreEstado(dato.estadoRequerimiento) || 'Sin dato',
      }));

    }
    else if(data.tipoProgramacion === 234) {

      this.headers = [{
        id: 0, title: 'ID'
      }, {
        id: 1, title: 'Programación por Dígitos'
      }, {
        id: 2, title: 'Rango Dígitos',
      }, {
        id: 3, title: 'Fecha Inicio',
      }, {
        id: 4, title: 'Fecha Fin',
      }, {
        id: 5, title: 'Estado',
      },];

      this.datosTable = data.digitoNIT.map((dato: any) => ({
        id: dato.idProgramacion, // Incrementa el contador para cada objeto
        digitoNIT: this.getnombreTipoDigitoNit(dato.idNumeroDigitos) || 'Sin dato',
        rango: dato.inicioRango + ' - ' + dato.finRango || 'Sin dato',
        fechaInicio: data.fechaInicio || 'Sin dato',
        fechaFin: dato.fechaFin || 'Sin dato',
        estado: this.getnombreEstado(dato.estadoRequerimiento) || 'Sin dato',
      }));

    }
    else {

      this.headers = [{
        id: 0, title: 'Nombre del requerimiento'
      }, {
        id: 1, title: 'Periodo de Entrega'
      }, {
        id: 2, title: 'Fecha Inicio',
      }, {
        id: 3, title: 'Fecha Fin',
      }, {
        id: 4, title: 'Estado',
      },];

      this.datosTable = [{
        nombre: data.tipoRequerimientoDescripcion || 'Sin dato',
        periodo: data.periodoEntregaDescripcion || 'Sin dato',
        fechaInicio: data.fechaInicio || 'Sin dato',
        fechaFin: data.fechaFin || 'Sin dato',
        estado: data.estadoRequerimientoDescripcion || 'Sin dato',
      }];

    }

    this.cdr.detectChanges();

  }

  regresar() {
    this.router.navigate(['/administracion']);
  }

  formatField(value: any): string {

    return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');

  }

  //para mostrar fecha de bd en el form
  formatearFechaParaDatetimeLocal(fecha: string): string {
    const fechaObj = new Date(fecha);
    const year = fechaObj.getFullYear();
    const month = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Mes de 0 a 11, por eso se suma 1
    const day = fechaObj.getDate().toString().padStart(2, '0');
    const hours = fechaObj.getHours().toString().padStart(2, '0');
    const minutes = fechaObj.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}
