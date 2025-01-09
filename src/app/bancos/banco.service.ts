import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bancos } from '../core/model';

export interface BancoFiltro {
  nomeBanco: string;
}

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  bancoURL: string;

  constructor(private http: HttpClient) {

      this.bancoURL = `${environment.apiUrl}/bancos`;
     }

     listarTodos(tokenId: string): Promise<any> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.bancoURL}`, { params })
      .toPromise()
      .then(response => response);
    }

    listarTodosFiltro(tokenId: string, filtro: BancoFiltro): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(filtro.nomeBanco != null) {

        params = params.set('nomeBanco', filtro.nomeBanco);
        urlExtensao = '/busca-banco-por-nome'
      }

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.bancoURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }

    adicionar(bancos: Bancos, tokenId: string): Promise<Bancos> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }


      return this.http.post<Bancos>(`${this.bancoURL}`, bancos, { params })
          .toPromise();
    }

    buscarPorCodigo(codigo: string, tokenId: string): Promise<Bancos> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.bancoURL}/${codigo}`, { params })
        .toPromise()
        .then(response => {
          const bancosResponse = response as Bancos;

          return bancosResponse;
        });
    }

    atualizarBanco(banco: Bancos, pessoaId: string): Promise<Bancos> {

      let params = new HttpParams();

      if(pessoaId != null) {
        params = params.set('pessoaId', pessoaId);
      }

      return this.http.put(`${this.bancoURL}/${banco.codigoBanco}`, banco, { params })
        .toPromise()
        .then(response => {
          const bancoResponse = response as Bancos;

          return bancoResponse;
        });
    }

    removeBanco(codigo: string): Promise<void> {

      return this.http.delete(`${this.bancoURL}/${codigo}`)
      .toPromise()
      .then(() => {});
    }

    mudarStatusAtivo(codigo: string, ativo: boolean) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.put(`${this.bancoURL}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
    }

    listaBancosAtivos(tokenId: string): Promise<any> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.bancoURL}/busca-bancos-ativos`, { params })
      .toPromise()
      .then(response => response);
    }

}
