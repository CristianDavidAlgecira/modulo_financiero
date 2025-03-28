import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../../../services/api/api.service";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {ApiMuvService} from "../../../services/api/api-muv.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-ver-detalle-entregas-pendientes',
  standalone: true,
  imports: [
    PaginatorModule, CommonModule
  ],
  templateUrl: './ver-detalle-entregas-pendientes.component.html',
  styleUrl: './ver-detalle-entregas-pendientes.component.css'
})
export class VerDetalleEntregasPendientesComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private apiMuvService: ApiMuvService,
  ) {

    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { info: any };

    if (state && state.info) {

      this.setId(state.info); // Establecer nuevo ID
    } else {
      const storedId = sessionStorage.getItem('info');
      if (storedId) {
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
  GrupoNif: any;

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: any): void {
    this.infoSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  // Método para cambiar el ID desde cualquier parte del componente
  updateId(newId: any) {
    this.setId(newId); // Actualiza el ID usando el método setId
  }


  ngOnInit() {
    // Suscribirse a los cambios de id para almacenar en localStorage
    this.info$.subscribe((info:any) => {
      sessionStorage.setItem('info', JSON.stringify(info));
      this.loadOptions();
    });
  }

  loadOptions(): void {

    this.datosState = this.infoSubject.getValue();

    this.apiMuvService.getDetallesByNIT(this.datosState.nit)
    .subscribe((response: any) => {
      if (response.idClasificacionGrupoNiif === 136) {
        this.GrupoNif = 1;
      } else if (response.idClasificacionGrupoNiif === 137) {
        this.GrupoNif = 2;
      } else if (response.idClasificacionGrupoNiif === 138) {
        this.GrupoNif = 3;
      } else if (response.idClasificacionGrupoNiif === 139) {
        // GRUPO 414
        this.GrupoNif = 4;
      } else if (response.idClasificacionGrupoNiif === 140) {
        //GRUPO 533
        this.GrupoNif = 5;
      } else if (response.idClasificacionGrupoNiif === 141) {
        //GRUPO ENCHNM
        this.GrupoNif = 6;

      }
    })

    this.apiService.getEstadoEntrega().subscribe(response => {

      this.estadoEntrega = response.detalle;

    })
  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    if(this.estadoEntrega){
      return this.estadoEntrega.find((estado:any) => estado.id === idEstado).descripcion;
    }

    return 'No contiene'
  }

  navigateTo(route: string): void {


    this.router.navigate([route], {
      state: {
        info: this.datosState,
      }
    });

  }

}
