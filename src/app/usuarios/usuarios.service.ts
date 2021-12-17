import { Usuario, Permissoes } from './../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UsuarioFiltro {
  nomeUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

 usuarioURL = 'http://localhost:8080/usuarios'
 pessoaURL = 'http://localhost:8080/pessoas'
 usuarioPermissoes = 'http://localhost:8080/user-permition'

  constructor(
    private http: HttpClient
  ) { }


  listarUsuarios(filtro: UsuarioFiltro): Promise<any> {

      let params = new HttpParams();
      let urlExtensao = "";

      if(filtro.nomeUsuario != null) {
        params = params.set('nome', filtro.nomeUsuario);
        urlExtensao = '/busca-por-nome-usuario'
      }

      return this.http.get(`${this.usuarioURL}` + urlExtensao, { params })
      .toPromise()
      .then(response => response);

  }


  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post<Usuario>(this.usuarioURL, usuario)
    .toPromise();
   }

   listarPessoas(): Promise<any> {

    let params = new HttpParams();
    let urlExtensao = "";

    return this.http.get(`${this.pessoaURL}/busca-pessoa-sem-usuarios` + urlExtensao, { params })
    .toPromise()
    .then(response => response);
  }

  buscaPorID(codigo: number): Promise<Usuario> {

    return this.http.get(`${this.usuarioURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const usuario = response as Usuario

      return usuario
    });
  }

  buscaPorIDPegarPermissoes(codigo: number): Promise<any> {

    return this.http.get(`${this.usuarioURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const usuario = response as Usuario

      return usuario
    });
  }

  atualizarUsuario(usuario: Usuario): Promise<Usuario> {

    return this.http.put(`${this.usuarioURL}/${usuario.usuarioId}`, usuario)
    .toPromise()
    .then(response => {
      const usuarioAlterado = usuario as Usuario

      return usuarioAlterado;
    })
  }

  mudarStatusAtivo(codigo: number, ativo: boolean) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.usuarioURL}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }



  //***********************************Usuario Permissoes************************************ */

  buscaPermissoesDisponiveis(codigo: number): Promise<any> {

    return this.http.get(`${this.usuarioPermissoes}/user-permition-disponiveis/${codigo}`)
    .toPromise()
    .then(response => {
      const permissoesDisponiveis = response as Permissoes

      return permissoesDisponiveis
    });
  }


  adicionarPermissoesAoUsuario(lista: any, codigo: number): Promise<any> {

    let params = new HttpParams();

    const id = codigo.toString();

    params = params.set('id', id);

    return this.http.post<Usuario>(`${this.usuarioPermissoes}/cadastrat-permissoes`, lista, { params })
    .toPromise();
   }


}
