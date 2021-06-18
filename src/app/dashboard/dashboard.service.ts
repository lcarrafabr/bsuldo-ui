import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosDashboardUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }


  valorApagarNoMes(dataReferencia: Date) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-a-pagar-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }


  valorPagoNoMes(dataReferencia: Date) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-pago-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorVencidoNoMes(dataReferencia: Date) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/valor-vencido-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  valorDevedorPorAno(dataReferencia: Date) {

    let params = new HttpParams();
    const ano = this.pegaDataIniEFim(dataReferencia).ano;

    params = params.set('ano', ano);

    return this.http.get(`${this.lancamentosDashboardUrl}/total-devedor-por-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  percentualPagoNoMes(dataReferencia: Date) {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/perc-pago-no-mes`, { params })
    .toPromise()
    .then(response => response);
  }

  lancamentosPorCategoria(dataReferencia): Promise<Array<any>> {

    let params = new HttpParams();
    const datainicio = this.pegaDataIniEFim(dataReferencia).dataIni;
    const dataFim = this.pegaDataIniEFim(dataReferencia).dataFim;

    params = params.set('dataIni', datainicio);
    params = params.set('dataFim', dataFim);

    return this.http.get(`${this.lancamentosDashboardUrl}/total-categoria-mes`, { params })
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
