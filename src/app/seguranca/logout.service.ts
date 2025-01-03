import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout() {
      this.auth.limparAccessToken();
  }
}
