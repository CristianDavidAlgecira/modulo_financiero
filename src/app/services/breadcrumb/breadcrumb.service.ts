import {Injectable} from '@angular/core';
import {Router, NavigationEnd, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<{name: string; route: string}[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  user: any;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Asegúrate de que el filtro devuelva NavigationEnd
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb(): void {
    const url = this.router.url;

    if(url.includes('administracion')) {
      this.breadcrumbSubject.next([{name: 'Administrar requerimiento', route: 'NA'},]);
    } else if(url.includes('nuevo-requerimiento')) {
      this.breadcrumbSubject.next([{name: 'Administrar requerimiento', route: 'NA'}, {
        name: 'Nuevo requerimiento', route: 'nuevo-requerimiento',
      },]);
    } else if(url.includes('detalle-requerimientos')) {
      this.breadcrumbSubject.next([{name: 'Administrar requerimiento', route: 'NA'}, {
        name: 'Detalle de requerimiento', route: 'detalle-requerimientos',
      },]);
    } else if(url.includes('iniciar-reporte')) {
      this.breadcrumbSubject.next([{name: 'Entrega pendiente', route: 'entregas-pendientes'}, {
        name: 'Generar reporte', route: 'iniciar-reporte',
      },]);
    }
    else if(url.includes('consultar-entregas')) {
      this.breadcrumbSubject.next([{
        name: 'Consultar entrega', route: 'consultar-entregas',
      },]);
    }
    else if(url.includes('entregas-pendientes')) {
      this.breadcrumbSubject.next([{
        name: 'Entrega pendientes', route: 'entregas-pendientes',
      },]);
    }else if(url.includes('ver-detalle-consultar-entregas')) {
      this.breadcrumbSubject.next([{name: 'Consultar Entrega', route: 'consultar-entregas'}, {
        name: 'Ver detalles', route: 'ver-detalle-consultar-entregas',
      },]);
    }else if(url.includes('iniciar-reporte')) {
      this.breadcrumbSubject.next([{name: 'Entrega pendiente', route: 'entregas-pendientes'}, {
        name: 'Generar reporte', route: 'iniciar-reporte',
      },]);
    }else if(url.includes('detalles-reportes')) {
      this.breadcrumbSubject.next([{name: 'Entregas', route: 'NA'}, {
        name: 'Reporte financiero', route: 'NA',
      },]);

    }else if(url.includes('vigilado')) {
      this.breadcrumbSubject.next([{name: 'Vigilado', route: 'NA'},]);

    }
    else {
      this.breadcrumbSubject.next([{name: 'Ruta no reconocida', route: 'NA'},]);
    }

  }
}
