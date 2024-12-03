import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOtrosAnexosComponent } from './table-otros-anexos.component';

describe('TableOtrosAnexosComponent', () => {
  let component: TableOtrosAnexosComponent;
  let fixture: ComponentFixture<TableOtrosAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOtrosAnexosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOtrosAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
