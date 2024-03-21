import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardInvestimentosService {

  //dashboardInvestimentosURL = 'http://localhost:8080/dashboard-investimentos';

  //controleDividendosURL = 'http://localhost:8080/controle-dividendos';
  //ordemRendaFixaURL = 'http://localhost:8080/ordem-renda-fixa';
  //ordemDeCompraURL = 'http://localhost:8080/ordens-de-compra';


  dashboardInvestimentosURL: string;
  controleDividendosURL: string;
  ordemRendaFixaURL: string;
  ordemDeCompraURL: string


  constructor(private http: HttpClient) {

    this.dashboardInvestimentosURL = `${environment.apiUrl}/dashboard-investimentos`;
    this.controleDividendosURL = `${environment.apiUrl}/controle-dividendos`;
    this.ordemRendaFixaURL = `${environment.apiUrl}/ordem-renda-fixa`;
    this.ordemDeCompraURL = `${environment.apiUrl}/ordens-de-compra`;
   }


  totalDividendoRecebido(): Promise<any> {

    return this.http.get(`${this.controleDividendosURL}/valor-total-div-recebido`)
    .toPromise()
    .then(response => response);
  }

  listarTotalInvestido(): Promise<any> {

    return this.http.get(`${this.ordemRendaFixaURL}/valor-total-investido`)
    .toPromise()
    .then(response => response);
  }

  listarTotalResgatado(): Promise<any> {

    return this.http.get(`${this.ordemRendaFixaURL}/valor-total-resgatado`)
    .toPromise()
    .then(response => response);
  }

  listarTotalDisponivel(): Promise<any> {

    return this.http.get(`${this.ordemRendaFixaURL}/valor-total-disponivel`)
    .toPromise()
    .then(response => response);
  }

  listarTotalInvestidoRV(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}/valor-total-investido-rv`)
    .toPromise()
    .then(response => response);
  }

  retornaDivsRecebidosPorMesEAno(): Promise<any> {

    return this.http.get(`${this.dashboardInvestimentosURL}/listar-valor-div-recebido-mes-ano`)
    .toPromise()
    .then(response => response);
  }

  retornaDivsRecebidosPorAnoGRID(): Promise<any> {

    return this.http.get(`${this.dashboardInvestimentosURL}/busca-valor-recebido-div-no-ano`)
    .toPromise()
    .then(response => response);
  }

  retornaQuatidadeTotalCotasEAcoes(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-basico`)
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioBasicoVisualizacao(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-basico-visualizacao`)
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioCompletoAcoesGrid(): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', "ACOES");

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-completo`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioCompletoFIISGrid(): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', "FIIS");

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-completo`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioAcoesFiis(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-acoes-fiis`)
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioAcoesFiisRendaFixa(): Promise<any> {

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-acoes-fiis-renda-fixa`)
    .toPromise()
    .then(response => response);
  }




}
