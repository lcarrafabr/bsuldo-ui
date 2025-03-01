import { OrigemCadastroComponent } from './origem-cadastro/origem-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrigemPesquisaComponent } from './origem-pesquisa/origem-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'origens',
      component: OrigemPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
    },
    {
      path: 'origens/novo',
      component: OrigemCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
    },
    {
      path: 'origens/:codigo',
      component: OrigemCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrigensRoutingModule { }
