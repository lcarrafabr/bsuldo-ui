import { WaletCadastroComponent } from './walet-cadastro/walet-cadastro.component';
import { WaletPesquisaComponent } from './walet-pesquisa/walet-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [

  {
    path: 'wallets',
    component: WaletPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'wallet/novo',
    component: WaletCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'wallet/:codigo',
    component: WaletCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule { }
