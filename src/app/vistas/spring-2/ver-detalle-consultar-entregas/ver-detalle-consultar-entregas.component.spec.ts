import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleConsultarEntregasComponent } from './ver-detalle-consultar-entregas.component';

describe('VerDetalleConsultarEntregasComponent', () => {
  let component: VerDetalleConsultarEntregasComponent;
  let fixture: ComponentFixture<VerDetalleConsultarEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetalleConsultarEntregasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleConsultarEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
