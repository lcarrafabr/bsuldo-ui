import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(
    private http: HttpClient
  ) {
    this.controleDividendosURL = `${environment.apiUrl}/controle-dividendos`;
   }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.controleDividendosURL}`)
    .toPromise()
    .then(response => response);
  }

  listarProdutosCombobox(): Promise<any> {

    return this.http.get(`${this.controleDividendosURL}/busca-ticker-combobox`)
    .toPromise()
    .then(response => response);
  }

  adicionar(controleDividendos: ControleDividendos): Promise<ControleDividendos> {

    return this.http.post<ControleDividendos>(`${this.controleDividendosURL}`, controleDividendos)
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

  atualizarControleDividendos(controleDiv: ControleDividendos): Promise<ControleDividendos> {

    return this.http.put(`${this.controleDividendosURL}/${controleDiv.controleDividendoId}`, controleDiv)
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


  totalDividendoRecebido(): Promise<any> {

    return this.http.get(`${this.controleDividendosURL}/valor-total-div-recebido`)
    .toPromise()
    .then(response => response);
  }

  totalDividendoDisponivel(): Promise<any> {

    return this.http.get(`${this.controleDividendosURL}/valor-total-div-disponivel`)
    .toPromise()
    .then(response => response);
  }
}
