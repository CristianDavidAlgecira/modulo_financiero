import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarArchivoComponent } from './visualizar-archivo.component';

describe('VisualizarArchivoComponent', () => {
  let component: VisualizarArchivoComponent;
  let fixture: ComponentFixture<VisualizarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
