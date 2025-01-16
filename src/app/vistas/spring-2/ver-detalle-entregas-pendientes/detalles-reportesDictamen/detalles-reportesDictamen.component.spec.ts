import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReportesDictamenComponent } from './detalles-reportesDictamen.component';

describe('DetallesReportesDictamenComponent', () => {
  let component: DetallesReportesDictamenComponent;
  let fixture: ComponentFixture<DetallesReportesDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReportesDictamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReportesDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
