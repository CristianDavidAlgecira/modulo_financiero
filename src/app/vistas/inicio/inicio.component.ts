import {Component, OnDestroy, OnInit} from '@angular/core';
import {FooterComponent} from "../../componentes/footer/footer.component";
import {HeaderComponent} from "../../componentes/header/header.component";
import {RouterOutlet} from "@angular/router";
import {BreadcrumbComponent} from "../../componentes/breadcrumb/breadcrumb.component";
import {Subscription} from "rxjs";
import {BreadcrumbService} from "../../services/breadcrumb/breadcrumb.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet, BreadcrumbComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit, OnDestroy {
  breadcrumb: {name: string; route: string}[] = [];
  private breadcrumbSubscription?: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumb$.subscribe((breadcrumb) => {
      this.breadcrumb = breadcrumb;
    });

  }

  ngOnDestroy(): void {
    if(this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

}
