import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';
import {VerDetalleComponent} from './vistas/spring-1/ver-detalle/ver-detalle.component';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => InicioComponent,
    children: [
      {
        path: 'administracion',
        loadComponent: () => AdministracionComponent,
      },
      {
        path: 'nuevo-requerimiento',
        loadComponent: () => NuevoRequerimientoComponent,
      },
      {
        path: 'detalle-requerimientos',
        loadComponent: () => VerDetalleComponent,
      },
      {
        path: '',
        redirectTo: 'administracion',
        pathMatch: 'full'
      }
    ]
  }

];
