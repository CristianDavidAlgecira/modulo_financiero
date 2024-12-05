import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarReporteComponent } from './iniciar-reporte.component';

describe('IniciarReporteComponent', () => {
  let component: IniciarReporteComponent;
  let fixture: ComponentFixture<IniciarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
