import { OrdemRendaFixa } from './../core/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemRendaFixaServiceService {

  //ordemRendaFixaURL = 'http://localhost:8080/ordem-renda-fixa';
  //produtoRendaFixaURL = 'http://localhost:8080/produto-renda-fixa';

  ordemRendaFixaURL: string;
  produtoRendaFixaURL: string;

  constructor(
    private http: HttpClient,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
    ) {
      this.ordemRendaFixaURL = `${environment.apiUrl}/ordem-renda-fixa`;
      this.produtoRendaFixaURL = `${environment.apiUrl}/produto-renda-fixa`;
     }

  listarTodos(): Promise<any> {

    return this.http.get(`${this.ordemRendaFixaURL}`)
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

  //************************************************************************ */

  listarProdutosRendaFixa(): Promise<any> {

    return this.http.get(`${this.produtoRendaFixaURL}/lista-produto-renda-fixa-ativo`)
    .toPromise()
    .then(response => response);
  }

  adicionar(ordemRendaFixa: OrdemRendaFixa): Promise<OrdemRendaFixa> {

    return this.http.post<OrdemRendaFixa>(`${this.ordemRendaFixaURL}`, ordemRendaFixa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<OrdemRendaFixa> {

    return this.http.get(`${this.ordemRendaFixaURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const ordemRF = response as OrdemRendaFixa;

        this.converterStringsParaDatas([ordemRF]);

        return ordemRF;
      });
  }

  editarOrdemRendaFixa(ordemRF: OrdemRendaFixa): Promise<OrdemRendaFixa> {

    return this.http.put(`${this.ordemRendaFixaURL}/${ordemRF.ordemRendaFixaId}`, ordemRF)
    .toPromise()
    .then(response => {
      const ordemRFEditado = response as OrdemRendaFixa;
      return ordemRFEditado;
    })
  }

  removerOrdemRendaFixa(codigo: number): Promise<void> {

    return this.http.delete(`${this.ordemRendaFixaURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  private converterStringsParaDatas(ordemRF: OrdemRendaFixa[]) {
    for (const ordemRendaFixa of ordemRF) {
      ordemRendaFixa.dataTransacao = moment(ordemRendaFixa.dataTransacao,
        'YYYY-MM-DD').toDate();
    }
    for (const ordemRendaFixa of ordemRF) {
      ordemRendaFixa.dataVencimento = moment(ordemRendaFixa.dataVencimento,
        'YYYY-MM-DD').toDate();
    }
  }


}
