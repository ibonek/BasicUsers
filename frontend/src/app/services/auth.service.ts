import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIClientService } from './apiclient.service';

const KEY_ACTOKEN = 'access_token';
const KEY_RFTOKEN = 'refresh_token';
const KEY_USER = 'email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiClient: APIClientService) { }

  public isLoggedIn(): boolean {
    return !!this.getRefreshToken();
  }

  public logout(): void {
    localStorage.removeItem(KEY_ACTOKEN);
    localStorage.removeItem(KEY_RFTOKEN);
    localStorage.removeItem(KEY_USER);
  }

  public saveAccessToken(token: string): void { localStorage.setItem(KEY_ACTOKEN, token); }
  public saveRefreshToken(token: string): void { localStorage.setItem(KEY_RFTOKEN, token); }

  public getAccessToken(): string { return localStorage.getItem(KEY_ACTOKEN) || ''; }
  public getRefreshToken(): string { return localStorage.getItem(KEY_RFTOKEN) || ''; }

  public refreshToken(): Observable<HttpResponse<any>> {
    return this.apiClient.endpoints.auth.refresh();
  }

}