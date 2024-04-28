import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AcompanhamentoEstrategico } from '../core/model';

export interface AcompanhamentoEstrategicoFiltro {
  ticker: string;
  setorId: string;
  segmentoId: string;
  statusAcompanhamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoEstrategicoService {

  acompanhamentoEstrategicoURL: string;

  segmentosURL: string;
  setoresURL: string;

  constructor(private http: HttpClient) {

    this.acompanhamentoEstrategicoURL = `${environment.apiUrl}/acompanhamento-estrategico`;
    this.segmentosURL = `${environment.apiUrl}/segmentos`;
    this.setoresURL = `${environment.apiUrl}/setores`;
   }


   listarTodos(pessoaId: string): Promise<any> {

    let params = new HttpParams();

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    return this.http.get(`${this.acompanhamentoEstrategicoURL}`, { params })
    .toPromise()
    .then(response => response);
  }


  listarTodosComFiltro(pessoaId: string, filtro: AcompanhamentoEstrategicoFiltro): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    if(filtro.ticker) {
      params = params.set('ticker', filtro.ticker);
      urlExtensao = "/find-by-filtros"
    } else {
      params = params.set('ticker', "");
    }

    if(filtro.setorId) {
      params = params.set('setorId', filtro.setorId);
      urlExtensao = "/find-by-filtros"
    } else {
      params = params.set('setorId', "");
    }

    if(filtro.segmentoId) {
      params = params.set('segmentoId', filtro.segmentoId);
      urlExtensao = "/find-by-filtros"
    } else {
      params = params.set('segmentoId', "");
    }

    if(filtro.statusAcompanhamento) {
      params = params.set('statusAcompanhamento', filtro.statusAcompanhamento);
      urlExtensao = "/find-by-filtros"
    } else {
      params = params.set('statusAcompanhamento', "");
    }

    return this.http.get(`${this.acompanhamentoEstrategicoURL}` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  // ********** busca dados para os combobox ***********

  listarSegmentosAtivos(): Promise<any> {

    return this.http.get(`${this.segmentosURL}/segmentos-ativos`)
    .toPromise()
    .then(response => response);
  }

  listarSetoresAtivos(): Promise<any> {

    return this.http.get(`${this.setoresURL}/setores-ativos`)
    .toPromise()
    .then(response => response);
  }
  // ********** ************************************ ***********


  adicionar(acompEstrategico: AcompanhamentoEstrategico): Promise<AcompanhamentoEstrategico> {

    return this.http.post<AcompanhamentoEstrategico>(`${this.acompanhamentoEstrategicoURL}`, acompEstrategico)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<AcompanhamentoEstrategico> {

    return this.http.get(`${this.acompanhamentoEstrategicoURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const acompEstrategico = response as AcompanhamentoEstrategico;

        return acompEstrategico;
      });
  }

  editarAcompEstrategico(acompEstrategico: AcompanhamentoEstrategico): Promise<AcompanhamentoEstrategico> {

    return this.http.put(`${this.acompanhamentoEstrategicoURL}/${acompEstrategico.acompEstrategicoId}`, acompEstrategico)
    .toPromise()
    .then(response => {
      const acompEstrategicoEditado = response as AcompanhamentoEstrategico;
      return acompEstrategicoEditado;
    })
  }

  removerAcompestrategico(codigo: number): Promise<void> {

    return this.http.delete(`${this.acompanhamentoEstrategicoURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

}
