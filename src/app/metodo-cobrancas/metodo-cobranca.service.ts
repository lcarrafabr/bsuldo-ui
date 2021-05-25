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
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTAyMjk2LCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiI3MTgyNDUzNy01MmUxLTQ5ZmQtYWVkNS1jNTk0Nzc5MTM0OGUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.caDzRMiuBhUXbXfr3SmH4gbz20izc0SNu7GkI_R2Qbg');

    return this.http.get(`${this.metodoCobrancaURL}`, { headers })
    .toPromise()
    .then(response => response);
  }

}
