import { MetodoDeCobranca } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface MetodoCobrancaFiltro {
  nomeMetodoConranca: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetodoCobrancaService {

  //metodoCobrancaURL = 'http://localhost:8080/metodo-de-cobranca'
  metodoCobrancaURL: string;

  constructor(private http: HttpClient) {
    this.metodoCobrancaURL = `${environment.apiUrl}/metodo-de-cobranca`;
  }

  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.metodoCobrancaURL}/busca-por-nome-metodo-cobranca-ativo`, { params })
    .toPromise()
    .then(response => response);
  }

  listarTodosPorFiltro(filtro: MetodoCobrancaFiltro, tokenId: string): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    if(filtro.nomeMetodoConranca != null) {
      params = params.set('nomeMetodoCobranca', filtro.nomeMetodoConranca);
        urlExtensao = '/busca-por-nome-metodo-cobranca'
    }


    return this.http.get(`${this.metodoCobrancaURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  cadastrarMetodoCobranca(metodoCobranca: MetodoDeCobranca, tokenId: string): Promise<MetodoDeCobranca> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.post<MetodoDeCobranca>(this.metodoCobrancaURL, metodoCobranca, { params })
    .toPromise();
  }

  removerMetodoCobranca(codigo: number): Promise<void> {

    return this.http.delete(`${this.metodoCobrancaURL}/${codigo}`)
    .toPromise()
    .then(() => null);

  }

  buscaPorId(codigo: number, tokenId: string): Promise<MetodoDeCobranca> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.metodoCobrancaURL}/${codigo}`, { params })
    .toPromise()
    .then(response => {
      const metodoCobranca = response as MetodoDeCobranca;

      return metodoCobranca;
    })
  }

  atualizarMetodoCobranca(metodoCobranca: MetodoDeCobranca, tokenId: string): Promise<MetodoDeCobranca> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.metodoCobrancaURL}/${metodoCobranca.metodoCobrancaId}`, metodoCobranca, { params })
    .toPromise()
    .then(response => {
      const metodoCobrancaAlterado = response as MetodoDeCobranca;
      return metodoCobrancaAlterado;
    })
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.metodoCobrancaURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

}
