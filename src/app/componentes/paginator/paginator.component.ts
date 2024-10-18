import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorComponent} from '../servicios/custom-paginator/custom-paginator.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  providers: [
    {provide: MatPaginatorIntl, useValue: CustomPaginatorComponent()}
  ]
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() data: number = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();

  length = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | undefined;

  ngOnInit() {
    this.length = this.data;
  }

  ngOnChanges() {
    this.length = this.data;
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageChange.emit(event);
  }

}
