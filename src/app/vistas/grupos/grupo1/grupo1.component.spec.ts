import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grupo1Component } from './grupo1.component';

describe('Grupo1Component', () => {
  let component: Grupo1Component;
  let fixture: ComponentFixture<Grupo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grupo1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Grupo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
