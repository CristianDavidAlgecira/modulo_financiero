import {MatPaginatorIntl} from '@angular/material/paginator';

export function CustomPaginatorComponent() {

  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Registros por página';
  customPaginatorIntl.nextPageLabel = 'Siguiente página';
  customPaginatorIntl.previousPageLabel = 'Página anterior';
  customPaginatorIntl.firstPageLabel = 'Primera página';
  customPaginatorIntl.lastPageLabel = 'Última página';

  return customPaginatorIntl;

}
