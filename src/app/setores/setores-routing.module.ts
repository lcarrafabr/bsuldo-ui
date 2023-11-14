import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetoresPesquisaComponent } from './setores-pesquisa/setores-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { SetoresCadastroComponent } from './setores-cadastro/setores-cadastro.component';

const routes: Routes = [
  {
    path: 'setores',
    component: SetoresPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'setores/novo',
    component: SetoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'setores/:codigo',
    component: SetoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetoresRoutingModule { }
