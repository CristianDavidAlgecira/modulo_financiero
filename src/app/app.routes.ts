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
import {
  DetallesReportesComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportes/detalles-reportes.component";
import {
  DetallesReportesESFComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportesESF/detalles-reportesESF.component";
import {
  DetallesReportesERComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportesER/detalles-reportesER.component";
import {
  DetallesReportesORIComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportesORI/detalles-reportesORI.component";
import {
  DetallesReportesEFEIndirectoComponent
} from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportesEFEIndirecto/detalles-reportesEFEIndirecto.component";
// import {
//   DetallesReportesEFEIndirectoComponent
// } from "./vistas/spring-2/ver-detalle-entregas-pendientes/detalles-reportes/detalles-reportes.component";

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => InicioComponent,
    children: [
      {
        path: 'administracion',
        loadComponent: () => AdministracionComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_LISTAR_REQUERIMIENTOS'}
      },
      {
        path: 'nuevo-requerimiento',
        loadComponent: () => NuevoRequerimientoComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CREAR_REQUERIMIENTOS'}

      },
      {
        path: 'detalle-requerimientos',
        loadComponent: () => VerDetalleComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_LISTAR_REQUERIMIENTOS'}

      },
      {
        path: 'visualizar-archivo',
        loadComponent: () => VisualizarArchivoComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'consultar-entregas',
        loadComponent: () => ConsultarEntregasComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'entregas-pendientes',
        loadComponent: () => EntregasPendientesComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'ver-detalle-consultar-entregas',
        loadComponent: () => VerDetalleConsultarEntregasComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'ver-detalle-entregas-pendientes',
        loadComponent: () => VerDetalleEntregasPendientesComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'detalles-reportes',
        loadComponent: () => DetallesReportesComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'detalles-reportes-esf',
        loadComponent: () => DetallesReportesESFComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'detalles-reportes-er',
        loadComponent: () => DetallesReportesERComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'detalles-reportes-ori',
        loadComponent: () => DetallesReportesORIComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'detalles-reportes-efectivo-indirecto',
        loadComponent: () => DetallesReportesEFEIndirectoComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'otros-anexos',
        loadComponent: () => OtrosAnexosComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'otros-aspectos',
        loadComponent: () => OtrosAspectosComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_ENTREGAS_PENDIENTES'}

      },
      {
        path: 'iniciar-reporte',
        loadComponent: () => IniciarReporteComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'anexo-entregas-pendientes',
        loadComponent: () => AnexoEntregasPendientesComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'formulario-requerimiento-anulacion',
        loadComponent: () => FormularioRequerimientoAnulacionComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'modificar-entregas',
        loadComponent: () => ModificarEntregaComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

      },
      {
        path: 'vigilado',
        loadComponent: () => VigiladoComponent,
        canActivate: [AuthGuard],
        data: {permission: 'MF_CONSULTAR_ENTREGAS'}

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
    path: 'dashboard',
    loadComponent: () => import('./vistas/dashboard/dashboard.component'),
  },
  {
    path: '**',
    redirectTo: 'dashboard'

  }

];
