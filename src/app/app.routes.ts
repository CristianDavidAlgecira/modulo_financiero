import {Routes} from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AdministracionComponent} from './vistas/spring-1/administracion/administracion.component';
import {NuevoRequerimientoComponent} from './vistas/spring-1/nuevo-requerimiento/nuevo-requerimiento.component';
import {VerDetalleComponent} from './vistas/spring-1/ver-detalle/ver-detalle.component';
import {AuthLoginComponent} from "./layout/login/auth-login.component";
import {VisualizarArchivoComponent} from "./vistas/spring-2/visualizar-archivo/visualizar-archivo.component";
import {ConsultarEntregasComponent} from "./vistas/spring-2/consultar-entregas/consultar-entregas.component";
import {
  VerDetalleConsultarEntregasComponent
} from "./vistas/spring-2/ver-detalle-consultar-entregas/ver-detalle-consultar-entregas.component";
import {OtrosAnexosComponent} from "./vistas/spring-2/otros-anexos/otros-anexos.component";
import {OtrosAspectosComponent} from "./vistas/spring-2/otros-aspectos/otros-aspectos.component";
import {AuthGuard} from "./guards/auth.guard";
import {ErrorAutenticationComponent} from "./vistas/auth/error-autentication/error-autentication.component";
import {EntregasPendientesComponent} from "./vistas/spring-2/entregas-pendientes/entregas-pendientes.component";
import {
  VerDetalleEntregasPendientesComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/ver-detalle-entregas-pendientes.component";
import {IniciarReporteComponent} from "./vistas/spring-2/iniciar-reporte/iniciar-reporte.component";
import {
  AnexoEntregasPendientesComponent
} from "./vistas/spring-2/anexo-entregas-pendientes/anexo-entregas-pendientes.component";
import {
  FormularioRequerimientoAnulacionComponent
} from "./vistas/spring-2/formulario-requerimiento-anulacion/formulario-requerimiento-anulacion.component";
import {ModificarEntregaComponent} from "./vistas/spring-2/modificar-entrega/modificar-entrega.component";
import {VigiladoComponent} from "./vistas/spring-2/vigilado/vigilado.component";

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => InicioComponent,
    children: [
      {
        path: 'administracion',
        loadComponent: () => AdministracionComponent,
        canActivate: [AuthGuard],
        data: {permission: ['MSF_SF_LISTAR_SOLICITUD_TR', 'MSF_SF_LISTAR_SOLICITUD_GD', 'MSF_SF_LISTAR_SOLICITUD_ST']}
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
        path: 'entregas-pendientes',
        loadComponent: () => EntregasPendientesComponent,

      },
      {
        path: 'ver-detalle-consultar-entregas',
        loadComponent: () => VerDetalleConsultarEntregasComponent,

      },
      {
        path: 'ver-detalle-entregas-pendientes',
        loadComponent: () => VerDetalleEntregasPendientesComponent,

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
        path: 'iniciar-reporte',
        loadComponent: () => IniciarReporteComponent,

      },
      {
        path: 'anexo-entregas-pendientes',
        loadComponent: () => AnexoEntregasPendientesComponent,

      },
      {
        path: 'formulario-requerimiento-anulacion',
        loadComponent: () => FormularioRequerimientoAnulacionComponent,

      },
      {
        path: 'modificar-entregas',
        loadComponent: () => ModificarEntregaComponent,

      },
      {
        path: 'vigilado',
        loadComponent: () => VigiladoComponent,

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
        path: 'errorautenticacion',
        loadComponent: () => ErrorAutenticationComponent,
      },
      {
        path: '',
        redirectTo: 'errorAutentication',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'administracion'

  }

];
