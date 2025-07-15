import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoRendaVariavel } from '../core/model';
import { environment } from '../../environments/environment';

export interface ProdutoRVFiltro {
  ticker: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoRendaVariavelServiceService {

  //produtoRendaVariavelURL = 'http://localhost:8080/produto-renda-variavel';
  //emissoresURL = 'http://localhost:8080/emissores';
  //segmentosURL = 'http://localhost:8080/segmentos';
  //setoresURL = 'http://localhost:8080/setores';

  produtoRendaVariavelURL: string;
  emissoresURL: string;
  segmentosURL: string;
  setoresURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.produtoRendaVariavelURL = `${environment.apiUrl}/produto-renda-variavel`;
    this.emissoresURL = `${environment.apiUrl}/emissores`;
    this.segmentosURL = `${environment.apiUrl}/segmentos`;
    this.setoresURL = `${environment.apiUrl}/setores`;
   }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.produtoRendaVariavelURL}`)
    .toPromise()
    .then(response => response);
  }

  listarTodosFiltro(filtro: ProdutoRVFiltro, tokenId: string): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(filtro.ticker != null) {

      params = params.set('ticker', filtro.ticker);
      urlExtensao = '/busca-por-nome-produto-rv'
    }

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.produtoRendaVariavelURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }


// ********** busca dados para os combobox ***********
  listarEmissoresAtivos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.emissoresURL}/emissores-ativos`, { params })
    .toPromise()
    .then(response => response);
  }

  listarSegmentosAtivos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.segmentosURL}/segmentos-ativos`, { params })
    .toPromise()
    .then(response => response);
  }

  listarSetoresAtivos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.setoresURL}/setores-ativos`, { params })
    .toPromise()
    .then(response => response);
  }
  // ********** ************************************ ***********

  adicionarAutomatico(ticker: string, tokenId: string): Promise<ProdutoRendaVariavel> {

    let params = new HttpParams();
    params = params.set('ticker', ticker);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<ProdutoRendaVariavel>(`${this.produtoRendaVariavelURL}/automatico`, ticker, { params })
      .toPromise();
  }

  adicionarManual(produtoRendaVariavel: ProdutoRendaVariavel, tokenId: string): Promise<ProdutoRendaVariavel> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<ProdutoRendaVariavel>(`${this.produtoRendaVariavelURL}`, produtoRendaVariavel, { params })
      .toPromise();
  }

  buscarPorCodigo(codigo: string, tokenId: string): Promise<ProdutoRendaVariavel> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.produtoRendaVariavelURL}/${codigo}`, { params })
      .toPromise()
      .then(response => {
        const produtoRV = response as ProdutoRendaVariavel;

        return produtoRV;
      });
  }

  editarProdutoRendaVariavel(produtoRV: ProdutoRendaVariavel, tokenId: string): Promise<ProdutoRendaVariavel> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.produtoRendaVariavelURL}/${produtoRV.codigoProdutoRV}`, produtoRV, { params })
    .toPromise()
    .then(response => {
      const produtoRVEditado = response as ProdutoRendaVariavel;
      return produtoRVEditado;
    })
  }

  removerProduto(codigo: number): Promise<void> {

    return this.http.delete(`${this.produtoRendaVariavelURL}/${codigo}`)
    .toPromise()
    .then(() => {});
  }


}
