import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosAspectosComponent } from './otros-aspectos.component';

describe('OtrosAspectosComponent', () => {
  let component: OtrosAspectosComponent;
  let fixture: ComponentFixture<OtrosAspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosAspectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosAspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
