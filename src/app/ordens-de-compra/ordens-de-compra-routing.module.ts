import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdensDeCompraPesquisaComponent } from './ordens-de-compra-pesquisa/ordens-de-compra-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { OrdensDeCompraCadastroComponent } from './ordens-de-compra-cadastro/ordens-de-compra-cadastro.component';

const routes: Routes = [
  {
    path: 'ordens-de-compra',
    component: OrdensDeCompraPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'ordens-de-compra/novo',
    component: OrdensDeCompraCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'ordens-de-compra/:codigo',
    component: OrdensDeCompraCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensDeCompraRoutingModule { }
