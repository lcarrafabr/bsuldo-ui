import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setores } from '../core/model';
import { environment } from '../../environments/environment';

export class SetorFiltro {
  nomeSetor: string;
}

@Injectable({
  providedIn: 'root'
})
export class SetoresServiceService {

  //setorURL = 'http://localhost:8080/setores';
  setorURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.setorURL = `${environment.apiUrl}/setores`;
   }


  listarTodos(tokenId: string, filtro: SetorFiltro): Promise<any> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    if(filtro.nomeSetor !== undefined) {
        params = params.set('nomeSetor', filtro.nomeSetor)
      }

    return this.http.get(`${this.setorURL}`, { params })
    .toPromise()
    .then(response => response);
  }

  cadastrarSetor(setor: Setores, tokenId: string): Promise<Setores> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.post<Setores>(`${this.setorURL}`, setor, { params })
    .toPromise();
  }

  buscaSetoresPorID(codigo: string, tokenId: string): Promise<Setores> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.setorURL}/${codigo}`, { params })
    .toPromise()
    .then(response => {
      const setor = response as Setores;

      return setor;
    });
  }

  editarSetor(setor: Setores, tokenId: string): Promise<Setores> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.setorURL}/${setor.codigoSetor}`, setor, { params })
    .toPromise()
    .then(response => {
      const setorEditado = response as Setores;
      return setorEditado;
    })
  }

  removerSetor(codigo: number): Promise<void> {

    return this.http.delete(`${this.setorURL}/${codigo}`)
    .toPromise()
    .then(() => {});
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.setorURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }


}
