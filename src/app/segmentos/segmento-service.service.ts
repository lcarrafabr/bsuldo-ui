import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segmentos } from '../core/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegmentoServiceService {

  //segmentoURL = 'http://localhost:8080/segmentos';
  segmentoURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.segmentoURL = `${environment.apiUrl}/segmentos`;
  }

  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.segmentoURL}`, { params })
    .toPromise()
    .then(response => response);
  }

  cadastrarSegmento(segmento: Segmentos, tokenId: string): Promise<Segmentos> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<Segmentos>(`${this.segmentoURL}`, segmento, { params })
    .toPromise();
  }

  buscaSegmentoPorID(codigo: number, tokenId: string): Promise<Segmentos> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.segmentoURL}/${codigo}`, { params })
    .toPromise()
    .then(response => {
      const segmento = response as Segmentos;

      return segmento;
    });
  }

  editarSegmento(segmento: Segmentos, tokenId: string): Promise<Segmentos> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.segmentoURL}/${segmento.codigoSegmento}`, segmento, { params })
    .toPromise()
    .then(response => {
      const segmentoEditado = response as Segmentos;
      return segmentoEditado;
    })
  }

  removerSegmento(codigo: string): Promise<void> {

    return this.http.delete(`${this.segmentoURL}/${codigo}`)
    .toPromise()
    .then(() => undefined);
  }

  mudarStatusAtivo(codigo: string, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.segmentoURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }
}
