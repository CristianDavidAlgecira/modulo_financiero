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
  // createRequerimientoAPI(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/requerimiento`, data, {
  //     responseType: 'text',
  //   });
  // }

  // Envio requerimiento programacion por delegatura
  // createContratos(data1: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/formularioContratoPasos/paso4`, data1, {
  //     responseType: 'text',
  //   });
  // }

  // Obtener requerimientos dashboard
  getRequerimientos(): Observable<any> {
    const response = {
      totalElements: 0, totalPages: 0, pageable: {
        paged: true, pageNumber: 0, pageSize: 0, offset: 0, sort: [{
          direction: 'string', nullHandling: 'string', ascending: true, property: 'string', ignoreCase: true,
        },], unpaged: true,
      }, size: 0, content: [{
        nombreRequerimiento: 'General anualizada',
        numeroRequerimiento: '413',
        anio: '2024',
        fechaInicio: '2024-10-15T12:42:49.226Z',
        fechaFin: '2024-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'cancelado',
        detalle: 1,
      }, {
        nombreRequerimiento: 'Modelo de negocios especiales',
        numeroRequerimiento: '398',
        anio: '2023',
        fechaInicio: '2023-10-15T12:42:49.226Z',
        fechaFin: '2023-10-15T12:42:49.226Z',
        diasFaltantes: '10',
        estado: 'proceso',
        detalle: 2,
      }, {
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        detalle: 3,
      }, {
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        detalle: 4,
      }, {
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        detalle: 5,
      }, {
        nombreRequerimiento: 'Modelo de negocios especiales',
        numeroRequerimiento: '398',
        tipoProgramacion: 'Programación por digito nit',
        anio: '2023',
        fechaInicio: '2023-10-15T12:42:49.226Z',
        fechaFin: '2023-10-15T12:42:49.226Z',
        diasFaltantes: '10',
        estado: 'proceso',
        detalle: 6,
      },], number: 0, sort: [{
        direction: 'string', nullHandling: 'string', ascending: true, property: 'string', ignoreCase: true,
      },], numberOfElements: 0, first: true, last: true, empty: true,
    };

    return of(response);
  }

  // Obtener requerimientos detalles
  getRequerimientoInfo(id: string): Observable<any> {
    const response = {
      totalElements: 0, totalPages: 0, pageable: {
        paged: true, pageNumber: 0, pageSize: 0, offset: 0, sort: [{
          direction: 'string', nullHandling: 'string', ascending: true, property: 'string', ignoreCase: true,
        },], unpaged: true,
      }, size: 0, content: [{
        id: 1,
        nombreRequerimiento: 'General anualizada',
        numeroRequerimiento: '413',
        periodoEntrega: 'Anual',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'cristian',
        tipoProgramacion: [{id: 120, descripcion: 'Programación por digito nit'}],
        anio: '2024',
        fechaInicio: '2024-10-15T12:42:49.226Z',
        fechaFin: '2024-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'cancelado',
        fechaCreacion: '2024-10-15T12:42:49.226Z',
      }, {
        id: 2,
        nombreRequerimiento: 'Modelo de negocios especiales',
        numeroRequerimiento: '398',
        periodoEntrega: 'Mensual',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'cristian',
        tipoProgramacion: [{id: 121, descripcion: 'Programación por Grupo de vigilados (delegatura)'}],
        anio: '2023',
        fechaInicio: '2023-10-15T12:42:49.226Z',
        fechaFin: '2023-10-15T12:42:49.226Z',
        diasFaltantes: '10',
        estado: 'proceso',
        fechaCreacion: '2023-10-15T12:42:49.226Z',
      }, {
        id: 3,
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        periodoEntrega: 'Quincenal',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'Juan p',
        tipoProgramacion: [{id: 122, descripcion: 'Programación individual'}],
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        fechaCreacion: '2022-10-15T12:42:49.226Z',
      }, {
        id: 4,
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        periodoEntrega: 'Quincenal',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'cristian',
        tipoProgramacion: [{id: 120, descripcion: 'Programación por digito nit'}],
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        fechaCreacion: '2022-10-15T12:42:49.226Z',
      }, {
        id: 5,
        nombreRequerimiento: 'Periodos intermedios',
        numeroRequerimiento: '390',
        periodoEntrega: 'Quincenal',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'Juan p',
        tipoProgramacion: [{id: 120, descripcion: 'Programación por digito nit'}],
        anio: '2022',
        fechaInicio: '2022-10-15T12:42:49.226Z',
        fechaFin: '2022-10-15T12:42:49.226Z',
        diasFaltantes: '0',
        estado: 'finalizado',
        fechaCreacion: '2022-10-15T12:42:49.226Z',
      }, {
        id: 6,
        nombreRequerimiento: 'Modelo de negocios especiales',
        numeroRequerimiento: '398',
        periodoEntrega: 'Anual',
        estadoVigilado: 'Activo',
        funcionarioProgramador: 'cristian',
        tipoProgramacion: [{id: 120, descripcion: 'Programación por digito nit'}],
        anio: '2023',
        fechaInicio: '2023-10-15T12:42:49.226Z',
        fechaFin: '2023-10-15T12:42:49.226Z',
        diasFaltantes: '10',
        estado: 'proceso',
        fechaCreacion: '2023-10-15T12:42:49.226Z',
      },], number: 0, sort: [{
        direction: 'string', nullHandling: 'string', ascending: true, property: 'string', ignoreCase: true,
      },], numberOfElements: 0, first: true, last: true, empty: true,
    };

    const filteredRequerimiento = response.content.find(item => item.id === parseInt(id));

    // Retornar el resultado filtrado en un Observable
    return of(filteredRequerimiento || {});
  }

}

