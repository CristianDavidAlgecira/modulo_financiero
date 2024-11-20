import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiMuvService {

  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  // Obtener TipoVigilados
  getTipoVigilados(idDelegatura?:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/tipo-vigilado/?idDelegatura=${idDelegatura}`);
  }

  // Obtener EMPRESAS BY NIT
  getEmpresasByNIT(nit?:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/muv/empresasByNit/?nit=${nit}`);
  }

}
