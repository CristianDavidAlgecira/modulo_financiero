import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiMFService {

  private baseUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) {
  }

  // Obtener requerimientos en principal
  getRequerimientosAPI(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/requerimiento`);
  }

  // Obtener requerimiento por ID
  getRequerimientosByID(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/requerimiento/by-id/${id}`);
  }

  // Envio requerimiento primer creacion
  createRequerimientoAPI(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/requerimiento`, data, {
      responseType: 'text',
    });
  }

  // Anular requerimiento
  anularReq(idRequerimiento:string|number): Observable<any> {

    return this.http.put(`${this.baseUrl}/api/requerimiento/anular/${idRequerimiento}`, {

    });
  }

  // Subir archivo excel
  uploadFileAPI(file: File, validationRanges: any): Observable<any> {
    const formData = new FormData();

    // Agregar archivo al FormData
    formData.append('file', file);

    // Convertir el objeto validationRanges a JSON y añadirlo al FormData
    formData.append('validationRanges', JSON.stringify(validationRanges));

    return this.http.post(`${this.baseUrl}/api/files/upload`, formData);

  }

  // Enviar excel a BD
  saveExcel(file: File, nit: string, idHeredado: string, fieldMapping: object): Observable<any> {
    const formData = new FormData();
    // Agregar archivo al FormData
    formData.append('file', file);
    //agrega nit
    formData.append('nit', nit);
    //agrega nit
    formData.append('idHeredado', idHeredado);
    // Convertir fieldMapping a JSON y agregar al FormData
    formData.append('fieldMapping', JSON.stringify(fieldMapping));


    return this.http.post(`${this.baseUrl}/api/files/saveExcel`, formData);

  }

  //Tabla principal entregas pendientes
  getEntregaPendiente(nit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/requerimiento/entregas-pendientes?nit=${nit}`);
  }

  //Tabla principal entregas finalizadas
  getEntregaFinalizada(nit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/requerimiento/entregas-finalizadas?nit=${nit}`);
  }

  //Info Excel Identificación del vigilado
  getIdentificacionVigilado(nit: number, idHeredado: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/indentificacion-vigilado?nit=${nit}&idHeredado=${idHeredado}`);
  }

  //Info Excel ESF
  getESF(nit: number, idHeredado: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/ESF?nit=${nit}&idHeredado=${idHeredado}`);
  }

  //Info Excel ER
  getER(nit: number, idHeredado: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/ER?nit=${nit}&idHeredado=${idHeredado}`);
  }

  //Info Excel ORI
  getORI(nit: number, idHeredado: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/ORI?nit=${nit}&idHeredado=${idHeredado}`);
  }

}

