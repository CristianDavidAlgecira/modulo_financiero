import {Component} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {TableComponent} from "../../../componentes/table/table.component";

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
export class AdministracionComponent {

}
