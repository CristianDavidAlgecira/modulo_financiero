import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {authInterceptor} from "./interceptors/interceptors/auth.interceptor";
import {registerLocaleData} from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import {LOCALE_ID} from '@angular/core';

// Registra los datos de localización
registerLocaleData(localeEsCO, 'es-CO');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch(), withInterceptors([authInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: LOCALE_ID, useValue: 'es-CO'}
  ]
};
