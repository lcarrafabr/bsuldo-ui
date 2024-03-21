import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { HistoricoRendimentoRF } from '../core/model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricoRfService {

  //historicoRFURL = 'http://localhost:8080/historico-rentabilidade-rf';
  historicoRFURL: string;

  constructor(
    private http: HttpClient,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) {
    this.historicoRFURL = `${environment.apiUrl}/historico-rentabilidade-rf`;
   }


  listarTodos(): Promise<any> {

    return this.http.get(`${this.historicoRFURL}`)
    .toPromise()
    .then(response => response);
  }

  adicionar(historicoRendimentoRF: HistoricoRendimentoRF): Promise<HistoricoRendimentoRF> {

    return this.http.post<HistoricoRendimentoRF>(`${this.historicoRFURL}`, historicoRendimentoRF)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<HistoricoRendimentoRF> {

    return this.http.get(`${this.historicoRFURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const histRF = response as HistoricoRendimentoRF;

        this.converterStringsParaDatas([histRF]);

        return histRF;
      });
  }

  editarHistoricoRF(histRF: HistoricoRendimentoRF): Promise<HistoricoRendimentoRF> {

    return this.http.put(`${this.historicoRFURL}/${histRF.histRentabilidadeRFId}`, histRF)
    .toPromise()
    .then(response => {
      const histRFEditado = response as HistoricoRendimentoRF;
      return histRFEditado;
    })
  }

  removerHistoricoRF(codigo: number): Promise<void> {

    return this.http.delete(`${this.historicoRFURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }


  private converterStringsParaDatas(responseParam: HistoricoRendimentoRF[]) {
    for (const response of responseParam) {
      response.dataRentabilidade = moment(response.dataRentabilidade,
        'YYYY-MM-DD').toDate();
    }
  }

}
