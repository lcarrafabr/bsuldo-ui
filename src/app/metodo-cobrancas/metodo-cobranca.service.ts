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

  listarTodos(): Promise<any> {

    return this.http.get(`${this.metodoCobrancaURL}/busca-por-nome-metodo-cobranca-ativo`)
    .toPromise()
    .then(response => response);
  }

  listarTodosPorFiltro(filtro: MetodoCobrancaFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(filtro.nomeMetodoConranca != null) {
      params = params.set('nomeMetodoCobranca', filtro.nomeMetodoConranca);
        urlExtensao = '/busca-por-nome-metodo-cobranca'
    }


    return this.http.get(`${this.metodoCobrancaURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  cadastrarMetodoCobranca(metodoCobranca: MetodoDeCobranca): Promise<MetodoDeCobranca> {

    return this.http.post<MetodoDeCobranca>(this.metodoCobrancaURL, metodoCobranca)
    .toPromise();
  }

  removerMetodoCobranca(codigo: number): Promise<void> {

    return this.http.delete(`${this.metodoCobrancaURL}/${codigo}`)
    .toPromise()
    .then(() => null);

  }

  buscaPorId(codigo: number): Promise<MetodoDeCobranca> {

    return this.http.get(`${this.metodoCobrancaURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const metodoCobranca = response as MetodoDeCobranca;

      return metodoCobranca;
    })
  }

  atualizarMetodoCobranca(metodoCobranca: MetodoDeCobranca): Promise<MetodoDeCobranca> {

    return this.http.put(`${this.metodoCobrancaURL}/${metodoCobranca.metodoCobrancaId}`, metodoCobranca)
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
