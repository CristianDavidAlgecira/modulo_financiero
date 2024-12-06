// auth.service.ts
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Authority, Permiso } from '../../models/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnChanges {

  private token: string | null = null;
  private decodedToken: { user?: string; authorities?: string } | null = null;
  private readonly defaultToken: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFTVBSRVNBIE1BRVNUUkUiLCJhdXRob3JpdGllcyI6Ilt7XCJpZFwiOjI1LFwibm9tYnJlXCI6XCJzdXBlclVzdWFyaW9cIixcInNpc3RlbWFcIjpcIk1GX1NVUEVSVVNVQVJJT1wiLFwicGVybWlzb3NcIjpbe1wiaWRcIjo0NSxcIm5vbWJyZVwiOlwiTElTVEFSX1JFUVVFUklNSUVOVE9TXCIsXCJzaXN0ZW1hXCI6XCJNRl9MSVNUQVJfUkVRVUVSSU1JRU5UT1NcIixcImlkX3JlbGFjaW9uXCI6Njl9LHtcImlkXCI6NDYsXCJub21icmVcIjpcIkNSRUFSX1JFUVVFUklNSUVOVE9TXCIsXCJzaXN0ZW1hXCI6XCJNRl9DUkVBUl9SRVFVRVJJTUlFTlRPU1wiLFwiaWRfcmVsYWNpb25cIjo3MH0se1wiaWRcIjo0NyxcIm5vbWJyZVwiOlwiQU5VTEFSX1JFUVVFUklNSUVOVE9TXCIsXCJzaXN0ZW1hXCI6XCJNRl9BTlVMQVJfUkVRVUVSSU1JRU5UT1NcIixcImlkX3JlbGFjaW9uXCI6NzF9XX1dIiwiaWQiOjY3LCJ1c2VyIjoie1wiaWRcIjo2NyxcIm5vbWJyZXNcIjpcIkVNUFJFU0EgTUFFU1RSRVwiLFwiYXBlbGxpZG9zXCI6bnVsbCxcImNvcnJlb1wiOlwicHJ1ZWJhc3N1cGVycEBnbWFpbC5jb21cIixcImRlbGVnYXR1cmFJZFwiOm51bGwsXCJyYXpvblNvY2lhbFwiOlwiRU1QUkVTQSBNQUVTVFJFXCIsXCJkb2N1bWVudG9cIjpcIjgwNjY2NjY2XCIsXCJ0aXBvVXN1YXJpb0lkXCI6NX0iLCJzeXN0ZW0iOiJNRiIsImV4cCI6MTczMzUyNDM3NiwiaWF0IjoxNzMzNTIwNzc2fQ.4HuekHcf4WKuF7b2yfXmnLh70HP9d7_zMpc36Ua4a-8'; // Define your default token here

  constructor(private jwtHelper: JwtHelperService) {
    this.initializeToken();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initializeToken();
  }

  ngOnInit() {
    this.initializeToken();
  }

  private initializeToken(): void {
    console.log('🚀 INITIALICE TOKEN ...:');
    const storedToken = localStorage.getItem('authToken');
    const authToken = storedToken ? storedToken : this.defaultToken;
    this.setToken(authToken);
    if (storedToken !== authToken) localStorage.setItem('authToken', authToken);
  }

  changeToken(newToken: string): Promise<void> {
    return new Promise((resolve) => {
      this.setToken(newToken);
      localStorage.setItem('authToken', newToken); // Almacenar el nuevo token en localStorage
      resolve();
    });
  }

  setToken(token: string = this.defaultToken): void {
    //&& !this.jwtHelper.isTokenExpired(token)
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.token = token;
    } else {
      this.decodedToken = null;
      this.token = null;
    }
  }

  getCurrentToken(): string | null {
    return this.token || this.defaultToken;
  }

  getUserInfo(): any {
    return this.decodedToken?.user ? JSON.parse(this.decodedToken.user) : null;
  }

  getUserRoles(): Authority[] {
    return this.decodedToken?.authorities
      ? (JSON.parse(this.decodedToken.authorities) as Authority[])
      : [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().some((auth: Authority) => auth.sistema === role);
  }

  hasPermission(permission: string | string[]): boolean {
    const roles = this.getUserRoles();

    // Verifica si el parámetro es un arreglo
    if (Array.isArray(permission)) {
      // Retorna true si el usuario tiene al menos uno de los permisos
      const hasAnyPermission = roles.some((auth: Authority) =>
        auth.permisos.some((permiso: Permiso) =>
          permission.includes(permiso.sistema)
        )
      );


      return hasAnyPermission;
    } else {
      // Retorna true si el usuario tiene el permiso individual
      const hasPermission = roles.some((auth: Authority) =>
        auth.permisos.some((permiso: Permiso) => permiso.sistema === permission)
      );

      return hasPermission;
    }
  }

  isAuthenticated(): boolean {
    const currentToken = this.token || this.defaultToken;
    // !this.jwtHelper.isTokenExpired(currentToken)
    return (
      currentToken !== null
    );
  }
}
