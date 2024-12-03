import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';
import {VerDetalleComponent} from './vistas/spring-1/ver-detalle/ver-detalle.component';
import LoginComponent from "./vistas/login/login.component";
import {AuthGuard} from "./auth.guard";
import {AuthLoginComponent} from "./layout/login/auth-login.component";
import {VisualizarArchivoComponent} from "./vistas/spring-2/visualizar-archivo/visualizar-archivo.component";
import {ConsultarEntregasComponent} from "./vistas/spring-2/consultar-entregas/consultar-entregas.component";
import {
  VerDetalleConsultarEntregasComponent
} from "./vistas/spring-2/ver-detalle-consultar-entregas/ver-detalle-consultar-entregas.component";

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
        path: 'visualizar-archivo',
        loadComponent: () => VisualizarArchivoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'consultar-entregas',
        loadComponent: () => ConsultarEntregasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ver-detalle-consultar-entregas',
        loadComponent: () => VerDetalleConsultarEntregasComponent,
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
