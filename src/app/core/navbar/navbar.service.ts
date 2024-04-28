import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  avisosAutomaticosURL: string;

  constructor(private http: HttpClient) {

    this.avisosAutomaticosURL = `${environment.apiUrl}/avisos-automaticos`;
   }


   retornaQuantidadeTotalDeAlertas(pessoaId: string): Promise<any> {

    let params = new HttpParams();

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    return this.http.get(`${this.avisosAutomaticosURL}/quantidade-alertas`, { params })
    .toPromise()
    .then(response => response);
  }


  retornaAlertas(pessoaId: string): Promise<any> {

    let params = new HttpParams();

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    return this.http.get(`${this.avisosAutomaticosURL}/find-by-pessoaid`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaAlertasNaoVisualizados(pessoaId: string): Promise<any> {

    let params = new HttpParams();

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    return this.http.get(`${this.avisosAutomaticosURL}/alertas-nao-visualizados`, { params })
    .toPromise()
    .then(response => response);
  }
}
