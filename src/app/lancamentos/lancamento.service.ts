import { Lancamento } from './../core/model';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  situacao: string;
  chavePesquisa: string
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  dataIni: Date;
  dataFinal: Date;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');

    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
      urlExtensao = "/pesquisa"
    }

    if(filtro.dataVencimentoInicio && filtro.dataVencimentoFim) {
      params = params.set('vencimentoInicio', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
      params = params.set('vencimentoFim', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
      urlExtensao = "/pesquisa-por-data_ini_fim-vencimento"

      this.dataIni = filtro.dataVencimentoInicio;
      this.dataFinal = filtro.dataVencimentoFim;
      this.buscaValorNoMes();
    }

    if(filtro.dataVencimentoInicio && filtro.dataVencimentoFim == null) {
      params = params.set('dataVencimento', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
      urlExtensao = "/pesquisa-vencimento-ate"
    }

    if(filtro.situacao) {
      console.log(filtro.situacao)
      params = params.set('situacao', filtro.situacao);
      urlExtensao = "/busca-por-situacao"
    }

    if(filtro.chavePesquisa) {
      params = params.set('chavePesquisa', filtro.chavePesquisa);
      urlExtensao = "/busca-by-chave-pesquisa"
    }

    return this.http.get(`${this.lancamentosUrl}` + urlExtensao, { params, headers })
      .toPromise()
      //.then(response => console.log(response));
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');

      return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg')
    .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
      .toPromise();
  }

  buscaValorNoMes(): Promise<any> {

    let params = new HttpParams();

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

    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');

    return this.http.get(`${this.lancamentosUrl}/valor-a-pagar-no-mes`, { headers, params })
    .toPromise()
    .then(response => response);

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.lancamentoId}`, lancamento, { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }


  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTc0MjAxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJhMjQwNTkyOS1iNDE3LTQ1NzYtYjk0Zi0yOWUyMzJjODUzZGQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.EnddRhTZgZOhdE7B4vTZKr24PjGbUOlAJ9wIA9rwmqg');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.datavencimento = moment(lancamento.datavencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }


}
