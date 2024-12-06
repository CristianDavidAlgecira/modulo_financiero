import {Component, OnInit} from '@angular/core';
import {PrimaryButtonComponent} from "../../../componentes/primary-button/primary-button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vigilado',
  standalone: true,
  imports: [
    PrimaryButtonComponent
  ],
  templateUrl: './vigilado.component.html',
  styleUrl: './vigilado.component.css'
})
export class VigiladoComponent implements OnInit {

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
