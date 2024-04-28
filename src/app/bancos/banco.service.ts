import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

     listarTodos(pessoaId: string): Promise<any> {

      let params = new HttpParams();

      if(pessoaId != null) {
        params = params.set('pessoaId', pessoaId);
      }

      return this.http.get(`${this.bancoURL}`, { params })
      .toPromise()
      .then(response => response);
    }

    listarTodosFiltro(pessoaId: string, filtro: BancoFiltro): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(filtro.nomeBanco != null) {

        params = params.set('nomeBanco', filtro.nomeBanco);
        urlExtensao = '/busca-banco-por-nome'
      }

      if(pessoaId != null) {
        params = params.set('pessoaId', pessoaId);
      }

      return this.http.get(`${this.bancoURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }

    adicionar(bancos: Bancos, pessoaId: string): Promise<Bancos> {

      let params = new HttpParams();

      if(pessoaId != null) {
        params = params.set('pessoaId', pessoaId);
      }

      return this.http.post<Bancos>(`${this.bancoURL}`, bancos, { params })
          .toPromise();
    }

    buscarPorCodigo(codigo: number, tokenId: string): Promise<Bancos> {

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

      return this.http.put(`${this.bancoURL}/${banco.bancoId}`, banco, { params })
        .toPromise()
        .then(response => {
          const bancoResponse = response as Bancos;

          return bancoResponse;
        });
    }

    removeBanco(codigo: number): Promise<void> {

      return this.http.delete(`${this.bancoURL}/${codigo}`)
      .toPromise()
      .then(() => null);
    }

    mudarStatusAtivo(codigo: number, ativo: boolean) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.put(`${this.bancoURL}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
    }

}
