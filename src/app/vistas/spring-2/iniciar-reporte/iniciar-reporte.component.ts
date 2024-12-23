import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {VisualizarArchivoComponent} from "../visualizar-archivo/visualizar-archivo.component";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {AuthService} from "../../../services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-iniciar-reporte',
  standalone: true,
  imports: [PaginatorModule, PrimaryButtonComponent, VisualizarArchivoComponent],
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

  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }

}
