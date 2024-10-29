import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';
import {VerDetalleComponent} from './vistas/spring-1/ver-detalle/ver-detalle.component';
import LoginComponent from "./vistas/login/login.component";
import {AuthGuard} from "./auth.guard";
import {AuthLoginComponent} from "./layout/login/auth-login.component";

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => InicioComponent,
    children: [
      {
        path: 'administracion',
        loadComponent: () => AdministracionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nuevo-requerimiento',
        loadComponent: () => NuevoRequerimientoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detalle-requerimientos',
        loadComponent: () => VerDetalleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'administracion',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadComponent: () => AuthLoginComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => LoginComponent,
        canActivate: [AuthGuard],
      },

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'administracion'

  }



];
