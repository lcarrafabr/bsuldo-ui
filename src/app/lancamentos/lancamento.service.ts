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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTAyMjk2LCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiI3MTgyNDUzNy01MmUxLTQ5ZmQtYWVkNS1jNTk0Nzc5MTM0OGUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.caDzRMiuBhUXbXfr3SmH4gbz20izc0SNu7GkI_R2Qbg');

    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
      urlExtensao = "/pesquisa"
    }

    if(filtro.dataVencimentoInicio && filtro.dataVencimentoFim) {
      params = params.set('vencimentoInicio', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
      params = params.set('vencimentoFim', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
      urlExtensao = "/pesquisa-por-data_ini_fim-vencimento"
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
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTAyMTcxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJlNjQxODgzNy1lYWYyLTQ2MzgtOTkxMi02NjdmNmE4OTYwMzYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.0DxMvBMahpxi4wHvOj4clKuoSe1JzClo10lwoODPcLw');

      return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJub21lVXN1YXJpbyI6IkxDQVJSQUZBLkJSIiwidXNlcl9uYW1lIjoiTENBUlJBRkEuQlIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjIxOTAyMTcxLCJhdXRob3JpdGllcyI6WyJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BUyJdLCJqdGkiOiJlNjQxODgzNy1lYWYyLTQ2MzgtOTkxMi02NjdmNmE4OTYwMzYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.0DxMvBMahpxi4wHvOj4clKuoSe1JzClo10lwoODPcLw')
    .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
      .toPromise();
  }

}
