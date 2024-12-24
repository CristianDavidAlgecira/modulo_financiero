import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api/api.service";
import {BehaviorSubject} from "rxjs";
import {ApiMFService} from "../../../../services/api/api-mf.service";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-detalles-reportes-esf',
  standalone: true,
  imports: [],
  templateUrl: './detalles-reportesESF.component.html',
  styleUrl: './detalles-reportesESF.component.css'
})
export class DetallesReportesESFComponent implements OnInit {

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
  //datos api
  infoExcelActual: any;
  infoExcelComparativo: any;

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
    this.apiMFService.getESF(this.datosState.nit, this.datosState.idHeredado).subscribe(
      response => {
        this.infoExcelActual = response[0];
        this.infoExcelComparativo = response[1];
        console.log(response);
    })



  }

  obtenerEstadoEntregaDescripcion(idEstado: number) {

    if(this.estadoEntrega){
      return this.estadoEntrega.find((estado:any) => estado.id === idEstado).descripcion;
    }

    return 'No contiene'
  }

  formatMoney(number:number) {
    return formatCurrency(number, 'es-CO', '$', 'COP', '1.0-0');
  }

  navigateTo(route: string): void {

    this.router.navigate([route]);

  }

  protected readonly formatCurrency = formatCurrency;
}
