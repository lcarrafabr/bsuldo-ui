import { MetodoCobrancaCadastroComponent } from './metodo-cobranca-cadastro/metodo-cobranca-cadastro.component';
import { MetodoCobrancaPesquisaComponent } from './metodo-cobranca-pesquisa/metodo-cobranca-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'metodo-de-cobranca',
    component: MetodoCobrancaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_METODO_COBRANCA']}
  },
  {
    path: 'metodo-de-cobranca/novo',
    component: MetodoCobrancaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_METODO_COBRANCA']}
  },
  {
    path: 'metodo-de-cobranca/:codigo',
    component: MetodoCobrancaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_METODO_COBRANCA']}
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MetodoCobrancaRoutingModule { }
