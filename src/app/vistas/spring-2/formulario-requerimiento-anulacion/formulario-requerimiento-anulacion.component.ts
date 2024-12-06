import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-formulario-requerimiento-anulacion',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    PaginatorModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './formulario-requerimiento-anulacion.component.html',
  styleUrl: './formulario-requerimiento-anulacion.component.css'
})
export class FormularioRequerimientoAnulacionComponent implements OnInit {

  nombreVigilado: string = '';
  tipoIdentifiacionVigilado: string = '';
  titularTramite: string = '';

  titularTramiteDatos = [
    {
      id: 1,
      descripcion: ""
    }
  ]

  touchedFields = {

    titularTramite: false,

  };

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  validateField(field: string): void {

    (this.touchedFields as any)[field] = true;

  }

  // Simula el envío del formulario
  submitForm(): void {

    this.touchedFields.titularTramite = true;

  }

  btnGuardar(): void {

    this.submitForm();
    console.log('Formulario enviado');

  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
