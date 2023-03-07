import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  private static readonly API_URL = 'http://127.0.0.1:5000/';

  // Headers
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  });

  public endpoints: any;

  constructor(private http: HttpClient) {
    let context = this;
    this.endpoints = {
      auth: {
        login: function(loginData: any) { return context.api_create('api/users/login', loginData) },
        refresh: function()             { return context.api_create('api/users/refresh', {}) }
      },
      product: {
        addProduct: function (name: string, description: string, price: number, brand: string) { return context.api_create('products', {name, description, price, brand})}
      },
      users: {
        list: function () { return context.api_list('api/users', {}) },
        create: function (login: string, password: string) { return context.api_create('/api/users/register', {login, password}) },
      }
    }
  }


  /******************* OPERACIONES API GENERICAS *******************/
  api_list(url: string, params: any) : Observable<HttpResponse<APIResponse<any>>> {
    //if(params) this.clearParameters(params);
    url = APIClientService.API_URL + url;
    return this.http.get<any>(url, { observe: 'response', params, headers: this.headers});
  }

  api_single(url: string, id: string) : Observable<HttpResponse<APIResponse<any>>> {
    url = APIClientService.API_URL + url + '/' + id;
    return this.http.get<any>(url, { observe: 'response', headers: this.headers});
  }

  api_create(url: string, data: any) : Observable<HttpResponse<APIResponse<any>>> {
    url = APIClientService.API_URL + url;
    return this.http.post<any>(url, data, { observe: 'response', headers: this.headers});
  }

  api_update(url: string, id: string, data: any, property: string = '') : Observable<HttpResponse<APIResponse<any>>> {
    url = APIClientService.API_URL + url + '/' + id + property;
    return this.http.put<any>(url, data, { observe: 'response', headers: this.headers});
  }

  api_delete(url: string, id: string) : Observable<HttpResponse<APIResponse<any>>> {
    url = APIClientService.API_URL + url + '/' + id;
    return this.http.delete<any>(url, { observe: 'response', headers: this.headers});
  }

}
