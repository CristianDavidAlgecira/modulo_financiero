import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosAnexosComponent } from './otros-anexos.component';

describe('OtrosAnexosComponent', () => {
  let component: OtrosAnexosComponent;
  let fixture: ComponentFixture<OtrosAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosAnexosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
