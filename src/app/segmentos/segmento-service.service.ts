import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Segmentos } from '../core/model';
import { environment } from 'src/environments/environment';

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

  listarTodos(): Promise<any> {

    return this.http.get(`${this.segmentoURL}`)
    .toPromise()
    .then(response => response);
  }

  cadastrarSegmento(segmento: Segmentos): Promise<Segmentos> {

    return this.http.post<Segmentos>(`${this.segmentoURL}`, segmento)
    .toPromise();
  }

  buscaSegmentoPorID(codigo: number): Promise<Segmentos> {

    return this.http.get(`${this.segmentoURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const segmento = response as Segmentos;

      return segmento;
    });
  }

  editarSegmento(segmento: Segmentos): Promise<Segmentos> {

    return this.http.put(`${this.segmentoURL}/${segmento.segmentoId}`, segmento)
    .toPromise()
    .then(response => {
      const segmentoEditado = response as Segmentos;
      return segmentoEditado;
    })
  }

  removerSegmento(codigo: number): Promise<void> {

    return this.http.delete(`${this.segmentoURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.segmentoURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }
}
