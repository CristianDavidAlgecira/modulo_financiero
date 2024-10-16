import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ver-detalle',
  standalone: true,
  imports: [],
  templateUrl: './ver-detalle.component.html',
  styleUrl: './ver-detalle.component.css',
})
export class VerDetalleComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    // TRAER ID DESDE NAVEGACIÓN O LOCALSTORAGE
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: string };
    console.log(state);

    if (state && state.id) {
      console.log(state.id);
      this.setId(state.id); // Establecer nuevo ID
    } else {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        this.setId(storedId); // Establecer ID desde localStorage
      }
    }
  }

  numeroActo: any;
  private idSubject = new BehaviorSubject<string>('0'); // Inicializa con '0'
  id$ = this.idSubject.asObservable(); // Observable para observar cambios

  // Método para actualizar el id y el BehaviorSubject
  setId(newId: string): void {
    this.idSubject.next(newId); // Actualizar el id en el BehaviorSubject
  }

  ngOnInit() {
    this.numeroActo = this.idSubject.getValue();
  }

  regresar() {
    this.router.navigate(['/administracion']);
  }
}
