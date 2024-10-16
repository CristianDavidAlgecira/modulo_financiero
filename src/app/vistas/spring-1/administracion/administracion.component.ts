import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {TableComponent} from "../../../componentes/table/table.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    TableComponent
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigateToNuevoRequerimiento() {
    this.router.navigate(['/nuevo-requerimiento']);
  }

}
