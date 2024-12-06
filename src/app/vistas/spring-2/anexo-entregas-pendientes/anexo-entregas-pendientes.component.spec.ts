import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexoEntregasPendientesComponent } from './anexo-entregas-pendientes.component';

describe('AnexoEntregasPendientesComponent', () => {
  let component: AnexoEntregasPendientesComponent;
  let fixture: ComponentFixture<AnexoEntregasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoEntregasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexoEntregasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
