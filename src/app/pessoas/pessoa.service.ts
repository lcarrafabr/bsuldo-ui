import { Pessoa } from './../core/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export interface PessoaFiltro {
  nomePessoa: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  //pessoaURL = 'http://localhost:8080/pessoas'
  pessoaURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.pessoaURL = `${environment.apiUrl}/pessoas`;
  }


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

    adicionar(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.post<Pessoa>(this.pessoaURL, pessoa)
      .toPromise();
    }

    removerPessoa(codigo: number): Promise<void> {

      return this.http.delete(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(() => null);
    }

    atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {

      return this.http.put(`${this.pessoaURL}/${pessoa.pessoaID}`, pessoa)
      .toPromise()
      .then(response => {

        const pessoaAlterada = response as Pessoa;
        this.converterStringsParaDatas([pessoa]);

        return pessoaAlterada;
      });
    }


    buscaPorCodigo(codigo: number): Promise<Pessoa> {

      return this.http.get(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(response => {

        const pessoa = response as Pessoa;
        this.converterStringsParaDatas([pessoa]);

        return pessoa;
      });
    }

    private converterStringsParaDatas(lancamentos: Pessoa[]) {
      for (const pessoa of lancamentos) {
        pessoa.dataCadastro = moment(pessoa.dataCadastro,
          'YYYY-MM-DD').toDate();
      }
    }

}
