import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemDeCompra } from '../core/model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export interface OrdemCompraVendaTicker {
  ticker: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdensDeCompraService {


  //ordemDeCompraURL = 'http://localhost:8080/ordens-de-compra';
  //produtoRendaVariavelURL = 'http://localhost:8080/produto-renda-variavel';

  ordemDeCompraURL: string;
  produtoRendaVariavelURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.ordemDeCompraURL = `${environment.apiUrl}/ordens-de-compra`;
    this.produtoRendaVariavelURL = `${environment.apiUrl}/produto-renda-variavel`;
   }


  listarTodos(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}`)
    .toPromise()
    .then(response => response);
  }

  listarTodosProdutosRendaVariavel(): Promise<any> {

    return this.http.get(`${this.produtoRendaVariavelURL}`)
    .toPromise()
    .then(response => response);
  }

  listarTodosFiltro(filtro: OrdemCompraVendaTicker): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(filtro.ticker != null) {

      params = params.set('ticker', filtro.ticker);
      urlExtensao = '/busca-ordem-por-nome-ticker'
    }

    return this.http.get(`${this.ordemDeCompraURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  consultaValorAtualCota(tickerFiltro: string): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(tickerFiltro != null) {

      params = params.set('ticker', tickerFiltro);
      urlExtensao = '/consulta-valor-atual-cota'
      return this.http.get(`${this.ordemDeCompraURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }
  }

  adicionar(ordemDeCompra: OrdemDeCompra): Promise<OrdemDeCompra> {

    return this.http.post<OrdemDeCompra>(`${this.ordemDeCompraURL}`, ordemDeCompra)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<OrdemDeCompra> {

    return this.http.get(`${this.ordemDeCompraURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const ordemDeCompra = response as OrdemDeCompra;

        this.converterStringsParaDatas([ordemDeCompra]);

        return ordemDeCompra;
      });
  }

  private converterStringsParaDatas(ordensDeCompra: OrdemDeCompra[]) {
    for (const ordemDeCompra of ordensDeCompra) {
      ordemDeCompra.dataTransacao = moment(ordemDeCompra.dataTransacao,
        'YYYY-MM-DD').toDate();

      if (ordemDeCompra.dataTransacao) {
        ordemDeCompra.dataTransacao = moment(ordemDeCompra.dataTransacao,
          'YYYY-MM-DD').toDate();
      }
    }

    for (const ordemDeCompra of ordensDeCompra) {
      ordemDeCompra.dataExecucao = moment(ordemDeCompra.dataExecucao,
        'YYYY-MM-DD').toDate();

      if (ordemDeCompra.dataExecucao) {
        ordemDeCompra.dataExecucao = moment(ordemDeCompra.dataExecucao,
          'YYYY-MM-DD').toDate();
      }
    }
  }

  atualizarOrdemDeCompra(ordemDeCompra: OrdemDeCompra): Promise<OrdemDeCompra> {

    return this.http.put(`${this.ordemDeCompraURL}/${ordemDeCompra.ordemDeCompraId}`, ordemDeCompra)
      .toPromise()
      .then(response => {
        const ordemDeCompraAlterado = response as OrdemDeCompra;

        this.converterStringsParaDatas([ordemDeCompraAlterado]);

        return ordemDeCompraAlterado;
      });
  }

  removerOrdemDeCompra(codigo: number): Promise<void> {

    return this.http.delete(`${this.ordemDeCompraURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

}
