import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule, formatDate, NgForOf, NgIf} from '@angular/common';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ApiMFService} from "../../services/api/api-mf.service";

@Component({
  selector: 'app-table-programaciones',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, PaginatorComponent],
  templateUrl: './table-programaciones.component.html',
  styleUrl: './table-programaciones.component.css',
})
export class TableProgramacionesComponent implements OnInit, OnChanges {

  @Input() filtro: string = '';
  @Input() headers: any = [];
  @Input() data: any = [];
  @Output() requerimientoDetalle: EventEmitter<number> =
    new EventEmitter<number>();
  paginatedData: any = [];
  pageLength: number = 0;

  constructor(
    private router: Router,
    private apiMFService: ApiMFService,
    private cdRef: ChangeDetectorRef, // Inyecta el ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.loadInitialData();
    console.log(this.data);


  }

  ngOnChanges() {


  }

  loadInitialData(): void {
    this.paginatorFilter(0, 5, this.data);
  }

  get info(): string[] {

    return this.data.length > 0
      ? Object.keys(this.data[0])
      : [];

  }



  isDateTime(value: any): boolean {

    const dateRegex = /^\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}$/;

    if (typeof value === 'string' && !dateRegex.test(value)) {
      return false;
    }

    return !isNaN(Date.parse(value));

  }

  formatField(value: any): string {


    if (this.isDateTime(value)) {
      return formatDate(value, 'dd/MM/yyyy', 'en-US', 'UTC');
    }
    return value;

  }

  onPageChanged(event: PageEvent) {

    this.paginatorFilter(event.pageIndex, event.pageSize);

  }



  paginatorFilter(pageIndex: number, pageSize: number, datos?: any) {

    if (!datos) {
      datos = this.data;
    }

    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedData = datos.slice(startIndex, endIndex);

  }

  onButtonClick(id: number) {
    this.router.navigate(['/detalle-requerimientos'], {
      state: {
        id: id,
      },
    });
  }

}
