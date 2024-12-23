import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //lancamentosDashboardUrl = 'http://localhost:8080/lancamentos';
  lancamentosDashboardUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosDashboardUrl = `${environment.apiUrl}/lancamentos`;
  }


  valorApagarNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-a-pagar-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }


  valorPagoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-pago-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorVencidoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-vencido-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorDevedorPorAno(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-devedor-por-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  valorpagoPorAno(dataReferencia: Date, tokenId) {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-pago-por-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  percentualPagoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/perc-pago-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }


  //********************************************************************************************** */

  valorAReceberNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-a-receber-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorRecebidoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-recebido-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorAtrasadoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-atrasado-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }


  valorAReceberNoAno(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-a-receber-no-ano`, { params })
    .toPromise()
    .then(response => response);
  }


  receitaTotalPorAno(dataReferencia: Date, tokenId) {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/receita-total-por-ano`, { params })
    .toPromise()
    .then(response => response);
  }


  percentualRecebidoNoMes(dataReferencia: Date, tokenId: string) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/perc-recebido-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }


  //*********************************************************************************************** */

  lancamentosPorCategoria(dataReferencia, tokenId: string): Promise<Array<any>> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-categoria-mes`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }

  lancamentosPorMetodoCobrancaMes(dataReferencia, tokenId: string): Promise<Array<any>> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-metodo-cob-mes`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }


  lancamentosPordia(dataReferencia): Promise<Array<any>> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/lancamentos-por-dia`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }

  lancamentosPordiaReceitasDespesas(dataReferencia, tokenId: string): Promise<Array<any>> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/lancamentos-dia-mes-receitas-despesas`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }

 gradeTotaisPorAno(dataReferencia): Promise<any> {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    return this.http.get(`${this.lancamentosDashboardUrl}/totais-por-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  gradeTotaisDespesaMesPorAno(dataReferencia, tokenId: string): Promise<any> {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/lista-total-despesa-por-mes-ano`, { params })
    .toPromise()
    .then(response => response);
  }


  gradeTotalMetodoCobrancaPorMes(dataReferencia, tokenId: string): Promise<any> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/total-metodo-cobranca-mes`, { params })
    .toPromise()
    .then(response => response);

  }

gradeExpansivaLancamentosPorMetodoCobranca(dataReferencia): Promise<any> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/grade-lancamentos-por-metodo_cobranca`, { params })
    .toPromise()
    .then(response => response);

  }

  graficoReceitasDespesasPorMesEAno(dataReferencia, tokenId: string): Promise<Array<any>> {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/grafico-total-receita-despesa-by-mes-ano`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }


  graficoReceitasDespesasPorAno(dataReferencia, tokenId: string): Promise<Array<any>> {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.lancamentosDashboardUrl}/grafico-total-receita-despesa-por-ano`, { params })
    .toPromise()
    .then(response => response as Array<any>);
  }


  private pegaDataIniEFim(dataReferencia: Date) {

    const mesReferencia = dataReferencia;
    const startOfMonth = moment(mesReferencia).startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment(mesReferencia).endOf('month').format('YYYY-MM-DD');
    const year = moment(mesReferencia).endOf('year').format('YYYY');

    return {'dataIni' : startOfMonth, 'dataFim' : endOfMonth, 'ano' : year};
  }

}
