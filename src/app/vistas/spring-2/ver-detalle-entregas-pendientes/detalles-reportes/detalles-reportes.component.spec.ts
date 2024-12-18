import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesComponent } from './detalles-reportes.component';

describe('DetallesReportesComponent', () => {
  let component: DetallesReportesComponent;
  let fixture: ComponentFixture<DetallesReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
