import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxNjM1OTI3LCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiI5ZDQ2NDg5Mi1mNzA3LTRhZjMtOTNmZC04ZjA5NzlmNjEyZTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.Icmxp2nuRmC9fdYCIL1zXz4M8uBhhp86G3kGAiXEeC8');

    return this.http.get(`${this.lancamentosUrl}`, { headers })
      .toPromise()
      //.then(response => console.log(response));
      .then(response => response);
  }
}
