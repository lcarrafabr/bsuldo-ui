import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  coresConfigURL: string;

  constructor(private http: HttpClient) {

    this.coresConfigURL = `${environment.apiUrl}/cores`;
  }

  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

    return this.http.get(`${this.coresConfigURL}`, { params })
    .toPromise()
    .then(response => response);
  }
}
