import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileUploadComponent} from "../../../componentes/file-upload/file-upload.component";
import {ErrorService} from "../../../componentes/servicios/error/error.component";
import {ApiMFService} from "../../../services/api/api-mf.service";
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../componentes/alert/alert.component";

@Component({
  selector: 'app-visualizar-archivo',
  standalone: true,
  imports: [FileUploadComponent, PrimaryButtonComponent, AlertComponent],
  templateUrl: './visualizar-archivo.component.html',
  styleUrl: './visualizar-archivo.component.css'
})

export class VisualizarArchivoComponent implements OnInit {

  // Propiedad de objeto para manejar errores
  errorStates: {[key: number]: boolean} = {};

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

  // Ejemplo de validationRanges
  validationRanges = {
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
  fieldgrupo1 = {
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

    }, "ESF": {
      "totalActivosCorrientes": "H12",
      "efectivoYEquivalentesAlEfectivo": "H13",
      "efectivoRestringido": "H14",
      "inversionesCortoPlazo": "H15",
      "cuentasComercialesCobrarOperacionalesClientes": "H16",
      "cuentasPorCobrarConPartesRelacionadas1": "H17",
      "activosBiologicos": "H18",
      "otrasCuentasPorCobrar1": "H19",
      "pagosAnticipados": "H20",
      "inventariosCorrientes": "H21",
      "activosPorImpuestos": "H22",
      "activosDistintosAlEfectivoPignoradosComoGarantia": "H23",
      "otrosActivosFinancieros1": "H24",
      "otrosActivosNoFinancieros1": "H25",
      "validacionActivosCorrientes": "H26",
      "totalActivosNoCorrientes": "H28",
      "depositosYOtrosActivos1": "H29",
      "inversionesLargoPlazo": "H30",
      "cuentasComercialesPorCobrar": "H31",
      "cuentasPorCobrarConPartesRelacionadas2": "H32",
      "otrasCuentasPorCobrar2": "H33",
      "propiedadDeInversion": "H34",
      "activosIntangiblesYCreditoMercantil": "H35",
      "propiedadesPlantaYEquipo": "H36",
      "activosBiologicosNoCorrientes": "H37",
      "inversionesContabilizadasParticipacion": "H38",
      "inversionesSubsidiarNegocios": "H39",
      "plusvalia": "H40",
      "inventariosNoCorrientes": "H41",
      "activosPorImpuestosDiferidos": "H42",
      "activosPorImpuestosCorrientesNoCorrientes": "H43",
      "otrosActivosFinancieros2": "H44",
      "otrosActivosNoFinancieros2": "H45",
      "activosDistintosAlEfectivo": "H46",
      "validacionActivosNoCorrientes": "H47",
      "validacionActivos": "H49",
      "pasivos": "H51",
      "pasivosCorrientes": "H53",
      "cuentasPorPagarComercialesProveedores": "H54",
      "otrasCuentasPorPagar": "H55",
      "pasivosPorImpuestos1": "H56",
      "deudaFinanciera": "H57",
      "otrosPasivosNoFinancieros1": "H58",
      "depositosYOtrosActivos2": "H59",
      "porcionCorrienteDeuda": "H60",
      "cuentasPorPagarConPartesRelacionadas3": "H61",
      "otrasProvisiones": "H62",
      "provisionesPorBeneficiosAEmpleados1": "H63",
      "ingresosRecibidosPorCuentaDeTerceros": "H64",
      "validacionPasivosCorrientes": "H65",
      "pasivosNoCorrientes": "H67",
      "deudaALargoPlazo": "H68",
      "cuentasPorPagar": "H69",
      "provisionesPorBeneficiosAEmpleados2": "H70",
      "pasivosPorImpuestosDiferidos": "H71",
      "ingresosRecibidosPorAnticipado": "H72",
      "otrosPasivosNoFinancieros2": "H73",
      "otrosPasivosFinancieros": "H74",
      "pasivosPorImpuestos2": "H75",
      "validacionPasivosNoCorrientes": "H76",
      "validacionPasivos": "H78",
      "patrimonio": "H80",
      "capitalPagado": "H81",
      "primaDeEmision": "H82",
      "readquisicionDeInstrumentosDePatrimonioPropio": "H83",
      "inversionSumplementariaAlCapitalAsignado": "H84",
      "otrasParticipacionesEnElPatrimonio": "H85",
      "superavitPorRevaluacion": "H86",
      "reservaLegal": "H87",
      "otrasReservas": "H88",
      "utilidadYorPerdidaDelEjercicio": "H89",
      "utilidadYorPerdidaAcumulada": "H90",
      "gananciasAcumuladasPorEfectoDeLaConvergencia": "H91",
      "gananciasAcumuladasDiferentesALasGeneradasPorEfectoDeLaConvergencia": "H92",
      "validacionPatrimonio": "H93",
      "validacionGananciaPerdidaNeta": "H95",
      "totalPasivoPatrimonio": "H97",
      "validacionEcuacionPatrimonial": "H99",
      "nit": "NitValue"
    }, "ORI": {
      "gananciaPerdidaNeta": "J10",
      "otroResultadoIntegralDiferenciasCambioConversion": "J13",
      "otroResultadoIntegralGananciasActuariales": "J14",
      "otroResultadoIntegralGananciasRevaluacion": "J15",
      "totalOtroResultadoIntegralNoReclasificable": "J16",
      "gananciasCoberturasFlujosEfectivo": "J18",
      "totalOtroResultadoIntegralReclasificable": "J19",
      "participacionOtroResultadoIntegralSubsidiarias": "J20",
      "totalOtroResultadoIntegral": "J21",
      "resultadoIntegralTotal": "J22",
      "resultadoIntegralPropietariosControladora": "J24",
      "resultadoIntegralParticipacionesNoControladoras": "J25",
      "validacionEstadoResultados": "J27",
      "nit": "NitValue"
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
      "nit": 'nit'

    }, "EFE-directo": {
      "flujosEfectivoProcedentesUtilizadosActividadesOperacion": "j9",
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
      "nit": "nit"

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

  }

  // Constructor
  constructor(private errorService: ErrorService, private ApiMFService: ApiMFService, private router: Router, private cdr: ChangeDetectorRef,) {
  }

  ngOnInit() {

    this.errorService.errorStates$.subscribe((errorStates) => {
      this.errorStates = errorStates;
    });

  }

  onFileSelected(files: File[]): void {

    this.selectedFile = files[0];

  }

  OnUploadButton(file: File[]) {
    if(file[0]) {

      this.showLoadingModal = true;
      this.ApiMFService.uploadFileAPI(file[0], this.validationRanges).subscribe({
        next: (response) => {
          this.showLoadingModal = false;
          if(response.message == 'Archivo procesado y validado correctamente') {
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
    this.ApiMFService.saveExcel(this.selectedFile, '1004734004', this.fieldgrupo1).subscribe({
      next: (response) => {
        this.messageNoValidado = response.message;
        this.showLoadingModal = false;
        if(response.message == 'Todos los datos se han procesado y guardado correctamente.') {
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

    this.router.navigate(['/administracion']);

  }

}
