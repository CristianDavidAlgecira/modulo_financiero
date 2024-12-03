import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOtrosAspectosComponent } from './table-otros-aspectos.component';

describe('TableOtrosAspectosComponent', () => {
  let component: TableOtrosAspectosComponent;
  let fixture: ComponentFixture<TableOtrosAspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOtrosAspectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOtrosAspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
