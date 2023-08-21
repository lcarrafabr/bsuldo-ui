import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoRendaFixa } from '../core/model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoRendaFixaServiceService {

  produtosRendaFixaURL = 'http://localhost:8080/produto-renda-fixa'
  emissoresURL = 'http://localhost:8080/emissores'

  constructor(
    private http: HttpClient
  ) { }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.produtosRendaFixaURL}`)
    .toPromise()
    .then(response => response);
  }

  listarEmissoresAtivos(): Promise<any> {

    return this.http.get(`${this.emissoresURL}/emissores-ativos`)
    .toPromise()
    .then(response => response);
  }

  adicionar(produtoRendaFixa: ProdutoRendaFixa): Promise<ProdutoRendaFixa> {

    return this.http.post<ProdutoRendaFixa>(`${this.produtosRendaFixaURL}`, produtoRendaFixa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<ProdutoRendaFixa> {

    return this.http.get(`${this.produtosRendaFixaURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const produtoRF = response as ProdutoRendaFixa;

        this.converterStringsParaDatas([produtoRF]);

        return produtoRF;
      });
  }

  private converterStringsParaDatas(produtoRF: ProdutoRendaFixa[]) {
    for (const produtoRendaFixa of produtoRF) {
      produtoRendaFixa.dataVencimento = moment(produtoRendaFixa.dataVencimento,
        'YYYY-MM-DD').toDate();
    }
  }

  editarProdutoRendaFixa(produtoRF: ProdutoRendaFixa): Promise<ProdutoRendaFixa> {

    return this.http.put(`${this.produtosRendaFixaURL}/${produtoRF.produtoRendaFixaId}`, produtoRF)
    .toPromise()
    .then(response => {
      const produtoRFEditado = response as ProdutoRendaFixa;
      return produtoRFEditado;
    })
  }

  removerProduto(codigo: number): Promise<void> {

    return this.http.delete(`${this.produtosRendaFixaURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

}
