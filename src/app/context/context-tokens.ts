import { HttpContextToken } from '@angular/common/http';

// Contexto para indicar que se debe omitir el token de autenticación general
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);