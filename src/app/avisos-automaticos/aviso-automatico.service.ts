import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AvisosAutomaticos } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AvisoAutomaticoService {

  avisoAutomaticoURL: string;

  constructor(private http: HttpClient) {

    this.avisoAutomaticoURL = `${environment.apiUrl}/avisos-automaticos`;
   }


   listarTodos(pessoaId: string): Promise<any> {

    let params = new HttpParams();

    if(pessoaId != null) {
      params = params.set('pessoaId', pessoaId);
    }

    return this.http.get(`${this.avisoAutomaticoURL}/find-by-pessoaid`, { params })
    .toPromise()
    .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<AvisosAutomaticos> {

    return this.http.get(`${this.avisoAutomaticoURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const avisoAutoResponse = response as AvisosAutomaticos;

        return avisoAutoResponse;
      });
  }

  mudarStatusAtivo(codigo: number, visualizado: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.avisoAutomaticoURL}/${codigo}/visualizado`, visualizado, { headers })
    .toPromise()
    .then(() => null);
  }

  removeBanco(codigo: number): Promise<void> {

    return this.http.delete(`${this.avisoAutomaticoURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }
}
