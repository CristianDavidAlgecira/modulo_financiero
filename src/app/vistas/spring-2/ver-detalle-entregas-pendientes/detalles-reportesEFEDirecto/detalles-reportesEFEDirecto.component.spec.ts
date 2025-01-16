import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesEFEDirectoComponent } from './detalles-reportesEFEDirecto.component';

describe('DetallesReportesEFEirectoComponent', () => {
  let component: DetallesReportesEFEDirectoComponent;
  let fixture: ComponentFixture<DetallesReportesEFEDirectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesEFEDirectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesEFEDirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
