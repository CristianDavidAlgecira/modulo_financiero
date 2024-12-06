import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEntregaComponent } from './modificar-entrega.component';

describe('ModificarEntregaComponent', () => {
  let component: ModificarEntregaComponent;
  let fixture: ComponentFixture<ModificarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
