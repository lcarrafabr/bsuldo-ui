import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleDividendos } from '../core/model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControleDividendosService {

  //controleDividendosURL = 'http://localhost:8080/controle-dividendos';
  controleDividendosURL: string;

  constructor(private http: HttpClient) {
    this.controleDividendosURL = `${environment.apiUrl}/controle-dividendos`;
   }

  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

    return this.http.get(`${this.controleDividendosURL}`, { params })
    .toPromise()
    .then(response => response);
  }

  listarProdutosCombobox(tokenId: string): Promise<any> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

    return this.http.get(`${this.controleDividendosURL}/busca-ticker-combobox`, { params })
    .toPromise()
    .then(response => response);
  }

  adicionar(controleDividendos: ControleDividendos, tokenId: string): Promise<ControleDividendos> {

    let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

    return this.http.post<ControleDividendos>(`${this.controleDividendosURL}`, controleDividendos, { params })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<ControleDividendos> {

    return this.http.get(`${this.controleDividendosURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const controlDividendo = response as ControleDividendos;

        this.converterStringsParaDatas([controlDividendo]);

        return controlDividendo;
      });
  }

  private converterStringsParaDatas(controleDividendos: ControleDividendos[]) {
    for (const controlDiv of controleDividendos) {
      controlDiv.dataReferencia = moment(controlDiv.dataReferencia,
        'YYYY-MM-DD').toDate();

      if (controlDiv.dataReferencia) {
        controlDiv.dataReferencia = moment(controlDiv.dataReferencia,
          'YYYY-MM-DD').toDate();
      }
    }

    for (const controlDiv of controleDividendos) {
      controlDiv.dataCom = moment(controlDiv.dataCom,
        'YYYY-MM-DD').toDate();

      if (controlDiv.dataCom) {
        controlDiv.dataCom = moment(controlDiv.dataCom,
          'YYYY-MM-DD').toDate();
      }
    }

    for (const controlDiv of controleDividendos) {
      controlDiv.dataPagamento = moment(controlDiv.dataPagamento,
        'YYYY-MM-DD').toDate();

      if (controlDiv.dataCom) {
        controlDiv.dataPagamento = moment(controlDiv.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

  atualizarControleDividendos(controleDiv: ControleDividendos, tokenId: string): Promise<ControleDividendos> {

    let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

    return this.http.put(`${this.controleDividendosURL}/${controleDiv.controleDividendoId}`, controleDiv, { params })
      .toPromise()
      .then(response => {
        const controleDivAtualizado = response as ControleDividendos;

        this.converterStringsParaDatas([controleDivAtualizado]);

        return controleDivAtualizado;
      });
  }

  removerControleDividendo(codigo: number): Promise<void> {

    return this.http.delete(`${this.controleDividendosURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.controleDividendosURL}/${codigo}/divUsado`, ativo, { headers })
    .toPromise()
    .then(() => null);
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

  totalDividendoDisponivel(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.controleDividendosURL}/valor-total-div-disponivel`, { params })
    .toPromise()
    .then(response => response);
  }
}
