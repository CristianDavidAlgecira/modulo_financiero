import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-detalles-reportes',
  standalone: true,
  imports: [],
  templateUrl: './detalles-reportes.component.html',
  styleUrl: './detalles-reportes.component.css'
})
export class DetallesReportesComponent implements OnInit {

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
