import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import {SKIP_AUTH} from "../../context/context-tokens";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const token = authService.getTestToken();

  // Verificar si el contexto solicita omitir el token general
  const skipAuth = req.context.get(SKIP_AUTH);

  if (skipAuth) {
    return next(req); // Omite el token general
  }

  if (req.url.includes('blob.core.windows.net')) {
    return next(req);
  }

  // Si no se omite, agregar el token general
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Eliminar el token y redirigir al usuario
        authService.clearToken();
      }
      return throwError(() => error); // Propaga el error
    })
  );
}

