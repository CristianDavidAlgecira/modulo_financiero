import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEntregasComponent } from './consultar-entregas.component';

describe('ConsultarEntregasComponent', () => {
  let component: ConsultarEntregasComponent;
  let fixture: ComponentFixture<ConsultarEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarEntregasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
