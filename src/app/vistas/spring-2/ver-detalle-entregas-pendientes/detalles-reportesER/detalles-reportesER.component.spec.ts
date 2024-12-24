import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesERComponent } from './detalles-reportesER.component';

describe('DetallesReportesESFComponent', () => {
  let component: DetallesReportesERComponent;
  let fixture: ComponentFixture<DetallesReportesERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesERComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
