import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleDividendosPesquisaComponent } from './controle-dividendos-pesquisa/controle-dividendos-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { ControleDividendosCadastroComponent } from './controle-dividendos-cadastro/controle-dividendos-cadastro.component';

const routes: Routes = [
  {
    path: 'controle-dividendos',
    component: ControleDividendosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'controle-dividendos/novo',
    component: ControleDividendosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'controle-dividendos/:codigo',
    component: ControleDividendosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleDividendosRoutingModule { }
