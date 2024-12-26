import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesORIComponent } from './detalles-reportesORI.component';

describe('DetallesReportesORIComponent', () => {
  let component: DetallesReportesORIComponent;
  let fixture: ComponentFixture<DetallesReportesORIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesORIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesORIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
