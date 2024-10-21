import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ApiMFService} from "../../../services/api/api-mf.service";
import {CommonModule, formatDate} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoNegativeGlobal} from "../../../validator/noNegative.validator";
import { PERIODO } from '../../../shared/data/periodo';
import { TIPOPROGRAMACION } from '../../../shared/data/tipo-programacion';

@Component({
  selector: 'app-ver-detalle',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './ver-detalle.component.html',
  styleUrl: './ver-detalle.component.css',
})
export class VerDetalleComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiMFService: ApiMFService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: string };
    console.log(state);

    if (state && state.id) {
      console.log(state.id);
      this.setId(state.id); // Establecer nuevo ID
    } else {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        this.setId(storedId); // Establecer ID desde localStorage
      }
    }
  }

  periodo: any;
  tipoProgramacion: any;
  data: any;
  modificando: boolean = false;
  submitted: boolean = false;
  formGroup1!: FormGroup;
  private idSubject = new BehaviorSubject<string>('0'); // Inicializa con '0'
  id$ = this.idSubject.asObservable(); // Observable para observar cambios

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: string): void {
    this.idSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  //info selects
  selects = [
    //select clases vehiculos
    {
      name: 'periodoEntrega',
      required: true,
      placeholder: 'Seleccione',
      value: '', // Valor seleccionado
      good: 'Selección correcta',
      errorMessage: 'Periodo de Entrega es requerido',
      isDropdownOpen: false,
    },
    //select frecuencia pago
    {
      name: 'idFormaPago',
      required: true,
      placeholder: 'Seleccione',
      value: '', // Valor seleccionado
      good: 'Selección correcta',
      errorMessage: 'Forma de pago es requerido',
      isDropdownOpen: false,
    },
    //select depart
    {
      name: 'idAreaOperacion',
      required: true,
      placeholder: 'Seleccione',
      value: '', // Valor seleccionado
      selectedOption: '',
      good: 'Selección correcta',
      errorMessage: 'Áreas de Operación es requerido',
      isDropdownOpen: false,
    },
    //select tienpo estimado
    {
      name: 'disponibilidadVehiculosEstimada',
      required: true,
      placeholder: 'Seleccione',
      value: '', // Valor seleccionado
      good: 'Selección correcta',
      errorMessage: 'Tiempos estimados es requerido',
      isDropdownOpen: false,
    },
  ];

  ngOnInit() {
    // Suscribirse a los cambios de id para almacenar en localStorage
    this.id$.subscribe((newId) => {
      localStorage.setItem('id', newId); // Actualizar localStorage cuando id cambie
      console.log('ID actualizado en localStorage:', newId);
      this.loadOptions();
    });

    //datos selects
    this.periodo = PERIODO;
    this.tipoProgramacion = TIPOPROGRAMACION;

    this.formGroup1 = this.fb.group(
      {
        nombreRequerimiento: ['', Validators.required],
        periodoEntrega: ['', Validators.required],
        estadoVigilado: ['', Validators.required],
        tipoProgramacion: ['', Validators.required],
        fechaIncio: ['', Validators.required],
        numeroRequerimiento: ['', Validators.required],
        anio: [''],
        funcionarioProgramador: ['', Validators.required],

      },
      {validators: [NoNegativeGlobal]}
    );
  }

  loadOptions(): void {

    this.getRequerimiento();
  }

  getRequerimiento(): void {
    // traer los datos de la consulta
    this.apiMFService.getRequerimientoInfo(this.idSubject.getValue())
      .subscribe(
        (response) => {
          console.log(response);
          this.data = response;
          this.cdr.detectChanges(); // Forzar la detección de cambios

        },
        (error) => {
          this.cdr.detectChanges(); // Forzar la detección de cambios
          console.error('Error fetching user data', error);
        }
      );
  }

  regresar() {
    this.router.navigate(['/administracion']);
  }

  formatField(value: any): string {

    return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');

  }

  toggleDropdown(index: number) {
    this.selects[index].isDropdownOpen = !this.selects[index].isDropdownOpen;
  }

  selectOption(index: number, option: any, name: string) {
    this.selects[index].value = option;
    this.selects[index].isDropdownOpen = false;
    this.formGroup1.get(name)?.setValue(option);
  }

}
