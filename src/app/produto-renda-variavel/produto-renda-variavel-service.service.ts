import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoRendaVariavel } from '../core/model';
import { environment } from 'src/environments/environment';

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

  listarTodosFiltro(filtro: ProdutoRVFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(filtro.ticker != null) {

      params = params.set('ticker', filtro.ticker);
      urlExtensao = '/busca-por-nome-produto-rv'
    }

    return this.http.get(`${this.produtoRendaVariavelURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }


// ********** busca dados para os combobox ***********
  listarEmissoresAtivos(): Promise<any> {

    return this.http.get(`${this.emissoresURL}/emissores-ativos`)
    .toPromise()
    .then(response => response);
  }

  listarSegmentosAtivos(): Promise<any> {

    return this.http.get(`${this.segmentosURL}/segmentos-ativos`)
    .toPromise()
    .then(response => response);
  }

  listarSetoresAtivos(): Promise<any> {

    return this.http.get(`${this.setoresURL}/setores-ativos`)
    .toPromise()
    .then(response => response);
  }
  // ********** ************************************ ***********

  adicionarAutomatico(ticker: string): Promise<ProdutoRendaVariavel> {

    let params = new HttpParams();
    params = params.set('ticker', ticker);

    return this.http.post<ProdutoRendaVariavel>(`${this.produtoRendaVariavelURL}/automatico`, ticker, { params })
      .toPromise();
  }

  adicionarManual(produtoRendaVariavel: ProdutoRendaVariavel): Promise<ProdutoRendaVariavel> {

    return this.http.post<ProdutoRendaVariavel>(`${this.produtoRendaVariavelURL}`, produtoRendaVariavel)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<ProdutoRendaVariavel> {

    return this.http.get(`${this.produtoRendaVariavelURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const produtoRV = response as ProdutoRendaVariavel;

        return produtoRV;
      });
  }

  editarProdutoRendaVariavel(produtoRV: ProdutoRendaVariavel): Promise<ProdutoRendaVariavel> {

    return this.http.put(`${this.produtoRendaVariavelURL}/${produtoRV.produtoId}`, produtoRV)
    .toPromise()
    .then(response => {
      const produtoRVEditado = response as ProdutoRendaVariavel;
      return produtoRVEditado;
    })
  }

  removerProduto(codigo: number): Promise<void> {

    return this.http.delete(`${this.produtoRendaVariavelURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }


}
