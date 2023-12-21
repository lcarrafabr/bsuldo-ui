import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoRendaVariavelPesquisaComponent } from './produto-renda-variavel-pesquisa/produto-renda-variavel-pesquisa.component';
import { ProdutoRendaVariavelCadastroComponent } from './produto-renda-variavel-cadastro/produto-renda-variavel-cadastro.component';

const routes: Routes = [
  {
    path: 'produto-renda-variavel',
    component: ProdutoRendaVariavelPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'produto-renda-variavel/novo',
    component: ProdutoRendaVariavelCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'produto-renda-variavel/:codigo',
    component: ProdutoRendaVariavelCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRendaVariavelRoutingModule { }
