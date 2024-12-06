import {Component, OnInit} from '@angular/core';
import {TableOtrosAspectosComponent} from "../../../componentes/table-otros-aspectos/table-otros-aspectos.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-otros-aspectos',
  standalone: true,
  imports: [
    TableOtrosAspectosComponent
  ],
  templateUrl: './otros-aspectos.component.html',
  styleUrl: './otros-aspectos.component.css'
})
export class OtrosAspectosComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
