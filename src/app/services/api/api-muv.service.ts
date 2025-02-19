import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ApiMuvService {

  private baseUrl = environment.API_URL;
  private baseUrl1 = environment.API_MUV_URL;

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

  // Obtener EMPRESAS BY NIT
  getDetallesByNIT(nit?:any): Observable<any> {
    return this.http.get(`${this.baseUrl1}/empresas/detalles?nit=${nit}`);
  }

  //POR DIGITO NIT
  // Obtener digito unico
  getVigiladoByUltimoDigito(digito?:any): Observable<any> {
    return this.http.get(`${this.baseUrl1}/financiero/empresas-by-nit/ultimo-digito?ultimoDigito=${digito}`);
  }

  // Obtener dos ultimos digito
  getVigiladoByUltimos2Digitos(digitoInit?:any , digitoFin?:any): Observable<any> {
    return this.http.get(`${this.baseUrl1}/financiero/empresas-by-nit/ultimos-dos-digitos?digitoInicio=${digitoInit}&digitoFin=${digitoFin}`);
  }

  // Obtener dos ultimos digito
  getVigiladoByUltimos3Digitos(digitoInit?:any , digitoFin?:any): Observable<any> {
    return this.http.get(`${this.baseUrl1}/financiero/empresas-by-nit/ultimos-tres-digitos?digitoInicio=${digitoInit}&digitoFin=${digitoFin}`);
  }

  //POR DELEGATURA
  // Obtener por delegatura
  getVigiladoByDelegatura(delegatura:any = '', vigilado:any = '', page:number = 1 ): Observable<any> {
    return this.http.get(`${this.baseUrl1}/financiero/empresas-by-delegatura/${delegatura}?idTipoVigilado=${vigilado}&page=${page}&size=50`);
  }

}
