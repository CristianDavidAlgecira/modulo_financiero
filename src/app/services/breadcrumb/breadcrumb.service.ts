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
    } else if(url.includes('validador_nit')) {
      this.breadcrumbSubject.next([{name: 'Tramitar solicitud', route: 'NA'}, {
        name: 'validador NIT', route: 'validador_nit',
      },]);
    } else if(url.includes('nuevo-requerimiento')) {
      this.breadcrumbSubject.next([{name: 'Administrar requerimiento', route: 'NA'}, {
        name: 'Nuevo requerimiento', route: 'nuevo-requerimiento',
      },]);
    } else if(url.includes('detalle-requerimientos')) {
      this.breadcrumbSubject.next([{name: 'Administrar requerimiento', route: 'NA'}, {
        name: 'Detalle de requerimiento', route: 'detalle-requerimientos',
      },]);
    } else {
      this.breadcrumbSubject.next([{name: 'Ruta no reconocida', route: 'NA'},]);
    }

  }
}
