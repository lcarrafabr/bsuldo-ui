import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setores } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class SetoresServiceService {

  setorURL = 'http://localhost:8080/setores';

  constructor(
    private http: HttpClient
  ) { }


  listarTodos(): Promise<any> {

    return this.http.get(`${this.setorURL}`)
    .toPromise()
    .then(response => response);
  }

  cadastrarSetor(setor: Setores): Promise<Setores> {

    return this.http.post<Setores>(`${this.setorURL}`, setor)
    .toPromise();
  }

  buscaSetoresPorID(codigo: number): Promise<Setores> {

    return this.http.get(`${this.setorURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const setor = response as Setores;

      return setor;
    });
  }

  editarSetor(setor: Setores): Promise<Setores> {

    return this.http.put(`${this.setorURL}/${setor.setorId}`, setor)
    .toPromise()
    .then(response => {
      const setorEditado = response as Setores;
      return setorEditado;
    })
  }

  removerSetor(codigo: number): Promise<void> {

    return this.http.delete(`${this.setorURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.setorURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }


}
