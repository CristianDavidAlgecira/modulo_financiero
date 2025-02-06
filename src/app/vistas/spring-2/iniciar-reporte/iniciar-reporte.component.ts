import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {VisualizarArchivoComponent} from "../visualizar-archivo/visualizar-archivo.component";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {AuthService} from "../../../services/auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-iniciar-reporte',
  standalone: true, imports: [PaginatorModule, PrimaryButtonComponent, VisualizarArchivoComponent, AlertComponent],
  templateUrl: './iniciar-reporte.component.html',
  styleUrl: './iniciar-reporte.component.css'
})
export class IniciarReporteComponent implements OnInit {

  //Variable de NIFF
  niffOtros: string = '';

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo PDF',
  };

  // Propiedad de objeto para manejar errores
  errorStates: {[key: number]: boolean} = {};

  // Propiedad para cambiar el boton guardar
  isDisabled: boolean = true;
  //GRUPO NIF
  grupoNif:number = 0;

  //modal error
  showErrorModalDownload:boolean = false;

  constructor(private router: Router, private ApiMuvService: ApiMuvService, private authService: AuthService) {

    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {info: any};

    if(state && state.info) {

      this.setId(state.info); // Establecer nuevo ID
    } else {
      const storedId = sessionStorage.getItem('info');
      if(storedId) {
        const parsedInfo = storedId; // Deserializar el objeto
        this.setId(parsedInfo);
      }
    }

  }

  //Capturar objetos del navigation
  private infoSubject = new BehaviorSubject<any>('0'); // Inicializa con '0'
  info$ = this.infoSubject.asObservable(); // Observable para observar cambios


  //grupo NIF
  idHeredado: any;

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: any): void {
    this.infoSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  // Método para cambiar el ID desde cualquier parte del componente
  updateId(newId: any) {
    this.setId(newId); // Actualiza el ID usando el método setId
  }

  ngOnInit() {
    this.ApiMuvService.getDetallesByNIT(this.authService.getUserInfo().documento).subscribe((response: any) => {
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
    })

    // Suscribirse a los cambios de id para almacenar en localStorage
    this.info$.subscribe((info:any) => {
      sessionStorage.setItem('info', info);
      this.loadOptions();
    });
  }

  loadOptions(): void {

    this.idHeredado = this.infoSubject.getValue();



  }

  downoloadForm() {

    const archivosPorGrupo: { [key: number]: string } = {
      1: 'assets/excel/grupo1.xlsx',
      2: 'assets/excel/grupo2.xlsx',
      3: 'assets/excel/grupo3.xlsx',
      4: 'assets/excel/414.xlsx',
      5: 'assets/excel/533.xlsx',
      6: 'ruta/archivo_grupo6.pdf',
    };

    const archivo = archivosPorGrupo[this.grupoNif];
    console.log(archivo);

    if (!archivo) {
      console.error('No se encontró un archivo para el grupo NIIF:', this.grupoNif);
      this.showErrorModalDownload = true;
      return;
    }

    // Crear un enlace dinámico para descargar el archivo
    const link = document.createElement('a');
    link.href = archivo; // Ruta del archivo
    link.download = archivo.split('/').pop() || 'archivo'; // Nombre del archivo para la descarga
    link.target = '_blank'; // Abre en una nueva pestaña si es necesario
    document.body.appendChild(link); // Añadir el enlace al DOM
    link.click(); // Simular el clic en el enlace
    document.body.removeChild(link); // Eliminar el enlace del DOM

  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }

}
