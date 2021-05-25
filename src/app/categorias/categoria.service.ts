import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaURL = 'http://localhost:8080/categorias'

  constructor(
    private http: HttpClient
  ) { }


    listarTodos(): Promise<any> {

      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');


      return this.http.get(`${this.categoriaURL}`, { headers })
      .toPromise()
      .then(response => response);
    }

}
