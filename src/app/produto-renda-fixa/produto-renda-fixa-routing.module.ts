import { ProdutoRendaFixaCadastroComponent } from './produto-renda-fixa-cadastro/produto-renda-fixa-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { ProdutoRendaFixaPesquisaComponent } from './produto-renda-fixa-pesquisa/produto-renda-fixa-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'produto-renda-fixa',
    component: ProdutoRendaFixaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'produto-renda-fixa/novo',
    component: ProdutoRendaFixaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'produto-renda-fixa/:codigo',
    component: ProdutoRendaFixaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRendaFixaRoutingModule { }
