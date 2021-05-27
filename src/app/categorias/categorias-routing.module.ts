import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'categorias/novo',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIAS']}
  },
  {
    path: 'categorias/:codigo',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
