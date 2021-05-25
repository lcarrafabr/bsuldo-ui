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
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTYzODY5LCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiI2MGU3N2RiZC1kMzFkLTQ0ZWQtODUyNi02NDYyMjY4N2Q0OTMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.IsrjA2IiDYIs0YFTXclHYiHaahYFPnGVqIkTJVQf_N8');

    return this.http.get(`${this.metodoCobrancaURL}`, { headers })
    .toPromise()
    .then(response => response);
  }

}
