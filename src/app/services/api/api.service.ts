import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.MAESTROS;

  constructor(
    private http: HttpClient
  ) {
  }

  //Tipo requerimiento (nombre req)
  getTipoRequerimiento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFTipoRequerimiento`);
  }

  //Periodo de entrega
  getPeriodoEntrega(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFPeriodoEntrega`);
  }

  //tipo programacion
  getTipoProgramacion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFTipoProgramacion`);
  }

  //Estado vigilado
  getEstadoVigilado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFEstadoVigilado`);
  }

  //Delegaturas
  getDelegaturas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/Delegaturas`);
  }

  //TIPO VIGILADO
  getTipoVigilado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFVigilados`);
  }

  //Numeros digito NIT
  getTipoDigitoNIT(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFProgramacionDigitos`);
  }

  //Estado Requerimiento
  getEstadoRequerimiento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalogos/MFEstadoRequerimiento`);
  }

}
