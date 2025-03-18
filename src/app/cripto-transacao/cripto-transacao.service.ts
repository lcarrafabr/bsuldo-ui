import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CriptoTransacao } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class CriptoTransacaoService {

  criptoTransacaoURL: string;
  consultaCriptoAPI: string;

  constructor(private http: HttpClient) {

    this.criptoTransacaoURL = `${environment.apiUrl}/v1/cripto-transacao`;
    this.consultaCriptoAPI = `${environment.apiUrl}/v1/api-cripto`;
  }


  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.criptoTransacaoURL}`, { params })
      .toPromise()
      .then(response => response);
  }


  listarComboMoedas(): Promise<any> {

    return this.http.get(`${this.criptoTransacaoURL}/lista-criptomoedas-list`)
      .toPromise()
      .then(response => response);
  }


  consultaValorAtualCota(tickerFiltro: string): Promise<any> {

    let params = new HttpParams();

    params = params.set('ticker', tickerFiltro);

    return this.http.get(`${this.consultaCriptoAPI}/cotacao-cripto`, { params })
      .toPromise()
      .then(response => response);

  }


  adicionar(criptoTransacao: CriptoTransacao, tokenId: string): Promise<CriptoTransacao> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }


    return this.http.post<CriptoTransacao>(`${this.criptoTransacaoURL}`, criptoTransacao, { params })
      .toPromise();
  }


  atualizarCriptoTransacao(criptoTransacao: CriptoTransacao, tokenId: string): Promise<CriptoTransacao> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.criptoTransacaoURL}/${criptoTransacao.codigoCriptoTransacao}`, criptoTransacao, { params })
      .toPromise()
      .then(response => {
        const criptoTransacaoResponse = response as CriptoTransacao;

        return criptoTransacaoResponse;
      });
  }

  buscarPorCodigo(codigo: string, tokenId: string): Promise<CriptoTransacao> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.criptoTransacaoURL}/${codigo}`, { params })
      .toPromise()
      .then(response => {
        const criptoResponse = response as CriptoTransacao;

        return criptoResponse;
      });
  }


  removerCriptoTransacao(codigo: string): Promise<void> {

    return this.http.delete(`${this.criptoTransacaoURL}/${codigo}`)
      .toPromise()
      .then(() => { });
  }


}
