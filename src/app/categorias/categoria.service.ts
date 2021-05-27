import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CategoriaFiltro {
  nomeCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaURL = 'http://localhost:8080/categorias'

  constructor(
    private http: HttpClient
  ) { }


    listarTodos(): Promise<any> {

      return this.http.get(`${this.categoriaURL}`)
      .toPromise()
      .then(response => response);
    }

    listarTodosFiltro(filtro: CategoriaFiltro): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(filtro.nomeCategoria != null) {

        params = params.set('nomeCategoria', filtro.nomeCategoria);
        urlExtensao = '/busca-por-nome-categoria'
      }

      return this.http.get(`${this.categoriaURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }

}
