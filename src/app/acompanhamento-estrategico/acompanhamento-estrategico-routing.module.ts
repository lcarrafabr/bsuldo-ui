import { AcompanhamentoEstrategicoCadastroComponent } from './acompanhamento-estrategico-cadastro/acompanhamento-estrategico-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcompanhamentoEstrategicoPesquisaComponent } from './acompanhamento-estrategico-pesquisa/acompanhamento-estrategico-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'acompanhamento-estrategico',
    component: AcompanhamentoEstrategicoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'acompanhamento-estrategico/novo',
    component: AcompanhamentoEstrategicoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIAS']}
  },
  {
    path: 'acompanhamento-estrategico/:codigo',
    component: AcompanhamentoEstrategicoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompanhamentoEstrategicoRoutingModule { }
