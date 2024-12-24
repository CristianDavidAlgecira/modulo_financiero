import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesESFComponent } from './detalles-reportesESF.component';

describe('DetallesReportesESFComponent', () => {
  let component: DetallesReportesESFComponent;
  let fixture: ComponentFixture<DetallesReportesESFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesESFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesESFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
