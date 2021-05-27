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

  categoriaURL = 'http://localhost:8080/categorias'

  constructor(
    private http: HttpClient
  ) { }


    listarTodos(): Promise<any> {

      return this.http.get(`${this.categoriaURL}/busca-categorias-ativas`)
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


    cadastrarCategoria(categoria: Categoria): Promise<Categoria> {

      return this.http.post<Categoria>(`${this.categoriaURL}`, categoria)
      .toPromise();
    }

    removerCategoria(codigo: number): Promise<void> {

      return this.http.delete(`${this.categoriaURL}/${codigo}`)
      .toPromise()
      .then(() => null);
    }


    atualizarCategoria(categoria: Categoria): Promise<Categoria> {

      return this.http.put(`${this.categoriaURL}/${categoria.categoriaId}`, categoria)
      .toPromise()
      .then(response => {
        const categoriaAlterada = response as Categoria;

        return categoriaAlterada;
      });
    }

    buscaCategoriaPorID(codigo: number): Promise<Categoria> {

      return this.http.get(`${this.categoriaURL}/${codigo}`)
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
