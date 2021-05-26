import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PessoaFiltro {
  nomePessoa: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaURL = 'http://localhost:8080/pessoas'

  constructor(
    private http: HttpClient
  ) { }


    pesquisarPessoa(filtro: PessoaFiltro): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(filtro.nomePessoa != null) {
        params = params.set('nome', filtro.nomePessoa);
        urlExtensao = '/busca-por-nome-pessoa'
      }

      return this.http.get(`${this.pessoaURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }

}
