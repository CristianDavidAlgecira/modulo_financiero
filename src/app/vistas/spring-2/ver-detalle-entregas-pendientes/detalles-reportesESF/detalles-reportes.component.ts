import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api/api.service";
import {BehaviorSubject} from "rxjs";
import {ApiMFService} from "../../../../services/api/api-mf.service";

@Component({
  selector: 'app-detalles-reportes',
  standalone: true,
  imports: [],
  templateUrl: './detalles-reportes.component.html',
  styleUrl: './detalles-reportes.component.css'
})
export class DetallesReportesComponent implements OnInit {

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


  ngOnInit() {
    // Suscribirse a los cambios de id para almacenar en localStorage
    this.info$.subscribe((info:any) => {
      sessionStorage.setItem('info', JSON.stringify(info));
      this.loadOptions();
    });
  }

  loadOptions(): void {

    this.datosState = this.infoSubject.getValue();

    this.apiService.getEstadoEntrega().subscribe(response => {

      this.estadoEntrega = response.detalle;

    });

    //LLAMAR INFO EXCEL API
    this.apiMFService.getIdentificacionVigilado(this.datosState.nit, this.datosState.idHeredado).subscribe(
      response => {
        this.infoExcel = response[0];
        console.log(response);
    })



  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    if(this.estadoEntrega){
      return this.estadoEntrega.find((estado:any) => estado.id === idEstado).descripcion;
    }

    return 'No contiene'
  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }
}
