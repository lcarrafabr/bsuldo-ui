import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Emissores } from '../core/model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export interface EmissorFiltro {
  nomeEmissor: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmissoresService {

  //emissoresURL = 'http://localhost:8080/emissores'
  emissoresURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.emissoresURL = `${environment.apiUrl}/emissores`;
   }

  listarTodos(filtro: EmissorFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(filtro.nomeEmissor != null) {

      params = params.set('nomeEmissor', filtro.nomeEmissor);
      urlExtensao = '/busca-por-nome-emisor'
    }

    return this.http.get(`${this.emissoresURL}`  + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  cadastrarEmissores(emissor: Emissores): Promise<Emissores> {

    return this.http.post<Emissores>(`${this.emissoresURL}`, emissor)
    .toPromise();
  }

  buscaEmissoresPorID(codigo: number): Promise<Emissores> {

    return this.http.get(`${this.emissoresURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const emissor = response as Emissores;
      this.converterStringsParaDatas([emissor]);

      return emissor;
    });
  }

  editarEmissor(emissor: Emissores): Promise<Emissores> {

    return this.http.put(`${this.emissoresURL}/${emissor.emissorId}`, emissor)
    .toPromise()
    .then(response => {
      const emissorEditado = response as Emissores;
      return emissorEditado;
    })
  }

  removerEmissor(codigo: number): Promise<void> {

    return this.http.delete(`${this.emissoresURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.emissoresURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  //******************************** PRIVATES ********************************************** */

  private converterStringsParaDatas(emissores: Emissores[]) {
    for (const emissor of emissores) {
      emissor.dataCadastro = moment(emissor.dataCadastro,
        'YYYY-MM-DD').toDate();
    }
  }
}
