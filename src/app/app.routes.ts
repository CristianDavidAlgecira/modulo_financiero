import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';

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
        path: '',
        redirectTo: 'administracion',
        pathMatch: 'full'
      }
    ]
  }

];
