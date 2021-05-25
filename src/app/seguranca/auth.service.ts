import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokenURL = 'http://localhost:8080/oauth/token'

  jwtPayload: any;
  jwtPayloadId: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

     return this.http.post(this.authTokenURL, body, { headers })
      .toPromise()
      .then(response => {
        //console.log('Resposta: ' + response['access_token']);
        this.jwtPayloadId = response['id'];
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.log('Resposta em caso de erro: ' + response['access_token']);
      })
  }

  private armazenarToken(token: string) {

    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('ID', this.jwtPayloadId);
  }

  private carregarToken() {

    const token = localStorage.getItem('token');

    if(token) {

      this.armazenarToken(token);
    }
  }

}
