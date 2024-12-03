import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';
import {VerDetalleComponent} from './vistas/spring-1/ver-detalle/ver-detalle.component';
import LoginComponent from "./vistas/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthLoginComponent} from "./layout/login/auth-login.component";
import {VisualizarArchivoComponent} from "./vistas/spring-2/visualizar-archivo/visualizar-archivo.component";
import {ConsultarEntregasComponent} from "./vistas/spring-2/consultar-entregas/consultar-entregas.component";
import {
  VerDetalleConsultarEntregasComponent
} from "./vistas/spring-2/ver-detalle-consultar-entregas/ver-detalle-consultar-entregas.component";
import {OtrosAnexosComponent} from "./vistas/spring-2/otros-anexos/otros-anexos.component";
import {OtrosAspectosComponent} from "./vistas/spring-2/otros-aspectos/otros-aspectos.component";

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => InicioComponent,
    children: [
      {
        path: 'administracion',
        loadComponent: () => AdministracionComponent,
        /*canActivate: [AuthGuard],
        data: { permission: ['MSF_SF_LISTAR_SOLICITUD_TR', 'MSF_SF_LISTAR_SOLICITUD_GD', 'MSF_SF_LISTAR_SOLICITUD_ST'] }*/
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
        path: 'visualizar-archivo',
        loadComponent: () => VisualizarArchivoComponent,

      },
      {
        path: 'consultar-entregas',
        loadComponent: () => ConsultarEntregasComponent,

      },
      {
        path: 'ver-detalle-consultar-entregas',
        loadComponent: () => VerDetalleConsultarEntregasComponent,

      },
      {
        path: 'otros-anexos',
        loadComponent: () => OtrosAnexosComponent,

      },
      {
        path: 'otros-aspectos',
        loadComponent: () => OtrosAspectosComponent,

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
