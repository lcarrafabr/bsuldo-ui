import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokenURL = 'http://localhost:8080/oauth/token'
  tokenRevokeURL = 'http://localhost:8080/tokens/revoke'

  jwtPayload: any;
  jwtPayloadId: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.carregarToken();
   }

   obterNovoAccessToken(): Promise<void> {

    const body = 'grant_type=refresh_token';

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http.post(this.authTokenURL, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.jwtPayloadId = response['id'];
      this.armazenarToken(response['access_token']);

      return Promise.resolve(null);
    })
    .catch(response => {
      console.log('Erro no refresh token: ' + response['error']);
      return Promise.resolve(null);
    });
   }

  login(usuario: string, senha: string): Promise<void> {

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

     return this.http.post(this.authTokenURL, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        //console.log('Resposta: ' + response['access_token']);
        this.jwtPayloadId = response['id'];
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if(response.status === 400) {
          const responseJson = response['error'];

          if(responseJson.error === 'invalid_grant') {
            return Promise.reject('Alerta! Aviso de intruso!');
          }
        }
        return Promise.reject(response);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {

    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {

    for(const role of roles) {
      if(this.temPermissao(role)){
        return true;
      }
    }

    return false;
  }


  limparAccessToken() {

    this.http.delete(`${this.tokenRevokeURL}`, { withCredentials: true })
    .toPromise()
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('ID');
      this.jwtPayload = null;
      this.jwtPayloadId = null;
      this.router.navigate(['/login']);
    });


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
