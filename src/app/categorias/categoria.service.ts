import { environment } from './../../environments/environment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../core/model';

export interface CategoriaFiltro {
  nomeCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  //categoriaURL = 'http://localhost:8080/categorias'
  categoriaURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.categoriaURL = `${environment.apiUrl}/categorias`;
   }


    listarTodos(tokenId: string): Promise<any> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.categoriaURL}/busca-categorias-ativas`, { params })
      .toPromise()
      .then(response => response);
    }

    listarTodosFiltro(filtro: CategoriaFiltro, tokenId: string): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      if(filtro.nomeCategoria != null) {

        params = params.set('nomeCategoria', filtro.nomeCategoria);
        urlExtensao = '/busca-por-nome-categoria'
      }

      return this.http.get(`${this.categoriaURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);
    }


    cadastrarCategoria(categoria: Categoria, tokenId: string): Promise<Categoria> {

    let params = new HttpParams();

    if(tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

      return this.http.post<Categoria>(`${this.categoriaURL}`, categoria, { params })
      .toPromise();
    }

    removerCategoria(codigo: number): Promise<void> {

      return this.http.delete(`${this.categoriaURL}/${codigo}`)
      .toPromise()
      .then(() => {});
    }


    atualizarCategoria(categoria: Categoria, tokenId: string): Promise<Categoria> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.put(`${this.categoriaURL}/${categoria.codigo}`, categoria, { params })
      .toPromise()
      .then(response => {
        const categoriaAlterada = response as Categoria;

        return categoriaAlterada;
      });
    }

    buscaCategoriaPorID(codigo: number, tokenId: string): Promise<Categoria> {

      let params = new HttpParams();

      if(tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.categoriaURL}/${codigo}`, { params })
      .toPromise()
      .then(response => {
        const categoria = response as Categoria;

        return categoria;
      });
    }

    mudarStatusAtivo(codigo: number, ativo: boolean) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.put(`${this.categoriaURL}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
    }

}
