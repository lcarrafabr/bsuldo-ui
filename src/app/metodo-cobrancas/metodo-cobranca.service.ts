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
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxODk1NjY2LCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJkNDkxMmNkMy0wNGFlLTRlYzktOWE2YS04YmZjY2Q1OGQxMGYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.PyVPU9S1Ay8-Tdi3yh8aFW6vPh-HA_1OcpfQt2-x5_A');

    return this.http.get(`${this.metodoCobrancaURL}`, { headers })
    .toPromise()
    .then(response => response);
  }

}
