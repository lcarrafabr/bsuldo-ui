import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoRfPesquisaComponent } from './historico-rf-pesquisa/historico-rf-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { HistoricoRfCadastroComponent } from './historico-rf-cadastro/historico-rf-cadastro.component';

const routes: Routes = [
  {
    path: 'historico-renda-fixa',
    component: HistoricoRfPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'historico-renda-fixa/novo',
    component: HistoricoRfCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'historico-renda-fixa/:codigo',
    component: HistoricoRfCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRfRoutingModule { }
