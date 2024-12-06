import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleEntregasPendientesComponent } from './ver-detalle-entregas-pendientes.component';

describe('VerDetalleEntregasPendientesComponent', () => {
  let component: VerDetalleEntregasPendientesComponent;
  let fixture: ComponentFixture<VerDetalleEntregasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetalleEntregasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleEntregasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
