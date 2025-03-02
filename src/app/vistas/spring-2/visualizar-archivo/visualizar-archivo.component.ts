import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../componentes/alert/alert.component";
import {AuthService} from "../../../services/auth/auth.service";
import {ApiMuvService} from "../../../services/api/api-muv.service";

@Component({
  selector: 'app-visualizar-archivo',
  standalone: true,
  imports: [FileUploadComponent, AlertComponent],
  templateUrl: './visualizar-archivo.component.html',
  styleUrl: './visualizar-archivo.component.css'
})

export class VisualizarArchivoComponent implements OnInit {

  // Propiedad de objeto para manejar errores
  errorStates: { [key: number]: boolean } = {};

  // Propiedades del input: tamaño, info, etc.
  dataClass = {
    textSize: 'xs', textInfo: 'Archivo Excel',
  };

  // Propiedad de guardar temporalmente el archivo seleccionado
  // @ts-ignore
  selectedFile: File = [];

  //modales
  showErrorModal: boolean = false;
  showLoadingModal: boolean = false;
  showValidado: boolean = false;
  showFinalModal: boolean = false;
  showError: boolean = false;

  //mensaje error
  messageNoValidado: string = '';


  // Propiedad de validationRanges
  validationRanges: any;

  // Propiedad de fieldgrupo1
  fieldgrupo1: any;
  //grupo NIF
  grupoNif:number = 0;
  @Input() idHeredado:string = '0';

  // Constructor
  constructor(
    private errorService: ErrorService,
    private ApiMFService: ApiMFService,
    private ApiMuvService: ApiMuvService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

    this.ApiMuvService.getDetallesByNIT(this.authService.getUserInfo().documento).subscribe((response: any) => {
      console.log(response.idClasificacionGrupoNiif);
      if(response.idClasificacionGrupoNiif === 136) {
        this.grupoNif = 1;
      } else if(response.idClasificacionGrupoNiif === 137) {
        this.grupoNif = 2;
      } else if(response.idClasificacionGrupoNiif === 138) {
        this.grupoNif = 3;
      } else if(response.idClasificacionGrupoNiif === 139) {
        this.grupoNif = 4;
      } else if(response.idClasificacionGrupoNiif === 140) {
        this.grupoNif = 5;
      } else if(response.idClasificacionGrupoNiif === 141) {
        this.grupoNif = 6;
      }

      console.log(this.grupoNif);
      this.onCeldasExcel(this.grupoNif);
      console.log(this.validationRanges)
    });

    this.onCeldasExcel(1);
    console.log(this.validationRanges)



  }

  // Metodo para definir las celdas del excel segun los grupos
  onCeldasExcel(numero: number) {


    this.validationRanges = {
      "validationRanges": [{
        "sheetName": "INDICE", "keywords": {}
      }, {
        "sheetName": "Identificación del Vigilado", "keywords": {
          "DATOS BÁSICOS": 1
        }
      }, {
        "sheetName": "ESF", "keywords": {
          "CORRECTO": 18
        }
      }, {
        "sheetName": "ER", "keywords": {
          "CORRECTO": 2, "ESTADO DE RESULTADOS": 1,
        }
      }, {
        "sheetName": "ORI", "keywords": {
          "CORRECTO": 2, "ESTADO DE RESULTADO INTEGRAL componentes ORI - OTRO RESULTADO INTEGRAL": 1,
        }
      }, {
        "sheetName": "EFE-indirecto", "keywords": {
          "CORRECTO": 2, "ESTADO DE FLUJO DE EFECTIVO (método indirecto)": 1,
        }
      }, {
        "sheetName": "EFE-directo", "keywords": {
          "CORRECTO": 2, "ESTADO DE FLUJO DE EFECTIVO(método directo)": 1,
        }
      }, {
        "sheetName": "ECP", "keywords": {
          "CORRECTO": 4, "ESTADO DE CAMBIOS EN EL PATRIMONIO": 1
        }
      }, {
        "sheetName": "Dictamen", "keywords": {
          "CORRECTO": 1, "DICTAMEN DEL REVISOR FISCAL": 1,
        }
      }, {
        "sheetName": "Listas desplegables(ocultar)", "keywords": {}
      }]
    };

    switch (numero) {
      case 1:
        this.fieldgrupo1 = {
          "Identificación del Vigilado": {
            "nitSinDigitoVerificacion": "F9",
            "digitoVerificacion": "F10",
            "nombreSociedad": "F11",
            "grupoNiifReporte": "F12",
            "tipoEstadosFinancieros": "F13",
            "tipoVinculacionEconomica": "F14",
            "tipoSubordinada": "F15",
            "vinculadosEconomicos": "F16",
            "nombreVinculadoEconomico1": "F17",
            "nitVinculadoEconomico1": "F18",
            "nombreVinculadoEconomico2": "F19",
            "nitVinculadoEconomico2": "F20",
            "nombreVinculadoEconomico3": "F21",
            "nitVinculadoEconomico3": "F22",
            "nombreVinculadoEconomico4": "F23",
            "nitVinculadoEconomico4": "F24",
            "nombreVinculadoEconomico5": "F25",
            "nitVinculadoEconomico5": "F26",
            "fechaInicialEstadosFinancieros": "F27",
            "fechaCorteEstadosFinancieros": "F28",
            "monedaPresentacion": "F29",
            "fechaReporte": "F30",
            "periodicidadPresentacion": "F31",
            "anoActualReporte": "F32",
            "anoComparativo": "F33",
            "nit": "NitValue",

          }, "ESF": {
            "totalActivosCorrientes": "H12, J12",
            "efectivoYEquivalentesAlEfectivo": "H13, J13",
            "efectivoRestringido": "H14, J14",
            "inversionesCortoPlazo": "H15, J15",
            "cuentasComercialesCobrarOperacionalesClientes": "H16, J16",
            "cuentasPorCobrarConPartesRelacionadas1": "H17, J17",
            "activosBiologicos": "H18, J18",
            "otrasCuentasPorCobrar1": "H19, J19",
            "pagosAnticipados": "H20, J20",
            "inventariosCorrientes": "H21, J21",
            "activosPorImpuestos": "H22, J22",
            "activosDistintosAlEfectivoPignoradosComoGarantia": "H23, J23",
            "otrosActivosFinancieros1": "H24, J24",
            "otrosActivosNoFinancieros1": "H25, J25",
            "validacionActivosCorrientes": "H26, J26",
            "totalActivosNoCorrientes": "H28, J28",
            "depositosYOtrosActivos1": "H29, J29",
            "inversionesLargoPlazo": "H30, J30",
            "cuentasComercialesPorCobrar": "H31, J31",
            "cuentasPorCobrarConPartesRelacionadas2": "H32, J32",
            "otrasCuentasPorCobrar2": "H33, J33",
            "propiedadDeInversion": "H34, J34",
            "activosIntangiblesYCreditoMercantil": "H35, J35",
            "propiedadesPlantaYEquipo": "H36, J36",
            "activosBiologicosNoCorrientes": "H37, J37",
            "inversionesContabilizadasParticipacion": "H38, J38",
            "inversionesSubsidiarNegocios": "H39, J39",
            "plusvalia": "H40, J40",
            "inventariosNoCorrientes": "H41, J41",
            "activosPorImpuestosDiferidos": "H42, J42",
            "activosPorImpuestosCorrientesNoCorrientes": "H43, J43",
            "otrosActivosFinancieros2": "H44, J44",
            "otrosActivosNoFinancieros2": "H45, J45",
            "activosDistintosAlEfectivo": "H46, J46",
            "validacionActivosNoCorrientes": "H47, J47",
            "validacionActivos": "H49, J49",
            "pasivos": "H51, J51",
            "pasivosCorrientes": "H53, J53",
            "cuentasPorPagarComercialesProveedores": "H54, J54",
            "otrasCuentasPorPagar": "H55, J55",
            "pasivosPorImpuestos1": "H56, J56",
            "deudaFinanciera": "H57, J57",
            "otrosPasivosNoFinancieros1": "H58, J58",
            "depositosYOtrosActivos2": "H59, J59",
            "porcionCorrienteDeuda": "H60, J60",
            "cuentasPorPagarConPartesRelacionadas3": "H61, J61",
            "otrasProvisiones": "H62, J62",
            "provisionesPorBeneficiosAEmpleados1": "H63, J63",
            "ingresosRecibidosPorCuentaDeTerceros": "H64, J64",
            "validacionPasivosCorrientes": "H65, J65",
            "pasivosNoCorrientes": "H67, J67",
            "deudaALargoPlazo": "H68, J68",
            "cuentasPorPagar": "H69, J69",
            "provisionesPorBeneficiosAEmpleados2": "H70, J70",
            "pasivosPorImpuestosDiferidos": "H71, J71",
            "ingresosRecibidosPorAnticipado": "H72, J72",
            "otrosPasivosNoFinancieros2": "H73, J73",
            "otrosPasivosFinancieros": "H74, J74",
            "pasivosPorImpuestos2": "H75, J75",
            "validacionPasivosNoCorrientes": "H76, J76",
            "validacionPasivos": "H78, J78",
            "patrimonio": "H80, J80",
            "capitalPagado": "H81, J81",
            "primaDeEmision": "H82, J82",
            "readquisicionDeInstrumentosDePatrimonioPropio": "H83, J83",
            "inversionSumplementariaAlCapitalAsignado": "H84, J84",
            "otrasParticipacionesEnElPatrimonio": "H85, J85",
            "superavitPorRevaluacion": "H86, J86",
            "reservaLegal": "H87, J87",
            "otrasReservas": "H88, J88",
            "utilidadYorPerdidaDelEjercicio": "H89, J89",
            "utilidadYorPerdidaAcumulada": "H90, J90",
            "gananciasAcumuladasPorEfectoDeLaConvergencia": "H91, J91",
            "gananciasAcumuladasDiferentesALasGeneradasPorEfectoDeLaConvergencia": "H92, J92",
            "validacionPatrimonio": "H93, J93",
            "validacionGananciaPerdidaNeta": "H95, J95",
            "totalPasivoPatrimonio": "H97, J97",
            "validacionEcuacionPatrimonial": "H99, J99",
            "nit": "NitValue",
            "annio": "H10, J10"
          },
          "ER": {
            "annio": "H10, J10",
            "resultadoIntegralPropietarios": "H44, J44",
            "resultadoIntegralNoControladoras": "H45, J45",
            "resultadoIntegralTotal": "H46, J46",
            "validacionEstadoResultados": "H49,J49",
            "ingresosActividadesOrdinarias": "H11, J11",
            "ingresosActividadesTransporte": "H12, J12",
            "ingresosOtrasActividades": "H13, J14",
            "costoVentas": "H14, J14",
            "amortizacion": "H15, J15",
            "depreciacion": "H16, J16",
            "gananciaBruta": "H17, J17",
            "gastosVentas": "H18, J18",
            "gastosAdministracion": "H19, J19",
            "otrosGastosOperacionales": "H22, J22",
            "otrosIngresosOperacionales": "H23, J23",
            "otrasGananciasPerdidasOperacionales": "H24, J24",
            "gananciaOperacion": "H25, J25",
            "diferenciaDividendosActivos": "H26, J26",
            "gananciaPosicionMonetariaNeta": "H27, J27",
            "gananciasBajaActivosFinancieros": "H28, J28",
            "ingresosNoOperacionales": "H29, J29",
            "ingresosFinancieros": "H30, J30",
            "otrosIngresosNoOperacionales": "H31, J31",
            "gastosNoOperacionales": "H32, J32",
            "costosFinancieros": "H33, J33",
            "otrosGastosFinancieros": "H34, J34",
            "interesesDeuda": "H35, J35",
            "otrosGastosNoOperacionales": "H36, J36",
            "participacionGananciasAsociadas": "H37, J37",
            "gananciaAntesImpuestos": "H38, J38",
            "ingresoImpuestos": "H39, J39",
            "gastoImpuestoGanancias": "H40, J40",
            "gananciaOperacionesContinuadas": "H41, J41",
            "gananciaOperacionesDiscontinuadas": "H42, J42",
            "gananciaNeta": "H43, J43",
            "nit": "nit"
          },
          "ORI": {
            "gananciaPerdidaNeta": "J10, L10",
            "otroResultadoIntegralDiferenciasCambioConversion": "J13, L13",
            "otroResultadoIntegralGananciasActuariales": "J14, L14",
            "otroResultadoIntegralGananciasRevaluacion": "J15, L15",
            "totalOtroResultadoIntegralNoReclasificable": "J16, L16",
            "gananciasCoberturasFlujosEfectivo": "J18, L18",
            "totalOtroResultadoIntegralReclasificable": "J19, L19",
            "participacionOtroResultadoIntegralSubsidiarias": "J20, L20",
            "totalOtroResultadoIntegral": "J21, L21",
            "resultadoIntegralTotal": "J22, L22",
            "resultadoIntegralPropietariosControladora": "J24, L24",
            "resultadoIntegralParticipacionesNoControladoras": "J25, L25",
            "validacionEstadoResultados": "J27, L27",
            "nit": "NitValue",
            "annio": "J9, L9"
          }, "EFE-indirecto": {
            "gananciaPerdida": "J10",
            "ajustesGastosImpuestosGanancias": "J12",
            "ajustesGastosDepreciacionAmortizacion": "J13",
            "ajustesDeterioroReversionPerdidas": "J14",
            "ajustesProvisiones": "J15",
            "ajustesCostosFinancieros": "J16",
            "ajustesPerdidasGananciasMonedaExtranjera": "J17",
            "ajustesPerdidasGananciasValorRazonable": "J18",
            "ajustesGananciasNoDistribuidasAsociadas": "J19",
            "ajustesPerdidasGananciasDisposicionActivosNoCorrientes": "J20",
            "otrosAjustesConciliarGananciaPerdida": "J21",
            "totalAjustesConciliarGananciaPerdida": "J22",
            "ajustesDisminucionesIncrementosInventarios": "J24",
            "ajustesDisminucionIncrementoCuentasPorCobrar": "J25",
            "ajustesDisminucionesIncrementosOtrasCuentasCobrar": "J26",
            "ajustesIncrementoDisminucionCuentasPorPagar": "J27",
            "ajustesIncrementosDisminucionesOtrasCuentasPagar": "J28",
            "otrasEntradasSalidasEfectivo": "J29",
            "flujosEfectivoNetosActividadesOperacion": "J30",
            "flujosEfectivoPerdidaControlSubsidiarias": "J32",
            "flujosEfectivoObtenerControlSubsidiarias": "J33",
            "cobrosVentaPatrimonioInstrumentosDeuda": "J34",
            "pagosAdquirirPatrimonioInstrumentosDeuda": "J35",
            "cobrosVentaParticipacionesNegociosConjuntos": "J36",
            "pagosAdquirirParticipacionesNegociosConjuntos": "J37",
            "ventaPropiedadesPlantaEquipo": "J38",
            "comprasPropiedadesPlantaEquipo": "J39",
            "ventaActivosIntangibles": "J40",
            "comprasActivosIntangibles": "J41",
            "recursosVentasOtrosActivosLargoPlazo": "J42",
            "comprasOtrosActivosLargoPlazo": "J43",
            "anticiposPrestamosConcedidosTerceros": "J44",
            "cobrosReembolsoAnticiposPrestamos": "J45",
            "pagosContratosDerivados": "J46",
            "cobrosContratosDerivados": "J47",
            "dividendosRecibidos": "J48",
            "interesesRecibidos": "J49",
            "interesesPagados": "J51",
            "flujosEfectivoNetosActividadesInversion": "J53",
            "aumentosCapitalRecolocacionAcciones": "J55",
            "disminucionCapitalReadquisicionAcciones": "J56",
            "pagosOtrasParticipacionesPatrimonio": "J57",
            "aumentoPrimaEmision": "J58",
            "disminucionPrimaEmision": "J59",
            "importesProcedentesPrestamos": "J60",
            "reembolsosPrestamos": "J61",
            "pagosPasivosArrendamientosFinancieros": "J62",
            "dividendosPagados": "J63",
            "flujosEfectivoNetosActividadesFinanciacion": "J66",
            "incrementoDisminucionEfectivoEquivalentes": "J67",
            "efectosTasaCambioEfectivoEquivalentes": "J69",
            "efectivoEquivalentesPrincipioPeriodo": "J71",
            "efectivoEquivalentesFinalPeriodo": "J72",
            "nit": 'nit',
            "annio": "J8"

          }, "EFE-directo": {
            "flujosEfectivoProcedentesUtilizadosActividadesOperacion": "J9",
            "clasesCobrosActividadesOperacion": "J10",
            "cobrosVentasBienesPrestacionServicios": "J11",
            "cobrosRegaliasCuotasComisionesOtrosIngresos": "J12",
            "cobrosContratosIntermediacionNegociacion": "J13",
            "cobrosPrimasPrestacionesAnualidadesPolizas": "J14",
            "cobrosRentasVentasActivosMantenidosTerceros": "J15",
            "otrosCobrosPorActividadesOperacion": "J16",
            "clasesPagosEfectivoActividadesOperacion": "J17",
            "pagosProveedoresSuministroBienesServicios": "J18",
            "pagosContratosIntermediacionNegociacion": "J19",
            "pagosCuentaEmpleados": "J20",
            "pagosPrimasPrestacionesAnualidadesPolizas": "J21",
            "pagosActivosMantenidosTercerosVenta": "J22",
            "otrosPagosPorActividadesOperacion": "J23",
            "flujosEfectivoNetosUtilizadosOperaciones": "J24",
            "dividendosPagados": "J25",
            "dividendosRecibidos": "J26",
            "interesesPagados": "J27",
            "interesesRecibidos": "J28",
            "impuestosGananciasReembolsadosPagados": "J29",
            "otrasEntradasSalidasEfectivo": "J30",
            "flujosEfectivoNetosUtilizadosInversion": "J31",
            "recursosCambioPropiedadSubsidiarias": "J57",
            "pagosCambioPropiedadSubsidiarias": "J58",
            "importesEmisionAcciones": "J59",
            "importesEmisionInstrumentosPatrimonio": "J60",
            "pagosAdquirirRescatarAccionesEntidad": "J61",
            "pagosOtrasParticipacionesPatrimonio": "J62",
            "importesPrestamos": "J63",
            "reembolsosPrestamos": "J64",
            "pagosPasivosArrendamientosFinancieros": "J65",
            "importesSubvencionesGobierno": "J66",
            "flujosEfectivoProcedentesUtilizadosFinanciacion": "J73",
            "incrementoDisminucionNetoEfectivo": "J74",
            "efectosVariacionTasaCambioEfectivo": "J76",
            "efectivoEquivalentesPrincipioPeriodo": "J78",
            "efectivoEquivalentesFinalPeriodo": "J79",
            "nit": "nit",
            "annio": "J8"

          }, "Dictamen": {
            "dictamen": "F11",
            "opinionDictamen": "F13",
            "contenidoSalvedadDictamen": "F14",
            "parrafoEnfasisDictamen": "F15",
            "hipotesisNegocioMarcha": "F16",
            "validacionHNM": "F17",
            "nit": "nit",
            "annio": "F9"
          }

        };
        break;

      case 2:
        this.fieldgrupo1 = {
          "Identificación del Vigilado": {
            "nitSinDigitoVerificacion": "F10",
            "digitoVerificacion": "F11",
            "nombreSociedad": "F12",
            "grupoNiifReporte": "F13",
            "tipoEstadosFinancieros": "F14",
            "tipoVinculacionEconomica": "F15",
            "tipoSubordinada": "F16",
            "vinculadosEconomicos": "F17",
            "nombreVinculadoEconomico1": "F20",
            "nitVinculadoEconomico1": "F21",
            "nombreVinculadoEconomico2": "F22",
            "nitVinculadoEconomico2": "F23",
            "nombreVinculadoEconomico3": "F24",
            "nitVinculadoEconomico3": "F25",
            "nombreVinculadoEconomico4": "F26",
            "nitVinculadoEconomico4": "F27",
            "nombreVinculadoEconomico5": "F28",
            "nitVinculadoEconomico5": "F29",
            "fechaInicialEstadosFinancieros": "F30",
            "fechaCorteEstadosFinancieros": "F31",
            "monedaPresentacion": "F32",
            "fechaReporte": "F33",
            "periodicidadPresentacion": "F34",
            "anoActualReporte": "F35",
            "anoComparativo": "F36",
            "nit": "NitValue",
          },
          "ESF": {
            "totalActivosCorrientes": "H12, J12",
            "efectivoYEquivalentesAlEfectivo": "H13, J13",
            "efectivoRestringido": "H14, J14",
            "inversionesCortoPlazo": "H15, J15",
            "cuentasComercialesCobrarOperacionalesClientes": "H16, J16",
            "cuentasPorCobrarConPartesRelacionadas1": "H17, J17",
            "activosBiologicos": "H18, J18",
            "otrasCuentasPorCobrar1": "H19, J19",
            "pagosAnticipados": "H20, J20",
            "inventariosCorrientes": "H21, J21",
            "activosPorImpuestos": "H22, J22",
            "activosDistintosAlEfectivoPignoradosComoGarantia": "H23, J23",
            "otrosActivosFinancieros1": "H24, J24",
            "otrosActivosNoFinancieros1": "H25, J25",
            "validacionActivosCorrientes": "H26, J26",
            "totalActivosNoCorrientes": "H28, J28",
            "depositosYOtrosActivos1": "H29, J29",
            "inversionesLargoPlazo": "H30, J30",
            "cuentasComercialesPorCobrar": "H31, J31",
            "cuentasPorCobrarConPartesRelacionadas2": "H32, J32",
            "otrasCuentasPorCobrar2": "H33, J33",
            "propiedadDeInversion": "H34, J34",
            "activosIntangiblesYCreditoMercantil": "H35, J35",
            "propiedadesPlantaYEquipo": "H36, J36",
            "activosBiologicosNoCorrientes": "H37, J37",
            "inversionesContabilizadasParticipacion": "H38, J38",
            "inversionesSubsidiarNegocios": "H39, J39",
            "plusvalia": "H40, J40",
            "inventariosNoCorrientes": "H41, J41",
            "activosPorImpuestosDiferidos": "H42, J42",
            "activosPorImpuestosCorrientesNoCorrientes": "H43, J43",
            "otrosActivosFinancieros2": "H44, J44",
            "otrosActivosNoFinancieros2": "H45, J45",
            "activosDistintosAlEfectivo": "H46, J46",
            "validacionActivosNoCorrientes": "H47, J47",
            "validacionActivos": "H49, J49",
            "pasivos": "H51, J51",
            "pasivosCorrientes": "H53, J53",
            "cuentasPorPagarComercialesProveedores": "H54, J54",
            "otrasCuentasPorPagar": "H55, J55",
            "pasivosPorImpuestos1": "H56, J56",
            "deudaFinanciera": "H57, J57",
            "otrosPasivosNoFinancieros1": "H58, J58",
            "depositosYOtrosActivos2": "H59, J59",
            "porcionCorrienteDeuda": "H60, J60",
            "cuentasPorPagarConPartesRelacionadas3": "H61, J61",
            "otrasProvisiones": "H62, J62",
            "provisionesPorBeneficiosAEmpleados1": "H63, J63",
            "ingresosRecibidosPorCuentaDeTerceros": "H64, J64",
            "validacionPasivosCorrientes": "H65, J65",
            "pasivosNoCorrientes": "H67, J67",
            "deudaALargoPlazo": "H68, J68",
            "cuentasPorPagar": "H69, J69",
            "provisionesPorBeneficiosAEmpleados2": "H70, J70",
            "pasivosPorImpuestosDiferidos": "H71, J71",
            "ingresosRecibidosPorAnticipado": "H72, J72",
            "otrosPasivosNoFinancieros2": "H73, J73",
            "otrosPasivosFinancieros": "H74, J74",
            "pasivosPorImpuestos2": "H75, J75",
            "validacionPasivosNoCorrientes": "H76, J76",
            "validacionPasivos": "H78, J78",
            "patrimonio": "H80, J80",
            "capitalPagado": "H81, J81",
            "primaDeEmision": "H82, J82",
            "readquisicionDeInstrumentosDePatrimonioPropio": "H83, J83",
            "inversionSumplementariaAlCapitalAsignado": "H84, J84",
            "otrasParticipacionesEnElPatrimonio": "H85, J85",
            "superavitPorRevaluacion": "H86, J86",
            "reservaLegal": "H87, J87",
            "otrasReservas": "H88, J88",
            "utilidadYorPerdidaDelEjercicio": "H89, J89",
            "utilidadYorPerdidaAcumulada": "H90, J90",
            "gananciasAcumuladasPorEfectoDeLaConvergencia": "H91, J91",
            "gananciasAcumuladasDiferentesALasGeneradasPorEfectoDeLaConvergencia": "H92, J92",
            "validacionPatrimonio": "H93, J93",
            "validacionGananciaPerdidaNeta": "H95, J95",
            "totalPasivoPatrimonio": "H97, J97",
            "validacionEcuacionPatrimonial": "H99, J99",
            "nit": "NitValue",
            "annio": "H10, J10"
          },
          "ER": {
            "annio": "H10, J10",
            "resultadoIntegralPropietarios": "H44, J44",
            "resultadoIntegralNoControladoras": "H45, J45",
            "resultadoIntegralTotal": "H46, J46",
            "validacionEstadoResultados": "H49,J49",
            "ingresosActividadesOrdinarias": "H11, J11",
            "ingresosActividadesTransporte": "H12, J12",
            "ingresosOtrasActividades": "H13, J14",
            "costoVentas": "H14, J14",
            "amortizacion": "H15, J15",
            "depreciacion": "H16, J16",
            "gananciaBruta": "H17, J17",
            "gastosVentas": "H18, J18",
            "gastosAdministracion": "H19, J19",
            "otrosGastosOperacionales": "H22, J22",
            "otrosIngresosOperacionales": "H23, J23",
            "otrasGananciasPerdidasOperacionales": "H24, J24",
            "gananciaOperacion": "H25, J25",
            "diferenciaDividendosActivos": "H26, J26",
            "gananciaPosicionMonetariaNeta": "H27, J27",
            "gananciasBajaActivosFinancieros": "H28, J28",
            "ingresosNoOperacionales": "H29, J29",
            "ingresosFinancieros": "H30, J30",
            "otrosIngresosNoOperacionales": "H31, J31",
            "gastosNoOperacionales": "H32, J32",
            "costosFinancieros": "H33, J33",
            "otrosGastosFinancieros": "H34, J34",
            "interesesDeuda": "H35, J35",
            "otrosGastosNoOperacionales": "H36, J36",
            "participacionGananciasAsociadas": "H37, J37",
            "gananciaAntesImpuestos": "H38, J38",
            "ingresoImpuestos": "H39, J39",
            "gastoImpuestoGanancias": "H40, J40",
            "gananciaOperacionesContinuadas": "H41, J41",
            "gananciaOperacionesDiscontinuadas": "H42, J42",
            "gananciaNeta": "H43, J43",
            "nit": "nit"
          },
          "ORI": {
            "gananciaPerdidaNeta": "J10, L10",
            "otroResultadoIntegralDiferenciasCambioConversion": "J13, L13",
            "otroResultadoIntegralGananciasActuariales": "J14, L14",
            "otroResultadoIntegralGananciasRevaluacion": "J15, L15",
            "totalOtroResultadoIntegralNoReclasificable": "J16, L16",
            "gananciasCoberturasFlujosEfectivo": "J18, L18",
            "totalOtroResultadoIntegralReclasificable": "J19, L19",
            "participacionOtroResultadoIntegralSubsidiarias": "J20, L20",
            "totalOtroResultadoIntegral": "J21, L21",
            "resultadoIntegralTotal": "J22, L22",
            "resultadoIntegralPropietariosControladora": "J24, L24",
            "resultadoIntegralParticipacionesNoControladoras": "J25, L25",
            "validacionEstadoResultados": "J27, L27",
            "nit": "NitValue",
            "annio": "J9, L9"
          },
          "EFE-indirecto": {
            "gananciaPerdida": "J10",
            "ajustesGastosImpuestosGanancias": "J12",
            "ajustesGastosDepreciacionAmortizacion": "J13",
            "ajustesDeterioroReversionPerdidas": "J14",
            "ajustesProvisiones": "J15",
            "ajustesCostosFinancieros": "J16",
            "ajustesPerdidasGananciasMonedaExtranjera": "J17",
            "ajustesPerdidasGananciasValorRazonable": "J18",
            "ajustesGananciasNoDistribuidasAsociadas": "J19",
            "ajustesPerdidasGananciasDisposicionActivosNoCorrientes": "J20",
            "otrosAjustesConciliarGananciaPerdida": "J21",
            "totalAjustesConciliarGananciaPerdida": "J22",
            "ajustesDisminucionesIncrementosInventarios": "J24",
            "ajustesDisminucionIncrementoCuentasPorCobrar": "J25",
            "ajustesDisminucionesIncrementosOtrasCuentasCobrar": "J26",
            "ajustesIncrementoDisminucionCuentasPorPagar": "J27",
            "ajustesIncrementosDisminucionesOtrasCuentasPagar": "J28",
            "otrasEntradasSalidasEfectivo": "J29",
            "flujosEfectivoNetosActividadesOperacion": "J30",
            "flujosEfectivoPerdidaControlSubsidiarias": "J32",
            "flujosEfectivoObtenerControlSubsidiarias": "J33",
            "cobrosVentaPatrimonioInstrumentosDeuda": "J34",
            "pagosAdquirirPatrimonioInstrumentosDeuda": "J35",
            "cobrosVentaParticipacionesNegociosConjuntos": "J36",
            "pagosAdquirirParticipacionesNegociosConjuntos": "J37",
            "ventaPropiedadesPlantaEquipo": "J38",
            "comprasPropiedadesPlantaEquipo": "J39",
            "ventaActivosIntangibles": "J40",
            "comprasActivosIntangibles": "J41",
            "recursosVentasOtrosActivosLargoPlazo": "J42",
            "comprasOtrosActivosLargoPlazo": "J43",
            "anticiposPrestamosConcedidosTerceros": "J44",
            "cobrosReembolsoAnticiposPrestamos": "J45",
            "pagosContratosDerivados": "J46",
            "cobrosContratosDerivados": "J47",
            "dividendosRecibidos": "J48",
            "interesesRecibidos": "J49",
            "interesesPagados": "J51",
            "flujosEfectivoNetosActividadesInversion": "J53",
            "aumentosCapitalRecolocacionAcciones": "J55",
            "disminucionCapitalReadquisicionAcciones": "J56",
            "pagosOtrasParticipacionesPatrimonio": "J57",
            "aumentoPrimaEmision": "J58",
            "disminucionPrimaEmision": "J59",
            "importesProcedentesPrestamos": "J60",
            "reembolsosPrestamos": "J61",
            "pagosPasivosArrendamientosFinancieros": "J62",
            "dividendosPagados": "J63",
            "flujosEfectivoNetosActividadesFinanciacion": "J66",
            "incrementoDisminucionEfectivoEquivalentes": "J67",
            "efectosTasaCambioEfectivoEquivalentes": "J69",
            "efectivoEquivalentesPrincipioPeriodo": "J71",
            "efectivoEquivalentesFinalPeriodo": "J72",
            "nit": 'nit',
            "annio": "J8"

          },
          "EFE-directo": {
            "flujosEfectivoProcedentesUtilizadosActividadesOperacion": "J9",
            "clasesCobrosActividadesOperacion": "J10",
            "cobrosVentasBienesPrestacionServicios": "J11",
            "cobrosRegaliasCuotasComisionesOtrosIngresos": "J12",
            "cobrosContratosIntermediacionNegociacion": "J13",
            "cobrosPrimasPrestacionesAnualidadesPolizas": "J14",
            "cobrosRentasVentasActivosMantenidosTerceros": "J15",
            "otrosCobrosPorActividadesOperacion": "J16",
            "clasesPagosEfectivoActividadesOperacion": "J17",
            "pagosProveedoresSuministroBienesServicios": "J18",
            "pagosContratosIntermediacionNegociacion": "J19",
            "pagosCuentaEmpleados": "J20",
            "pagosPrimasPrestacionesAnualidadesPolizas": "J21",
            "pagosActivosMantenidosTercerosVenta": "J22",
            "otrosPagosPorActividadesOperacion": "J23",
            "flujosEfectivoNetosUtilizadosOperaciones": "J24",
            "dividendosPagados": "J25",
            "dividendosRecibidos": "J26",
            "interesesPagados": "J27",
            "interesesRecibidos": "J28",
            "impuestosGananciasReembolsadosPagados": "J29",
            "otrasEntradasSalidasEfectivo": "J30",
            "flujosEfectivoNetosUtilizadosInversion": "J31",
            "recursosCambioPropiedadSubsidiarias": "J57",
            "pagosCambioPropiedadSubsidiarias": "J58",
            "importesEmisionAcciones": "J59",
            "importesEmisionInstrumentosPatrimonio": "J60",
            "pagosAdquirirRescatarAccionesEntidad": "J61",
            "pagosOtrasParticipacionesPatrimonio": "J62",
            "importesPrestamos": "J63",
            "reembolsosPrestamos": "J64",
            "pagosPasivosArrendamientosFinancieros": "J65",
            "importesSubvencionesGobierno": "J66",
            "incrementoDisminucionNetoEfectivo": "J74",
            "efectosVariacionTasaCambioEfectivo": "J76",
            "efectivoEquivalentesPrincipioPeriodo": "J78",
            "efectivoEquivalentesFinalPeriodo": "J79",
            "nit": "nit",
            "annio": "J8"

          },

          "Dictamen": {
            "dictamen": "F10",
            "opinionDictamen": "F12",
            "contenidoSalvedadDictamen": "F13",
            "parrafoEnfasisDictamen": "F14",
            "hipotesisNegocioMarcha": "F15",
            "validacionHNM": "F16",
            "nit": "nit",
            "annio": "F8"
          }

        };
        break;

      case 3:
        this.validationRanges = {
          "validationRanges": [{
            "sheetName": "INDICE", "keywords": {}
          }, {
            "sheetName": "Identificación del Vigilado", "keywords": {
              "DATOS BÁSICOS": 1
            }
          }, {
            "sheetName": "ESF", "keywords": {
              "CORRECTO": 18
            }
          }, {
            "sheetName": "ER", "keywords": {
              "CORRECTO": 2, "ESTADO DE RESULTADOS": 1,
            }
          },{
            "sheetName": "Dictamen", "keywords": {
              "CORRECTO": 1, "DICTAMEN DEL REVISOR FISCAL": 1,
            }
          }]
        };
        this.fieldgrupo1 = {
          "Identificación del Vigilado": {
            "nitSinDigitoVerificacion": "F9",
            "digitoVerificacion": "F10",
            "nombreSociedad": "F11",
            "grupoNiifReporte": "F12",
            "tipoEstadosFinancieros": "F13",
            "tipoVinculacionEconomica": "F14",
            "tipoSubordinada": "F15",
            "vinculadosEconomicos": "F16",
            "nombreVinculadoEconomico1": "F17",
            "nitVinculadoEconomico1": "F18",
            "nombreVinculadoEconomico2": "F19",
            "nitVinculadoEconomico2": "F20",
            "nombreVinculadoEconomico3": "F21",
            "nitVinculadoEconomico3": "F22",
            "nombreVinculadoEconomico4": "F23",
            "nitVinculadoEconomico4": "F24",
            "nombreVinculadoEconomico5": "F25",
            "nitVinculadoEconomico5": "F26",
            "fechaInicialEstadosFinancieros": "F27",
            "fechaCorteEstadosFinancieros": "F28",
            "monedaPresentacion": "F29",
            "fechaReporte": "F30",
            "periodicidadPresentacion": "F31",
            "anoActualReporte": "F32",
            "anoComparativo": "F33",
            "nit": "NitValue",
          },
          "ESF": {
            "totalActivosCorrientes": "H12, J12",
            "efectivoYEquivalentesAlEfectivo": "H13, J13",
            "efectivoRestringido": "H14, J14",
            "inversionesCortoPlazo": "H15, J15",
            "cuentasComercialesCobrarOperacionalesClientes": "H16, J16",
            "cuentasPorCobrarConPartesRelacionadas1": "H17, J17",
            "activosBiologicos": "H18, J18",
            "otrasCuentasPorCobrar1": "H19, J19",
            "pagosAnticipados": "H20, J20",
            "inventariosCorrientes": "H21, J21",
            "activosPorImpuestos": "H22, J22",
            "activosDistintosAlEfectivoPignoradosComoGarantia": "H23, J23",
            "otrosActivosFinancieros1": "H24, J24",
            "otrosActivosNoFinancieros1": "H25, J25",
            "validacionActivosCorrientes": "H26, J26",
            "totalActivosNoCorrientes": "H28, J28",
            "depositosYOtrosActivos1": "H29, J29",
            "inversionesLargoPlazo": "H30, J30",
            "cuentasComercialesPorCobrar": "H31, J31",
            "cuentasPorCobrarConPartesRelacionadas2": "H32, J32",
            "otrasCuentasPorCobrar2": "H33, J33",
            "propiedadDeInversion": "H34, J34",
            "activosIntangiblesYCreditoMercantil": "H35, J35",
            "propiedadesPlantaYEquipo": "H36, J36",
            "activosBiologicosNoCorrientes": "H37, J37",
            "inversionesContabilizadasParticipacion": "H38, J38",
            "inversionesSubsidiarNegocios": "H39, J39",
            "plusvalia": "H40, J40",
            "inventariosNoCorrientes": "H41, J41",
            "activosPorImpuestosDiferidos": "H42, J42",
            "activosPorImpuestosCorrientesNoCorrientes": "H43, J43",
            "otrosActivosFinancieros2": "H44, J44",
            "otrosActivosNoFinancieros2": "H45, J45",
            "activosDistintosAlEfectivo": "H46, J46",
            "validacionActivosNoCorrientes": "H47, J47",
            "validacionActivos": "H49, J49",
            "pasivos": "H51, J51",
            "pasivosCorrientes": "H53, J53",
            "cuentasPorPagarComercialesProveedores": "H54, J54",
            "otrasCuentasPorPagar": "H55, J55",
            "pasivosPorImpuestos1": "H56, J56",
            "deudaFinanciera": "H57, J57",
            "otrosPasivosNoFinancieros1": "H58, J58",
            "depositosYOtrosActivos2": "H59, J59",
            "porcionCorrienteDeuda": "H60, J60",
            "cuentasPorPagarConPartesRelacionadas3": "H61, J61",
            "otrasProvisiones": "H62, J62",
            "provisionesPorBeneficiosAEmpleados1": "H63, J63",
            "ingresosRecibidosPorCuentaDeTerceros": "H64, J64",
            "validacionPasivosCorrientes": "H65, J65",
            "pasivosNoCorrientes": "H67, J67",
            "deudaALargoPlazo": "H68, J68",
            "cuentasPorPagar": "H69, J69",
            "provisionesPorBeneficiosAEmpleados2": "H70, J70",
            "pasivosPorImpuestosDiferidos": "H71, J71",
            "ingresosRecibidosPorAnticipado": "H72, J72",
            "otrosPasivosNoFinancieros2": "H73, J73",
            "otrosPasivosFinancieros": "H74, J74",
            "pasivosPorImpuestos2": "H75, J75",
            "validacionPasivosNoCorrientes": "H76, J76",
            "validacionPasivos": "H78, J78",
            "patrimonio": "H80, J80",
            "capitalPagado": "H81, J81",
            "primaDeEmision": "H82, J82",
            "readquisicionDeInstrumentosDePatrimonioPropio": "H83, J83",
            "inversionSumplementariaAlCapitalAsignado": "H84, J84",
            "otrasParticipacionesEnElPatrimonio": "H85, J85",
            "superavitPorRevaluacion": "H86, J86",
            "reservaLegal": "H87, J87",
            "otrasReservas": "H88, J88",
            "utilidadYorPerdidaDelEjercicio": "H89, J89",
            "utilidadYorPerdidaAcumulada": "H90, J90",
            "gananciasAcumuladasPorEfectoDeLaConvergencia": "H91, J91",
            "gananciasAcumuladasDiferentesALasGeneradasPorEfectoDeLaConvergencia": "H92, J92",
            "validacionPatrimonio": "H93, J93",
            "validacionGananciaPerdidaNeta": "H95, J95",
            "totalPasivoPatrimonio": "H97, J97",
            "validacionEcuacionPatrimonial": "H99, J99",
            "nit": "NitValue",
            "annio": "H10, J10"
          },
          "ER": {
            "annio": "H10, J10",
            "resultadoIntegralPropietarios": "H44, J44",
            "resultadoIntegralNoControladoras": "H45, J45",
            "resultadoIntegralTotal": "H46, J46",
            "validacionEstadoResultados": "H49,J49",
            "ingresosActividadesOrdinarias": "H11, J11",
            "ingresosActividadesTransporte": "H12, J12",
            "ingresosOtrasActividades": "H13, J14",
            "costoVentas": "H14, J14",
            "amortizacion": "H15, J15",
            "depreciacion": "H16, J16",
            "gananciaBruta": "H17, J17",
            "gastosVentas": "H18, J18",
            "gastosAdministracion": "H19, J19",
            "otrosGastosOperacionales": "H22, J22",
            "otrosIngresosOperacionales": "H23, J23",
            "otrasGananciasPerdidasOperacionales": "H24, J24",
            "gananciaOperacion": "H25, J25",
            "diferenciaDividendosActivos": "H26, J26",
            "gananciaPosicionMonetariaNeta": "H27, J27",
            "gananciasBajaActivosFinancieros": "H28, J28",
            "ingresosNoOperacionales": "H29, J29",
            "ingresosFinancieros": "H30, J30",
            "otrosIngresosNoOperacionales": "H31, J31",
            "gastosNoOperacionales": "H32, J32",
            "costosFinancieros": "H33, J33",
            "otrosGastosFinancieros": "H34, J34",
            "interesesDeuda": "H35, J35",
            "otrosGastosNoOperacionales": "H36, J36",
            "participacionGananciasAsociadas": "H37, J37",
            "gananciaAntesImpuestos": "H38, J38",
            "ingresoImpuestos": "H39, J39",
            "gastoImpuestoGanancias": "H40, J40",
            "gananciaOperacionesContinuadas": "H41, J41",
            "gananciaOperacionesDiscontinuadas": "H42, J42",
            "gananciaNeta": "H43, J43",
            "nit": "nit"
          },

          "Dictamen": {
            "dictamen": "F11",
            "opinionDictamen": "F13",
            "contenidoSalvedadDictamen": "F14",
            "parrafoEnfasisDictamen": "F15",
            "hipotesisNegocioMarcha": "F16",
            "validacionHNM": "F17",
            "nit": "nit",
            "annio": "F9"
          }

        };
        break;

      case 4:
        console.log('No es valido por ahora')
        break;

      case 5:
        console.log('No es valido por ahora')
        break;

      case 6:
        console.log('No es valido por ahora')
        break;


    }

  }

  onFileSelected(files: File[]): void {

    this.selectedFile = files[0];

  }

  OnUploadButton(file: File[]) {
    if (file[0]) {

      this.showLoadingModal = true;
      this.ApiMFService.uploadFileAPI(file[0], this.validationRanges).subscribe({
        next: (response) => {
          this.showLoadingModal = false;
          if (response.message == 'Archivo procesado y validado correctamente') {
            this.showValidado = true;
          } else {
            this.messageNoValidado = response.message;
            this.showError = true;
          }

          console.log('Archivo subido con éxito:', response);
        }, error: (err) => {
          this.showLoadingModal = false;
          this.showErrorModal = true;
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }

  onCloseModal() {
    this.showError = false;
    this.showValidado = false;
    this.showErrorModal = false;
    this.showLoadingModal = false;

    location.reload();

  }

  ValidSaveExcel() {
    this.showLoadingModal = true;
    console.log("entrooooooo")
    this.ApiMFService.saveExcel(this.selectedFile, this.authService.getUserInfo().documento, this.idHeredado, this.fieldgrupo1).subscribe({
      next: (response) => {
        this.messageNoValidado = response.message;
        this.showLoadingModal = false;
        if (response.message == 'Todos los datos se han procesado y guardado correctamente.') {
          this.showFinalModal = true;
        } else {
          this.showError = true;
        }

        console.log('Archivo subido con éxito:', response);
      }, error: (err) => {
        this.showLoadingModal = false;
        this.showErrorModal = true;
        console.error('Error al subir el archivo:', err);
      }
    });
  }

  navigateToAdministracion() {

    this.router.navigate(['/vigilado']);

  }

}
