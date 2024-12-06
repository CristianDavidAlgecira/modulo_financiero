import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnexoEntregasPendientesComponent } from './table-anexo-entregas-pendientes.component';

describe('TableAnexoEntregasPendientesComponent', () => {
  let component: TableAnexoEntregasPendientesComponent;
  let fixture: ComponentFixture<TableAnexoEntregasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAnexoEntregasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAnexoEntregasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
