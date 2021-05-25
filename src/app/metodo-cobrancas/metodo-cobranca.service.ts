import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetodoCobrancaService {

  metodoCobrancaURL = 'http://localhost:8080/metodo-de-cobranca'

  constructor(private http: HttpClient) { }

  listarTodos(): Promise<any> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiaWQiOjEsImV4cCI6MTYyMTk4NzUyNiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQVMiXSwianRpIjoiYzg2OGEzMTItMDAyZi00MDM0LWIyYTktOGY0MWVlZDYyYTFlIiwiY2xpZW50X2lkIjoiYW5ndWxhciJ9.66JydGLG0b78qigrYrANqnn5J1kLnS0oP27SnNNoysg');

    return this.http.get(`${this.metodoCobrancaURL}`, { headers })
    .toPromise()
    .then(response => response);
  }

}
