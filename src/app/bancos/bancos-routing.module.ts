import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoPesquisaComponent } from './banco-pesquisa/banco-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { BancoCadastroComponent } from './banco-cadastro/banco-cadastro.component';

const routes: Routes = [
  {
    path: 'bancos',
    component: BancoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'bancos/novo',
    component: BancoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIAS']}
  },
  {
    path: 'bancos/:codigo',
    component: BancoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancosRoutingModule { }
