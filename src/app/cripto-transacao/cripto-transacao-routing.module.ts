import { CriptoTransacaoCadastroComponent } from './cripto-transacao-cadastro/cripto-transacao-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { CriptoTransacaoPesquisaComponent } from './cripto-transacao-pesquisa/cripto-transacao-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cripto-transacao',
    component: CriptoTransacaoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'cripto-transacao/novo',
    component: CriptoTransacaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriptoTransacaoRoutingModule { }
