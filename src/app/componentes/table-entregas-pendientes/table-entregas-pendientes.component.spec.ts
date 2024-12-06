import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEntregasPendientesComponent } from './table-entregas-pendientes.component';

describe('TableEntregasPendientesComponent', () => {
  let component: TableEntregasPendientesComponent;
  let fixture: ComponentFixture<TableEntregasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntregasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEntregasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
