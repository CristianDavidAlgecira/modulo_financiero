import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConsultarEntregasComponent } from './table-consultar-entregas.component';

describe('TableConsultarEntregasComponent', () => {
  let component: TableConsultarEntregasComponent;
  let fixture: ComponentFixture<TableConsultarEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableConsultarEntregasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableConsultarEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
