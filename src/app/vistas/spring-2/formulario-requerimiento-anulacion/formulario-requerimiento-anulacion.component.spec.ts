import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRequerimientoAnulacionComponent } from './formulario-requerimiento-anulacion.component';

describe('FormularioRequerimientoAnulacionComponent', () => {
  let component: FormularioRequerimientoAnulacionComponent;
  let fixture: ComponentFixture<FormularioRequerimientoAnulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRequerimientoAnulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRequerimientoAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
