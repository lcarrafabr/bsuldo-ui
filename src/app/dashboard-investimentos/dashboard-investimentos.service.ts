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


  totalDividendoRecebido(idToken: string): Promise<any> {

    let params = new HttpParams();

    if(idToken != null) {

      params = params.set('idToken', idToken);
    }

    return this.http.get(`${this.controleDividendosURL}/valor-total-div-recebido`, { params })
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

  listarTotalInvestidoRV(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/valor-total-investido-rv`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaDivsRecebidosPorMesEAno(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/listar-valor-div-recebido-mes-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaDivsRecebidosPorAnoGRID(idToken: string): Promise<any> {

    let params = new HttpParams();

    if(idToken != null) {

      params = params.set('tokenId', idToken);
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/busca-valor-recebido-div-no-ano`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaProventosRecebidosEFuturos(idToken: string, tipoPesquisa: string): Promise<any> {

    let params = new HttpParams();

    if(idToken != null) {

      params = params.set('tokenId', idToken);
    }

    if(tipoPesquisa != null) {

      params = params.set('tipoPesquisa', tipoPesquisa)
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/grid-proventos-recebidos-e-futuros`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaQuatidadeTotalCotasEAcoes(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-basico`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioBasicoVisualizacao(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-basico-visualizacao`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioBasicComDivRecebido(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-basico-com-div-recebido`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioCompletoAcoesGrid(tokenId: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', "ACOES");

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-completo`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioCompletoFIISGrid(tokenId: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', "FIIS");

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-completo`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioCompletoBRDsGrid(tokenId: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', "BDRS");

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-completo`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioAcoesFiis(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-acoes-fiis`, { params })
    .toPromise()
    .then(response => response);
  }

  retornaRelatorioAcoesFiisRendaFixa(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.ordemDeCompraURL}/relatorio-acoes-fiis-renda-fixa`, { params })
    .toPromise()
    .then(response => response);
  }


  getDadosGraficoDivMesEAno(ano: string, mes: string, idToken: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('ano', ano);
    params = params.set('mes', mes);
    params = params.set('idToken', idToken);

    return this.http.get(`${this.controleDividendosURL}/dados-dividendos-por-mes-e-ano`, { params })
    .toPromise()
    .then(response => response);
  }


  retornaHistoricoProventosFuturos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/historico-proventos-futuros`, { params })
    .toPromise()
    .then(response => response);
  }

  relatorioPorSegmento(tokenId: string, tipoProduto: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', tipoProduto);

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/relatorio-por-segmento`, { params })
    .toPromise()
    .then(response => response);
  }

  relatorioPorSetores(tokenId: string, tipoProduto: string): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoProduto', tipoProduto);

    if(tokenId != null) {

      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.dashboardInvestimentosURL}/relatorio-por-setores`, { params })
    .toPromise()
    .then(response => response);
  }




}
