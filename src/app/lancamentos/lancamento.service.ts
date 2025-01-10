import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date | undefined;
  dataVencimentoFim: Date | undefined;
  situacao: string | undefined;
  metodoDeCobrancaId: string | undefined;
  chavePesquisa: string;
  tipoLancamentoFiltro: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  //lancamentosUrl = 'http://localhost:8080/lancamentos';
  lancamentosUrl: string;

  dataIni: Date;
  dataFinal: Date;

  constructor(private http: HttpClient) {

    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro, tokenId: string): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";


    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    if(filtro.descricao !== undefined) {
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio !== undefined) {
      params = params.set('dataVencimento', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
    }

    if(filtro.dataVencimentoFim !== undefined) {
       params= params.set('dataVencimentoFim', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
    }

    if(filtro.metodoDeCobrancaId !== undefined) {
      params = params.set('metodoDeCobrancaId', filtro.metodoDeCobrancaId);
    }

    if(filtro.situacao !== undefined) {
      params = params.set('situacao', filtro.situacao);
    }

    if(filtro.tipoLancamentoFiltro !== undefined) {
      params = params.set('tipoLancamento', filtro.tipoLancamentoFiltro);
    }

    if(filtro.chavePesquisa !== undefined) {
      params = params.set('chavePesquisa', filtro.chavePesquisa);
    }

    return this.http.get(`${this.lancamentosUrl}` + urlExtensao, { params })
      .toPromise()
      //.then(response => console.log(response));
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => {});
  }

  adicionar(lancamento: Lancamento, tokenId: string): Promise<Lancamento> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { params })
      .toPromise();
  }

  adicionarLancamentoRecorrente(lancamento: Lancamento, qtdDias: string, tokenId: string): Promise<Lancamento> {

    let params = new HttpParams();
    params = params.set('qtd_dias', qtdDias);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<Lancamento>(`${this.lancamentosUrl}/lancamento-recorrente`, lancamento, { params })
      .toPromise();
  }

  buscaValorNoMes(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    let today = new Date();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let dataInicio: Date;
    let dataFim: Date;

    if(this.dataIni != null && this.dataFinal != null) {
      dataInicio = this.dataIni;
      dataFim = this.dataFinal;

    } else {

      dataInicio = firstDayOfMonth;
      dataFim = lastDayOfMonth;
    }

    params = params.set('dataIni',  moment(dataInicio).format("YYYY-MM-DD"));
    params = params.set('dataFim', moment(dataFim).format("YYYY-MM-DD"));

    return this.http.get(`${this.lancamentosUrl}/valor-a-pagar-no-mes`, { params })
    .toPromise()
    .then(response => response);

  }

  atualizar(lancamento: Lancamento, tokenId: string): Promise<Lancamento> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigoLancamento}`, lancamento, { params })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }


  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }


}
