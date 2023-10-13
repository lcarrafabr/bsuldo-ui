import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdemRendaFixaPesquisaComponent } from './ordem-renda-fixa-pesquisa/ordem-renda-fixa-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { OrdemRendaFixaCadastroComponent } from './ordem-renda-fixa-cadastro/ordem-renda-fixa-cadastro.component';

const routes: Routes = [
  {
    path: 'ordem-renda-fixa',
    component: OrdemRendaFixaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'ordem-renda-fixa/novo',
    component: OrdemRendaFixaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'ordem-renda-fixa/:codigo',
    component: OrdemRendaFixaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemRendaFixaRoutingModule { }
