import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmissoresPesquisaComponent } from './emissores-pesquisa/emissores-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { EmissoresCadastroComponent } from './emissores-cadastro/emissores-cadastro.component';

const routes: Routes = [
  {
    path: 'emissores',
    component: EmissoresPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'emissores/novo',
    component: EmissoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'emissores/:codigo',
    component: EmissoresCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmissoresRoutingModule { }
