import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProgramacionesComponent } from './table-programaciones.component';

describe('TableComponent', () => {
  let component: TableProgramacionesComponent;
  let fixture: ComponentFixture<TableProgramacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProgramacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProgramacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
