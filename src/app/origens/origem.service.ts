import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Origens } from '../core/model';

export interface OrigemFiltro {
  nomeOrigem: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrigemService {

  origemURL: string;

  constructor(private http: HttpClient) {

    this.origemURL = `${environment.apiUrl}/v1/origens`;
  }

  listarTodos(tokenId: string): Promise<any> {

        let params = new HttpParams();

        if(tokenId != null) {
          params = params.set('tokenId', tokenId);
        }

        return this.http.get(`${this.origemURL}`, { params })
        .toPromise()
        .then(response => response);
      }


      listarTodosFiltro(tokenId: string, filtro: OrigemFiltro): Promise<any> {

            let params = new HttpParams();
            let urlExtensao = "";

            if(filtro.nomeOrigem != null) {

              params = params.set('nomeOrigem', filtro.nomeOrigem);
              urlExtensao = '/busca-origem-por-nome'
            }

            if(tokenId != null) {
              params = params.set('tokenId', tokenId);
            }

            return this.http.get(`${this.origemURL}` + urlExtensao, { params })
            .toPromise()
            .then(response => response);
          }


      adicionar(origem: Origens, tokenId: string): Promise<Origens> {

            let params = new HttpParams();

            if(tokenId != null) {
              params = params.set('tokenId', tokenId);
            }


            return this.http.post<Origens>(`${this.origemURL}`, origem, { params })
                .toPromise();
          }


          buscarPorCodigo(codigo: string, tokenId: string): Promise<Origens> {

            let params = new HttpParams();

            if(tokenId != null) {
              params = params.set('tokenId', tokenId);
            }

            return this.http.get(`${this.origemURL}/${codigo}`, { params })
              .toPromise()
              .then(response => {
                const bancosResponse = response as Origens;

                return bancosResponse;
              });
          }


  atualizarOrigem(origem: Origens, tokenId: string): Promise<Origens> {

        let params = new HttpParams();

        if(tokenId != null) {
          params = params.set('tokenId', tokenId);
        }

        return this.http.put(`${this.origemURL}/${origem.codigoOrigem}`, origem, { params })
          .toPromise()
          .then(response => {
            const origemResponse = response as Origens;

            return origemResponse;
          });
      }

      removeOrigem(codigo: string): Promise<void> {

        return this.http.delete(`${this.origemURL}/${codigo}`)
        .toPromise()
        .then(() => {});
      }


      mudarStatusAtivo(codigo: string, ativo: boolean) {

            const headers = new HttpHeaders().set('Content-Type', 'application/json');

            return this.http.put(`${this.origemURL}/${codigo}/ativo`, ativo, { headers })
            .toPromise()
            .then(() => null);
          }
}
