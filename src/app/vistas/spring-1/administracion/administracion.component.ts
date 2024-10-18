import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {TableComponent} from "../../../componentes/table/table.component";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    TableComponent,
    FormsModule
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit {

  filtros: string = '';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filtros = inputElement.value;
  }

  navigateToNuevoRequerimiento() {
    this.router.navigate(['/nuevo-requerimiento']);
  }

}
