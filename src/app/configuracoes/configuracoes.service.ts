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

  listarTodos(pessoaId: string): Promise<any> {

    let params = new HttpParams();

      if(pessoaId != null) {
        params = params.set('pessoaId', pessoaId);
      }

    return this.http.get(`${this.coresConfigURL}`, { params })
    .toPromise()
    .then(response => response);
  }
}
