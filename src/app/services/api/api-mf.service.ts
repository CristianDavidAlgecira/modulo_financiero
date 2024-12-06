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
  saveExcel(file: File): Observable<any> {
    const formData = new FormData();

    // Agregar archivo al FormData
    formData.append('file', file);


    return this.http.post(`${this.baseUrl}/api/files/saveExcel`, formData);

  }

}

