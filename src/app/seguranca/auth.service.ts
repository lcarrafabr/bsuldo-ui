import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokenURL = 'http://localhost:8080/oauth/token'

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: string, senha: string): Promise<void> {

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

     return this.http.post(this.authTokenURL, body, { headers })
      .toPromise()
      .then(response => {
        console.log('Resposta: ' + response);
      })
      .catch(response => {
        console.log('Resposta em caso de erro: ' + response.toString);
      })
  }

}
