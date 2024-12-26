import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesEFEIndirectoComponent } from './detalles-reportesEFEIndirecto.component';

describe('DetallesReportesEFEIndirectoComponent', () => {
  let component: DetallesReportesEFEIndirectoComponent;
  let fixture: ComponentFixture<DetallesReportesEFEIndirectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesEFEIndirectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesEFEIndirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
