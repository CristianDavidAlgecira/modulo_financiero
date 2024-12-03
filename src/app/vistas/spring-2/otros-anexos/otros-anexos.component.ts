import {Component, OnInit} from '@angular/core';
import {TableOtrosAnexosComponent} from "../../../componentes/table-otros-anexos/table-otros-anexos.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-otros-anexos',
  standalone: true,
  imports: [
    TableOtrosAnexosComponent
  ],
  templateUrl: './otros-anexos.component.html',
  styleUrl: './otros-anexos.component.css'
})
export class OtrosAnexosComponent implements OnInit {

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
